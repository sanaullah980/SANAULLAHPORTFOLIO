import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import { profile } from '@/content/profile';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sanaullah-portfolio-jet.vercel.app'),
  title: profile.siteTitle,
  description: profile.description,
  alternates: { canonical: '/' },
  openGraph: { title: profile.siteTitle, description: profile.ogDescription, type: 'website', siteName: 'Sanaullah Portfolio', images: [{ url: '/photo.jpg', width: 1080, height: 1059, alt: 'Sanaullah' }] },
  twitter: { card: 'summary_large_image', title: profile.siteTitle, description: profile.ogDescription, images: ['/photo.jpg'] },
};

export const viewport: Viewport = { themeColor: '#F4F1EA' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plex.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: 'https://sanaullah-portfolio-jet.vercel.app', image: 'https://sanaullah-portfolio-jet.vercel.app/photo.jpg', email: profile.email, address: { '@type': 'Country', name: 'Pakistan' }, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Pakistan-Austria Fachhochschule (PAF-IAST)' }, knowsAbout: ['Software development', 'Artificial intelligence', 'Machine learning', 'Data science', 'Web development', 'Android development'] }) }} />
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
