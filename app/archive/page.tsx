import React from 'react';

export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">24-Month Historical Archive</h1>
        <p className="text-sm text-text-muted">Frozen historical monthly snapshots of Case-Shiller, PMMS, and metro sales</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm text-sm text-text-muted">
        Archived records are immutable once published. Displays historical lag annotations and nominal vs real deflator benchmarks.
      </div>
    </div>
  );
}
