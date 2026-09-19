'use client';
import React from 'react';

export default function AdminPage() {
  const sources = [
    { id: 'freddie-pmms', name: 'Freddie Mac PMMS', tier: 'B', cadence: 'Weekly', status: 'Healthy', items: 52 },
    { id: 'sp-case-shiller', name: 'S&P Cotality Case-Shiller', tier: 'B', cadence: 'Monthly', status: 'Healthy', items: 24 },
    { id: 'fred-csushpinsa', name: 'FRED (CSUSHPINSA / CSUSHPISA)', tier: 'A', cadence: 'Monthly', status: 'Healthy', items: 24 },
    { id: 'zillow-zori', name: 'Zillow ZORI / ZHVI', tier: 'B', cadence: 'Monthly', status: 'Healthy', items: 120 },
    { id: 'census-hud', name: 'US Census / HUD Housing Starts', tier: 'A', cadence: 'Monthly', status: 'Healthy', items: 24 },
    { id: 'bls-cpi-shelter', name: 'BLS CPI Shelter Component', tier: 'A', cadence: 'Monthly', status: 'Healthy', items: 24 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">SHELTER.WATCH Admin & Feed Telemetry</h1>
        <p className="text-sm text-text-muted">Connector heartbeat and invariant monitor</p>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-subtle border-b border-border text-xs font-semibold text-text-muted">
            <tr>
              <th className="p-4">SOURCE</th>
              <th className="p-4">TIER</th>
              <th className="p-4">CADENCE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">INGESTED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-mono text-xs">
            {sources.map((s) => (
              <tr key={s.id} className="hover:bg-bg-subtle/50">
                <td className="p-4 font-bold font-ui text-text">{s.name}</td>
                <td className="p-4"><span className="bg-brand-soft text-brand-ink px-1.5 py-0.5 rounded">{s.tier}</span></td>
                <td className="p-4 text-text-body">{s.cadence}</td>
                <td className="p-4 text-live font-bold">{s.status}</td>
                <td className="p-4 text-text-body">{s.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
