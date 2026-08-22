import { NextResponse } from 'next/server';
import { getFaqs } from '@/lib/content';

export const GET = async () => {
  try {
    const faqs = await getFaqs();
    return NextResponse.json({ data: faqs });
  } catch {
    return NextResponse.json({ error: 'FAQs konnten nicht geladen werden.' }, { status: 500 });
  }
};
