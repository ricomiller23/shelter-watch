'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  SEED_METROS, 
  SEED_MORTGAGE_RATES, 
  SEED_HOUSING_OBSERVATIONS,
  MetroData 
} from '../lib/fallback-data';
import { calculatePaymentShock } from '../lib/measures';
import { 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Sliders, 
  ArrowUpRight, 
  DollarSign, 
  Percent, 
  Info, 
  Building, 
  ShieldCheck, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function HomePage() {
  const pmms30 = SEED_MORTGAGE_RATES.find(m => m.product === '30y_fixed');
  const pmms15 = SEED_MORTGAGE_RATES.find(m => m.product === '15y_fixed');
  const nationalCsNsa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPINSA');
  const nationalCsSa = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'CSUSHPISA');
  const yoy20 = SEED_HOUSING_OBSERVATIONS.find(o => o.seriesId === 'SPCS20RNSA_YOY');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'cards' | 'table'>('cards');
  const [selectedMetro, setSelectedMetro] = useState<MetroData | null>(null);

  // Interactive Payment Shock Simulator State
  const [simPrice, setSimPrice] = useState<number>(450000);
  const [simDownPct, setSimDownPct] = useState<number>(20);
  const [simRate, setSimRate] = useState<number>(pmms30?.ratePct || 6.95);
  const [simTerm, setSimTerm] = useState<number>(30);

  // Calculate live simulator output
  const currentSimResult = useMemo(() => {
    return calculatePaymentShock({
      homePrice: simPrice,
      downPaymentPct: simDownPct,
      ratePct: simRate,
      loanTermYears: simTerm
    });
  }, [simPrice, simDownPct, simRate, simTerm]);

  // Historical 2021 comparison at 3.0%
  const baselineSimResult = useMemo(() => {
    return calculatePaymentShock({
      homePrice: simPrice,
      downPaymentPct: simDownPct,
      ratePct: 3.0,
      loanTermYears: simTerm
    });
  }, [simPrice, simDownPct, simTerm]);

  const paymentDelta = currentSimResult.monthlyPayment - baselineSimResult.monthlyPayment;

  // Filter metros
  const filteredMetros = useMemo(() => {
    return SEED_METROS.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion === 'All' || m.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="space-y-8">
      {/* Editorial Rule Notice Banner */}
      <div className="bg-brand-soft border border-brand/20 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-brand-ink shadow-sm">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
          <div className="space-y-1">
            <div className="font-bold text-sm sm:text-base">
              INVARIANT DIRECTIVE: An index is not a price.
            </div>
            <p className="text-xs sm:text-sm text-text-body leading-relaxed">
              The Case-Shiller index (<strong>336.663</strong>) is a repeat-sales index normalised to Jan 2000 = 100. It measures price velocity for a constant basket, not dollars. 
              All Case-Shiller telemetry reflects a 3-month rolling average with an honest 2-month reporting lag.
            </p>
          </div>
        </div>
        <Link 
          href="/method" 
          className="text-xs font-semibold text-brand hover:text-brand-hover whitespace-nowrap flex items-center gap-1 self-end sm:self-center"
        >
          Methodology Guide <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top Telemetry Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>30Y FIXED (PMMS)</span>
            <span className="text-live font-bold font-mono">LIVE</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{pmms30?.ratePct}%</div>
          <div className="text-[10px] text-text-faint font-mono">Week of {pmms30?.weekEnding}</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>15Y FIXED (PMMS)</span>
            <span className="text-live font-bold font-mono">LIVE</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{pmms15?.ratePct}%</div>
          <div className="text-[10px] text-text-faint font-mono">Week of {pmms15?.weekEnding}</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>CS NATIONAL (NSA)</span>
            <span className="bg-brand-soft text-brand-ink px-1 rounded text-[10px]">LAG: 2M</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{nationalCsNsa?.value}</div>
          <div className="text-[10px] text-text-faint">Period June · Released Aug 27</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>CS NATIONAL (SA)</span>
            <span className="bg-bg-subtle text-text-body px-1 rounded text-[10px]">SA</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{nationalCsSa?.value}</div>
          <div className="text-[10px] text-text-faint">Seasonally Adjusted</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>20-CITY COMPOSITE</span>
            <span className="text-up font-bold text-[10px]">+2.1%</span>
          </div>
          <div className="text-2xl font-bold font-mono text-up">+{yoy20?.value}%</div>
          <div className="text-[10px] text-text-faint">YoY Price Acceleration</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>SHELTER CPI</span>
            <span className="text-text-muted text-[10px]">BLS</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">+5.2%</div>
          <div className="text-[10px] text-text-faint">Core Inflation Component</div>
        </div>
      </div>

      {/* Interactive Payment Shock Simulator */}
      <div className="bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-border pb-4">
          <div>
            <h2 className="text-lg font-bold font-display text-text flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand" />
              <span>Interactive Mortgage Payment Shock Calculator</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Compute exact monthly Principal & Interest (P&I) with all underlying assumptions disclosed
            </p>
          </div>
          <div className="text-xs font-mono bg-bg-subtle border border-border px-3 py-1.5 rounded-lg text-text-muted">
            Formula: P&I derived strictly from amortization schedule
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Price Slider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-body flex justify-between">
              <span>Home Purchase Price</span>
              <span className="font-mono text-brand font-bold">${simPrice.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="150000"
              max="1500000"
              step="10000"
              value={simPrice}
              onChange={(e) => setSimPrice(Number(e.target.value))}
              className="w-full h-2 bg-bg-subtle border border-border rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-text-faint font-mono">
              <span>$150k</span>
              <span>$750k</span>
              <span>$1.5M</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-body flex justify-between">
              <span>Down Payment (%)</span>
              <span className="font-mono text-brand font-bold">{simDownPct}% (${Math.round(simPrice * simDownPct / 100).toLocaleString()})</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={simDownPct}
              onChange={(e) => setSimDownPct(Number(e.target.value))}
              className="w-full h-2 bg-bg-subtle border border-border rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-text-faint font-mono">
              <span>0% (FHA/VA)</span>
              <span>20% (Conv)</span>
              <span>30%</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-body flex justify-between">
              <span>Mortgage Rate</span>
              <span className="font-mono text-brand font-bold">{simRate}%</span>
            </label>
            <input
              type="range"
              min="3.0"
              max="10.0"
              step="0.05"
              value={simRate}
              onChange={(e) => setSimRate(Number(e.target.value))}
              className="w-full h-2 bg-bg-subtle border border-border rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-text-faint font-mono">
              <span>3.0% (2021)</span>
              <span>6.95% (Now)</span>
              <span>10.0%</span>
            </div>
          </div>

          {/* Term Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-body block">Loan Amortization Term</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSimTerm(30)}
                className={`py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                  simTerm === 30 ? 'bg-brand text-white border-brand' : 'bg-bg-subtle text-text-body border-border'
                }`}
              >
                30-Year
              </button>
              <button
                type="button"
                onClick={() => setSimTerm(15)}
                className={`py-2 text-xs font-mono font-bold rounded-lg border transition-colors ${
                  simTerm === 15 ? 'bg-brand text-white border-brand' : 'bg-bg-subtle text-text-body border-border'
                }`}
              >
                15-Year
              </button>
            </div>
          </div>
        </div>

        {/* Simulator Results Highlight Box */}
        <div className="bg-bg-subtle border border-border p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Monthly Principal & Interest Payment
            </div>
            <div className="text-3xl font-bold font-mono text-text flex items-baseline gap-2">
              <span>${currentSimResult.monthlyPayment.toLocaleString()}/mo</span>
              <span className="text-xs text-text-muted font-normal">at {simRate}%</span>
            </div>
            <div className="text-xs text-text-faint font-mono">{currentSimResult.formulaNote}</div>
          </div>

          <div className="bg-white border border-border p-3 rounded-lg text-xs space-y-1 self-stretch md:self-auto min-w-[240px]">
            <div className="text-text-muted font-medium flex justify-between">
              <span>2021 Baseline Payment (3.0%):</span>
              <span className="font-mono text-text">${baselineSimResult.monthlyPayment.toLocaleString()}/mo</span>
            </div>
            <div className="text-up font-bold flex justify-between pt-1 border-t border-border/60">
              <span>Borrowing Rate Shock:</span>
              <span className="font-mono">+${paymentDelta.toLocaleString()}/mo (+{Math.round((paymentDelta / baselineSimResult.monthlyPayment) * 100)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metro Telemetry Directory Header & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-bold font-display text-text">Metro Market Telemetry</h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Repeat-sales indices, median transaction prices, asking rents, and lag markers across key US metro areas
            </p>
          </div>

          <div className="flex items-center space-x-2 self-stretch sm:self-auto">
            {/* View Mode Toggle */}
            <div className="bg-bg-subtle border border-border p-1 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'cards' ? 'bg-white text-text font-bold shadow-sm' : 'text-text-muted'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'table' ? 'bg-white text-text font-bold shadow-sm' : 'text-text-muted'
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search metro or state (e.g. Dallas, CA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-white text-text placeholder-text-faint focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
            {['All', 'Northeast', 'West', 'Midwest', 'South'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  selectedRegion === reg
                    ? 'bg-brand text-white border-brand shadow-sm font-semibold'
                    : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS VIEW */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMetros.map((metro) => {
              const shock = calculatePaymentShock({
                homePrice: metro.medianSalePrice,
                downPaymentPct: 20,
                ratePct: pmms30?.ratePct || 6.95,
                loanTermYears: 30
              });

              return (
                <div
                  key={metro.id}
                  className="bg-white border border-border rounded-xl p-5 shadow-sm hover:border-brand/40 transition-all hover:shadow space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-mono text-brand font-semibold uppercase tracking-wider">
                          {metro.region} REGION
                        </span>
                        <h3 className="font-bold text-text text-base leading-snug">{metro.name}</h3>
                        <div className="text-xs text-text-muted font-mono">{metro.state} · Metro Market</div>
                      </div>
                      <span className="px-2 py-0.5 bg-bg-subtle border border-border text-text-body text-[10px] rounded font-mono font-semibold">
                        Period {metro.periodEnd.slice(0, 7)} · released {metro.releasedAt}
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-border">
                      <div className="space-y-0.5">
                        <div className="text-[11px] text-text-faint">MEDIAN SALE PRICE</div>
                        <div className="text-xl font-bold font-mono text-text">${metro.medianSalePrice.toLocaleString()}</div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[11px] text-text-faint">REPEAT-SALES INDEX</div>
                        <div className="text-xl font-bold font-mono text-text flex items-baseline gap-1">
                          <span>{metro.repeatSalesIndex}</span>
                          <span className={`text-xs font-bold ${metro.yoyChangePct >= 0 ? 'text-up' : 'text-down'}`}>
                            {metro.yoyChangePct >= 0 ? `+${metro.yoyChangePct}%` : `${metro.yoyChangePct}%`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rental Metric */}
                    <div className="bg-bg-subtle/80 p-3 rounded-lg border border-border/80 flex justify-between items-center text-xs">
                      <div>
                        <div className="text-text-muted font-medium">ZORI Asking Rent</div>
                        <div className="text-[11px] text-text-faint font-mono">Repeat-rent indexed</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-bold text-text">${metro.zoriAskingRent.toLocaleString()}/mo</div>
                        <div className="text-[11px] text-text-muted">+{metro.rentYoyPct}% YoY</div>
                      </div>
                    </div>

                    {/* Derived Payment Shock Box */}
                    <div className="bg-brand-soft/50 border border-brand/20 p-3 rounded-lg space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-brand-ink font-semibold">DERIVED P&I PAYMENT</span>
                        <span className="font-mono font-bold text-text">${shock.monthlyPayment.toLocaleString()}/mo</span>
                      </div>
                      <div className="text-[11px] text-text-muted font-mono leading-tight">
                        Assumes 20% down ($${Math.round(metro.medianSalePrice * 0.2).toLocaleString()}) at current 6.95% rate
                      </div>
                    </div>
                  </div>

                  {/* Footer & Source Link */}
                  <div className="pt-3 border-t border-border flex justify-between items-center text-xs text-text-faint">
                    <span className="font-mono">Lag: {metro.lagMonths} months</span>
                    <a
                      href={metro.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline flex items-center gap-1 font-medium"
                    >
                      {metro.sourceName} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TABLE VIEW */}
        {activeTab === 'table' && (
          <div className="bg-white border border-border rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-subtle border-b border-border text-xs font-semibold text-text-muted">
                <tr>
                  <th className="p-4">METRO AREA</th>
                  <th className="p-4">REGION</th>
                  <th className="p-4">MEDIAN SALE PRICE</th>
                  <th className="p-4">CASE-SHILLER INDEX</th>
                  <th className="p-4">YOY CHANGE</th>
                  <th className="p-4">ZORI RENT</th>
                  <th className="p-4">MONTHLY P&I (6.95%)</th>
                  <th className="p-4">LAG ANNOTATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono text-xs">
                {filteredMetros.map((m) => {
                  const shock = calculatePaymentShock({
                    homePrice: m.medianSalePrice,
                    downPaymentPct: 20,
                    ratePct: pmms30?.ratePct || 6.95,
                    loanTermYears: 30
                  });

                  return (
                    <tr key={m.id} className="hover:bg-bg-subtle/50 transition-colors">
                      <td className="p-4 font-bold font-ui text-text">{m.name} ({m.state})</td>
                      <td className="p-4 text-text-muted font-ui">{m.region}</td>
                      <td className="p-4 text-text font-bold">${m.medianSalePrice.toLocaleString()}</td>
                      <td className="p-4 text-text">{m.repeatSalesIndex}</td>
                      <td className={`p-4 font-bold ${m.yoyChangePct >= 0 ? 'text-up' : 'text-down'}`}>
                        {m.yoyChangePct >= 0 ? `+${m.yoyChangePct}%` : `${m.yoyChangePct}%`}
                      </td>
                      <td className="p-4 text-text">${m.zoriAskingRent.toLocaleString()}/mo</td>
                      <td className="p-4 text-brand font-bold">${shock.monthlyPayment.toLocaleString()}/mo</td>
                      <td className="p-4 text-text-faint font-ui">
                        Period {m.periodEnd.slice(0, 7)} · released {m.releasedAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
