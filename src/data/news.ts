/**
 * News items. Each item needs a date, a source and a type that separates
 * market news from research and regulatory decisions. `meaning` explains
 * what the news does — and does not — say about treatment.
 */
export type NewsKind = "trg" | "regulativa" | "raziskava";

export interface NewsItem {
  id: string;
  /** ISO date or partial date ("2025-07"). */
  date: string;
  kind: NewsKind;
  title: string;
  summary: string;
  meaning: string;
  source: { label: string; url: string };
  /** Related product on the platform, if any. */
  productSlug?: string;
}

export const newsKindLabels: Record<NewsKind, string> = {
  trg: "Novost na trgu",
  regulativa: "Regulativa",
  raziskava: "Raziskava",
};

export const news: NewsItem[] = [
  {
    id: "piomic-financiranje-2026",
    date: "2026-09-17",
    kind: "trg",
    title: "Piomic Medical pridobil 25 milijonov USD rastnega financiranja",
    summary:
      "Podjetje, ki razvija terapevtski sistem COMS® One za kronične rane, je objavilo novo financiranje, ki ga vodi Swisscanto.",
    meaning: "Financiranje podpira razvoj in širitev podjetja; ne pomeni dokazane klinične učinkovitosti.",
    source: {
      label: "MedTech Dive (sporočilo za javnost)",
      url: "https://www.medtechdive.com/press-release/20260917-swisscanto-leads-usd-25m-growth-financing-for-piomic-medical/",
    },
    productSlug: "piomic-coms-one",
  },
  {
    id: "nanordica-financiranje-2026",
    date: "2026-06-10",
    kind: "trg",
    title: "Nanordica Medical zbrala 1,6 milijona EUR za uvedbo antibakterijskega povoja",
    summary: "Estonsko podjetje je zbralo sredstva za komercializacijo povoja za kronične rane.",
    meaning: "Novost na trgu; o učinkovitosti povoja govorijo le objavljene raziskave.",
    source: {
      label: "Tech.eu",
      url: "https://tech.eu/2026/06/10/nanordica-medical-raises-1-6m-to-bring-antibiotic-free-chronic-wound-treatment-to-market",
    },
    productSlug: "nanordica-antibacterial-wound-dressing",
  },
  {
    id: "sinocare-ce-2025",
    date: "2025-09-12",
    kind: "regulativa",
    title: "Sistem iCan CGM z razširjeno oznako CE za nošenje na nadlakti",
    summary:
      "Proizvajalec je sporočil razširitev oznake CE za nošenje senzorja na zadnji strani nadlakti pri osebah od 13. leta starosti.",
    meaning: "Regulativna odločitev določa namen in pogoje uporabe; ni primerjava z drugimi sistemi.",
    source: { label: "Sinocare (sporočilo za javnost)", url: "https://sinocare.com/en/newsinfo_1227.html" },
    productSlug: "sinocare-ican-cgm",
  },
  {
    id: "nanordica-pilot-2025",
    date: "2025",
    kind: "raziskava",
    title: "Objavljena pilotna raziskava obloge z nanodelci srebra in bakra",
    summary:
      "V reviji Journal of Wound Care je objavljena randomizirana pilotna raziskava pri okuženih diabetičnih razjedah na stopalu.",
    meaning:
      "Majhna pilotna raziskava daje prve podatke; za zanesljive zaključke so potrebne večje raziskave.",
    source: { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/41926471/" },
    productSlug: "nanordica-antibacterial-wound-dressing",
  },
  {
    id: "plasmacure-financiranje-2025",
    date: "2025-07",
    kind: "trg",
    title: "PlasmaCure pridobil 6 milijonov EUR za širitev tehnologije PLASOMA",
    summary:
      "Nizozemsko podjetje je objavilo naložbo in financiranje za vstop na ameriški trg za sistem s hladno plazmo.",
    meaning: "Novost na trgu; ne pomeni odobritve v ZDA ali dokazane večje učinkovitosti.",
    source: {
      label: "High Tech Campus Eindhoven",
      url: "https://blog.hightechcampus.com/htce/plasmacure-secures-6m-investment-plus-u.s.-market-financing-to-accelerate-global-expansion-of-plasoma-technology",
    },
    productSlug: "plasmacure",
  },
  {
    id: "germitec-fda-2024",
    date: "2024-08-28",
    kind: "regulativa",
    title: "FDA odobrila UV-C sistem Chronos® po postopku De Novo",
    summary:
      "Ameriška agencija FDA je odobrila trženje sistema za dezinfekcijo visoke ravni združljivih ultrazvočnih sond z UV-C svetlobo.",
    meaning:
      "Odobritev omogoča trženje za navedeni namen v ZDA; ne gre za primerjavo z drugimi metodami dezinfekcije.",
    source: { label: "Podatki FDA (Innolitics)", url: "https://fda.innolitics.com/device/DEN230067" },
    productSlug: "germitec-chronos",
  },
];
