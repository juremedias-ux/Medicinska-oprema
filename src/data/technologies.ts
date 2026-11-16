import type { Technology } from "@/types/technology";

/**
 * Technology categories.
 *
 * Content rules: describe the purpose and how it works in plain language,
 * summarise evidence honestly (including its limits) and say when a
 * professional must be involved. No efficacy promises.
 */
export const technologies: Technology[] = [
  {
    id: "elektrostimulacija",
    name: "Elektrostimulacija (TENS, NMES)",
    shortName: "Elektrostimulacija",
    icon: "electrodes",
    howItWorks:
      "Elektrode na koži oddajajo blage električne impulze. TENS je namenjen lajšanju bolečine, NMES pa sproži krčenje mišic za njihovo aktivacijo in krepitev.",
    usedFor:
      "Uporablja se za lajšanje bolečine ter za aktivacijo in krepitev mišic po poškodbi, operaciji ali daljšem mirovanju.",
    environment: "Doma po navodilih strokovnjaka, ambulanta, fizioterapija",
    evidence:
      "Dokazi se razlikujejo glede na stanje. Pri krepitvi mišic po nekaterih operacijah raziskave podpirajo uporabo kot dopolnilo vadbi, pri lajšanju bolečine so rezultati mešani.",
    professionalNote:
      "Pri vsajenih elektronskih napravah (npr. srčnem spodbujevalniku), nosečnosti, epilepsiji ali nepojasnjeni bolečini se pred uporabo posvetujte z zdravnikom.",
    rehabilitation: true,
  },
  {
    id: "udarni-valovi",
    name: "Terapija z udarnimi valovi (ESWT)",
    shortName: "Udarni valovi",
    icon: "waves",
    howItWorks:
      "Naprava prek kože usmeri kratke akustične valove v tkivo, običajno na mesto bolečine ob tetivi ali narastišču.",
    usedFor:
      "Uporablja se pri nekaterih dolgotrajnih težavah s tetivami in narastišči, na primer v peti, rami ali komolcu.",
    environment: "Ambulanta in fizioterapija; izvaja jo strokovnjak",
    evidence:
      "Raziskave podpirajo uporabo pri nekaterih dolgotrajnih težavah s tetivami in narastišči, pri drugih stanjih so dokazi omejeni.",
    professionalNote:
      "Primernost oceni zdravnik ali fizioterapevt. Običajno ni primerna pri svežih poškodbah, motnjah strjevanja krvi ali v nosečnosti.",
    rehabilitation: true,
  },
  {
    id: "pasivno-gibanje",
    name: "Naprave za pasivno gibanje sklepov (CPM)",
    shortName: "Pasivno gibanje",
    icon: "joint",
    howItWorks:
      "Motorizirana opornica sklep počasi in enakomerno upogiba ter izteguje v nastavljenem obsegu, brez aktivnega dela mišic.",
    usedFor:
      "Uporablja se predvsem po nekaterih operacijah kolena, redkeje drugih sklepov, za ohranjanje gibljivosti v zgodnjem obdobju.",
    environment: "Doma ali v bolnišnici po navodilih operaterja",
    evidence:
      "Raziskave kažejo predvsem majhne in kratkoročne učinke na gibljivost; aktivna vadba ostaja osnova rehabilitacije.",
    professionalNote: "Obseg gibanja in trajanje uporabe določi operater ali fizioterapevt.",
    rehabilitation: true,
  },
  {
    id: "robotika",
    name: "Robotska rehabilitacija in eksoskeleti",
    shortName: "Robotika",
    icon: "exoskeleton",
    howItWorks:
      "Robotske naprave vodijo ali podpirajo gibanje rok ali nog in omogočajo veliko natančno ponovljenih gibov. Eksoskeleti so nosljive konstrukcije, ki podpirajo stojo in hojo.",
    usedFor:
      "Uporablja se zlasti v nevrološki rehabilitaciji, na primer po možganski kapi ali poškodbi hrbtenjače, za trening hoje in gibov roke.",
    environment: "Rehabilitacijski centri; nekateri eksoskeleti tudi za osebno uporabo",
    evidence:
      "Raziskave kažejo, da lahko dopolnjuje običajno terapijo. Učinki se razlikujejo med napravami in posamezniki.",
    professionalNote: "Primernost in program uporabe vedno določi rehabilitacijski tim.",
    rehabilitation: true,
  },
  {
    id: "senzorji",
    name: "Senzorji gibanja in biofeedback",
    shortName: "Senzorji in biofeedback",
    icon: "sensor",
    howItWorks:
      "Senzorji merijo gibanje ali električno aktivnost mišic in rezultat sproti prikažejo na zaslonu, kar pomaga pri pravilnem izvajanju vaj.",
    usedFor:
      "Uporablja se za učenje pravilnega gibanja, trening mišic (tudi medeničnega dna) in spremljanje napredka pri vadbi.",
    environment: "Doma, ambulanta, fizioterapija",
    evidence:
      "Uporabnost je odvisna od namena. Podatki so najbolj koristni v povezavi z vodenim programom vadbe.",
    professionalNote: "Rezultate meritev si razložite skupaj s fizioterapevtom.",
    rehabilitation: true,
  },
  {
    id: "virtualna-resnicnost",
    name: "Virtualna resničnost in interaktivna vadba",
    shortName: "Interaktivna vadba",
    icon: "headset",
    howItWorks:
      "Vaje potekajo v interaktivnem okolju na zaslonu ali v očalih za navidezno resničnost, ki sproti spremlja gibanje.",
    usedFor:
      "Uporablja se za večjo motivacijo in več ponovitev vaj, zlasti v nevrološki in ortopedski rehabilitaciji.",
    environment: "Rehabilitacijski centri, fizioterapija, ponekod doma",
    evidence:
      "Raziskave so obetavne, a raznolike. Najpogosteje se uporablja kot dopolnilo običajni terapiji.",
    professionalNote:
      "Pri vrtoglavici, epilepsiji ali težavah z ravnotežjem uporabo uskladite s strokovnjakom.",
    rehabilitation: true,
  },
  {
    id: "oteklina",
    name: "Hlajenje, kompresija in limfna drenaža",
    shortName: "Oteklina",
    icon: "compression",
    howItWorks:
      "Naprave predel hladijo, ga enakomerno stiskajo ali s pnevmatskimi manšetami izmenično pritiskajo in sproščajo, kar podpira odtekanje tekočine.",
    usedFor:
      "Uporablja se za obvladovanje otekline in bolečine po poškodbah ali operacijah ter pri limfedemu.",
    environment: "Doma po navodilih, ambulanta, bolnišnica",
    evidence:
      "Kompresija je uveljavljen del obravnave limfedema in venskih težav. Pri hlajenju po operacijah so učinki večinoma kratkoročni.",
    professionalNote:
      "Pri boleznih arterij, srčnem popuščanju, okužbi ali sumu na krvni strdek se pred uporabo posvetujte z zdravnikom.",
    rehabilitation: true,
  },
  {
    id: "ortoze",
    name: "Ortoze in opornice",
    shortName: "Ortoze",
    icon: "brace",
    howItWorks:
      "Zunanji pripomočki podpirajo, stabilizirajo ali razbremenijo sklep oziroma del telesa; nekateri omogočajo nastavljiv obseg gibanja.",
    usedFor:
      "Uporabljajo se za zaščito med celjenjem, stabilizacijo sklepa in razbremenitev, na primer kolena, gležnja, zapestja ali stopala.",
    environment: "Doma in pri vsakodnevnih dejavnostih",
    evidence: "Učinek je odvisen od pravilne izbire, prileganja in namena uporabe.",
    professionalNote:
      "Vrsto ortoze in trajanje uporabe izberite skupaj z zdravnikom, ortopedskim tehnikom ali fizioterapevtom.",
    rehabilitation: true,
  },
  {
    id: "oskrba-ran",
    name: "Napredna oskrba ran",
    shortName: "Oskrba ran",
    icon: "dressing",
    howItWorks:
      "Sodobne obloge in naprave delujejo na rano lokalno, na primer z antibakterijskimi materiali, hladno plazmo ali fizikalnimi dražljaji, kot dopolnilo standardni oskrbi.",
    usedFor:
      "Uporablja se pri kroničnih ranah, kot so rane na stopalih pri sladkorni bolezni ali razjede na nogah.",
    environment: "Ambulante za rane, bolnišnice, domača oskrba pod nadzorom strokovnjaka",
    evidence:
      "Dokazi so specifični za posamezno oblogo ali napravo, zato jih navajamo pri vsakem produktu posebej.",
    professionalNote:
      "Kronične rane naj vodi zdravstveni strokovnjak. Napredne rešitve ne nadomeščajo razbremenitve, nadzora okužbe in zdravljenja vzroka.",
    rehabilitation: true,
  },
  {
    id: "spremljanje-glukoze",
    name: "Neprekinjeno spremljanje glukoze (CGM)",
    shortName: "Spremljanje glukoze",
    icon: "glucose",
    howItWorks: "Majhen senzor na koži meri glukozo v medcelični tekočini in vrednosti pošilja v aplikacijo.",
    usedFor:
      "Namenjeno je spremljanju sladkorne bolezni. Ni rešitev za celjenje ran, je pa nadzor glukoze pomemben del celostne oskrbe diabetičnega stopala.",
    environment: "Doma, pri vsakodnevni uporabi",
    evidence:
      "Vrednosti iz medcelične tekočine se lahko razlikujejo od meritev iz krvi, zlasti ob hitrih spremembah.",
    professionalNote: "O uporabi in prilagajanju zdravljenja se posvetujte z diabetologom.",
    rehabilitation: false,
  },
  {
    id: "dezinfekcija",
    name: "Dezinfekcija medicinske opreme",
    shortName: "Dezinfekcija opreme",
    icon: "uv",
    howItWorks:
      "Avtomatizirani sistemi v zaprti komori z UV-C svetlobo razkužijo površino združljivih pripomočkov, na primer ultrazvočnih sond.",
    usedFor: "Namenjeno je zdravstvenim ustanovam za preprečevanje okužb, povezanih z uporabo opreme.",
    environment: "Bolnišnice in ambulante",
    evidence: "Uporaba je omejena na pripomočke, ki jih proizvajalec navaja kot združljive.",
    professionalNote: "Ni namenjeno osebni uporabi.",
    rehabilitation: false,
  },
];
