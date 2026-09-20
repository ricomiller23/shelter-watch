'use client';

import { UsVectorLandmass } from './UsVectorLandmass';

import React, { useState } from 'react';
import { Home, TrendingUp, TrendingDown, MapPin, Building, Info, ExternalLink } from 'lucide-react';

export interface MetroHousingData {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
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
    lat: 40.7128,
    lng: -74.0060,
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
    lat: 34.0522,
    lng: -118.2437,
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
    lat: 41.8781,
    lng: -87.6298,
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
    lat: 32.7767,
    lng: -96.7970,
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
    lat: 25.7617,
    lng: -80.1918,
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
    lat: 33.4484,
    lng: -112.0740,
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
    lat: 47.6062,
    lng: -122.3321,
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
    lat: 37.7749,
    lng: -122.4194,
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
    lat: 33.7490,
    lng: -84.3880,
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
    lat: 42.3601,
    lng: -71.0589,
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

function projectUsCoords(lat: number, lng: number): { x: number; y: number } {
  // Bounding box for CONUS: Lng [-125, -67], Lat [24, 50]
  const minLng = -125;
  const maxLng = -67;
  const minLat = 24.5;
  const maxLat = 49.5;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(4, Math.min(96, y))
  };
}

export function UsMetroHousingMap() {
  const [selectedMetro, setSelectedMetro] = useState<MetroHousingData>(US_METROS[0]);
  const [metricView, setMetricView] = useState<'caseShiller' | 'rent' | 'price'>('caseShiller');

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6">
      {/* Header bar */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0BA360] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide">
              CONUS Metro Housing & Rent Tactical Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-mono font-semibold">
              S&P CoreLogic / Zillow ZORI
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Strict Invariant: Repeat-sales index is not a transaction median. 60-day reporting lag explicitly preserved.
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
            ZORI Rent ($/mo)
          </button>
          <button
            onClick={() => setMetricView('price')}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              metricView === 'price'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            Median Sale ($)
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '340px' }}>
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <UsVectorLandmass />
        </svg>

        {/* Pin Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {US_METROS.map((metro) => {
            const { x, y } = projectUsCoords(metro.lat, metro.lng);
            const isSelected = selectedMetro.id === metro.id;
            return (
              <div
                key={metro.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedMetro(metro)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span
                    className={`absolute w-7 h-7 rounded-full opacity-30 ${
                      metro.caseShillerYoY > 5 ? 'bg-[#0E63C4]' : 'bg-[#0BA360]'
                    } ${isSelected ? 'animate-ping' : ''}`}
                  />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md ${
                      isSelected
                        ? 'bg-[#0E63C4] border-[#FFFFFF] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#0E63C4] text-[#0E63C4]'
                    }`}
                  >
                    <Building className="w-3 h-3" />
                  </div>

                  {/* Label pill */}
                  <div
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {metro.name.split(' ')[0]} :{' '}
                    {metricView === 'caseShiller'
                      ? `+${metro.caseShillerYoY}%`
                      : metricView === 'rent'
                      ? `$${metro.zoriRent}`
                      : `$${(metro.medianPrice / 1000).toFixed(0)}k`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Dossier & Invariant Proof */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#101828]">{selectedMetro.name}</h3>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-[#F6F8FB] border border-[#E4E9F0] text-[#344054] rounded">
              {selectedMetro.state}
            </span>
            <span className="text-xs font-mono text-[#0E63C4] bg-[#F0F6FF] px-2 py-0.5 rounded">
              {selectedMetro.adjustment}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Case-Shiller Index
              </span>
              <span className="text-base font-bold font-mono text-[#101828]">{selectedMetro.caseShillerIndex}</span>
              <div className="flex items-center gap-1 text-xs text-[#0BA360] font-semibold mt-0.5">
                <TrendingUp className="w-3 h-3" /> +{selectedMetro.caseShillerYoY}% YoY
              </div>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                ZORI Rent Asking
              </span>
              <span className="text-base font-bold font-mono text-[#101828]">
                ${selectedMetro.zoriRent.toLocaleString()}
              </span>
              <div
                className={`flex items-center gap-1 text-xs font-semibold mt-0.5 ${
                  selectedMetro.zoriYoY >= 0 ? 'text-[#0BA360]' : 'text-[#B42318]'
                }`}
              >
                {selectedMetro.zoriYoY >= 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3" /> +{selectedMetro.zoriYoY}% YoY
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3" /> {selectedMetro.zoriYoY}% YoY
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Median Transaction
              </span>
              <span className="text-base font-bold font-mono text-[#101828]">
                ${selectedMetro.medianPrice.toLocaleString()}
              </span>
              <span className="text-xs text-[#667085] block mt-0.5 font-medium">
                {selectedMetro.inventoryWeeks} wks inventory
              </span>
            </div>
          </div>
        </div>

        {/* Vintage & Invariant Column */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Info className="w-4 h-4 text-[#0E63C4]" />
              <span>Vintage & Methodological Distinction</span>
            </div>
            <p className="text-xs text-[#475467] leading-relaxed">
              <strong>Reporting Vintage:</strong> {selectedMetro.lagNote}. S&P CoreLogic Case-Shiller indices are subject to a constant 2-month release lag due to deed record processing. Asking rents from Zillow ZORI track the previous calendar month.
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Lat: {selectedMetro.lat.toFixed(4)}°N, Lng: {Math.abs(selectedMetro.lng).toFixed(4)}°W</span>
            <span className="text-[#0E63C4] font-medium flex items-center gap-1">
              Federal Reserve FRED / S&P Dow Jones
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
