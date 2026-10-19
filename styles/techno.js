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
      },
      {
        t: "Arrangement",
        change: "Bewegung: Weglassen und Wiederkommen",
        lernziel: "Wir lernen, wie Spannung entsteht, wenn etwas wegfällt und wiederkommt.",
        kriterien: [
          "Ich kann mit Stummschalten (Mute) einen Breakdown bauen.",
          "Ich kann 16 Takte live gestalten, mit Breakdown und Rückkehr der Kick.",
          "Ich kann erklären, warum der Moment wirkt, in dem die Kick zurückkommt."
        ],
        task: "Drück Start und spiel deinen Track 16 Takte lang, die Taktanzeige zählt mit. Schalte die <b>Kick</b> nach 8 Takten mit <b>M</b> (Mute) <b>stumm</b>, warte 4 Takte und hol sie zurück. So ein Teil ohne Kick heißt <b>Breakdown</b>. Mit <b>S</b> (Solo) hörst du eine Spur allein. Wenn alles sitzt, sind alle Regler frei, dazu die Extras der 909: Tempo, Last Step, Accent und Flam.",
        ear: "Im Breakdown merkst du erst, wie sehr dir die Kick fehlt. Wenn sie zurückkommt, wirkt sie doppelt so stark.",
        controls: ["mixer"],
        frei: ["kickModel", "kickDecay", "clapModel", "clapTail", "hatDecay", "hatFilter", "hatBits",
               "chordDecay", "chordCutoff", "chordMode", "swing", "tempo", "lastStep", "flamTime"],
        check: {
          typ: "partner",
          frage: "Spiel deinem Partner die 16 Takte vor. Dein Partner hört zu und sagt dir danach, wann der Breakdown begann und wann die Kick zurückkam. Tauscht dann die Rollen."
        },
        pruefen: { krit: ["breakdown"] },
        tipp: { ctl: { mixer: true }, text: "Takt 1–8 alles an · Takt 9–12 Kick stumm (M) · Takt 13–16 Kick zurück" },
        geschichte: "Am 1. Juli 1989 tanzen bei der ersten Loveparade in West-Berlin etwa 150 Menschen, vier Monate vor dem Mauerfall. 1991 öffnet der Tresor und wird zur Brücke zwischen Berlin und Detroit, 2004 das Berghain. 2018 tanzen in Tiflis Tausende vor dem Parlament, aus Protest gegen Polizeirazzien im Club Bassiani."
      }
    ],

    /* Hörpfad: chronologisch, jede Station mit geprüfter Quelle (siehe recherche/techno-dossier.html#hoerpfad).
       q ist der Suchbegriff für den Suchlink; Audio liefert die App nicht. */
    hoerpfad: [
      {
        label: "1981–1983 · Düsseldorf und Detroit",
        titel: "Die Wurzeln: Electro",
        text: "In Detroit spielt der Radio-DJ The Electrifying Mojo Kraftwerk neben Funk. Junge Produzenten wie Juan Atkins machen daraus <b>Electro</b>: Funk aus Drumcomputer und Synthesizer.",
        stationen: [
          { id: "numbers", jahr: "1981", wer: "Kraftwerk", wo: "Düsseldorf, Album „Computerwelt“",
            track: "Numbers", ear: "Eine Computerstimme zählt in vielen Sprachen, darunter ein trockener Maschinen-Beat. So klang 1981 die Zukunft, und so klang es in Detroit im Radio.",
            q: "Kraftwerk Numbers 1981", quelle: ["Wikipedia: Computer World", "https://en.wikipedia.org/wiki/Computer_World"] },
          { id: "alleys", jahr: "1981", wer: "Cybotron", wo: "Juan Atkins und Richard Davis, Detroit, Label Deep Space",
            track: "Alleys of Your Mind", ear: "Drumcomputer, Synthesizer und eine verfremdete Stimme. Das ist noch kein Techno, aber alle Zutaten sind schon da.",
            q: "Cybotron Alleys of Your Mind", quelle: ["Wikipedia: Cybotron (American band)", "https://en.wikipedia.org/wiki/Cybotron_(American_band)"] },
          { id: "clear", jahr: "1983", wer: "Cybotron", wo: "Detroit, Label Fantasy",
            track: "Clear", ear: "Die Bassline läuft aus einem <b>Sequencer</b>, einem Gerät, das Töne automatisch nacheinander abspielt. Hör, wie sie sich immer gleich wiederholt. Erkennst du Kraftwerk wieder?",
            q: "Cybotron Clear 1983", quelle: ["Wikipedia: Cybotron (American band)", "https://en.wikipedia.org/wiki/Cybotron_(American_band)"] }
        ]
      },
      {
        label: "1984–1988 · Chicago und Detroit",
        titel: "Die Geburt: House und Techno",
        text: "In Chicago mischen DJs Drumcomputer unter Disco, daraus wird <b>House</b>. In Detroit entsteht mit gebrauchten Drumcomputern und Synthesizern ein kühlerer, futuristischer Sound, der ab 1988 <b>Techno</b> heißt.",
        stationen: [
          { id: "onandon", jahr: "1984", wer: "Jesse Saunders", wo: "Chicago, Label Jes Say (mit Vince Lawrence)",
            track: "On & On", ear: "Eine der ersten House-Platten auf Vinyl. Hör, wie einfach sie gebaut ist: Drumcomputer, Bass, ein paar Synthesizer-Töne.",
            q: "Jesse Saunders On and On 1984", quelle: ["Wikipedia: Jesse Saunders", "https://en.wikipedia.org/wiki/Jesse_Saunders"] },
          { id: "noufos", jahr: "1985", wer: "Model 500", wo: "Juan Atkins, Detroit, Label Metroplex",
            track: "No UFOs", ear: "Eine Heimaufnahme mit TR-909. Hör auf die kurzen Synthesizer-Akkorde, die <b>Stabs</b> (englisch für „Stiche“), wie in deiner Stufe 4.",
            q: "Model 500 No UFOs", quelle: ["Sound on Sound: Classic Tracks, Model 500 „No UFOs“", "https://www.soundonsound.com/techniques/classic-tracks-model-500-no-ufos"] },
          { id: "moveyourbody", jahr: "1986", wer: "Marshall Jefferson", wo: "Chicago, Label Trax",
            track: "Move Your Body (The House Music Anthem)", ear: "Der Track beginnt mit einem Klavierakkord. Er gehört zu den ersten House-Platten mit Klavier, das danach zum Markenzeichen von House wurde.",
            q: "Marshall Jefferson Move Your Body", quelle: ["Wikipedia: Move Your Body (Marshall Jefferson song)", "https://en.wikipedia.org/wiki/Move_Your_Body_(Marshall_Jefferson_song)"] },
          { id: "strings", jahr: "1987", wer: "Rhythim Is Rhythim", wo: "Derrick May mit Michael James, Detroit, Label Transmat",
            track: "Strings of Life", ear: "Hör auf das, was fehlt: Es gibt keine Bassline, und die Kick fällt immer wieder weg. Das kennst du aus deinem Breakdown in Stufe 6.",
            q: "Rhythim Is Rhythim Strings of Life", quelle: ["Wikipedia: Strings of Life", "https://en.wikipedia.org/wiki/Strings_of_Life"] },
          { id: "bigfun", jahr: "1988", wer: "Inner City", wo: "Kevin Saunderson mit Sängerin Paris Grey, Detroit",
            track: "Big Fun", ear: "Detroit-Akkorde mit Gesang: Damit kam Techno in die Charts, in Großbritannien bis auf Platz 8.",
            q: "Inner City Big Fun 1988", quelle: ["Wikipedia: Big Fun (Inner City song)", "https://en.wikipedia.org/wiki/Big_Fun_(Inner_City_song)"] },
          { id: "reese", jahr: "1988", wer: "Reese", wo: "Kevin Saunderson, Detroit, Label Incognito",
            track: "Just Want Another Chance", ear: "Hör auf die tiefe, wabernde Bassline aus einem Casio CZ-1000. Als „Reese-Bass“ wurde sie später im Drum & Bass berühmt.",
            q: "Reese Just Want Another Chance", quelle: ["Wikipedia: Kevin Saunderson", "https://en.wikipedia.org/wiki/Kevin_Saunderson"] }
        ]
      },
      {
        label: "1991–1992 · Berlin und Detroit",
        titel: "Die Achse Berlin–Detroit",
        text: "1991 öffnet in Berlin der Club Tresor, kurz darauf das Label Tresor Records. Es bringt Musiker aus Detroit nach Europa und verbindet sie mit der Berliner Szene.",
        stationen: [
          { id: "x101", jahr: "1991", wer: "X-101", wo: "Mike Banks, Jeff Mills, Robert Hood (Underground Resistance), Tresor 1",
            track: "Sonic Destroyer", ear: "Die allererste Platte von Tresor Records. Hör, wie rau und hart der Detroit-Sound inzwischen klingt.",
            q: "X-101 Sonic Destroyer", quelle: ["909originals: X-101 „Sonic Destroyer“ (1991)", "https://909originals.com/2017/12/19/12-tunes-of-christmas-incredible-intros-6-x-101-sonic-destroyer-1991/"] },
          { id: "waveform", jahr: "1992", wer: "Jeff Mills", wo: "Detroit, Label Tresor",
            track: "Waveform Transmission Vol. 1", ear: "Wiederholung als Prinzip: Hör, wie lange ein kurzes Muster läuft, bevor sich etwas ändert.",
            q: "Jeff Mills Waveform Transmission Vol. 1", quelle: ["Wikipedia: Jeff Mills (Diskografie)", "https://en.wikipedia.org/wiki/Jeff_Mills"] },
          { id: "3mb", jahr: "1992", wer: "3MB feat. Magic Juan Atkins", wo: "Moritz von Oswald, Thomas Fehlmann und Juan Atkins, Label Tresor",
            track: "Jazz Is the Teacher", ear: "Berlin und Detroit im selben Studio. Hör auf die weichen Flächen. Moritz von Oswald gründet kurz danach Basic Channel, das kennst du aus dem Dub Techno Labor.",
            q: "3MB Magic Juan Atkins Jazz Is the Teacher", quelle: ["Wikipedia: Moritz von Oswald", "https://en.wikipedia.org/wiki/Moritz_von_Oswald"] }
        ]
      },
      {
        label: "ab 2004 · Berlin",
        titel: "Heute: Der Berghain-Sound",
        text: "2004 öffnet das Berghain. Seine <b>Residents</b> (die festen DJs eines Clubs) prägen einen reduzierten, hypnotischen Techno. Das Club-Label heißt Ostgut Ton.",
        stationen: [
          { id: "klock", jahr: "2009", wer: "Ben Klock", wo: "Berghain-Resident, Label Ostgut Ton",
            track: "One (Album)", ear: "Hör, wie wenig passiert und wie stark es trotzdem zieht. Vergleich den Sound mit „No UFOs“ von 1985: Was ist geblieben?",
            q: "Ben Klock One Ostgut Ton", quelle: ["Resident Advisor: Ben Klock – One (Rezension, 2009)", "https://ra.co/reviews/5910"] },
          { id: "dettmann", jahr: "2010", wer: "Marcel Dettmann", wo: "Berghain-Resident, Label Ostgut Ton",
            track: "Dettmann (Album), z. B. „Viscous“", ear: "Schwer, dicht und unbeweglich: Techno für den Höhepunkt der Nacht. Achte darauf, wie die Kick alles trägt.",
            q: "Marcel Dettmann Viscous", quelle: ["FACT: Marcel Dettmann – Dettmann (Rezension, 2010)", "https://factmag.com/2010/04/26/marcel-dettmann-dettmann"] }
        ]
      }
    ]
  };
})(window.Synkopia = window.Synkopia || {});
