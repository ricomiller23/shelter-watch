import { NextResponse } from 'next/server';
import { SEED_HOUSING_OBSERVATIONS } from '../../../lib/fallback-data';

export async function GET() {
  return NextResponse.json(SEED_HOUSING_OBSERVATIONS);
}
