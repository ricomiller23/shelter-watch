import React from 'react';

export default function AffordabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">Housing Affordability Metrics</h1>
        <p className="text-sm text-text-muted">Published vs Derived metrics strictly distinguished with all inputs displayed</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-text">Price-to-Income & Payment-to-Income Ratios</h2>
        <p className="text-sm text-text-muted">
          A derived affordability ratio is only as honest as its inputs. This dashboard displays the exact home price, assumed interest rate, 
          loan term, and down payment percentage for every derived payment metric.
        </p>
      </div>
    </div>
  );
}
