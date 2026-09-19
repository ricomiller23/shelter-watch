import React from 'react';

export default function MethodPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">SHELTER.WATCH Methodology & Correctness Directives</h1>
        <p className="text-sm text-text-muted">The core invariant principles that protect housing data integrity</p>
      </div>

      <div className="space-y-4 text-sm text-text-body leading-relaxed">
        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">1. An Index Is Not a Price</h2>
          <p className="text-text-muted">
            The Case-Shiller index is a repeat-sales index normalised to January 2000 = 100. It measures the relative rate of change of prices for a consistent basket of homes. 
            It is not a dollar amount. Quoting 336.663 as dollars is a severe category error.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">2. Three-Month Moving Average with Two-Month Lag</h2>
          <p className="text-text-muted">
            Case-Shiller is a 3-month rolling average released roughly two months after the period it describes. A release in late August describes the period ending in June. 
            Every card on SHELTER.WATCH renders: <code className="bg-bg-subtle px-1.5 py-0.5 rounded font-mono">Period {'{month}'} · released {'{date}'}</code>.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">3. Seasonally Adjusted (SA) vs Unadjusted (NSA) Isolation</h2>
          <p className="text-text-muted">
            CSUSHPISA and CSUSHPINSA are distinct time series and must never be merged or plotted together on an unflagged axis.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">4. Metro-First Architecture</h2>
          <p className="text-text-muted">
            National averages obscure divergent regional realities. The national composite is displayed as a header; metro telemetry forms the primary content.
          </p>
        </div>
      </div>
    </div>
  );
}
