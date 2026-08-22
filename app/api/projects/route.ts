import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/content';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const projects = await getProjects(category || undefined);
    return NextResponse.json({ data: projects });
  } catch {
    return NextResponse.json({ error: 'Projekte konnten nicht geladen werden.' }, { status: 500 });
  }
};
