export const siteConfig = {
  name: 'KiezWerk Berlin',
  legalName: 'KiezWerk Berlin (Demo)',
  tagline: 'Handwerk in Berlin – klar geplant, sauber umgesetzt.',
  description:
    'Demo-Anfrageplattform eines fiktiven Berliner Handwerksbetriebs. Showcase-Projekt von Lück Digital – Inhalte und Anfragen sind fiktiv.',
  demoBanner: 'Demo-Projekt von Lück Digital – Inhalte und Anfragen sind fiktiv.',
  showcaseBy: 'Lück Digital',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'de-DE',
  contact: {
    email: 'anfrage.demo@kiezwerk.example',
    phone: '+49 30 00000000 (Demo-Nummer, nicht erreichbar)',
    address: 'Musterstraße 0, 10xxx Berlin (Demo-Adresse, kein realer Standort)',
  },
} as const;

export const defaultMetadata = {
  title: {
    default: `${siteConfig.name} – Demo-Showcase`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: 'website' as const,
    locale: 'de_DE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};
