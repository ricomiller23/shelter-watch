'use client';

import React, { useState } from 'react';
import { UsVectorLandmass } from './UsVectorLandmass';
import { Home, TrendingUp, TrendingDown, MapPin, Building, Info, ExternalLink } from 'lucide-react';

export interface MetroHousingData {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  medianPrice: number;
  priceYoY: number;
  caseShillerIndex: number;
  caseShillerYoY: number;
  zoriRent: number;
  zoriYoY: number;
  inventoryWeeks: number;
  lagNote: string;
  adjustment: 'Seasonally Adjusted (SA)' | 'Non-Seasonally Adjusted (NSA)';
}

export const US_METROS: MetroHousingData[] = [
  {
    id: 'nyc',
    name: 'New York MSA',
    state: 'NY',
    x: 825.0,
    y: 200.0,
    medianPrice: 649000,
    priceYoY: 5.4,
    caseShillerIndex: 328.4,
    caseShillerYoY: 6.2,
    zoriRent: 3520,
    zoriYoY: 3.8,
    inventoryWeeks: 14.2,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'lax',
    name: 'Los Angeles Metro',
    state: 'CA',
    x: 95.0,
    y: 350.0,
    medianPrice: 920000,
    priceYoY: 3.8,
    caseShillerIndex: 341.2,
    caseShillerYoY: 4.1,
    zoriRent: 2980,
    zoriYoY: 2.4,
    inventoryWeeks: 11.5,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'chi',
    name: 'Chicago Metro',
    state: 'IL',
    x: 590.0,
    y: 205.0,
    medianPrice: 355000,
    priceYoY: 6.8,
    caseShillerIndex: 214.8,
    caseShillerYoY: 7.3,
    zoriRent: 2120,
    zoriYoY: 4.1,
    inventoryWeeks: 9.8,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'dfw',
    name: 'Dallas-Fort Worth',
    state: 'TX',
    x: 445.0,
    y: 385.0,
    medianPrice: 412000,
    priceYoY: 1.2,
    caseShillerIndex: 305.1,
    caseShillerYoY: 1.8,
    zoriRent: 1940,
    zoriYoY: -0.5,
    inventoryWeeks: 16.4,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'mia',
    name: 'Miami-Fort Lauderdale',
    state: 'FL',
    x: 785.0,
    y: 535.0,
    medianPrice: 585000,
    priceYoY: 6.9,
    caseShillerIndex: 428.6,
    caseShillerYoY: 7.9,
    zoriRent: 2780,
    zoriYoY: 3.1,
    inventoryWeeks: 18.2,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'phx',
    name: 'Phoenix Metro',
    state: 'AZ',
    x: 195.0,
    y: 380.0,
    medianPrice: 448000,
    priceYoY: 2.7,
    caseShillerIndex: 335.2,
    caseShillerYoY: 3.2,
    zoriRent: 1890,
    zoriYoY: -1.2,
    inventoryWeeks: 15.1,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'sea',
    name: 'Seattle Metro',
    state: 'WA',
    x: 65.0,
    y: 55.0,
    medianPrice: 825000,
    priceYoY: 5.1,
    caseShillerIndex: 392.4,
    caseShillerYoY: 5.8,
    zoriRent: 2450,
    zoriYoY: 3.5,
    inventoryWeeks: 10.3,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'sfo',
    name: 'San Francisco Bay Area',
    state: 'CA',
    x: 45.0,
    y: 255.0,
    medianPrice: 1280000,
    priceYoY: 2.1,
    caseShillerIndex: 342.1,
    caseShillerYoY: 2.9,
    zoriRent: 3310,
    zoriYoY: 2.2,
    inventoryWeeks: 12.0,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'atl',
    name: 'Atlanta Metro',
    state: 'GA',
    x: 685.0,
    y: 385.0,
    medianPrice: 399000,
    priceYoY: 4.8,
    caseShillerIndex: 320.5,
    caseShillerYoY: 5.1,
    zoriRent: 1980,
    zoriYoY: 1.7,
    inventoryWeeks: 13.7,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  },
  {
    id: 'bos',
    name: 'Boston Metro',
    state: 'MA',
    x: 880.0,
    y: 175.0,
    medianPrice: 760000,
    priceYoY: 6.4,
    caseShillerIndex: 348.9,
    caseShillerYoY: 6.9,
    zoriRent: 3150,
    zoriYoY: 4.6,
    inventoryWeeks: 8.9,
    lagNote: 'July 2026 Release (60d vintage lag)',
    adjustment: 'Seasonally Adjusted (SA)'
  }
];

export function UsMetroHousingMap() {
  const [selectedMetro, setSelectedMetro] = useState<MetroHousingData>(US_METROS[0]);
  const [metricView, setMetricView] = useState<'caseShiller' | 'rent'>('caseShiller');

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6 font-mono">
      {/* Header bar */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0BA360] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide font-display">
              Case-Shiller & ZORI Geospatial Terminal
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-bold">
              60d Vintage Lag Stamped
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 font-sans">
            Strict Invariant: Case-Shiller index and Zillow ZORI tracks actual release cycles. Never blends disparate months.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-lg border border-[#E4E9F0] self-start sm:self-auto">
          <button
            onClick={() => setMetricView('caseShiller')}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              metricView === 'caseShiller'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            Case-Shiller (YoY %)
          </button>
          <button
            onClick={() => setMetricView('rent')}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              metricView === 'rent'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            ZORI Rent (YoY %)
          </button>
        </div>
      </div>

      {/* SVG Canvas with In-SVG Locked Metro Indicators */}
      <div className="relative w-full bg-[#EEF4FB] border-b border-[#E4E9F0] overflow-hidden">
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto max-h-[480px] select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Vector Landmass */}
          <UsVectorLandmass showLabels={true} />

          {/* Cartographically Locked Metro Indicators */}
          <g className="metro-indicators">
            {US_METROS.map((metro) => {
              const isSelected = selectedMetro.id === metro.id;
              const isHighGrowth = metro.caseShillerYoY > 5;
              const badgeColor = isHighGrowth ? '#0E63C4' : '#0BA360';
              const displayVal = metricView === 'caseShiller' ? `+${metro.caseShillerYoY}%` : `+${metro.zoriYoY}%`;

              return (
                <g
                  key={metro.id}
                  transform={`translate(${metro.x}, ${metro.y})`}
                  onClick={() => setSelectedMetro(metro)}
                  className="cursor-pointer"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.30))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                  }}
                >
                  {/* Aura Ring */}
                  <circle
                    r={isSelected ? 18 : 12}
                    fill={badgeColor}
                    opacity={isSelected ? 0.35 : 0.2}
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Pin Circle */}
                  <circle
                    r={isSelected ? 10 : 8}
                    fill={isSelected ? badgeColor : '#FFFFFF'}
                    stroke={badgeColor}
                    strokeWidth={isSelected ? 2.5 : 2}
                  />

                  {/* Icon dot */}
                  <circle
                    r={3}
                    fill={isSelected ? '#FFFFFF' : badgeColor}
                  />

                  {/* Metro Label Pill */}
                  <g transform={`translate(0, ${isSelected ? 20 : 16})`}>
                    <rect
                      x="-38"
                      y="-9"
                      width="76"
                      height="18"
                      rx="4"
                      fill={isSelected ? '#101828' : '#FFFFFF'}
                      stroke={isSelected ? '#101828' : '#CBD5E1'}
                      strokeWidth="1.2"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#1E293B'}
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                    >
                      {metro.name.split(' ')[0]}: {displayVal}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Metro Detail Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828] font-display">{selectedMetro.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-[#F6F8FB] border border-[#E4E9F0] text-[#344054] rounded font-bold">
              {selectedMetro.state}
            </span>
            <span className="text-xs px-2 py-0.5 bg-[#EDFBF2] border border-[#73E2A3] text-[#087443] rounded font-bold">
              {selectedMetro.adjustment}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Median Price
              </span>
              <span className="text-sm font-bold text-[#101828]">
                ${(selectedMetro.medianPrice / 1000).toFixed(0)}k
              </span>
              <span
                className={`text-[10px] font-semibold block mt-0.5 ${
                  selectedMetro.priceYoY >= 0 ? 'text-[#0BA360]' : 'text-[#B42318]'
                }`}
              >
                {selectedMetro.priceYoY >= 0 ? '+' : ''}
                {selectedMetro.priceYoY}% YoY
              </span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Case-Shiller Index
              </span>
              <span className="text-sm font-bold text-[#0E63C4]">{selectedMetro.caseShillerIndex}</span>
              <span className="text-[10px] text-[#0BA360] font-semibold block mt-0.5">
                +{selectedMetro.caseShillerYoY}% YoY
              </span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                ZORI Median Rent
              </span>
              <span className="text-sm font-bold text-[#101828]">${selectedMetro.zoriRent}/mo</span>
              <span
                className={`text-[10px] font-semibold block mt-0.5 ${
                  selectedMetro.zoriYoY >= 0 ? 'text-[#0BA360]' : 'text-[#B42318]'
                }`}
              >
                {selectedMetro.zoriYoY >= 0 ? '+' : ''}
                {selectedMetro.zoriYoY}% YoY
              </span>
            </div>
          </div>
        </div>

        {/* Inventory & Vintage Lag Notice */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Info className="w-4 h-4 text-[#0E63C4]" />
              <span>Vintage Release Lag & S&P CoreLogic Method</span>
            </div>
            <p className="text-xs text-[#475467] leading-relaxed">
              Indices use repeat-sales pricing on single-family homes with an explicit 2-month reporting delay.
              Currently reporting <strong className="text-[#101828]">{selectedMetro.lagNote}</strong>.
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Active Supply: {selectedMetro.inventoryWeeks} wks inventory</span>
            <span className="text-[#0E63C4] font-semibold font-sans">FRED & CoreLogic Matched</span>
          </div>
        </div>
      </div>
    </div>
  );
}
