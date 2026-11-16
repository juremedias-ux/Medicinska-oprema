import type { Product } from "@/types/product";

/**
 * Product catalogue — single source of truth.
 *
 * Content rules (see README → Managing products):
 * - Separate manufacturer statements (`manufacturerClaims`, evidence kind
 *   "proizvajalec") from published research and regulatory data.
 * - Leave unknown fields as `null` / `[]`. The site shows them as
 *   "v preverjanju"; never fill them with marketing copy.
 * - Every evidence or regulatory statement needs a source link, or must be
 *   labelled as coming from the manufacturer.
 *
 * Images in /public/images/products/placeholders/ are illustrations
 * (`isPlaceholder: true`) and must be replaced with official photography.
 */
export const products: Product[] = [
  {
    slug: "piomic-coms-one",
    manufacturer: "Piomic Medical",
    productName: "COMS® One",
    originalName: "COMS® One Therapy System",
    technology: "oskrba-ran",
    shortDescription:
      "Prenosljiv, nenapadljiv terapevtski sistem, namenjen podpori celjenja kroničnih ran na nogah in stopalih, v dopolnitvi standardne oskrbe.",
    intendedUse: "Podpora celjenju kroničnih ran na nogah in stopalih kot dopolnilo standardni oskrbi ran.",
    environment: null,
    howItWorks:
      "Prenosna ročna naprava, ki združuje optično in magnetno stimulacijo (Concurrent Optical and Magnetic Stimulation, COMS).",
    manufacturerClaims: ["Prenosljiva in nenapadljiva terapija", "Podpora celjenju kroničnih ran"],
    limitations: ["Je dopolnilo standardni oskrbi ran in je ne nadomešča."],
    warnings: [],
    evidence: [
      {
        kind: "raziskava",
        title: "Objavljena zasnova klinične raziskave",
        summary:
          "V strokovni reviji Wounds je objavljen opis zasnove klinične raziskave terapije COMS. Rezultatov večjih neodvisnih raziskav še nismo pregledali.",
        sources: [
          {
            label: "HMP Global Learning Network (Wounds)",
            url: "https://www.hmpgloballearningnetwork.com/site/wounds/original-research/trial-design-concurrent-optical-and-magnetic-stimulation-coms-therapy",
          },
        ],
      },
      {
        kind: "raziskava",
        title: "Registrirane klinične raziskave",
        summary:
          "Raziskave terapije COMS pri kroničnih ranah so vpisane v javne registre kliničnih raziskav. Objavljenih rezultatov iz teh registrov še nismo pregledali.",
        sources: [
          {
            label: "Register kliničnih raziskav (CTV)",
            url: "https://ctv.veeva.com/study/local-application-of-combined-optical-and-magnetic-stimulation-coms-for-treatment-of-chronic-wound",
          },
          {
            label: "Register kliničnih raziskav (CTV)",
            url: "https://ctv.veeva.com/study/concurrent-optical-and-magnetic-stimulation-coms-for-treatment-of-patients-with-chronic-ulcers-of",
          },
        ],
      },
    ],
    regulatory: [
      { region: "EU", status: "CE-oznaka", basis: "proizvajalec" },
      { region: "ZDA", status: "Ni odobreno; raziskovalni pripomoček", basis: "proizvajalec" },
    ],
    tags: ["Kronične rane", "Noge in stopala", "Prenosna naprava"],
    image: {
      src: "/images/products/placeholders/piomic-coms-one.svg",
      alt: "Ilustracija terapevtskega sistema COMS® One",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    externalManufacturerUrl: "https://www.piomic.com",
    updatedAt: "2026-11-16",
  },
  {
    slug: "nanordica-antibacterial-wound-dressing",
    manufacturer: "Nanordica Medical",
    productName: "Nanordica® antibakterijski povoj",
    originalName: "Nanordica® Advanced Antibacterial Wound Dressing",
    technology: "oskrba-ran",
    shortDescription:
      "Napreden antibakterijski povoj s tehnologijo Premotiv®, zasnovan za pomoč pri preprečevanju okužb in podpori zapiranja ran.",
    intendedUse:
      "Oskrba ran, vključno s kroničnimi ranami; povoj je zasnovan za pomoč pri preprečevanju okužb in podpori zapiranja ran.",
    environment: null,
    howItWorks:
      "Obloga vsebuje nanodelce srebra in bakra (tehnologija Premotiv®), ki delujejo antibakterijsko na površini rane.",
    manufacturerClaims: ["Pomoč pri preprečevanju okužb", "Podpora zapiranju ran"],
    limitations: [],
    warnings: [],
    evidence: [
      {
        kind: "raziskava",
        title: "Pilotna randomizirana raziskava pri okuženih diabetičnih razjedah na stopalu",
        summary:
          "Enojno slepa pilotna raziskava je oblogo z nanodelci srebra in bakra primerjala z oblogo z ionskim srebrom (Aquacel Ag+). Površina ran se je zmanjšala v obeh skupinah; bakterijska obremenitev se v skupini z oblogo Nanordica ni pomembno spremenila, v primerjalni skupini pa se je povečala. Gre za majhno pilotno raziskavo; celotnega članka še nismo pregledali.",
        date: "2025",
        sources: [
          { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/41926471/" },
          {
            label: "Journal of Wound Care",
            url: "https://www.magonlinelibrary.com/doi/abs/10.12968/jowc.2025.0002",
          },
        ],
      },
      {
        kind: "raziskava",
        title: "Večja randomizirana dvojno slepa raziskava",
        summary:
          "V registru ClinicalTrials.gov je vpisana raziskava, ki oblogo primerja z oblogo Aquacel Ag+ Extra pri diabetičnih razjedah na stopalu; predvidenih je 170 udeležencev. Objavljenih rezultatov še nismo našli.",
        sources: [
          { label: "ClinicalTrials.gov (NCT06667752)", url: "https://clinicaltrials.gov/study/NCT06667752" },
        ],
      },
    ],
    regulatory: [{ region: "EU", status: "Status oznake CE preverjamo", basis: "v-preverjanju" }],
    tags: ["Kronične rane", "Antibakterijska obloga", "Nanodelci srebra in bakra"],
    image: {
      src: "/images/products/placeholders/nanordica-antibacterial-wound-dressing.svg",
      alt: "Ilustracija antibakterijskega povoja Nanordica®",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    externalManufacturerUrl: "https://www.nanordica.com",
    updatedAt: "2026-11-16",
  },
  {
    slug: "plasmacure",
    manufacturer: "PlasmaCure",
    productName: "Plazemske terapevtske rešitve",
    originalName: "Plasma-based therapy solutions (sistem PLASOMA)",
    technology: "oskrba-ran",
    shortDescription: "Inovativne rešitve na osnovi plazme za sodobno oskrbo ran in zdravljenje tkiv.",
    intendedUse: "Sodobna oskrba ran, zlasti zahtevnih kroničnih ran, s hladno plazmo.",
    environment: null,
    howItWorks:
      "Sistem PLASOMA sestavljata obloga za enkratno uporabo, ki se položi na rano, in enota, ki v oblogi ustvari hladno plazmo. Hladna plazma je delno ioniziran plin pri temperaturi blizu telesne.",
    manufacturerClaims: ["Oskrba zahtevnih ran s hladno plazmo"],
    limitations: [],
    warnings: [],
    evidence: [
      {
        kind: "proizvajalec",
        title: "Klinični rezultati po navedbah proizvajalca",
        summary:
          "Proizvajalec v poročilih projekta navaja rezultate kliničnih raziskav pri kroničnih ranah, med njimi pilotno raziskavo pri diabetičnih razjedah na stopalu. Neodvisno objavljenih rezultatov še nismo pregledali.",
        sources: [{ label: "CORDIS (Evropska komisija)", url: "https://cordis.europa.eu/project/id/953462" }],
      },
    ],
    regulatory: [
      {
        region: "EU",
        status: "CE-oznaka",
        basis: "proizvajalec",
        source: { label: "CORDIS (Evropska komisija)", url: "https://cordis.europa.eu/project/id/953462" },
      },
    ],
    tags: ["Kronične rane", "Hladna plazma"],
    image: {
      src: "/images/products/placeholders/plasmacure.svg",
      alt: "Ilustracija plazemske terapevtske tehnologije PlasmaCure",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    externalManufacturerUrl: "https://www.plasmacure.nl",
    updatedAt: "2026-11-16",
  },
  {
    slug: "sinocare-ican-cgm",
    manufacturer: "Sinocare",
    productName: "iCan CGM",
    originalName: "iCan Continuous Glucose Monitoring System",
    technology: "spremljanje-glukoze",
    shortDescription:
      "Sistem za neprekinjeno spremljanje glukoze, zasnovan za boljši vpogled v gibanje glukoze in podporo informiranemu dnevnemu upravljanju sladkorne bolezni.",
    intendedUse: "Neprekinjeno spremljanje glukoze pri ljudeh s sladkorno boleznijo.",
    environment: "Doma, pri vsakodnevni uporabi",
    howItWorks:
      "Senzor, nameščen na kožo, meri glukozo v medcelični tekočini in vrednosti pošilja v aplikacijo na telefonu.",
    manufacturerClaims: ["Senzor za do 15 dni nošenja", "Nove vrednosti v aplikaciji vsake 3 minute"],
    limitations: [
      "Vrednosti iz medcelične tekočine se lahko razlikujejo od meritev glukoze v krvi, zlasti ob hitrih spremembah.",
    ],
    warnings: ["Zdravljenje prilagajajte po navodilih zdravnika ali diabetologa."],
    evidence: [
      {
        kind: "proizvajalec",
        title: "Trajanje senzorja in pogostost meritev",
        summary:
          "Proizvajalec navaja do 15 dni nošenja senzorja in nove vrednosti v aplikaciji vsake 3 minute.",
        sources: [
          {
            label: "Sinocare (stran izdelka)",
            url: "https://en.sinocare.com/products/ican-cgm-15-days-continuous-glucose-monitoring",
          },
        ],
      },
      {
        kind: "proizvajalec",
        title: "Klinične raziskave za razširitev oznake CE",
        summary:
          "Proizvajalec navaja, da razširitev oznake CE temelji na multicentričnih kliničnih raziskavah v ZDA in Nemčiji.",
        date: "2025-09-12",
        sources: [
          { label: "Sinocare (sporočilo za javnost)", url: "https://sinocare.com/en/newsinfo_1227.html" },
        ],
      },
    ],
    regulatory: [
      {
        region: "EU",
        status: "CE-oznaka (MDR), uporaba od 2. leta starosti",
        basis: "proizvajalec",
        source: { label: "Sinocare, julij 2025", url: "https://sinocare.com/en/newsinfo_1214.html" },
      },
      {
        region: "EU",
        status: "Razširitev: nošenje na zadnji strani nadlakti od 13. leta starosti",
        basis: "proizvajalec",
        source: { label: "Sinocare, september 2025", url: "https://sinocare.com/en/newsinfo_1227.html" },
      },
    ],
    tags: ["Sladkorna bolezen", "CGM", "Aplikacija"],
    image: {
      src: "/images/products/placeholders/sinocare-ican-cgm.svg",
      alt: "Ilustracija sistema iCan za neprekinjeno spremljanje glukoze",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    externalManufacturerUrl: "https://www.sinocare.com",
    updatedAt: "2026-11-16",
  },
  {
    slug: "germitec-chronos",
    manufacturer: "Germitec",
    productName: "Chronos® UV-C dezinfekcija",
    originalName: "Chronos® UV-C High-Level Disinfection",
    technology: "dezinfekcija",
    shortDescription:
      "Avtomatizirana UV-C dezinfekcija visoke ravni za združljive ultrazvočne sonde, zasnovana za podporo preprečevanju okužb in učinkovitejšim kliničnim procesom.",
    intendedUse:
      "Dezinfekcija visoke ravni površin združljivih ultrazvočnih sond z UV-C svetlobo v zdravstvenih ustanovah.",
    environment: "Zdravstvene ustanove; uporablja ga usposobljeno osebje",
    howItWorks:
      "Sonda se namesti v zaprto komoro, kjer jo UV-C svetloba razkuži brez kemičnih dezinfekcijskih sredstev.",
    manufacturerClaims: ["Dezinfekcija brez kemičnih sredstev", "Kratek cikel dezinfekcije"],
    limitations: [
      "Po indikaciji FDA je namenjen zunanjim, transvaginalnim in transrektalnim ultrazvočnim sondam brez lumnov in brez vdolbin ali kanalov, globljih od njihove širine.",
    ],
    warnings: ["Ni namenjen osebni uporabi.", "Za pravilno delovanje je potrebno redno vzdrževanje."],
    evidence: [
      {
        kind: "regulativa",
        title: "Odobritev FDA po postopku De Novo",
        summary:
          "FDA je trženje naprave v ZDA odobrila po postopku De Novo. Odločitev temelji na testiranju dezinfekcije v simulirani in klinični uporabi; ne gre za primerjavo učinkovitosti z drugimi metodami.",
        date: "2024-08-28",
        sources: [
          { label: "Podatki FDA (Innolitics)", url: "https://fda.innolitics.com/device/DEN230067" },
          { label: "Business Wire", url: "https://businesswire.com/news/home/20240904817488/en" },
        ],
      },
    ],
    regulatory: [
      {
        region: "ZDA",
        status: "FDA De Novo (DEN230067), razred II",
        basis: "regulativa",
        source: { label: "Podatki FDA (Innolitics)", url: "https://fda.innolitics.com/device/DEN230067" },
      },
      { region: "EU", status: "Status oznake CE preverjamo", basis: "v-preverjanju" },
    ],
    tags: ["Za zdravstvene ustanove", "UV-C", "Ultrazvočne sonde"],
    image: {
      src: "/images/products/placeholders/germitec-chronos.svg",
      alt: "Ilustracija sistema Chronos® za UV-C dezinfekcijo ultrazvočnih sond",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    externalManufacturerUrl: "https://www.germitec.com",
    updatedAt: "2026-11-16",
  },
];
