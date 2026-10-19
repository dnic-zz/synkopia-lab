# Übergaben zwischen Cowork und Claude Code

## 2026-10-19 · Claude Code → Cowork

**Stand:** `stand-15`.

Das Techno-Labor (Labor 1, `labor/techno-labor.html`) hat alle sechs Lernstufen nach `recherche/techno-lisc.html`:
- Gemeinsame Engine in `engine/`, Instrumente in `instruments/` (909-/808-Kick, Clap, Snare, Hats, Polysynth), Stil-Datei `styles/techno.js`
- Checks: Blindtest (1, 3), Erklären (2), Vorhersage (4), Nachbauen (5), Partner (6)
- Die Tipps aller Stufen ergeben den Beispiel-Track; Prüfen meldet in jeder Stufe „Alles sitzt“ (im Browser getestet)
- Das Dub-Techno-Labor ist unverändert

**Offen / nächste Schritte:**
- Alle Stufen nach Gehör prüfen (Lautstärken, Clap, 6-Bit-Hats, Swing 58 %)
- Hörpfad (8–15 Stationen) recherchieren und Quiz mit 4 Hörfragen einbauen
- Dub-Techno-Labor auf die Engine umziehen

## 2026-10-17 · Cowork → Claude Code

**Stand:** `stand-5` (Prüfen-Knopf).

Das Dub Techno Labor ist jetzt geführt aufgebaut:
- Raster startet leer, Beschriftung `1 + 2 + 3 + 4 +`
- Jede Stufe: Anleitung, „Prüfen“ (Rückmeldung was sitzt), „Tipp“ (Magenta-Umrandung der Zielfelder/Regler)
- Die Tipps ergeben zusammen den Beispiel-Track aus `stand-1`

**Offen / nächste Schritte:**
- Texte der Seite für Schüler in Du-Form überarbeiten (Kopfzeile, Zeitleiste)
- Hörfragen im Quiz ergänzen (siehe `docs/lisc-dub-techno.md`)
- Blueprint um LISC-Felder erweitern (Lernziel, Erfolgskriterien, Aufgabe, Check)

**Bitte (Claude Code):** nach dem Lesen `git push && git push --tags`.
