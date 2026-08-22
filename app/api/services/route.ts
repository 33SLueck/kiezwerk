import { NextResponse } from 'next/server';
import { getServices, getServiceBySlug } from '@/lib/content';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const service = await getServiceBySlug(slug);
      if (!service) {
        return NextResponse.json({ error: 'Leistung nicht gefunden.' }, { status: 404 });
      }
      return NextResponse.json({ data: service });
    }

    const services = await getServices();
    return NextResponse.json({ data: services });
  } catch {
    return NextResponse.json({ error: 'Leistungen konnten nicht geladen werden.' }, { status: 500 });
  }
};
