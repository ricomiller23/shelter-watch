import { HousingObservation, MortgageRate } from './measures';

export interface MetroData {
  id: string;
  name: string;
  state: string;
  region: 'Northeast' | 'West' | 'Midwest' | 'South';
  medianSalePrice: number;
  repeatSalesIndex: number;
  yoyChangePct: number;
  zoriAskingRent: number;
  rentYoyPct: number;
  periodEnd: string;
  releasedAt: string;
  lagMonths: number;
  method: 'repeat_sales' | 'hedonic';
  sourceUrl: string;
  sourceName: string;
}

export const SEED_MORTGAGE_RATES: MortgageRate[] = [
  {
    product: '30y_fixed',
    ratePct: 6.95,
    points: 0.2,
    weekEnding: '2026-09-17',
    source: 'Freddie Mac Primary Mortgage Market Survey (PMMS)',
    documentUrl: 'https://www.freddiemac.com/pmms'
  },
  {
    product: '15y_fixed',
    ratePct: 6.26,
    points: 0.2,
    weekEnding: '2026-09-17',
    source: 'Freddie Mac Primary Mortgage Market Survey (PMMS)',
    documentUrl: 'https://www.freddiemac.com/pmms'
  }
];

export const SEED_METROS: MetroData[] = [
  {
    id: 'nyc',
    name: 'New York-Newark-Jersey City',
    state: 'NY-NJ-PA',
    region: 'Northeast',
    medianSalePrice: 650000,
    repeatSalesIndex: 342.8,
    yoyChangePct: 3.4,
    zoriAskingRent: 3650,
    rentYoyPct: 4.8,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/NYSTHPI',
    sourceName: 'S&P Cotality Case-Shiller NY'
  },
  {
    id: 'lax',
    name: 'Los Angeles-Long Beach-Anaheim',
    state: 'CA',
    region: 'West',
    medianSalePrice: 885000,
    repeatSalesIndex: 418.2,
    yoyChangePct: 2.8,
    zoriAskingRent: 2980,
    rentYoyPct: 2.1,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/LXXRNSA',
    sourceName: 'S&P Cotality Case-Shiller LA'
  },
  {
    id: 'chi',
    name: 'Chicago-Naperville-Elgin',
    state: 'IL-IN-WI',
    region: 'Midwest',
    medianSalePrice: 345000,
    repeatSalesIndex: 228.6,
    yoyChangePct: 4.2,
    zoriAskingRent: 2150,
    rentYoyPct: 3.9,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/CHXRNSA',
    sourceName: 'S&P Cotality Case-Shiller Chicago'
  },
  {
    id: 'dfw',
    name: 'Dallas-Fort Worth-Arlington',
    state: 'TX',
    region: 'South',
    medianSalePrice: 410000,
    repeatSalesIndex: 324.1,
    yoyChangePct: 1.1,
    zoriAskingRent: 1920,
    rentYoyPct: 0.8,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/DAXRNSA',
    sourceName: 'S&P Cotality Case-Shiller Dallas'
  },
  {
    id: 'mia',
    name: 'Miami-Fort Lauderdale-Pompano',
    state: 'FL',
    region: 'South',
    medianSalePrice: 495000,
    repeatSalesIndex: 435.4,
    yoyChangePct: 5.6,
    zoriAskingRent: 2840,
    rentYoyPct: 4.2,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/MIXRNSA',
    sourceName: 'S&P Cotality Case-Shiller Miami'
  },
  {
    id: 'phx',
    name: 'Phoenix-Mesa-Chandler',
    state: 'AZ',
    region: 'West',
    medianSalePrice: 440000,
    repeatSalesIndex: 338.9,
    yoyChangePct: 0.9,
    zoriAskingRent: 1980,
    rentYoyPct: -0.4,
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    method: 'repeat_sales',
    sourceUrl: 'https://fred.stlouisfed.org/series/PHXRNSA',
    sourceName: 'S&P Cotality Case-Shiller Phoenix'
  }
];

export const SEED_HOUSING_OBSERVATIONS: HousingObservation[] = [
  {
    id: 'cs-us-nsa-2026-06',
    sourceId: 'sp-case-shiller',
    seriesId: 'CSUSHPINSA',
    geographyId: 'US',
    geographyName: 'United States (National Composite)',
    measureKind: 'price_index',
    value: 336.663,
    unit: 'index_points',
    seasonalAdjustment: 'nsa',
    periodStart: '2026-04-01',
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    documentUrl: 'https://fred.stlouisfed.org/series/CSUSHPINSA',
    isSeed: true
  },
  {
    id: 'cs-us-sa-2026-06',
    sourceId: 'sp-case-shiller',
    seriesId: 'CSUSHPISA',
    geographyId: 'US',
    geographyName: 'United States (National Composite SA)',
    measureKind: 'price_index',
    value: 331.893,
    unit: 'index_points',
    seasonalAdjustment: 'sa',
    periodStart: '2026-04-01',
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    documentUrl: 'https://fred.stlouisfed.org/series/CSUSHPISA',
    isSeed: true
  },
  {
    id: 'cs-20city-yoy-2026-06',
    sourceId: 'sp-case-shiller',
    seriesId: 'SPCS20RNSA_YOY',
    geographyId: 'US-20CITY',
    geographyName: '20-City Composite YoY',
    measureKind: 'price_index',
    value: 2.1,
    unit: 'pct',
    seasonalAdjustment: 'nsa',
    periodStart: '2026-04-01',
    periodEnd: '2026-06-30',
    releasedAt: '2026-08-27',
    lagMonths: 2,
    documentUrl: 'https://www.spglobal.com/spdji/en/index-family/indicators/sp-cotality-case-shiller/',
    isSeed: true
  }
];
