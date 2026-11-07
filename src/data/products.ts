import type { Product } from "@/types/product";
import { notifyCtaLabel } from "@/config/site";

/**
 * Medcore product portfolio — single source of truth.
 *
 * Adding a product:
 *   1. Add an object to this array (unique `slug`).
 *   2. Add its image to /public/images/products/.
 *   The homepage card, form option, sitemap entry and /products/[slug] page
 *   are generated automatically.
 *
 * Images: files in /public/images/products/placeholders/ are temporary
 * illustrations (`isPlaceholder: true`). Replace them with official product
 * photography from the manufacturer and set `isPlaceholder` to false.
 *
 * Content: descriptions only restate the approved positioning. Do not add
 * clinical or performance claims that are not supported by the
 * manufacturer's approved documentation (IFU, CE declaration).
 */
export const products: Product[] = [
  {
    slug: "piomic-coms-one",
    manufacturer: "Piomic Medical",
    productName: "COMS® One",
    originalName: "COMS® One Therapy System",
    formLabel: "Piomic — COMS® One",
    category: "Oskrba ran",
    shortDescription:
      "Prenosljiv, nenapadljiv terapevtski sistem, namenjen podpori celjenja kroničnih ran na nogah in stopalih, v dopolnitvi standardne oskrbe.",
    longDescription:
      "COMS® One je prenosljiv in nenapadljiv terapevtski sistem podjetja Piomic Medical, namenjen podpori celjenja kroničnih ran na nogah in stopalih. Terapija se uporablja kot dopolnilo standardni oskrbi ran in je ne nadomešča.\n\nSistem je CE označen v Evropski uniji. Medcore pripravlja njegovo uvedbo na slovenski trg; podrobnejše informacije o uporabi, indikacijah ter podpori pri uvajanju v klinično prakso bomo objavili ob uvedbi.",
    benefits: ["Celjenje ran", "Nenapadljiva terapija", "Kronične rane", "CE oznaka v EU"],
    image: {
      src: "/images/products/placeholders/piomic-coms-one.svg",
      alt: "Ilustracija terapevtskega sistema COMS® One",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    ctaLabel: notifyCtaLabel,
    externalManufacturerUrl: "https://www.piomic.com",
    regulatoryNote: "COMS® One je CE označen v EU. Dostopnost v Sloveniji se pripravlja.",
  },
  {
    slug: "nanordica-antibacterial-wound-dressing",
    manufacturer: "Nanordica Medical",
    productName: "Nanordica® antibakterijski povoj",
    originalName: "Nanordica® Advanced Antibacterial Wound Dressing",
    formLabel: "Nanordica — Antibakterijski povoj",
    category: "Oskrba ran",
    shortDescription:
      "Napreden antibakterijski povoj s tehnologijo Premotiv®, zasnovan za pomoč pri preprečevanju okužb in podpori zapiranja ran.",
    longDescription:
      "Nanordica® Advanced Antibacterial Wound Dressing je napreden antibakterijski povoj podjetja Nanordica Medical. Temelji na nanotehnologiji Premotiv®, zasnovani za pomoč pri preprečevanju okužb in podpori zapiranja ran.\n\nPovoj je namenjen sodobni oskrbi ran, vključno s kroničnimi ranami. Medcore pripravlja uvedbo izdelka na slovenski trg; tehnične podatke in navodila za uporabo bomo objavili ob uvedbi.",
    benefits: ["Celjenje ran", "Antibakterijska zaščita", "Kronične rane", "Napredna nanotehnologija"],
    image: {
      src: "/images/products/placeholders/nanordica-antibacterial-wound-dressing.svg",
      alt: "Ilustracija antibakterijskega povoja Nanordica®",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    ctaLabel: notifyCtaLabel,
    externalManufacturerUrl: "https://www.nanordica.com",
  },
  {
    slug: "plasmacure",
    manufacturer: "PlasmaCure",
    productName: "Plazemske terapevtske rešitve",
    originalName: "Plasma-based therapy solutions",
    formLabel: "PlasmaCure — Plazemske terapije",
    category: "Napredne terapije",
    shortDescription: "Inovativne rešitve na osnovi plazme za sodobno oskrbo ran in zdravljenje tkiv.",
    longDescription:
      "PlasmaCure razvija inovativne rešitve na osnovi plazme za sodobno oskrbo ran in zdravljenje tkiv. Plazemska tehnologija sodi med napredne terapevtske pristope, namenjene zdravstvenim strokovnjakom na področju oskrbe ran in fizioterapije.\n\nMedcore pripravlja uvedbo rešitev PlasmaCure na slovenski trg. Podrobnosti o posameznih izdelkih, namenu uporabe in možnostih sodelovanja bomo objavili ob uvedbi.",
    benefits: ["Plazemska tehnologija", "Oskrba ran", "Fizioterapija", "Napredne terapije"],
    image: {
      src: "/images/products/placeholders/plasmacure.svg",
      alt: "Ilustracija plazemske terapevtske tehnologije PlasmaCure",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    ctaLabel: notifyCtaLabel,
    externalManufacturerUrl: "https://www.plasmacure.nl",
  },
  {
    slug: "sinocare-ican-cgm",
    manufacturer: "Sinocare",
    productName: "iCan CGM",
    originalName: "iCan Continuous Glucose Monitoring System",
    formLabel: "Sinocare — iCan CGM",
    category: "Spremljanje glukoze",
    shortDescription:
      "Sistem za neprekinjeno spremljanje glukoze, zasnovan za boljši vpogled v gibanje glukoze in podporo informiranimu dnevnemu upravljanju sladkorne bolezni.",
    longDescription:
      "iCan je sistem podjetja Sinocare za neprekinjeno spremljanje glukoze (CGM). Zasnovan je za boljši vpogled v gibanje glukoze in trende ter za podporo informiranemu dnevnemu upravljanju sladkorne bolezni v sodelovanju z zdravstvenim timom.\n\nMedcore pripravlja uvedbo sistema na slovenski trg, tako za zdravstvene ustanove kot za končne uporabnike. Informacije o dostopnosti, uporabi in podpori bomo objavili ob uvedbi.",
    benefits: [
      "Neprekinjeno spremljanje glukoze",
      "CGM tehnologija",
      "Digitalno zdravstvo",
      "Vpogled v trende",
    ],
    image: {
      src: "/images/products/placeholders/sinocare-ican-cgm.svg",
      alt: "Ilustracija sistema iCan za neprekinjeno spremljanje glukoze",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    ctaLabel: notifyCtaLabel,
    externalManufacturerUrl: "https://www.sinocare.com",
  },
  {
    slug: "germitec-chronos",
    manufacturer: "Germitec",
    productName: "Chronos® UV-C dezinfekcija",
    originalName: "Chronos® UV-C High-Level Disinfection",
    formLabel: "Germitec — UV-C dezinfekcija",
    category: "Preprečevanje okužb",
    shortDescription:
      "Avtomatizirana UV-C dezinfekcija visoke ravni za združljive ultrazvočne sonde, zasnovana za podporo preprečevanju okužb in učinkovitejšim kliničnim procesom.",
    longDescription:
      "Chronos® podjetja Germitec je sistem za avtomatizirano dezinfekcijo visoke ravni z UV-C svetlobo, namenjen združljivim ultrazvočnim sondam. Postopek ne temelji na kemičnih dezinfekcijskih sredstvih in je zasnovan za podporo preprečevanju okužb ter učinkovitejšim kliničnim procesom.\n\nMedcore pripravlja uvedbo sistema na slovenski trg. Seznam združljivih sond, tehnične specifikacije in možnosti predstavitve v vaši ustanovi bomo objavili ob uvedbi.",
    benefits: ["UV-C dezinfekcija", "Preprečevanje okužb", "Ultrazvočne sonde", "Hitro in kemično neodvisno"],
    image: {
      src: "/images/products/placeholders/germitec-chronos.svg",
      alt: "Ilustracija sistema Chronos® za UV-C dezinfekcijo ultrazvočnih sond",
      width: 1200,
      height: 900,
      isPlaceholder: true,
    },
    availabilityStatus: "coming-soon",
    ctaLabel: notifyCtaLabel,
    externalManufacturerUrl: "https://www.germitec.com",
  },
];
