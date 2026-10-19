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
      { id: "clap", name: "Clap", from: 1 },
      { id: "hat", name: "Hi-Hat", from: 2, states: ["x", "o"] },  // Klick 1: geschlossen, Klick 2: offen, Klick 3: leer
      { id: "chord", name: "Akkord", from: 3 }
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
          typ: "blindtest", probe: "kick",
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
      },
      {
        t: "Metall",
        change: "Neue Spur: Hi-Hats (geschlossen und offen)",
        lernziel: "Wir lernen, wie aus sechs schrägen Tönen ein Becken wird und wie geschlossene und offene Hi-Hats zusammenspielen.",
        kriterien: [
          "Ich kann eine Hi-Hat-Spur mit geschlossenen und offenen Hats bauen.",
          "Ich kann hören, dass die geschlossene Hat die offene abschneidet (Choke).",
          "Ich kann im Blindtest analoge Hats und 6-Bit-Hats unterscheiden."
        ],
        task: "Setze die <b>geschlossene Hi-Hat</b> (x) auf alle 16 Felder. Klick dann jedes <b>+</b> ein zweites Mal: Dort wird daraus eine <b>offene Hi-Hat</b> (o). Ein dritter Klick löscht das Feld. Schalte danach zwischen <b>analog</b> und <b>6 Bit</b> hin und her. Bei 6 Bit wird der Klang in nur 64 Stufen gespeichert, so wie die Becken der 909.",
        ear: "Die offene Hat zischt auf dem + auf und wird von der nächsten geschlossenen sofort abgeschnitten. Das nennt man Choke. Mit 6 Bit klingt alles etwas rauer.",
        controls: ["hatDecay", "hatFilter", "hatBits"],
        check: {
          typ: "blindtest", probe: "hats",
          frage: "Die App spielt zufällig analoge Hats oder 6-Bit-Hats. Was hörst du?",
          varianten: [
            { id: "0", label: "analog", erklaerung: "Analog klingt das Zischen glatt und fein." },
            { id: "6", label: "6 Bit", erklaerung: "Mit 6 Bit klingt es körniger und rauer, vor allem beim Ausklingen." }
          ]
        },
        pruefen: { pat: { hat: { x: [0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15], o: [2, 6, 10, 14] } } },
        tipp: { pat: { hat: { x: [0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15], o: [2, 6, 10, 14] } }, ctl: { hatBits: "6" }, text: "Geschlossen (x) überall, offen (o) auf jedem + · 6 Bit an (909-Art)" },
        geschichte: "1983 erscheint die Roland TR-909. Käufer wollen damals lieber echt klingende Sample-Drums, und nach etwa einem Jahr und rund 10.000 Stück stellt Roland die Produktion ein. Gebraucht und billig wird die 909 zum Instrument von Detroit und Chicago. Ihre Becken sind 6-Bit-Samples."
      },
      {
        t: "Detroit-Akkorde",
        change: "Neue Spur: Akkord-Stabs",
        lernziel: "Wir lernen, wie Moll-Akkorde Wärme in Maschinenmusik bringen und was eine Synkope ist.",
        kriterien: [
          "Ich kann den Akkord als Moll-Septakkord (c-Moll 7) benennen.",
          "Ich kann vorhersagen und überprüfen, wie sich die Stimmung mit Dur statt Moll ändert.",
          "Ich kann zeigen, welche Akkordschläge zwischen den Zählzeiten liegen (Synkope)."
        ],
        task: "Setze den <b>Akkord</b> viermal: auf den <b>Punkt nach dem + der 1</b>, auf das <b>+ nach der 2</b>, auf den <b>Punkt nach dem + der 3</b> und auf das <b>+ nach der 4</b>. Mach ihn kurz: <b>Akkord-Länge</b> etwa 0,25 s, <b>Filter</b> etwa 1,8 kHz. So ein kurzer Akkord heißt <b>Stab</b> (englisch für „Stich“). Der Akkord ist <b>c-Moll 7</b>: C, Es, G und B. Liegt ein Schlag zwischen den Zählzeiten, nennt man das <b>Synkope</b>.",
        ear: "Kein Akkord trifft einen Schlag. Er springt immer dazwischen, und genau das zieht dich nach vorn.",
        controls: ["chordDecay", "chordCutoff", "chordMode"],
        check: {
          typ: "vorhersage", regler: "chordMode",
          frage: "Schreib zuerst auf: Wie verändert sich die Stimmung, wenn du von Moll auf Dur schaltest? Danach wird der Schalter frei.",
          danach: "Jetzt teste es: Schalte auf Dur und hör hin. Stimmt deine Vorhersage? Schalte danach zurück auf Moll."
        },
        pruefen: {
          pat: { chord: [3, 6, 11, 14] },
          ctl: { chordDecay: { ziel: 0.25, tol: 0.08 }, chordCutoff: { ziel: 1800, tol: 400 }, chordMode: { ziel: "moll", name: "Moll" } }
        },
        tipp: { pat: { chord: [3, 6, 11, 14] }, ctl: { chordDecay: 0.25, chordCutoff: 1800, chordMode: "moll" }, text: "Akkord-Länge 0,25 s · Filter 1,8 kHz · Moll" },
        geschichte: "1985 nimmt Juan Atkins als Model 500 „No UFOs“ zu Hause auf, mit Akkord-Stabs aus einem Pro-One. 1987 erscheint „Strings of Life“ von Rhythim Is Rhythim (Derrick May), ganz ohne Bassline. 1988 gibt die Compilation „Techno! The New Dance Sound of Detroit“ dem Stil seinen Namen."
      },
      {
        t: "Groove",
        change: "Stilwerkzeug: Swing",
        lernziel: "Wir lernen, wie wenige Prozent Swing einen geraden Rhythmus lockern.",
        kriterien: [
          "Ich kann einen Groove mit Swing von einem geraden unterscheiden.",
          "Ich kann erklären, welche Sechzehntel der Swing verschiebt: immer die zweite in jedem Paar.",
          "Ich kann einen vorgespielten Groove nach Gehör mit dem Swing-Regler nachbauen."
        ],
        task: "Drück Start und dreh den <b>Swing</b> langsam von 50 % nach oben, bis die Hi-Hats zu federn beginnen, etwa auf <b>58 %</b>. Dreh dann zum Vergleich auf 50 % zurück und wieder hoch. <b>Swing</b> heißt: In jedem Paar von Sechzehnteln kommt die zweite etwas später. Bei 50 % ist alles gerade, bei 66 % ist es eine Triole.",
        ear: "Kick und Clap bleiben, wo sie sind. Nur die Hats und Akkorde zwischen den Achteln rutschen ein kleines Stück nach hinten.",
        controls: ["swing"],
        check: {
          typ: "nachbauen", regler: "swing",
          frage: "Die App spielt deinen Track zwei Takte lang mit einem verdeckten Swing-Wert. Stell den Regler so ein, dass dein Groove gleich klingt, und vergleiche.",
          ziele: [0.54, 0.58, 0.62, 0.66], toleranz: 0.03
        },
        pruefen: { ctl: { swing: { min: 0.55, max: 0.62 } } },
        tipp: { ctl: { swing: 0.58 }, text: "Swing 58 %" },
        geschichte: "In Chicago verlangte das Label Mitchbal für alle Singles 122 BPM. Die TR-909 hat einen Shuffle-Regler, mit dem sich jede zweite Sechzehntel verschieben lässt. Damit klingen die Maschinen weniger steif."
      }
    ]
  };
})(window.Synkopia = window.Synkopia || {});
