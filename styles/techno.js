/* Synkopia Stil · Detroit Techno & Chicago House (Labor 1)
   Inhalte nach recherche/techno-lisc.html (freigegeben am 19.10.2026).
   Klassisches Skript statt JSON, damit das Labor per Doppelklick (file://) läuft.
   Muster als Positionen 0–15 im 16er-Raster, Zählweise 1 + 2 + 3 + 4 +. */
(function(S){
  "use strict";
  S.styles = S.styles || {};
  S.styles.techno = {
    id: "techno",
    name: "Detroit Techno & Chicago House",
    tempo: 124,
    lernziel: "Wir verstehen, wie aus billigen, gebrauchten Drumcomputern ein neuer Musikstil wurde. Wir können einen Detroit/Chicago-Groove aus nachgebauten 808- und 909-Klängen hören, selbst bauen und historisch einordnen.",

    /* Spuren erscheinen im Raster ab der Stufe, in der sie dazukommen (Index ab 0) */
    tracks: [
      { id: "kick", name: "Kick", from: 0 },
      { id: "clap", name: "Clap", from: 1 }
    ],

    stages: [
      {
        t: "Der Puls",
        change: "Neue Spur: Kick (909)",
        lernziel: "Wir lernen, wie aus einem fallenden Ton eine Bassdrum wird und was „Four-on-the-floor“ heißt.",
        kriterien: [
          "Ich kann die Kick auf die Schläge 1, 2, 3 und 4 setzen.",
          "Ich kann im Blindtest die 808-Kick von der 909-Kick unterscheiden.",
          "Ich kann beschreiben, wie die Kick entsteht: ein tiefer Ton, der schnell von hoch nach tief fällt."
        ],
        task: "Setze die <b>Kick</b> auf alle vier Schläge: <b>1, 2, 3 und 4</b>. Drück Start. Das nennt man <b>Four-on-the-floor</b>: auf jedem Schlag ein Kick. Schalte dann zwischen <b>808</b> und <b>909</b> hin und her. Die 808 klingt rund und lang, die 909 kurz und mit Druck. Lass am Ende die 909 an.",
        ear: "Hör auf den Anfang jedes Schlags: Bei der 909 hörst du einen kleinen Klick, danach fällt der Ton nach unten.",
        controls: ["kickModel", "kickDecay"],
        check: {
          typ: "blindtest",
          frage: "Die App spielt zufällig die 808 oder die 909. Welche hörst du?",
          varianten: [
            { id: "808", label: "808", erklaerung: "Die 808 klingt rund und lange nach, ohne Klick am Anfang." },
            { id: "909", label: "909", erklaerung: "Die 909 ist kurz, hat Druck und einen kleinen Klick am Anfang." }
          ]
        },
        pruefen: { pat: { kick: [0, 4, 8, 12] } },
        tipp: { pat: { kick: [0, 4, 8, 12] }, ctl: { kickModel: "909", kickDecay: 0.45 }, text: "909 · Kick-Länge 0,45 s" },
        geschichte: "Ende der 1970er spielt der Radio-DJ The Electrifying Mojo in Detroit Kraftwerk, Prince und Funk durcheinander. Für junge Produzenten wie Juan Atkins ist das Radio die erste Schule. 1979 bekommt Atkins einen Korg MS-10, seinen ersten Synthesizer."
      },
      {
        t: "Backbeat aus Rauschen",
        change: "Neue Spur: Clap",
        lernziel: "Wir lernen, was ein Backbeat ist und wie aus Rauschen eine Clap wird.",
        kriterien: [
          "Ich kann die Clap auf Schlag 2 und 4 setzen und erklären, was ein Backbeat ist.",
          "Ich kann erklären, warum die Clap breit klingt: Sie besteht aus mehreren sehr schnellen Rausch-Stößen.",
          "Ich kann Clap und Snare am Klang unterscheiden."
        ],
        task: "Setze die <b>Clap</b> auf <b>Schlag 2 und 4</b>. Das ist der <b>Backbeat</b>, der Gegenschlag zur Kick. Schalte zum Vergleich zwischen <b>Clap</b> und <b>Snare</b> hin und her. Die Clap entsteht nur aus <b>Rauschen</b>, also einem Zischen aus allen Tonhöhen gleichzeitig. Lass am Ende die Clap an.",
        ear: "Die Clap ist kein einzelner Schlag. Hör genau hin: Am Anfang flattert es kurz, dann klingt ein Hauch Raum nach.",
        controls: ["clapModel", "clapTail"],
        check: {
          typ: "erklaeren",
          frage: "Erklär in einem Satz, warum die Clap breiter klingt als ein einzelner Schlag. Benutz mindestens einen Fachbegriff.",
          satzanfang: "Die Clap klingt breiter als ein einzelner Schlag, weil …",
          begriffe: ["Rauschen", "Stoß", "Nachhall"],
          // Wortstämme, damit auch „Stöße“ oder „rauscht“ zählen
          staemme: { "Rauschen": "rausch", "Stoß": "stö|stoß|stoss", "Nachhall": "nachhall|hall" }
        },
        pruefen: { pat: { clap: [4, 12] } },
        tipp: { pat: { clap: [4, 12] }, ctl: { clapModel: "clap", clapTail: 0.06 }, text: "Clap · Nachhall 60 ms" },
        geschichte: "Chicago, 1984: Frankie Knuckles im Warehouse und Ron Hardy in der Music Box mischen Drumcomputer unter Disco-Platten. Im selben Jahr erscheint Jesse Saunders’ „On & On“. Es gilt als erste House-Platte."
      }
    ]
  };
})(window.Synkopia = window.Synkopia || {});
