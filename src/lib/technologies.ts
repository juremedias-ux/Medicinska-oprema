import { technologies } from "@/data/technologies";
import type { Technology, TechnologyId } from "@/types/technology";

export function getAllTechnologies(): readonly Technology[] {
  return technologies;
}

export function getRehabilitationTechnologies(): Technology[] {
  return technologies.filter((technology) => technology.rehabilitation);
}

export function getTechnology(id: TechnologyId): Technology {
  const technology = technologies.find((item) => item.id === id);
  if (!technology) throw new Error(`Unknown technology: ${id}`);
  return technology;
}

export function getTechnologyIds(): TechnologyId[] {
  return technologies.map((technology) => technology.id);
}

export function getTechnologyAnchor(id: TechnologyId): string {
  return `tehnologija-${id}`;
}
