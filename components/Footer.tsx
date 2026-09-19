import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-border mt-16 py-8 text-sm text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="font-bold text-text">SHELTER.WATCH</div>
            <div className="text-xs text-text-faint">Part 16 of THE MONITOR SERIES — VOLUME II</div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/method" className="hover:text-brand">Index ≠ Price</Link>
            <Link href="/method" className="hover:text-brand">3M Moving Avg & 2M Lag</Link>
            <Link href="/method" className="hover:text-brand">SA vs NSA Isolation</Link>
            <Link href="/method" className="hover:text-brand">Payment Shock Inputs</Link>
            <Link href="/admin" className="hover:text-brand">Feeds Status</Link>
          </div>
        </div>
        <div className="text-xs text-text-faint border-t border-border pt-4">
          Notice: Repeat-sales indices (Case-Shiller) normalize price changes to a base (Jan 2000 = 100) and do not represent dollar prices. 
          Mortgage data sourced from Freddie Mac Primary Mortgage Market Survey (PMMS). No individual addresses tracked; purely aggregate statistical series.
        </div>
      </div>
    </footer>
  );
}
