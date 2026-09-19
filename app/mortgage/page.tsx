import React from 'react';
import { SEED_MORTGAGE_RATES } from '../../lib/fallback-data';
import { Percent, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function MortgagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">Mortgage Rates & Borrowing Costs</h1>
        <p className="text-sm text-text-muted">Primary Mortgage Market Survey (PMMS) weekly series from Freddie Mac</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEED_MORTGAGE_RATES.map((rate) => (
          <div key={rate.product} className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-text">{rate.product === '30y_fixed' ? '30-Year Fixed-Rate Mortgage' : '15-Year Fixed-Rate Mortgage'}</h2>
                <div className="text-xs text-text-muted font-mono">Week ending {rate.weekEnding}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-brand-soft text-brand-ink text-xs font-mono font-semibold">
                {rate.ratePct}%
              </span>
            </div>

            <div className="p-4 bg-bg-subtle rounded-lg border border-border text-sm space-y-2">
              <div className="flex justify-between text-xs text-text-muted">
                <span>Average Points & Fees</span>
                <span className="font-mono text-text font-bold">{rate.points} pt</span>
              </div>
              <div className="flex justify-between text-xs text-text-muted">
                <span>Authority Source</span>
                <span className="font-mono text-text">{rate.source}</span>
              </div>
            </div>

            <div className="text-xs text-text-faint">
              Published weekly on Thursdays. Does not include taxes, insurance, or private mortgage insurance (PMI).
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
