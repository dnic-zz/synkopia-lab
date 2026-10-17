# Synkopia Labor

Prototypen und Inhalte für Synkopia, eine Lernumgebung, in der Schülerinnen und Schüler Stile der elektronischen Musik entdecken und selbst nachbauen.

## Inhalt

| Pfad | Was es ist |
| --- | --- |
| `labor/dub-techno-labor.html` | Dub Techno Labor: Klang-Labor (Web Audio), Hörpfad, Quiz. Im Browser per Doppelklick öffnen. |
| `docs/dossier-dub-techno.md` | Recherche-Dossier Dub Techno mit Quellen |
| `docs/blueprint-stilmodul.md` | Spezifikation: Aufbau eines Stilmoduls |
| `docs/lisc-dub-techno.md` | Lernziele und Erfolgskriterien (LISC) |

Die Dokumente sind Exporte der Claude-Docs-Fassungen; die Grafiken darin fehlen im Export.

## Arbeitsweise

1. Erst Fachwissen sammeln (Recherche, Dossier, Klangrezept), dann programmieren.
2. Jede Änderung ist ein eigener, kleiner Schritt mit eigenem Commit.
3. Rückgängig machen: `git log --oneline` zeigt alle Schritte, `git revert <commit>` nimmt einen zurück.

## Auf GitHub sichern

Einmalig auf dem Mac im Terminal (oder Claude Code bitten):

```
cd ~/Documents/synkopia-labor
gh repo create synkopia-labor --private --source=. --push
```

Danach genügt nach jedem Schritt `git push`.
