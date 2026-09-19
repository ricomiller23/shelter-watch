import React from 'react';
import Link from 'next/link';
import { SEED_HOUSING_OBSERVATIONS, SEED_MORTGAGE_RATES } from '../lib/fallback-data';
import { calculatePaymentShock } from '../lib/measures';
import { AlertCircle, TrendingUp, Calendar, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const pmms30 = SEED_MORTGAGE_RATES.find(m => m.product === '30y_fixed');
  const nationalCsNsa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPINSA');
  const nationalCsSa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPISA');
  const yoy20 = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'SPCS20RNSA_YOY');
  const metroObs = SEED_HOUSING_OBSERVATIONS.filter(o => o.measureKind === 'median_sale_price');

  return (
    <div className="space-y-8">
      {/* Notice Banner */}
      <div className="bg-brand-soft border border-brand/20 p-4 rounded-xl flex items-start space-x-3 text-sm text-brand-ink">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
        <div className="space-y-1">
          <div className="font-semibold">CORE CORRECTNESS PRINCIPLE: An index is not a price.</div>
          <div className="text-xs text-text-body">
            The Case-Shiller index (336.663) is a repeat-sales index normalized to Jan 2000 = 100. It measures the rate of change for a consistent basket, not dollar prices. 
            All Case-Shiller figures reflect a 3-month moving average with a strict 2-month reporting lag.
          </div>
        </div>
      </div>

      {/* National Header Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-bg-subtle border border-border p-5 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-text-muted flex items-center justify-between">
            <span>30Y FIXED MORTGAGE (PMMS)</span>
            <span className="bg-live/10 text-live font-mono px-1.5 py-0.5 rounded text-[10px]">WEEKLY</span>
          </div>
          <div className="text-3xl font-bold font-mono text-text">{pmms30?.ratePct}%</div>
          <div className="text-xs text-text-faint">Week ending {pmms30?.weekEnding} · Freddie Mac</div>
        </div>

        <div className="bg-bg-subtle border border-border p-5 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-text-muted flex items-center justify-between">
            <span>NATIONAL INDEX (NSA)</span>
            <span className="bg-brand/10 text-brand font-mono px-1.5 py-0.5 rounded text-[10px]">LAG: 2M</span>
          </div>
          <div className="text-3xl font-bold font-mono text-text">{nationalCsNsa?.value}</div>
          <div className="text-xs text-text-faint">Period: June 2026 · Released: Aug 27, 2026</div>
        </div>

        <div className="bg-bg-subtle border border-border p-5 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-text-muted flex items-center justify-between">
            <span>NATIONAL INDEX (SA)</span>
            <span className="bg-brand/10 text-brand font-mono px-1.5 py-0.5 rounded text-[10px]">LAG: 2M</span>
          </div>
          <div className="text-3xl font-bold font-mono text-text">{nationalCsSa?.value}</div>
          <div className="text-xs text-text-faint">Seasonally Adjusted · Jan 2000=100</div>
        </div>

        <div className="bg-bg-subtle border border-border p-5 rounded-xl space-y-1">
          <div className="text-xs font-semibold text-text-muted flex items-center justify-between">
            <span>20-CITY COMPOSITE YoY</span>
            <span className="bg-up/10 text-up font-mono px-1.5 py-0.5 rounded text-[10px]">+2.1% YoY</span>
          </div>
          <div className="text-3xl font-bold font-mono text-up">+{yoy20?.value}%</div>
          <div className="text-xs text-text-faint">S&P Cotality Case-Shiller</div>
        </div>
      </div>

      {/* Metro-First Primary Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-xl font-bold font-display text-text">Metro Market Telemetry</h2>
            <p className="text-xs text-text-muted">Local median sale prices with derived monthly payment shock at current 6.95% PMMS borrowing rate</p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-bg-subtle border border-border font-mono">Metro-First</span>
            <span className="px-2.5 py-1 rounded bg-derived/10 text-derived font-mono">Payment Shock: 20% Down / 30Y</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {metroObs.map((metro) => {
            const shock = calculatePaymentShock({
              homePrice: metro.value,
              downPaymentPct: 20,
              ratePct: pmms30?.ratePct || 6.95,
              loanTermYears: 30
            });
            return (
              <div key={metro.id} className="bg-white border border-border rounded-xl p-5 shadow-sm hover:border-brand/40 transition-colors space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-text text-base">{metro.geographyName}</h3>
                    <div className="text-xs text-text-muted font-mono">{metro.geographyId} · Median Price</div>
                  </div>
                  <span className="px-2 py-0.5 bg-bg-subtle border border-border text-text-muted text-[10px] rounded font-mono">
                    Period {metro.periodEnd.slice(0, 7)} · released {metro.releasedAt}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-text-faint">MEDIAN HOME SALE PRICE</div>
                  <div className="text-2xl font-bold font-mono text-text">${metro.value.toLocaleString()}</div>
                </div>

                <div className="bg-bg-subtle p-3 rounded-lg border border-border/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-derived font-semibold">DERIVED PAYMENT SHOCK</span>
                    <span className="font-mono font-bold text-text">${shock.monthlyPayment.toLocaleString()}/mo</span>
                  </div>
                  <div className="text-[11px] text-text-muted font-mono leading-tight">{shock.formulaNote}</div>
                </div>

                <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-text-faint">
                  <span>Lag: {metro.lagMonths} month(s)</span>
                  <a href={metro.documentUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline flex items-center gap-0.5">
                    Source Audit <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
