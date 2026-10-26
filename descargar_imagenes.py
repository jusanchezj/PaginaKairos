#!/usr/bin/env python3
"""Descarga las fotos de referencia a images/products. Requiere Python 3 e internet."""
from pathlib import Path
from urllib.request import Request, urlopen
import json
ROOT = Path(__file__).resolve().parent
MANIFEST = [{'file': 'vino-reserva.jpg', 'url': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85'}, {'file': 'vino-blanco.jpg', 'url': 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=900&q=85'}, {'file': 'whisky-blended.jpg', 'url': 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=900&q=85'}, {'file': 'tequila-reposado.jpg', 'url': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85'}, {'file': 'espumante-brut.jpg', 'url': 'https://images.unsplash.com/photo-1570843630426-1e7a6b4c0ee1?auto=format&fit=crop&w=900&q=85'}, {'file': 'cerveza-artesanal.jpg', 'url': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=85'}, {'file': 'brindis-sin-alcohol.jpg', 'url': 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85'}, {'file': 'cafe-gourmet.jpg', 'url': 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85'}, {'file': 'tarjeta-regalo.jpg', 'url': 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85'}, {'file': 'vino-gran-reserva.jpg', 'url': 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=85'}]
OUT = ROOT / "images" / "products"
OUT.mkdir(parents=True, exist_ok=True)
downloaded = []
for item in MANIFEST:
    target = OUT / item["file"]
    req = Request(item["url"], headers={"User-Agent": "Mozilla/5.0 KAIROS catalog image downloader"})
    try:
        with urlopen(req, timeout=30) as response:
            data = response.read()
        if not data.startswith(b"\xff\xd8") and b"image/" not in response.headers.get("Content-Type", ""):
            raise ValueError("La respuesta no parece ser una imagen")
        target.write_bytes(data)
        downloaded.append(item["file"])
        print(f"OK: {target.relative_to(ROOT)}")
    except Exception as exc:
        print(f"ERROR descargando {item['file']}: {exc}")
if downloaded:
    catalog_file = ROOT / "js" / "catalog.js"
    source = catalog_file.read_text(encoding="utf-8")
    for filename in downloaded:
        source = source.replace("images/products/" + filename.rsplit(".", 1)[0] + ".svg", "images/products/" + filename)
    catalog_file.write_text(source, encoding="utf-8")
    print("Se actualizó js/catalog.js para usar los JPG descargados.")
print("\nLas fotos descargadas son imágenes de referencia de Unsplash. Revisa sus licencias y reemplázalas por fotos propias de los productos reales antes de vender.")
