'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  SEED_METROS, 
  SEED_MORTGAGE_RATES, 
  SEED_HOUSING_OBSERVATIONS 
} from '@/lib/fallback-data';
import { calculatePaymentShock } from '@/lib/measures';
import { 
  Building2, 
  TrendingUp, 
  Sliders, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  AlertTriangle, 
  DollarSign, 
  Percent 
} from 'lucide-react';

export default function LiveBoardPage() {
  const pmms30 = SEED_MORTGAGE_RATES.find(m => m.product === '30y_fixed');
  const pmms15 = SEED_MORTGAGE_RATES.find(m => m.product === '15y_fixed');
  const nationalCsNsa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPINSA');
  const nationalCsSa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPISA');
  const yoy20 = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'SPCS20RNSA_YOY');

  // Simulator controls
  const [simPrice, setSimPrice] = useState<number>(450000);
  const [simDownPct, setSimDownPct] = useState<number>(20);
  const [simRate, setSimRate] = useState<number>(pmms30?.ratePct || 6.95);
  const [simTerm, setSimTerm] = useState<number>(30);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const currentSim = useMemo(() => {
    return calculatePaymentShock({
      homePrice: simPrice,
      downPaymentPct: simDownPct,
      ratePct: simRate,
      loanTermYears: simTerm
    });
  }, [simPrice, simDownPct, simRate, simTerm]);

  const baselineSim = useMemo(() => {
    return calculatePaymentShock({
      homePrice: simPrice,
      downPaymentPct: simDownPct,
      ratePct: 3.0,
      loanTermYears: simTerm
    });
  }, [simPrice, simDownPct, simTerm]);

  const paymentDelta = currentSim.monthlyPayment - baselineSim.monthlyPayment;

  const filteredMetros = useMemo(() => {
    return SEED_METROS.filter(m => {
      const matchQ = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     m.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchReg = selectedRegion === 'All' || m.region === selectedRegion;
      return matchQ && matchReg;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="space-y-8">
      {/* Hero Banner with Unified Metrics Strip */}
      <div className="bg-bg-subtle border border-border rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-text">Global Housing, Rents & Cost-of-Living Monitor</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-100 text-amber-900 border border-amber-300">
              Seed Active
            </span>
          </div>
          <p className="text-sm text-text-muted mt-1">
            What housing costs, borrowing costs, and how the two meet. An index is strictly not a price; 3-month moving averages carry honest 2-month reporting lags.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">30Y Fixed PMMS:</span> <strong className="text-text font-bold num-tabular">{pmms30?.ratePct}%</strong>
          </div>
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">National CS (NSA):</span> <strong className="text-brand font-bold num-tabular">{nationalCsNsa?.value}</strong>
          </div>
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">20-City YoY:</span> <strong className="text-danger font-bold num-tabular">+{yoy20?.value}%</strong>
          </div>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Freddie Mac 30Y Fixed</span>
          <div className="text-2xl font-bold font-mono text-text num-tabular mt-1">
            {pmms30?.ratePct}%
          </div>
          <span className="text-[10px] text-text-faint font-mono">Week of {pmms30?.weekEnding} · Weekly Benchmark</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Case-Shiller National (NSA)</span>
          <div className="text-2xl font-bold font-mono text-brand num-tabular mt-1">
            {nationalCsNsa?.value}
          </div>
          <span className="text-[10px] text-text-faint font-mono">Period June · Released Aug 27 (2M Lag)</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Case-Shiller National (SA)</span>
          <div className="text-2xl font-bold font-mono text-text num-tabular mt-1">
            {nationalCsSa?.value}
          </div>
          <span className="text-[10px] text-text-faint font-mono">Seasonally Adjusted Series Partitioned</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Shelter CPI Inflation</span>
          <div className="text-2xl font-bold font-mono text-amber-700 num-tabular mt-1">
            +5.2%
          </div>
          <span className="text-[10px] text-text-faint font-mono">BLS Consumer Price Index Shelter</span>
        </div>
      </div>

      {/* Strict Invariant Warning Strip */}
      <div className="border-l-4 border-brand bg-brand-soft/40 p-4 rounded-r-md text-xs text-brand-ink leading-relaxed font-mono">
        <strong>Index ≠ Price & Lag Invariant:</strong> The Case-Shiller index (336.663) is a repeat-sales index normalised to January 2000 = 100. It measures the velocity of price change for a consistent housing basket, not dollars. All Case-Shiller numbers represent a 3-month moving average with a 2-month publication lag. SA and NSA series are strictly isolated.
      </div>

      {/* Interactive Payment Shock Simulator */}
      <div className="bg-white border border-border rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-brand" />
            <h2 className="text-base font-display font-bold text-text">Mortgage Payment Shock Simulator</h2>
          </div>
          <span className="text-xs font-mono text-text-muted">Derived strictly from underlying amortization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-text-muted block">Purchase Price: <strong className="text-text font-bold">${simPrice.toLocaleString()}</strong></label>
            <input
              type="range"
              min="150000"
              max="1500000"
              step="10000"
              value={simPrice}
              onChange={(e) => setSimPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-bg-subtle rounded appearance-none cursor-pointer accent-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted block">Down Payment: <strong className="text-text font-bold">{simDownPct}% (${Math.round(simPrice * simDownPct / 100).toLocaleString()})</strong></label>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={simDownPct}
              onChange={(e) => setSimDownPct(Number(e.target.value))}
              className="w-full h-1.5 bg-bg-subtle rounded appearance-none cursor-pointer accent-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted block">Mortgage Rate: <strong className="text-text font-bold">{simRate}%</strong></label>
            <input
              type="range"
              min="3.0"
              max="10.0"
              step="0.05"
              value={simRate}
              onChange={(e) => setSimRate(Number(e.target.value))}
              className="w-full h-1.5 bg-bg-subtle rounded appearance-none cursor-pointer accent-brand"
            />
          </div>

          <div className="space-y-1">
            <label className="text-text-muted block">Amortization Term</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSimTerm(30)}
                className={`py-1.5 rounded font-bold border transition ${
                  simTerm === 30 ? 'bg-brand text-white border-brand' : 'bg-bg-subtle text-text-muted border-border'
                }`}
              >
                30-Year
              </button>
              <button
                type="button"
                onClick={() => setSimTerm(15)}
                className={`py-1.5 rounded font-bold border transition ${
                  simTerm === 15 ? 'bg-brand text-white border-brand' : 'bg-bg-subtle text-text-muted border-border'
                }`}
              >
                15-Year
              </button>
            </div>
          </div>
        </div>

        <div className="bg-bg-subtle border border-border p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-[11px] font-mono text-text-muted uppercase block">Monthly Principal & Interest</span>
            <div className="text-2xl font-bold font-mono text-text num-tabular mt-0.5">
              ${currentSim.monthlyPayment.toLocaleString()}/mo
            </div>
            <span className="text-[10px] text-text-faint font-mono">{currentSim.formulaNote}</span>
          </div>

          <div className="bg-white border border-border p-2.5 rounded text-xs font-mono">
            <div className="text-text-muted">2021 Baseline (3.0% Rate): <strong>${baselineSim.monthlyPayment.toLocaleString()}/mo</strong></div>
            <div className="text-danger font-bold mt-0.5">
              Rate Shock Difference: +${paymentDelta.toLocaleString()}/mo (+{Math.round((paymentDelta / baselineSim.monthlyPayment) * 100)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Main Metro Cards Section with Filter/Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-display font-bold text-text flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand" />
            <span>Active Monitored Metro Markets</span>
            <span className="text-xs font-mono text-text-muted font-normal">({filteredMetros.length} Markets)</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-faint absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter metros (e.g. New York, Texas)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono border border-border rounded-md bg-white focus:outline-none focus:border-brand"
              />
            </div>

            <div className="flex items-center gap-1 text-xs font-mono">
              {['All', 'Northeast', 'West', 'Midwest', 'South'].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-2.5 py-1 rounded border transition ${
                    selectedRegion === r ? 'bg-brand text-white border-brand font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metro Cards Grid */}
        <div className="grid grid-cols-1 gap-5">
          {filteredMetros.map((metro) => {
            const shock = calculatePaymentShock({
              homePrice: metro.medianSalePrice,
              downPaymentPct: 20,
              ratePct: pmms30?.ratePct || 6.95,
              loanTermYears: 30
            });

            return (
              <div key={metro.id} className="bg-white border border-border rounded-lg p-6 hover:border-brand/40 transition-shadow shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {metro.region.toUpperCase()} METRO
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-bg-subtle text-text-muted border border-border">
                        Period {metro.periodEnd.slice(0, 7)} · released {metro.releasedAt}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                        Lag: {metro.lagMonths} months
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
                        Method: repeat-sales
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-text">{metro.name}</h3>
                    <p className="text-xs text-text-muted font-mono mt-0.5">Jurisdiction: {metro.state} · Metro Core Area</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-text-faint block">MEDIAN TRANSACTION PRICE</span>
                    <span className="text-2xl font-bold font-mono text-text num-tabular">
                      ${metro.medianSalePrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Metrics Table Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b border-border">
                  <div className="bg-bg-subtle p-3 rounded-md">
                    <span className="text-[11px] font-mono text-text-muted block">Case-Shiller Index</span>
                    <span className="text-lg font-bold font-mono text-text">{metro.repeatSalesIndex}</span>
                    <span className="text-[10px] text-text-faint font-mono block">Jan 2000 = 100</span>
                  </div>

                  <div className="bg-bg-subtle p-3 rounded-md">
                    <span className="text-[11px] font-mono text-text-muted block">YoY Price Velocity</span>
                    <span className={`text-lg font-bold font-mono ${metro.yoyChangePct >= 0 ? 'text-danger' : 'text-live'}`}>
                      {metro.yoyChangePct >= 0 ? `+${metro.yoyChangePct}%` : `${metro.yoyChangePct}%`}
                    </span>
                    <span className="text-[10px] text-text-faint font-mono block">Repeat-sales trajectory</span>
                  </div>

                  <div className="bg-bg-subtle p-3 rounded-md">
                    <span className="text-[11px] font-mono text-text-muted block">ZORI Asking Rent</span>
                    <span className="text-lg font-bold font-mono text-text">${metro.zoriAskingRent.toLocaleString()}/mo</span>
                    <span className="text-[10px] text-text-faint font-mono block">+{metro.rentYoyPct}% YoY Asking</span>
                  </div>

                  <div className="bg-brand-soft/40 border border-brand/20 p-3 rounded-md">
                    <span className="text-[11px] font-mono text-brand-ink font-bold block">Derived Monthly P&I</span>
                    <span className="text-lg font-bold font-mono text-brand">${shock.monthlyPayment.toLocaleString()}/mo</span>
                    <span className="text-[10px] text-text-muted font-mono block">6.95% PMMS rate, 20% down</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 text-xs text-text-muted">
                  <div className="font-mono text-[11px]">
                    Authority Citation: <span className="font-bold text-text">{metro.sourceName}</span>
                  </div>
                  <a
                    href={metro.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-brand hover:underline font-mono text-[11px]"
                  >
                    <span>View Primary FRED / S&P Time Series</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
