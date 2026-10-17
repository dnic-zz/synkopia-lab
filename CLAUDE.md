# Synkopia Labor – Hinweise für Claude

Dieses Repository wird von zwei Claude-Sitzungen gemeinsam genutzt:

- **Claude im Cowork-Chat (Projekt „Musik Recherche“)**: Recherche, Dossiers, Didaktik (LISC) und Prototypen wie das Dub Techno Labor. Schreibt Dateien und Commits direkt in diesen Ordner, kann aber **nicht** zu GitHub pushen.
- **Claude Code auf dem Mac**: übernimmt die eigentliche App-Entwicklung und **pusht** nach `github.com/dnic-zz/synkopia-lab`.

## Regeln für die Zusammenarbeit

1. **Erst Fachwissen, dann Code.** Vor dem Programmieren eines neuen Stils das Dossier und das Klangrezept lesen bzw. anlegen (`docs/`).
2. **Immer nur eine Sitzung arbeitet gleichzeitig.** Vor Arbeitsbeginn `git status` und `git log -3` prüfen; nie mit uncommitteten Änderungen der anderen Sitzung weiterarbeiten.
3. **Jeder Schritt = ein Commit + Tag** `stand-N` (fortlaufend). Commit-Nachrichten auf Deutsch, kurz, mit Stichpunkten.
4. **Rückgängig machen mit `git revert`**, nie mit `reset --hard` – die Historie bleibt vollständig.
5. **Push** (Claude Code): `git push && git push --tags`.
6. Übergaben zwischen den Sitzungen stehen in `docs/uebergabe.md` (neueste oben).

## Wichtige Dateien

| Pfad | Inhalt |
| --- | --- |
| `labor/dub-techno-labor.html` | Prototyp Dub Techno Labor (eine Datei, Web Audio, ohne Build) |
| `docs/blueprint-stilmodul.md` | Spezifikation: Aufbau eines Stilmoduls |
| `docs/lisc-dub-techno.md` | Lernziele und Erfolgskriterien |
| `docs/dossier-dub-techno.md` | Recherche-Dossier mit Quellen |

Zielgruppe der App: Schülerinnen und Schüler in einem Kurs zu elektronischer Musik. Texte für Schüler in der Du-Form.
