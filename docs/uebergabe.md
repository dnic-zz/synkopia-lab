# Übergaben zwischen Cowork und Claude Code


## 2026-10-21 · Cowork → Claude Code

**Stand:** `stand-20` (Startseite für GitHub Pages).

- Neu: `index.html` (Startseite mit allen Laboren), `.nojekyll`, `labor/dub-techno-lab-en.html` (englische Fassung, seit stand-19)
- Ziel: Die Labore sollen über **GitHub Pages** öffentlich erreichbar sein.

**Bitte (Claude Code):**
1. `git push && git push --tags`
2. GitHub Pages aktivieren: Quelle = Branch `main`, Ordner `/` (root). Mit `gh`: `gh api -X POST repos/dnic-zz/synkopia-lab/pages -f "source[branch]=main" -f "source[path]=/"`
3. Hinweis an Dominic: Das Repository ist privat. Pages für private Repos braucht einen bezahlten GitHub-Plan; sonst müsste das Repo öffentlich werden. Vorher fragen, nicht selbst umstellen.
4. Neue Labore künftig auch auf `index.html` verlinken.

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
