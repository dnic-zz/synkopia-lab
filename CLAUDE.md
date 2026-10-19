# Synkopia Lab – Hinweise für Claude

Synkopia ist eine Lernumgebung für Schülerinnen und Schüler in einem Kurs zu elektronischer Musik. Sie entdecken Stile der elektronischen Musik, indem sie sie Schritt für Schritt selbst nachbauen. Repository: `github.com/dnic-zz/synkopia-lab`.

Hauptarbeitsort ist Claude Code. Der Cowork-Chat (Projekt „Musik Recherche“) wird nur noch gelegentlich für schnelle Prototypen genutzt.

## Grundregel: Erst Fachwissen, dann Code

Nie direkt losprogrammieren. Ein allgemeiner Auftrag wie „baue ein Dub-Techno-Labor“ führt zu allgemeinem Klang. Präzise Recherche und ein konkretes Klangrezept führen zu einem Ergebnis, das nach dem Stil klingt. Den Nutzer daran erinnern, wenn er diesen Ablauf abkürzen will.

## Arbeitsablauf: neuer Stil

Auslöser: „Neuer Stil: <Name>“. Die Schritte nacheinander abarbeiten. Nach Schritt 4 anhalten und auf Freigabe warten.

1. **Recherche**
   - Geschichte und Wurzeln (Vorläufer-Stile, Orte, Jahre), Szene, Labels
   - Geräte und Studiotechnik, die den Klang prägen
   - Künstler und Schlüsseltracks für einen Hörpfad (8–15 Stationen, chronologisch)
   - Jede Jahreszahl, jeden Namen und jeden Titel gegen mindestens eine Quelle prüfen. KI-Zusammenfassungen von Videos sind keine Quelle.
   - Ergebnis: `recherche/<stil>.html` mit Quellenliste und Prüfhinweisen

2. **Klangrezept**
   - Tempo, Taktart, Tonart
   - Muster je Spur im 16er-Raster (Positionen 0–15, Zählweise `1 + 2 + 3 + 4 +`)
   - Klangfarben und Effekte mit konkreten Werten (z. B. Delay punktierte Achtel, Feedback 62 %)
   - Das stiltypische Werkzeug (z. B. Dub-Throw, Accent/Slide, Swing)
   - Was dem Klangmotor eventuell noch fehlt

3. **Didaktik (LISC)**
   - Übergeordnetes Lernziel des Stils
   - 6 Lernstufen; jede fügt genau **eine** hörbare Veränderung hinzu
   - Je Stufe: Lernziel („Wir lernen …“), 2–3 Erfolgskriterien („Ich kann …“), Anleitung in Du-Form, Prüfen-Ziele, Tipp-Ziele, „Worauf achten“
   - Die Tipp-Ziele aller Stufen ergeben zusammen einen fertigen Beispiel-Track
   - Quiz mit 10–12 Fragen, davon mindestens 3 Hörfragen

4. **Rückfrage an den Nutzer**
   - Kurze Zusammenfassung von Rezept und Lernstufen
   - Offene Entscheidungen nennen
   - **Erst nach Freigabe weiter**

5. **Umsetzung**
   - Stil-Datei nach `docs/blueprint-stilmodul.md`; der Klangmotor bleibt gemeinsam für alle Stile
   - Fehlt dem Motor ein Baustein, ihn einmal allgemein einbauen, damit alle Stile ihn nutzen können

6. **Prüfen**
   - Jede Lernstufe einzeln anhören: Ist die Veränderung hörbar? Klingt Stufe 6 nach dem Stil?
   - Tipps ergeben den Beispiel-Track; Prüfen meldet bei korrekter Eingabe „Alles sitzt“
   - Quiz einmal durchspielen

## Prinzipien der Lernumgebung (aus dem Dub Techno Labor)

- Das Raster startet leer, die Schüler bauen den Track selbst. Keine Stufe überschreibt etwas.
- Gestufte Hilfe: erst die Anleitung, dann „Prüfen“ (sagt, was schon sitzt, ohne die Lösung zu verraten), dann „Tipp“ (umrandet Zielfelder und Regler in der Tipp-Farbe).
- Bei Stufen mit freier Gestaltung prüft die App Kriterien statt einer einzigen richtigen Lösung.
- Klänge werden mit Web Audio im Browser synthetisiert, ohne Samples.
- Texte für Schüler stehen in der Du-Form, Fachbegriffe werden beim ersten Auftreten erklärt.

## Versionen

- Jeder Schritt = ein Commit + Tag `stand-N` (fortlaufend). Commit-Nachrichten auf Deutsch, kurz, mit Stichpunkten.
- Rückgängig machen mit `git revert`, nie mit `reset --hard`; die Historie bleibt vollständig.
- Vor Arbeitsbeginn `git status` prüfen, falls zwischendurch im Cowork-Chat gearbeitet wurde.
- Nach jedem Schritt: `git push && git push --tags`.

## Dokumentation

Dokumentation nur als HTML-Seiten im Projekt (z. B. `recherche/`, später `doku/`), keine Word- oder Google-Dokumente.

## Wichtige Dateien

| Pfad | Inhalt |
| --- | --- |
| `labor/dub-techno-labor.html` | Prototyp Dub Techno Labor (Vorlage für alle Stile) |
| `labor/techno-labor.html` | Labor 1 Detroit Techno & Chicago House, nutzt die gemeinsame Engine |
| `engine/` | Gemeinsame Engine: clock (Lookahead-Scheduler), mixer, sequencer, noise |
| `instruments/` | Instrumente mit `create(ctx, out).trigger(time, accent, params)` und `params` (Bereich, Standard) |
| `styles/` | Stil-Dateien als klassisches Skript (`Synkopia.styles.<id>`), damit Doppelklick (file://) funktioniert |
| `docs/blueprint-stilmodul.md` | Spezifikation: Aufbau eines Stilmoduls |
| `docs/lisc-dub-techno.md` | Lernziele und Erfolgskriterien Dub Techno |
| `docs/dossier-dub-techno.md` | Recherche-Dossier Dub Techno mit Quellen |
| `recherche/techno-dossier.html` | Dossier und Sound-Rezept Detroit Techno & Chicago House (Labor 1) |
| `recherche/techno-lisc.html` | Lernstufen, Beispiel-Track und Quiz Techno-Labor (freigegeben) |
