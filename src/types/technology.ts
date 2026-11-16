/**
 * Technology categories and rehabilitation needs.
 *
 * Needs (body regions, conditions, goals) are a way to navigate the content.
 * They never imply a diagnosis.
 */

export type TechnologyId =
  | "elektrostimulacija"
  | "udarni-valovi"
  | "pasivno-gibanje"
  | "robotika"
  | "senzorji"
  | "virtualna-resnicnost"
  | "oteklina"
  | "ortoze"
  | "oskrba-ran"
  | "spremljanje-glukoze"
  | "dezinfekcija";

export type TechnologyIcon =
  | "electrodes"
  | "waves"
  | "joint"
  | "exoskeleton"
  | "sensor"
  | "headset"
  | "compression"
  | "brace"
  | "dressing"
  | "glucose"
  | "uv";

export interface Technology {
  id: TechnologyId;
  name: string;
  /** Short label for chips and filters. */
  shortName: string;
  icon: TechnologyIcon;
  /** How it works, in plain language. */
  howItWorks: string;
  /** What it is typically used for — explains the link to a need. */
  usedFor: string;
  /** Typical environment of use. */
  environment: string;
  /** Honest, general summary of the evidence. */
  evidence: string;
  /** When professional judgement is needed / precautions. */
  professionalNote: string;
  /** Shown in the rehabilitation explorer and the technology overview. */
  rehabilitation: boolean;
}

export type NeedType = "predel" | "stanje" | "cilj";

export interface Need {
  id: string;
  type: NeedType;
  label: string;
  /** Extra search terms (synonyms, colloquial words). */
  keywords: string[];
  /** Why these technologies are considered for this need. */
  intro: string;
  /** When to seek professional assessment. */
  seekCare: string;
  technologies: TechnologyId[];
}

export type BodyRegionHotspot = {
  /** Position in % of the body-map viewBox. */
  x: number;
  y: number;
};
