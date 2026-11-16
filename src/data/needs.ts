import type { BodyRegionHotspot, Need } from "@/types/technology";

/**
 * Rehabilitation needs used by the explorer.
 *
 * These are navigation aids through the content, not diagnoses. Every need
 * states when professional assessment is required (`seekCare`).
 */
export const needs: Need[] = [
  // ── Predeli telesa ────────────────────────────────────────────────────────
  {
    id: "glava",
    type: "predel",
    label: "Glava in živčni sistem",
    keywords: ["nevrološka rehabilitacija", "možgani", "kap", "živci", "nevrologija"],
    intro:
      "Po možganski kapi, poškodbi glave ali pri nevroloških boleznih se rehabilitacija pogosto osredotoča na ponovno učenje gibov, ravnotežja in vsakdanjih opravil.",
    seekCare:
      "Ob nenadni šibkosti ene strani telesa, povešenem ustnem kotu ali motnjah govora takoj pokličite 112.",
    technologies: ["robotika", "virtualna-resnicnost", "senzorji", "elektrostimulacija"],
  },
  {
    id: "vrat",
    type: "predel",
    label: "Vrat",
    keywords: ["vratna hrbtenica", "tilnik", "napetost"],
    intro:
      "Pri bolečini ali omejeni gibljivosti vratu se uporabljajo rešitve za lajšanje bolečine, ozaveščanje drže in vodeno vadbo.",
    seekCare:
      "Po poškodbi, ob mravljinčenju ali šibkosti v rokah ali ob močnem glavobolu poiščite zdravniško pomoč.",
    technologies: ["elektrostimulacija", "senzorji", "virtualna-resnicnost"],
  },
  {
    id: "rama",
    type: "predel",
    label: "Rama",
    keywords: ["ramenski sklep", "rotatorna manšeta", "tetiva", "ključnica"],
    intro:
      "Rehabilitacija rame običajno vključuje postopno povrnitev gibljivosti in moči, pogosto po poškodbi tetiv ali operaciji.",
    seekCare:
      "Če po poškodbi roke ne morete dvigniti ali bolečino v rami spremljata bolečina v prsih ali težko dihanje, takoj poiščite pomoč (112).",
    technologies: ["elektrostimulacija", "udarni-valovi", "oteklina", "senzorji", "ortoze"],
  },
  {
    id: "roka",
    type: "predel",
    label: "Komolec, zapestje in roka",
    keywords: ["komolec", "zapestje", "dlan", "prsti", "teniški komolec", "prijem"],
    intro:
      "Pri komolcu, zapestju in roki je poudarek na fini motoriki, moči prijema in zaščiti sklepov med celjenjem.",
    seekCare:
      "Ob izraziti oteklini, deformaciji po padcu ali izgubi občutka v prstih poiščite zdravniško pomoč.",
    technologies: ["ortoze", "udarni-valovi", "robotika", "senzorji", "elektrostimulacija"],
  },
  {
    id: "hrbet",
    type: "predel",
    label: "Hrbet in hrbtenica",
    keywords: ["križ", "ledveni del", "hrbtenica", "disk", "drža"],
    intro: "Pri bolečini v hrbtu so v ospredju aktivna vadba, obvladovanje bolečine in spremljanje drže.",
    seekCare:
      "Ob izgubi nadzora nad mehurjem ali črevesjem, otrplosti v predelu presredka ali napredujoči šibkosti nog nemudoma poiščite zdravniško pomoč.",
    technologies: ["elektrostimulacija", "senzorji", "ortoze", "virtualna-resnicnost"],
  },
  {
    id: "kolk",
    type: "predel",
    label: "Kolk in medenica",
    keywords: ["kolčni sklep", "medenica", "medenično dno", "endoproteza kolka"],
    intro:
      "Rehabilitacija kolka in medenice pogosto vključuje krepitev mišic, ponovno učenje hoje po operaciji in trening mišic medeničnega dna.",
    seekCare: "Po padcu z bolečino v kolku ali če noge ne morete obremeniti, poiščite nujno pomoč.",
    technologies: ["elektrostimulacija", "senzorji", "oteklina", "robotika"],
  },
  {
    id: "koleno",
    type: "predel",
    label: "Koleno",
    keywords: ["kolenski sklep", "križna vez", "meniskus", "endoproteza kolena", "pogačica"],
    intro:
      "Po poškodbi ali operaciji kolena so cilji običajno obvladovanje otekline, povrnitev obsega gibanja in krepitev stegenskih mišic.",
    seekCare:
      "Ob nenadni oteklini, zatikanju ali občutku nestabilnosti kolena ali če noge ne morete obremeniti, se posvetujte z zdravnikom.",
    technologies: ["pasivno-gibanje", "elektrostimulacija", "oteklina", "ortoze", "senzorji"],
  },
  {
    id: "stopalo",
    type: "predel",
    label: "Gleženj in stopalo",
    keywords: ["gleženj", "peta", "ahilova tetiva", "zvin", "diabetično stopalo"],
    intro:
      "Pri gležnju in stopalu so pomembni stabilnost, razbremenitev in ravnotežje, pri sladkorni bolezni pa tudi skrb za kožo in rane.",
    seekCare:
      "Rane na stopalu pri sladkorni bolezni, sprememba barve kože ali znaki okužbe zahtevajo pregled pri zdravstvenem strokovnjaku.",
    technologies: ["ortoze", "udarni-valovi", "oteklina", "oskrba-ran", "senzorji"],
  },

  // ── Stanja in poškodbe ────────────────────────────────────────────────────
  {
    id: "po-operaciji",
    type: "stanje",
    label: "Po operaciji sklepa",
    keywords: ["pooperativno", "endoproteza", "artroskopija", "operacija"],
    intro:
      "Po operaciji sklepa rehabilitacija sledi protokolu operaterja. Tehnologije lahko podprejo gibljivost, obvladovanje otekline in krepitev.",
    seekCare: "Uporabo naprav po operaciji vedno uskladite z operaterjem ali fizioterapevtom.",
    technologies: ["pasivno-gibanje", "oteklina", "elektrostimulacija", "senzorji", "ortoze"],
  },
  {
    id: "tetive",
    type: "stanje",
    label: "Težave s tetivami",
    keywords: ["tendinopatija", "tetiva", "narastišče", "plantarni fasciitis", "teniški komolec"],
    intro:
      "Pri težavah s tetivami je osnova postopno obremenjevanje z vadbo. Nekatere tehnologije se uporabljajo kot dopolnilo.",
    seekCare: "Ob nenadni močni bolečini ali izgubi moči po poškodbi poiščite zdravniško pomoč.",
    technologies: ["udarni-valovi", "senzorji", "ortoze", "elektrostimulacija"],
  },
  {
    id: "bolecina-hrbet",
    type: "stanje",
    label: "Dolgotrajna bolečina v hrbtu ali vratu",
    keywords: ["kronična bolečina", "lumbalgija", "križobolje"],
    intro: "Pri dolgotrajni bolečini so v ospredju aktivna vadba in samostojno obvladovanje bolečine.",
    seekCare:
      "Ob nenadni hudi bolečini, vročini, nepojasnjenem hujšanju ali težavah z mehurjem poiščite zdravniško pomoč.",
    technologies: ["elektrostimulacija", "senzorji", "virtualna-resnicnost"],
  },
  {
    id: "mozganska-kap",
    type: "stanje",
    label: "Po možganski kapi",
    keywords: ["kap", "hemipareza", "nevrološka rehabilitacija", "inzult"],
    intro:
      "Rehabilitacija po možganski kapi temelji na veliko ponovitvah ciljanih gibov. Tehnologije lahko pomagajo povečati obseg in raznolikost vadbe.",
    seekCare: "Program rehabilitacije določi rehabilitacijski tim. Ob novih znakih kapi takoj pokličite 112.",
    technologies: ["robotika", "virtualna-resnicnost", "elektrostimulacija", "senzorji"],
  },
  {
    id: "hrbtenjaca",
    type: "stanje",
    label: "Poškodba hrbtenjače",
    keywords: ["paraplegija", "tetraplegija", "hrbtenjača", "eksoskelet"],
    intro:
      "Pri poškodbi hrbtenjače se rehabilitacija prilagaja ravni in obsegu poškodbe. Napredne naprave se uporabljajo predvsem v specializiranih centrih.",
    seekCare: "Primernost naprav oceni specialist fizikalne in rehabilitacijske medicine.",
    technologies: ["robotika", "elektrostimulacija", "senzorji"],
  },
  {
    id: "kronicne-rane",
    type: "stanje",
    label: "Kronične rane in diabetično stopalo",
    keywords: ["rana", "razjeda", "diabetes", "sladkorna bolezen", "celjenje"],
    intro:
      "Celjenje kroničnih ran zahteva celostno oskrbo. Napredne obloge in naprave so dopolnilo standardni oskrbi, pri sladkorni bolezni pa je pomemben tudi nadzor glukoze.",
    seekCare:
      "Kronične rane naj spremlja zdravstveni strokovnjak. Ob širjenju rdečine, vročini ali gnojnem izcedku takoj poiščite pomoč.",
    technologies: ["oskrba-ran", "ortoze", "spremljanje-glukoze"],
  },
  {
    id: "oteklina-limfedem",
    type: "stanje",
    label: "Oteklina ali limfedem",
    keywords: ["edem", "limfedem", "otekanje", "zastajanje tekočine"],
    intro:
      "Pri oteklinah in limfedemu se uporabljajo kompresija, drenaža in hlajenje, prilagojeno vzroku otekline.",
    seekCare:
      "Nepojasnjena enostranska oteklina noge, zlasti z bolečino ali rdečino, je lahko znak krvnega strdka. Takoj poiščite zdravniško pomoč.",
    technologies: ["oteklina", "senzorji"],
  },
  {
    id: "misicna-sibkost",
    type: "stanje",
    label: "Mišična šibkost po mirovanju",
    keywords: ["atrofija", "slabotnost", "mirovanje", "dekondicija"],
    intro: "Po daljšem mirovanju ali bolezni je cilj postopna obnova moči in vzdržljivosti.",
    seekCare: "Nepojasnjena ali napredujoča šibkost zahteva zdravniški pregled.",
    technologies: ["elektrostimulacija", "senzorji", "virtualna-resnicnost"],
  },
  {
    id: "ravnotezje",
    type: "stanje",
    label: "Težave z ravnotežjem in hojo",
    keywords: ["padci", "hoja", "ravnotežje", "nestabilnost"],
    intro:
      "Pri težavah z ravnotežjem in hojo se uporabljajo ciljana vadba, pripomočki za oporo in naprave za trening hoje.",
    seekCare: "Pogosti padci, nenadna vrtoglavica ali sprememba hoje zahtevajo zdravniški pregled.",
    technologies: ["robotika", "senzorji", "virtualna-resnicnost", "ortoze"],
  },

  // ── Cilji rehabilitacije ──────────────────────────────────────────────────
  {
    id: "manj-bolecine",
    type: "cilj",
    label: "Zmanjšati bolečino",
    keywords: ["bolečina", "lajšanje", "analgezija"],
    intro:
      "Tehnologije za lajšanje bolečine so običajno dopolnilo vadbi in drugim oblikam zdravljenja, ne samostojna rešitev.",
    seekCare: "Močna, nepojasnjena ali naraščajoča bolečina zahteva zdravniški pregled.",
    technologies: ["elektrostimulacija", "udarni-valovi", "oteklina"],
  },
  {
    id: "gibljivost",
    type: "cilj",
    label: "Povrniti gibljivost",
    keywords: ["obseg gibanja", "togost", "gibljivost"],
    intro:
      "Za povrnitev obsega gibanja se uporabljajo vodena vadba, naprave za pasivno gibanje in sprotna povratna informacija.",
    seekCare: "Hitrost napredovanja po poškodbi ali operaciji določi strokovnjak.",
    technologies: ["pasivno-gibanje", "senzorji", "virtualna-resnicnost"],
  },
  {
    id: "moc",
    type: "cilj",
    label: "Okrepiti mišice",
    keywords: ["moč", "krepitev", "mišice"],
    intro:
      "Krepitev temelji na postopnem povečevanju obremenitve. Nekatere naprave pomagajo aktivirati oslabljene mišice.",
    seekCare: "Pri nevroloških boleznih ali po operaciji obremenitev uskladite s fizioterapevtom.",
    technologies: ["elektrostimulacija", "senzorji", "robotika"],
  },
  {
    id: "hoja",
    type: "cilj",
    label: "Izboljšati hojo in ravnotežje",
    keywords: ["hoja", "ravnotežje", "padci"],
    intro: "Trening hoje in ravnotežja lahko podprejo robotske naprave, senzorji in interaktivna vadba.",
    seekCare: "Ob povečanem tveganju za padce vadite pod strokovnim nadzorom.",
    technologies: ["robotika", "senzorji", "virtualna-resnicnost", "ortoze"],
  },
  {
    id: "celjenje",
    type: "cilj",
    label: "Podpreti celjenje",
    keywords: ["rane", "celjenje", "tkivo"],
    intro:
      "Pri celjenju ran in tkiv so napredne rešitve dopolnilo standardni oskrbi in ne nadomeščajo zdravniške obravnave.",
    seekCare: "Rana, ki se ne celi po pričakovanjih, zahteva pregled pri zdravstvenem strokovnjaku.",
    technologies: ["oskrba-ran", "oteklina"],
  },
  {
    id: "manj-otekline",
    type: "cilj",
    label: "Zmanjšati oteklino",
    keywords: ["oteklina", "edem", "limfedem"],
    intro: "Za obvladovanje otekline se uporabljajo hlajenje, kompresija in limfna drenaža.",
    seekCare:
      "Nepojasnjena enostranska oteklina noge, zlasti z bolečino ali rdečino, zahteva takojšen zdravniški pregled.",
    technologies: ["oteklina"],
  },
  {
    id: "spremljanje",
    type: "cilj",
    label: "Spremljati napredek doma",
    keywords: ["aplikacija", "telerehabilitacija", "domača vadba", "meritve"],
    intro:
      "Senzorji in aplikacije omogočajo spremljanje vadbe in napredka doma ter lažje sodelovanje s terapevtom.",
    seekCare: "Podatki naprav ne nadomeščajo strokovne ocene napredka.",
    technologies: ["senzorji", "virtualna-resnicnost"],
  },
];

/**
 * Body-map hotspots (percent of the figure's viewBox 240 × 520).
 * The first point is the focusable button; the mirror point is decorative.
 */
export const bodyHotspots: Record<string, BodyRegionHotspot[]> = {
  glava: [{ x: 50, y: 9.4 }],
  vrat: [{ x: 50, y: 16.4 }],
  rama: [
    { x: 29.5, y: 21.5 },
    { x: 70.5, y: 21.5 },
  ],
  roka: [
    { x: 17.5, y: 46 },
    { x: 82.5, y: 46 },
  ],
  hrbet: [{ x: 50, y: 37 }],
  kolk: [
    { x: 39, y: 57.5 },
    { x: 61, y: 57.5 },
  ],
  koleno: [
    { x: 38.8, y: 78.8 },
    { x: 61.2, y: 78.8 },
  ],
  stopalo: [
    { x: 37.5, y: 95 },
    { x: 62.5, y: 95 },
  ],
};
