/**
 * Central site configuration.
 *
 * ⚠️  PRED OBJAVO PREVERITE / ZAMENJAJTE vrednosti, označene z "ZAMENJAJTE".
 *     (Kontaktni podatki in pravni podatki podjetja niso bili podani in so
 *     nadomestne vrednosti.)
 */
export const siteConfig = {
  name: "Medcore",
  tagline: "Dostop do svetovnih inovacij za rehabilitacijo",
  title: "Medcore | Napredne tehnologije za rehabilitacijo",
  description:
    "Odkrijte sodobne rešitve za rehabilitacijo z vsega sveta glede na predel telesa, stanje ali cilj. Pomagamo vam razumeti možnosti, izbrati produkt ter urediti uvoz in dobavo.",
  shortDescription:
    "Medcore povezuje raziskovanje svetovnih inovacij za rehabilitacijo, razumljivo predstavitev dokazov, pomoč pri izbiri ter organizacijo uvoza in dobave.",
  locale: "sl_SI",
  language: "sl",

  contact: {
    email: "info@medcore.si", // ZAMENJAJTE: uradni e-poštni naslov
    phoneDisplay: "+386 1 000 00 00", // ZAMENJAJTE: telefonska številka za prikaz
    phoneHref: "+38610000000", // ZAMENJAJTE: ista številka brez presledkov (za tel: povezavo)
    location: "Ljubljana, Slovenija",
    linkedinUrl: "https://www.linkedin.com/company/medcore", // ZAMENJAJTE: URL LinkedIn strani podjetja
  },

  /** Pravni podatki za politiko zasebnosti in pogoje uporabe. Prazna polja se ne izpišejo. */
  legal: {
    companyName: "Medcore", // ZAMENJAJTE: polno pravno ime družbe (npr. "Medcore d.o.o.")
    address: "Ljubljana, Slovenija", // ZAMENJAJTE: naslov sedeža
    registrationNumber: "", // ZAMENJAJTE: matična številka
    vatId: "", // ZAMENJAJTE: ID za DDV
    lastUpdated: "16. november 2026",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Homepage section anchors — single source of truth for in-page navigation. */
export const sectionIds = {
  explorer: "raziskovanje",
  technologies: "tehnologije",
  products: "produkti",
  howWeHelp: "kako-pomagamo",
  inquiry: "povprasevanje",
  criteria: "kako-presojamo",
  professionals: "za-strokovnjake",
  news: "novosti",
  newsletter: "novicke",
} as const;

export const mainNav: NavItem[] = [
  { label: "Raziskovanje", href: `/#${sectionIds.explorer}` },
  { label: "Tehnologije", href: `/#${sectionIds.technologies}` },
  { label: "Produkti", href: `/#${sectionIds.products}` },
  { label: "Kako pomagamo", href: `/#${sectionIds.howWeHelp}` },
  { label: "Novosti", href: `/#${sectionIds.news}` },
];

export const footerNav: NavItem[] = [
  { label: "Raziskovanje po potrebah", href: `/#${sectionIds.explorer}` },
  { label: "Tehnologije", href: `/#${sectionIds.technologies}` },
  { label: "Produkti", href: `/#${sectionIds.products}` },
  { label: "Kako pomagamo", href: `/#${sectionIds.howWeHelp}` },
  { label: "Kako presojamo tehnologije", href: `/#${sectionIds.criteria}` },
  { label: "Za strokovne uporabnike", href: `/#${sectionIds.professionals}` },
  { label: "Novosti", href: `/#${sectionIds.news}` },
];

export const legalNav: NavItem[] = [
  { label: "Politika zasebnosti", href: "/privacy" },
  { label: "Pogoji uporabe", href: "/terms" },
  { label: "Odjava od novičk", href: "/odjava" },
];

export const inquiryCtaLabel = "Pošljite povpraševanje";

/**
 * Inquiry form layout.
 * "email-only": only the e-mail field and the submit button; the product or
 *   technology of the clicked button is still stored with the inquiry.
 * "full": choice of inquiry type, product / requested product / technology
 *   and individual vs. professional.
 */
export const inquiryFormMode: "email-only" | "full" = "email-only";

export const medicalDisclaimer =
  "Platforma Medcore ne nadomešča diagnoze ali individualnega nasveta zdravstvenega strokovnjaka. Predstavljene informacije so namenjene razumevanju možnosti; o primernosti rešitve se posvetujte z zdravnikom ali fizioterapevtom.";
