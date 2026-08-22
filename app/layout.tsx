import type { Metadata } from 'next';
import { Syne, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@repo/ui';
import { SiteChrome } from './components/SiteChrome';
import { defaultMetadata, siteConfig } from '@/lib/config/site';

const display = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const body = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var dark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(dark?'dark':'light');r.style.colorScheme=dark?'dark':'light';}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-[family-name:var(--font-body)]">
        <RootProviders>
          <SiteChrome>{children}</SiteChrome>
        </RootProviders>
      </body>
    </html>
  );
};

export default RootLayout;
