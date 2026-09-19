// SHELTER.WATCH - Strict Measure Types & Domain Invariant Guards

export type MeasureKind = 
  | 'price_index'
  | 'median_sale_price'
  | 'rent_index'
  | 'rent_median'
  | 'mortgage_rate_30y'
  | 'mortgage_rate_15y'
  | 'affordability_ratio'
  | 'housing_starts'
  | 'permits'
  | 'vacancy_rate'
  | 'homelessness_count'
  | 'real_price_index';

export type SeasonalAdjustment = 'sa' | 'nsa' | 'none';

export interface HousingObservation {
  id: string;
  sourceId: string;
  seriesId: string;
  geographyId: string;
  geographyName: string;
  measureKind: MeasureKind;
  value: number;
  unit: 'index_points' | 'usd' | 'pct' | 'ratio' | 'count';
  seasonalAdjustment: SeasonalAdjustment;
  periodStart: string;
  periodEnd: string;
  releasedAt: string;
  lagMonths: number;
  isDerived?: boolean;
  derivationNote?: string;
  documentUrl: string;
  isSeed?: boolean;
}

export interface MortgageRate {
  product: '30y_fixed' | '15y_fixed' | 'arm';
  ratePct: number;
  points?: number;
  weekEnding: string;
  source: string;
  documentUrl: string;
}

// INVARIANT GUARD 1: An index is not a currency price.
// Adding an index level (e.g. 336.663) to a dollar price (e.g. $420,000) throws an error.
export function sumHousingValues(obsA: HousingObservation, obsB: HousingObservation): number {
  if (obsA.unit !== obsB.unit) {
    throw new Error(
      `[UNIT GUARD] Incompatible units: cannot combine '${obsA.unit}' (${obsA.measureKind}) with '${obsB.unit}' (${obsB.measureKind}). An index is not a dollar price!`
    );
  }
  if (obsA.seasonalAdjustment !== obsB.seasonalAdjustment) {
    throw new Error(
      `[SEASONAL ADJUSTMENT GUARD] Cannot combine SA ('${obsA.seasonalAdjustment}') and NSA ('${obsB.seasonalAdjustment}') series directly!`
    );
  }
  return obsA.value + obsB.value;
}

// INVARIANT GUARD 2: Validate that derived payment shock calculation includes all required inputs.
export function calculatePaymentShock(params: {
  homePrice: number;
  downPaymentPct: number;
  ratePct: number;
  loanTermYears: number;
}): { monthlyPayment: number; formulaNote: string } {
  if (params.homePrice <= 0 || params.ratePct <= 0 || params.loanTermYears <= 0) {
    throw new Error("[PAYMENT SHOCK GUARD] Invalid input parameters for payment shock calculation.");
  }
  const principal = params.homePrice * (1 - params.downPaymentPct / 100);
  const monthlyRate = params.ratePct / 100 / 12;
  const nPayments = params.loanTermYears * 12;
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, nPayments)) / (Math.pow(1 + monthlyRate, nPayments) - 1);
  return {
    monthlyPayment: Math.round(payment),
    formulaNote: `P&I on $${params.homePrice.toLocaleString()} at ${params.ratePct}% with ${params.downPaymentPct}% down over ${params.loanTermYears} yrs`
  };
}
