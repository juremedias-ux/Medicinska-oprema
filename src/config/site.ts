/**
 * Central site configuration.
 *
 * ⚠️  PRED OBJAVO PREVERITE / ZAMENJAJTE vrednosti, označene z "ZAMENJAJTE".
 *     (Kontaktni podatki in pravni podatki podjetja niso bili podani in so
 *     nadomestne vrednosti.)
 */
export const siteConfig = {
  name: "Medcore",
  tagline: "Izbrane tehnologije za boljšo oskrbo",
  title: "Medcore | Inovativne medicinske in fizioterapevtske tehnologije",
  description:
    "Medcore na slovenski trg uvaja inovativne medicinske in fizioterapevtske produkte iz Evrope in ZDA. Celjenje ran, diagnostika, dezinfekcija in digitalne rešitve.",
  shortDescription:
    "Medcore na slovenski trg uvaja izbrane inovativne medicinske in fizioterapevtske tehnologije ter zagotavlja lokalno distribucijo in podporo pri uvajanju.",
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
    lastUpdated: "7. november 2026",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Homepage section anchors — single source of truth for in-page navigation. */
export const sectionIds = {
  products: "izdelki",
  about: "o-nas",
  why: "zakaj-medcore",
  notify: "obvestila",
  contact: "kontakt",
} as const;

export const mainNav: NavItem[] = [
  { label: "Izdelki", href: `/#${sectionIds.products}` },
  { label: "O nas", href: `/#${sectionIds.about}` },
  { label: "Zakaj Medcore", href: `/#${sectionIds.why}` },
  { label: "Kontakt", href: `/#${sectionIds.contact}` },
];

export const footerNav: NavItem[] = [
  { label: "Izdelki", href: `/#${sectionIds.products}` },
  { label: "O nas", href: `/#${sectionIds.about}` },
  { label: "Kontakt", href: `/#${sectionIds.contact}` },
];

export const legalNav: NavItem[] = [
  { label: "Politika zasebnosti", href: "/privacy" },
  { label: "Pogoji uporabe", href: "/terms" },
];

export const notifyCtaLabel = "Obvesti me ob dostopnosti";

export const medicalDisclaimer =
  "Informacije na spletni strani so namenjene zdravstvenim strokovnjakom, poslovnim partnerjem in končnim uporabnikom. Ne nadomeščajo profesionalnega medicinskega nasveta, diagnoze ali zdravljenja.";
