'use client';

import React from 'react';
import { US_STATE_PATHS, US_STATE_CENTROIDS } from './UsStatePaths';

export interface UsVectorLandmassProps {
  highlightStates?: Record<string, { fill?: string; stroke?: string; strokeWidth?: number }>;
  onSelectState?: (stateName: string) => void;
  selectedState?: string | null;
  showLabels?: boolean;
}

export function UsVectorLandmass({
  highlightStates = {},
  onSelectState,
  selectedState,
  showLabels = true,
}: UsVectorLandmassProps) {
  return (
    <g className="us-vector-landmass select-none">
      {/* Ocean & Lake Background */}
      <rect width="960" height="600" fill="#EEF4FB" />

      {/* Render all 49 CONUS states */}
      {Object.entries(US_STATE_PATHS).map(([stateName, pathData]) => {
        const custom = highlightStates[stateName];
        const isSelected = selectedState === stateName;
        const fill = custom?.fill || (isSelected ? '#E0EDFF' : '#FFFFFF');
        const stroke = custom?.stroke || (isSelected ? '#0E63C4' : '#CBD5E1');
        const strokeWidth = custom?.strokeWidth || (isSelected ? 1.5 : 0.8);

        return (
          <path
            key={stateName}
            d={pathData}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            className="transition-colors duration-150 cursor-pointer hover:fill-[#EDF4FD]"
            onClick={() => onSelectState && onSelectState(stateName)}
          >
            <title>{stateName}</title>
          </path>
        );
      })}

      {/* State Abbreviation Labels */}
      {showLabels && (
        <g className="pointer-events-none" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" textAnchor="middle">
          {Object.entries(US_STATE_CENTROIDS).map(([name, data]) => {
            if (['DC', 'DE', 'RI', 'CT', 'NJ', 'MD', 'MA'].includes(data.abbr)) return null;
            return (
              <text key={name} x={data.x} y={data.y + 3} opacity={0.65}>
                {data.abbr}
              </text>
            );
          })}
        </g>
      )}

      {/* Geographic Water Labels */}
      <g className="pointer-events-none" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600" opacity="0.75">
        <text x="35" y="240" transform="rotate(-90 35 240)" letterSpacing="2">PACIFIC OCEAN</text>
        <text x="915" y="280" transform="rotate(90 915 280)" letterSpacing="2">ATLANTIC OCEAN</text>
        <text x="480" y="560" letterSpacing="2">GULF OF MEXICO</text>
        <text x="650" y="110" letterSpacing="1.5">GREAT LAKES</text>
      </g>
    </g>
  );
}
