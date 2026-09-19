import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    product: 'SHELTER.WATCH',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    connectors: {
      freddie_pmms: 'ok',
      case_shiller: 'ok',
      zillow: 'ok'
    }
  });
}
