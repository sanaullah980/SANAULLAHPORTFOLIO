import Link from 'next/link';
import { Ambient } from '@/components/Ambient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Ambient />
      <Header />
      <main className="case-study-page">
        <div className="case-study-wrap case-not-found">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h1>This page took a wrong turn<span>.</span></h1>
          <p>The page may have moved, or the link may be outdated. Head back to the portfolio to explore the projects.</p>
          <Link className="button button-primary" href="/">Back to homepage <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
