import { describe, it, expect } from 'vitest';
import { sumHousingValues, calculatePaymentShock, HousingObservation } from '../lib/measures';

describe('SHELTER.WATCH — Housing Invariant & Unit Guard Tests', () => {
  const indexObs: HousingObservation = {
    id: 'obs-1',
    sourceId: 'cs',
    seriesId: 'CSUSHPINSA',
    geographyId: 'US',
    geographyName: 'US National',
    measureKind: 'price_index',
    value: 336.663,
    unit: 'index_points',
    seasonalAdjustment: 'nsa',
    periodStart: '2026-04-01',
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    documentUrl: 'https://fred.stlouisfed.org'
  };

  const dollarObs: HousingObservation = {
    id: 'obs-2',
    sourceId: 'zillow',
    seriesId: 'MEDIAN_PRICE',
    geographyId: 'NYC',
    geographyName: 'New York Metro',
    measureKind: 'median_sale_price',
    value: 650000,
    unit: 'usd',
    seasonalAdjustment: 'nsa',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-31',
    releasedAt: '2026-08-20',
    lagMonths: 1,
    documentUrl: 'https://zillow.com'
  };

  const saIndexObs: HousingObservation = {
    ...indexObs,
    id: 'obs-3',
    seasonalAdjustment: 'sa',
    value: 331.893
  };

  it('strictly throws when attempting to sum an index value with a dollar price', () => {
    expect(() => sumHousingValues(indexObs, dollarObs)).toThrow(/An index is not a dollar price/);
  });

  it('strictly throws when attempting to combine SA and NSA series directly', () => {
    expect(() => sumHousingValues(indexObs, saIndexObs)).toThrow(/Cannot combine SA.*and NSA/);
  });

  it('calculates derived payment shock with explicit inputs', () => {
    const res = calculatePaymentShock({
      homePrice: 400000,
      downPaymentPct: 20,
      ratePct: 6.95,
      loanTermYears: 30
    });
    expect(res.monthlyPayment).toBeGreaterThan(2000);
    expect(res.formulaNote).toContain('$400,000');
    expect(res.formulaNote).toContain('6.95%');
  });
});
