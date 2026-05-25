import type { BrandConfidence, BrandId } from './types';

export interface BrandDefinition {
  id: Exclude<BrandId, 'needs-review'>;
  label: string;
  patterns: RegExp[];
}

export const BRANDS: BrandDefinition[] = [
  { id: 'ruangguru-privat', label: 'Ruangguru Privat', patterns: [/ruangguru\s+privat/i] },
  { id: 'kalananti-ruangguru-coding', label: 'Kalananti / Ruangguru Coding', patterns: [/kalananti/i, /ruangguru\s+coding/i] },
  { id: 'brainacademy', label: 'Brain Academy', patterns: [/brain\s*academy/i] },
  { id: 'mathchamps', label: 'Math Champs', patterns: [/math\s*champs/i] },
  { id: 'englishacademy', label: 'English Academy', patterns: [/english\s*academy/i] },
  { id: 'workabroad-academy', label: 'Work Abroad Academy', patterns: [/work\s*abroad\s*academy/i] },
  { id: 'altaglobal-school', label: 'Alta Global School', patterns: [/alta\s*global\s*school/i, /altaglobal\s*school/i] },
  { id: 'ruangguru', label: 'Ruangguru', patterns: [/ruangguru/i] }
];

export function detectBrand(profileName: string): { brandId: BrandId; confidence: BrandConfidence } {
  const match = BRANDS.find((brand) => brand.patterns.some((pattern) => pattern.test(profileName)));
  if (!match) {
    return { brandId: 'needs-review', confidence: 'low' };
  }

  return { brandId: match.id, confidence: 'high' };
}

export function getBrandLabel(brandId: BrandId): string {
  if (brandId === 'needs-review') return 'Needs Review';
  return BRANDS.find((brand) => brand.id === brandId)?.label ?? 'Needs Review';
}
