"""Gör rotationsvideon (MP4) av en körning i scenario.js: fyra bildrutor, 4 sekunder var, i en slinga.

Körning (i mappen aktuellt/regeringsbildning, i PowerShell):
    python video/gor_rotation.py              # senaste körningen
    python video/gor_rotation.py 2026-10-02-0819   # en viss körning, via dess id

Resultatet hamnar i video/ och får namn efter körningens tid, till exempel
rotation_fyra_utfall_261002_kl08.mp4.

Kräver: Python med Pillow (pip install pillow), Node.js och ffmpeg i PATH.
Typsnitten Georgia och Segoe UI hämtas från Windows egen typsnittsmapp.
Videon är en fil och uppdateras inte av sig själv: kör skriptet igen efter varje ny körning.
"""
import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(HERE)  # mappen regeringsbildning
SECONDS_PER_FRAME = 4
W, H = 1280, 720
PAPER = (243, 239, 230)
INK = (28, 25, 21)
MUTED = (94, 88, 79)
LINE = (217, 208, 194)
COL = {"s1": (231, 243, 234), "s2": (248, 231, 227), "s3": (231, 238, 248), "s4": (248, 241, 223)}
FONTS = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts")


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def load_snapshot(snap_id=None):
    """Läser scenario.js via Node, så att videon alltid bygger på samma data som sidan."""
    js = (
        "global.window={};require('./scenario.js');const s=window.SCENARIO;"
        "const all=[...s.snapshots].sort((a,b)=>new Date(a.asOf)-new Date(b.asOf));"
        f"const id={json.dumps(snap_id)};"
        "const sn=id?all.find(x=>x.id===id):all[all.length-1];"
        "if(!sn){console.error('Hittar ingen körning med id '+id);process.exit(1)}"
        "console.log(JSON.stringify({id:sn.id,asOf:sn.asOf,label:sn.asOfLabel,model:sn.model,"
        "sc:s.scenarios.map(x=>({id:x.id,q:x.quadrantLabel,title:x.title,faces:x.faces,p:sn.scenarios[x.id].probability}))}))"
    )
    raw = subprocess.check_output(["node", "-e", js], cwd=BASE)
    return json.loads(raw.decode("utf-8"))


def wrap(draw, text, fnt, width):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)
    return lines


def portrait(path, size):
    im = Image.open(os.path.join(BASE, path)).convert("RGB")
    w, h = im.size
    if h > w:  # stående bild: ta överdelen, där ansiktet sitter
        box = (0, 0, w, w)
    else:      # liggande bild: ta mitten
        left = (w - h) // 2
        box = (left, 0, left + h, h)
    im = im.crop(box).resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=18, fill=255)
    out = Image.new("RGB", (size, size), PAPER)
    out.paste(im, (0, 0), mask)
    return out


def make_frame(index, sc, snap, outdir, fonts):
    serifb, sans, sansb, big, small, label = fonts
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    d.text((60, 30), "FYRA SÄTT SVERIGE KAN FÅ EN REGERING", font=small, fill=MUTED)
    right = f"Läget {snap['label']} · {snap['model']}"
    d.text((W - 60 - d.textlength(right, font=small), 30), right, font=small, fill=MUTED)

    # Kortet slutar högt (y1=600) och sidtexten ligger direkt under, så att X:s tidsmärke och ljudknapp
    # nere i bilden inte skymmer raden.
    x0, y0, x1, y1 = 60, 72, W - 60, 600
    d.rectangle((x0, y0, x1, y1), fill=COL[sc["id"]], outline=LINE, width=2)
    if sc["id"] == "s4":  # låsning: tom ruta med tjock ram
        d.rectangle((x0, y0, x1, y1), outline=INK, width=6)
    d.text((x0 + 36, y0 + 30), sc["q"].upper(), font=label, fill=MUTED)

    title = "Låsning" if sc["id"] == "s4" else sc["title"]
    y = y0 + 70
    for line in wrap(d, title, serifb, x1 - x0 - 72):
        d.text((x0 + 36, y), line, font=serifb, fill=INK)
        y += 62
    if sc["id"] == "s4":
        for line in wrap(d, "Skarpa prövningar och väg mot extra val. Ingen kandidat tolereras.", sans, x1 - x0 - 72):
            d.text((x0 + 36, y + 6), line, font=sans, fill=MUTED)
            y += 34

    fx = x0 + 36
    for face in sc["faces"]:
        img.paste(portrait(face["src"], 140), (fx, y0 + 205))
        d.text((fx + 70 - d.textlength(face["party"], font=sansb) / 2, y0 + 352), face["party"], font=sansb, fill=INK)
        fx += 170

    d.text((x0 + 36, y1 - 120), f"{sc['p']} %", font=big, fill=INK)

    foot = "Uppskattning gjord med AI, inte exakt matematik. Kontrollera mot källan."
    if any(f.get("note") for f in sc["faces"]):
        foot += " Bilden på Kristersson är en illustration."
    d.text((60, 618), foot, font=small, fill=MUTED)

    for k in range(4):  # fyra punkter: vilken ruta som visas
        cx = W - 60 - (3 - k) * 30
        d.ellipse((cx - 8, 622, cx + 8, 638), fill=INK if k == index else (205, 197, 184))

    path = os.path.join(outdir, f"f{index + 1}.png")
    img.save(path)
    return path


def main():
    snap = load_snapshot(sys.argv[1] if len(sys.argv) > 1 else None)
    when = datetime.fromisoformat(snap["asOf"])
    out = os.path.join(HERE, f"rotation_fyra_utfall_{when:%y%m%d}_kl{when:%H}.mp4")
    fonts = (
        font("georgiab.ttf", 50), font("segoeui.ttf", 24), font("segoeuib.ttf", 24),
        font("segoeui.ttf", 84), font("segoeui.ttf", 20), font("segoeui.ttf", 22),
    )
    with tempfile.TemporaryDirectory() as tmp:
        paths = [make_frame(i, sc, snap, tmp, fonts) for i, sc in enumerate(snap["sc"])]
        args = ["ffmpeg", "-y"]
        for p in paths:
            args += ["-loop", "1", "-framerate", "30", "-t", str(SECONDS_PER_FRAME), "-i", p]
        args += [
            "-filter_complex", "[0:v][1:v][2:v][3:v]concat=n=4:v=1:a=0,format=yuv420p[v]",
            "-map", "[v]", "-c:v", "libx264", "-crf", "20", "-preset", "slow",
            "-movflags", "+faststart", "-r", "30", out,
        ]
        subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"{out} ({os.path.getsize(out) // 1024} kB)")


if __name__ == "__main__":
    main()
