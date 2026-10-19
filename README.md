# Synkopia Labor

Prototypen und Inhalte für Synkopia, eine Lernumgebung, in der Schülerinnen und Schüler Stile der elektronischen Musik entdecken und selbst nachbauen.

## Inhalt

| Pfad | Was es ist |
| --- | --- |
| `labor/dub-techno-labor.html` | Dub Techno Labor: Klang-Labor (Web Audio), Hörpfad, Quiz. Im Browser per Doppelklick öffnen. |
| `labor/techno-labor.html` | Techno-Labor (Labor 1), im Aufbau. Per Doppelklick öffnen; braucht die Ordner `engine/`, `instruments/` und `styles/` daneben. |
| `engine/`, `instruments/`, `styles/` | Gemeinsamer Klangmotor, Instrumente und Stil-Dateien |
| `docs/dossier-dub-techno.md` | Recherche-Dossier Dub Techno mit Quellen |
| `docs/blueprint-stilmodul.md` | Spezifikation: Aufbau eines Stilmoduls |
| `docs/lisc-dub-techno.md` | Lernziele und Erfolgskriterien (LISC) |
| `recherche/techno-dossier.html` | Dossier und Sound-Rezept Detroit Techno & Chicago House |
| `recherche/techno-lisc.html` | Lernstufen, Beispiel-Track und Quiz Techno-Labor |

Die Dokumente sind Exporte der Claude-Docs-Fassungen; die Grafiken darin fehlen im Export.

## Arbeitsweise

1. Erst Fachwissen sammeln (Recherche, Dossier, Klangrezept), dann programmieren.
2. Jede Änderung ist ein eigener, kleiner Schritt mit eigenem Commit.
3. Rückgängig machen: `git log --oneline` zeigt alle Schritte, `git revert <commit>` nimmt einen zurück.

## GitHub

Repository: https://github.com/dnic-zz/synkopia-lab (privat). Gepusht wird von Claude Code oder mit GitHub Desktop ("Push origin"). Siehe `CLAUDE.md` für die Zusammenarbeit zwischen Cowork und Claude Code.
