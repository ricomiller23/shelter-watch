import React from 'react';

export default function RentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">Rent Indices & Rental Telemetry</h1>
        <p className="text-sm text-text-muted">Zillow Observed Rent Index (ZORI) & BLS CPI Shelter Component</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-text">ZORI vs Median Asking Rents</h2>
        <p className="text-sm text-text-muted">
          ZORI measures changes in asking rents over time, controlling for changes in the quality of available rental stock. 
          It is repeat-rent indexed and differs fundamentally from snapshot median asking rent averages.
        </p>
        <div className="p-4 bg-bg-subtle rounded-lg border border-border text-xs text-text-body font-mono">
          Status: ZORI dataset synced. Metro-level rental observations updated monthly.
        </div>
      </div>
    </div>
  );
}
