# Synkopia – Blueprint Stilmodul

Oct 17, 2026 · @Dominic

Jeder Musikstil in Synkopia ist ein Stilmodul: eine Datendatei, die ein gemeinsamer Klangmotor abspielt. Vorlage ist das Dub Techno Labor.

## Ziel und Grundprinzip

Nutzer entdecken einen Stil, indem sie ihn Schicht für Schicht selbst bauen und dabei hören, was jede Schicht verändert. Danach hören sie die Originale und prüfen ihr Wissen.

Drei Grundregeln:

1. **Ein Motor, viele Stile.** Der Klangmotor wird einmal gebaut. Ein neuer Stil ist nur eine neue Datendatei, ohne neuen Code. Ausnahme ist höchstens ein stiltypisches Werkzeug, etwa der Dub-Throw.
2. **Erst hören, dann benennen.** Jede Lernstufe fügt genau eine hörbare Veränderung hinzu, und der Text erklärt, worauf man achten soll.
3. **Sofort Klang.** Kein Stil startet leer. Nach einem Klick auf Start läuft Stufe 1.

## Aufbau eines Stilmoduls

Ein Stilmodul besteht aus einer Datei mit vier Teilen. Nur der Klangmotor ist Code, alles andere sind Inhalte.

&#91;embedded content: Aufbau eines Stilmoduls · 4 Bausteine\]

Die Lernstufen sind die Brücke zwischen Inhalt und Klang: Jede Stufe ist ein Satz von Reglerwerten, den der Motor übernimmt.

## Klangmotor

Der Motor erzeugt alle Klänge selbst (Synthese im Browser mit Web Audio), ganz ohne Samples. So bleibt jeder Klang regelbar, und die App bleibt klein. Er besteht aus Instrumenten, Effekten und einem Sequencer.

**Instrumente** (jedes Instrument ist eine Spur im 16-Step-Raster)

| Instrument | Erzeugung | Regler, die eine Stil-Datei setzen kann |
| --- | --- | --- |
| Kick | Sinus mit fallender Tonhöhe | Anfangs- und Endton, Länge, Lautstärke |
| Snare / Clap | Rauschen + kurzer Ton, gefiltert | Ton, Rauschanteil, Länge |
| Hi-Hat | Rauschen durch Hochpass | offen/geschlossen, Helligkeit |
| Bass | Sinus, Sägezahn oder Rechteck | Wellenform, Filter, Glide (für Acid), Länge |
| Akkord / Fläche | mehrere leicht verstimmte Sägezähne | Akkordnoten, Anschlag, Länge, Filter, Resonanz |
| Lead / Arpeggio | ein Oszillator mit Hüllkurve | Tonfolge, Wellenform, Filter |
| Textur | Rauschen, Knistern | Art, Lautstärke |

**Effekte und Signalweg**

- Kick, Bass und Snare laufen trocken zum Ausgang.
- Akkord, Lead und Textur haben je einen Effektweg (Send) zu **Delay** und **Hall**.
- Das Delay hat einen Filter im Feedback-Weg, sodass jede Wiederholung dunkler wird. Leichtes Zeitschwanken simuliert ein altes Tonband.
- Der Hall entsteht aus einem berechneten Rausch-Nachhall, dessen Länge regelbar ist.
- Am Ende sorgt ein Kompressor dafür, dass nichts übersteuert.

**Sequencer:** 16 Sechzehntel pro Takt, Tempo 60–180 BPM, optional Swing. Er plant die Töne etwas im Voraus, damit das Timing auch bei voller Last stabil bleibt.

**Stilwerkzeug:** Ein Knopf oder Regler, der den typischen Handgriff eines Stils hörbar macht, zum Beispiel Dub-Throw (Dub Techno), Accent und Slide (Acid), Swing (House) oder Break-Slicer (Drum & Bass). Jeder Stil hat höchstens eines.

## Datenformat

Jeder Stil ist eine JSON-Datei, zum Beispiel `styles/dub-techno.json`. Das Beispiel ist gekürzt: Lernstufen, Stationen und Fragen stehen jeweils nur einmal da.

```json
{
  "id": "dub-techno",
  "name": "Dub Techno",
  "herkunft": { "ort": "Berlin", "zeit": "ab 1993" },
  "verwandt": ["dub", "detroit-techno", "minimal-techno"],
  "tempo": { "standard": 120, "min": 112, "max": 130 },
  "tonart": "C-Moll",
  "spuren": {
    "kick":  { "muster": [0, 4, 8, 12], "ton": [130, 42], "laenge": 0.42 },
    "hat":   { "muster": [2, 6, 10, 14], "offen": true },
    "bass":  { "muster": [2, 10], "noten": ["C2"], "welle": "sinus" },
    "akkord": {
      "muster": [6, 13], "noten": ["C3", "Es3", "G3", "B3"],
      "laenge": 0.16, "filter": 0.55, "resonanz": 4,
      "send": { "delay": 0.6, "hall": 0.5 }
    }
  },
  "effekte": {
    "delay": { "zeit": "punktierte-achtel", "feedback": 0.62, "band": 0.15 },
    "hall": { "laenge": 5 }
  },
  "werkzeug": { "typ": "dub-throw", "label": "Dub-Throw halten" },
  "lernstufen": [
    {
      "titel": "Echo",
      "text": "Der Akkord geht ins Bandecho …",
      "hoeren": "Zählen Sie die Wiederholungen …",
      "spuren": ["kick", "hat", "bass", "akkord"],
      "regler": { "akkord.send.delay": 0.6, "delay.feedback": 0.62 }
    }
  ],
  "hoerpfad": [
    {
      "epoche": "1989–2003 · Berlin",
      "stationen": [
        {
          "jahr": "1993–94", "wer": "Basic Channel",
          "track": "Quadrant Dub", "hoeren": "Ein Akkord …",
          "suche": "Basic Channel Quadrant Dub",
          "quelle": "https://en.wikipedia.org/wiki/Basic_Channel"
        }
      ]
    }
  ],
  "quiz": [
    {
      "frage": "Was passiert bei mehr Feedback?",
      "antworten": ["Mehr Wiederholungen", "…"], "richtig": 0,
      "erklaerung": "…"
    }
  ]
}
```

Die Regler der Lernstufen werden als Pfad angegeben (zum Beispiel `delay.feedback`). So kann jede Stufe jeden Wert setzen, ohne dass der Motor den Stil kennt. Alle Werte zwischen 0 und 1 sind Anteile, Zeiten in Sekunden, Muster als Positionen 0–15 im Raster.

## Regeln für Inhalte

**Lernstufen**

- 5 bis 7 Stufen, Standard sind 6. Stufe 1 ist immer der nackte Beat.
- Jede Stufe fügt genau **eine** hörbare Veränderung hinzu: eine Spur, einen Effekt oder eine Bewegung.
- Die vorletzte Stufe bringt das stiltypische Merkmal (beim Dub Techno das Echo, bei Acid die 303-Filterbewegung).
- Die letzte Stufe fügt Bewegung hinzu (Automation, Werkzeug) und gibt die Regler frei.
- Jede Stufe hat drei Texte: **Was passiert** (höchstens 2 Sätze), **Worauf achten** (1 Satz, konkret hörbar) und einen Hinweis für den nächsten Schritt.

**Hörpfad**

- 2 bis 4 Epochen, insgesamt 8 bis 15 Stationen, chronologisch.
- Mindestens eine Station zeigt die Wurzeln, also den Vorläufer-Stil.
- Jede Station hat einen Track, eine Höraufgabe und eine geprüfte Quelle. Statt Audio enthält sie einen Suchlink, denn Rechte für Musik hat die App nicht.

**Quiz**

- 10 bis 12 Fragen, gemischt aus Geschichte, Klang und Technik.
- Jede Frage hat genau eine richtige Antwort und drei plausible falsche.
- Die Erklärung verweist auf eine Lernstufe oder eine Station.
- Fragen nur zu Fakten, die im Dossier belegt sind.

**Faktenprüfung:** Alle Jahreszahlen, Namen und Titel werden vor der Aufnahme gegen mindestens eine Quelle geprüft. KI-Zusammenfassungen von Videos gelten nicht als Quelle; beim Dub Techno enthielten sie einen falschen Künstlernamen.

## Arbeitsablauf: neuen Stil anlegen

Recherche und Inhalte entstehen hier in Cowork, programmiert wird in Claude Code. Das Dossier ist die Übergabe zwischen beiden.

1. **Recherche (Cowork):** Dossier zum Stil anlegen, mit Geschichte, Klangmerkmalen, Geräten, Künstlern und Quellen. Video-Zusammenfassungen dienen als Ideen, nicht als Belege.
2. **Baurezept (Cowork):** Tempo, Muster, Klangfarben und die 6 Lernstufen mit konkreten Reglerwerten festlegen.
3. **Prototyp (Cowork, optional):** Bei neuen Klangideen zuerst ein kleines Labor wie beim Dub Techno bauen und anhören.
4. **Stil-Datei (Claude Code):** Dossier und Rezept an Claude Code geben und daraus `styles/<stil>.json` schreiben lassen.
5. **Werkzeug (Claude Code, nur falls nötig):** Fehlt dem Motor ein Baustein (z. B. Glide für Acid), wird er einmal in den Motor eingebaut und steht danach allen Stilen zur Verfügung.
6. **Anhören und prüfen:** Jede Stufe einzeln anhören. Ist die Veränderung hörbar? Klingt Stufe 6 nach dem Stil? Quiz einmal durchspielen.

**Tipp für Claude Code:** Diese Spezifikation als `docs/blueprint.md` ins Projekt legen und in der Datei `CLAUDE.md` darauf verweisen. Dann hält sich Claude Code bei jedem neuen Stil automatisch an das Schema.

## Offene Entscheidungen

- [ ] **Plattform:** Web-App im Browser (wie das Labor) oder native App für iPad und Handy? Web Audio funktioniert in beiden Fällen, eine Web-App ist aber am schnellsten an Schüler verteilt.
- [ ] **Zielgruppe:** Schülerinnen und Schüler (welche Klassenstufe?), Musikinteressierte oder beide? Davon hängen Sprache und Tiefe der Texte ab.
- [ ] **Fortschritt speichern:** nur lokal im Browser oder mit Konten, zum Beispiel für eine Klasse?
- [ ] **Eigene Kreationen:** Dürfen Nutzer ihre Muster speichern und teilen?
- [ ] **Stammbaum-Ansicht:** Sollen die Stile als Netz verbunden sein (Feld `verwandt` in der Stil-Datei)?
- [ ] **Reihenfolge der ersten Stile:** Vorschlag Dub Techno → Acid House → Detroit Techno → Drum & Bass, weil jeder davon ein neues Motor-Element erfordert (Glide, Streicher, Breakbeat).
- [ ] **Bestehender Code:** Welche Teile des schon begonnenen Synkopia-Projekts in Claude Code bleiben, welche werden durch dieses Schema ersetzt?
