"""Läser SGU:s GeoPackage-filer och skriver koldioxidlagring/data/sgu-karta.js.

Koordinaterna räknas om från SWEREF 99 TM (EPSG:3006) till WGS 84 med
Lantmäteriets formler för Gauss–Krüger. Mätlinjerna förenklas med
Douglas–Peucker så att filen blir liten nog för webben.

Här skedde en uppdatering 2026-09-28: skriptet lades i repot.

Så körs det (bara Pythons standardbibliotek behövs):
  1. Ladda ner och packa upp i samma mapp, från
     https://resource.sgu.se/data/datasets/nettonollteknik/
       intresseomrade/ccs_area_of_interest.zip
       borrhal_ccs/borrhal_ccs.zip
       sedimentekolod/sbp_skane_marine.zip
  2. python koldioxidlagring\\data\\konvertera.py koldioxidlagring\\data\\sgu-karta.js <mappen>
     Utan <mappen> används %TEMP%\\sgu_ccs.
  3. Uppdatera hämtdatum här nedan, i källförteckningarna och ?v= i sidornas <head>.
"""
import sqlite3, struct, math, json, os, re, sys
from collections import Counter

UT = sys.argv[1]
BAS = sys.argv[2] if len(sys.argv) > 2 else os.path.expandvars(r"%TEMP%\sgu_ccs")

# --- SWEREF 99 TM -> WGS 84 -------------------------------------------------
a = 6378137.0
f = 1 / 298.257222101
e2 = f * (2 - f)
n = f / (2 - f)
a_roof = a / (1 + n) * (1 + n**2 / 4 + n**4 / 64)
d1 = n / 2 - 2 * n**2 / 3 + 37 * n**3 / 96 - n**4 / 360
d2 = n**2 / 48 + n**3 / 15 - 437 * n**4 / 1440
d3 = 17 * n**3 / 480 - 37 * n**4 / 840
d4 = 4397 * n**4 / 161280
As = e2 + e2**2 + e2**3 + e2**4
Bs = -(7 * e2**2 + 17 * e2**3 + 30 * e2**4) / 6
Cs = (224 * e2**3 + 889 * e2**4) / 120
Ds = -(4279 * e2**4) / 1260
K0, LON0, FE = 0.9996, math.radians(15.0), 500000.0


def till_wgs84(e, nn):
    xi = nn / (K0 * a_roof)
    eta = (e - FE) / (K0 * a_roof)
    xp = (xi - d1 * math.sin(2 * xi) * math.cosh(2 * eta) - d2 * math.sin(4 * xi) * math.cosh(4 * eta)
          - d3 * math.sin(6 * xi) * math.cosh(6 * eta) - d4 * math.sin(8 * xi) * math.cosh(8 * eta))
    ep = (eta - d1 * math.cos(2 * xi) * math.sinh(2 * eta) - d2 * math.cos(4 * xi) * math.sinh(4 * eta)
          - d3 * math.cos(6 * xi) * math.sinh(6 * eta) - d4 * math.cos(8 * xi) * math.sinh(8 * eta))
    phis = math.asin(math.sin(xp) / math.cosh(ep))
    dl = math.atan(math.sinh(ep) / math.cos(xp))
    s = math.sin(phis)
    lat = phis + s * math.cos(phis) * (As + Bs * s**2 + Cs * s**4 + Ds * s**6)
    return [round(math.degrees(LON0 + dl), 5), round(math.degrees(lat), 5)]


# --- GeoPackage-geometri (GP-huvud + WKB) ------------------------------------
def las_wkb(b, pos=0):
    bo = "<" if b[pos] == 1 else ">"
    typ = struct.unpack_from(bo + "I", b, pos + 1)[0]
    pos += 5
    har_z = bool(typ & 0x80000000) or (1000 <= typ % 4000 < 2000) or typ % 4000 >= 3000
    har_m = bool(typ & 0x40000000) or (2000 <= typ % 4000 < 4000)
    bas = (typ & 0x0FFFFFFF) % 1000
    dim = 2 + har_z + har_m

    def punkter(p):
        antal = struct.unpack_from(bo + "I", b, p)[0]; p += 4
        ut = []
        for _ in range(antal):
            v = struct.unpack_from(bo + "d" * dim, b, p); p += 8 * dim
            ut.append((v[0], v[1]))
        return ut, p

    if bas == 1:
        v = struct.unpack_from(bo + "d" * dim, b, pos)
        return ("Point", (v[0], v[1])), pos + 8 * dim
    if bas == 2:
        pts, pos = punkter(pos)
        return ("LineString", pts), pos
    if bas == 3:
        antal = struct.unpack_from(bo + "I", b, pos)[0]; pos += 4
        ringar = []
        for _ in range(antal):
            r, pos = punkter(pos); ringar.append(r)
        return ("Polygon", ringar), pos
    if bas in (4, 5, 6):
        antal = struct.unpack_from(bo + "I", b, pos)[0]; pos += 4
        delar = []
        for _ in range(antal):
            g, pos = las_wkb(b, pos); delar.append(g[1])
        return ({4: "MultiPoint", 5: "MultiLineString", 6: "MultiPolygon"}[bas], delar), pos
    raise ValueError(f"Okänd geometrityp {typ}")


def las_gpkg(blob):
    flaggor = blob[3]
    kuvert = (flaggor >> 1) & 0x07
    storlek = {0: 0, 1: 32, 2: 48, 3: 48, 4: 64}[kuvert]
    return las_wkb(blob, 8 + storlek)[0]


# --- Förenkling (Douglas–Peucker, i meter) -----------------------------------
def dp(pts, tol):
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    langd = math.hypot(dx, dy) or 1e-9
    maxd, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / langd
        if d > maxd:
            maxd, idx = d, i
    if maxd <= tol:
        return [pts[0], pts[-1]]
    return dp(pts[: idx + 1], tol)[:-1] + dp(pts[idx:], tol)


def linje(pts, tol):
    return [till_wgs84(x, y) for x, y in dp(pts, tol)]


# --- Undersökningsområdena ---------------------------------------------------
c = sqlite3.connect(os.path.join(BAS, r"ccs_area_of_interest\ccs_area_of_interest.gpkg"))
omraden = []
for namn, geom in c.execute("select area_name, geom from ccs_area_of_interest"):
    typ, g = las_gpkg(geom)
    polys = [g] if typ == "Polygon" else g
    # Ringar är slutna (första punkt = sista), så de förenklas inte.
    koord = [[[till_wgs84(x, y) for x, y in r] for r in p] for p in polys]
    omraden.append({"type": "Feature", "properties": {"namn": namn},
                    "geometry": {"type": "MultiPolygon", "coordinates": koord}})

# --- Mätlinjer från sedimentekolodet -----------------------------------------
c = sqlite3.connect(os.path.join(BAS, r"sbp_skane_marine\sbp_skane_marine\1_Tracklines\sbp_skane_marine_tracklines.gpkg"))
per_ar = {}
prefix = Counter()
langd_km = Counter()
for namn, geom, l in c.execute("select line, geom, geom_length from sbp_skane_marine_tracklines"):
    m = re.search(r"(\d{2})", namn or "")
    ar = "20" + m.group(1) if m and m.group(1) in ("23", "24", "25") else "okänt"
    prefix[(namn or "").split("_")[0]] += 1
    langd_km[ar] += (l or 0) / 1000
    typ, g = las_gpkg(geom)
    delar = [g] if typ == "LineString" else g
    per_ar.setdefault(ar, []).extend(linje(d, 25) for d in delar if len(d) > 1)
matlinjer = [{"type": "Feature", "properties": {"ar": ar, "km": round(langd_km[ar])},
              "geometry": {"type": "MultiLineString", "coordinates": lines}}
             for ar, lines in sorted(per_ar.items())]
print("prefix", prefix.most_common(12))
print("km per år", {k: round(v) for k, v in langd_km.items()})

# --- Borrhål -----------------------------------------------------------------
c = sqlite3.connect(os.path.join(BAS, r"borrhal_ccs\borrhal_ccs.gpkg"))
NYCKEL = {"Lilla Beddinge-1", "Skåre-1", "Faludden-1", "Faludden-2", "Faludden-3", "Nore-1"}
borrhal = []
for namn, e, nn, l, start, op in c.execute(
        "select borehole_name, easting, northing, drilled_length, drilled_date_start, operators from borehole"):
    p = {"namn": namn, "nyckel": namn in NYCKEL}
    if l: p["langd"] = l
    if start: p["ar"] = start[:4]
    if op and op != "Okänt": p["op"] = op
    borrhal.append({"type": "Feature", "properties": p,
                    "geometry": {"type": "Point", "coordinates": till_wgs84(e, nn)}})

data = {
    "hamtad": "2026-09-28",
    "omraden": {"type": "FeatureCollection", "features": omraden},
    "matlinjer": {"type": "FeatureCollection", "features": matlinjer},
    "borrhal": {"type": "FeatureCollection", "features": borrhal},
}
huvud = ("/* Här skedde en uppdatering 2026-09-28: filen skapades.\n"
         " * Genererad ur SGU:s öppna data för koldioxidlagring (hämtad 2026-09-28):\n"
         " * Områden av primärt intresse, Sedimentekolod Skåne Marin (mätlinjer) och Borrhål CCS.\n"
         " * Omräknad från SWEREF 99 TM till WGS 84. Mätlinjerna är förenklade till cirka 25 m.\n"
         " * Redigera inte för hand. */\n")
with open(UT, "w", encoding="utf-8") as fh:
    fh.write(huvud + "window.SGU_KARTA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
print("skrev", UT, os.path.getsize(UT) // 1024, "kB")
print("kontroll Lilla Beddinge-1", till_wgs84(398034.0, 6135133.0))
