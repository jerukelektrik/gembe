import { describe, expect, it } from 'vitest';
import { detectBrand } from './brands';

describe('detectBrand', () => {
  it('detects the eight supported brands from profile names', () => {
    expect(detectBrand('Ruangguru Bandung Dago').brandId).toBe('ruangguru');
    expect(detectBrand('Brain Academy Center Bekasi').brandId).toBe('brainacademy');
    expect(detectBrand('Math Champs Surabaya Barat').brandId).toBe('mathchamps');
    expect(detectBrand('English Academy Jakarta Selatan').brandId).toBe('englishacademy');
    expect(detectBrand('Kalananti BSD').brandId).toBe('kalananti-ruangguru-coding');
    expect(detectBrand('Ruangguru Coding Depok').brandId).toBe('kalananti-ruangguru-coding');
    expect(detectBrand('Work Abroad Academy Jakarta').brandId).toBe('workabroad-academy');
    expect(detectBrand('Ruangguru Privat Malang').brandId).toBe('ruangguru-privat');
    expect(detectBrand('Alta Global School Bekasi').brandId).toBe('altaglobal-school');
  });

  it('marks unclear names as needs review', () => {
    expect(detectBrand('Cabang Pak Budi Depok')).toEqual({
      brandId: 'needs-review',
      confidence: 'low'
    });
  });
});
