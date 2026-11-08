import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/content/caseStudies';
import { Ambient } from '@/components/Ambient';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Project not found' };
  return {
    title: `${study.title} — Sanaullah`,
    description: study.summary,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: { title: `${study.title} — Sanaullah`, description: study.summary, type: 'article' },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Ambient />
      <Header />
      <main className="case-study-page">
      <div className="case-study-wrap">
        <Link href="/#projects" className="case-back">← Back to selected work</Link>
        <header className="case-hero">
          <p className="eyebrow">PROJECT {study.number} / CASE STUDY</p>
          <p className="case-category">{study.category}</p>
          <h1>{study.title}<span>.</span></h1>
          <p className="case-summary">{study.summary}</p>
          <div className="case-meta"><span>{study.status}</span><span>·</span><span>Designed & developed by Sanaullah</span></div>
        </header>

        <section className="case-section case-architecture" aria-labelledby="architecture-title">
          <div className="case-section-heading"><p className="eyebrow">SYSTEM OVERVIEW</p><h2 id="architecture-title">How the pieces <span>connect.</span></h2><p>A simplified view of the project's workflow and major components.</p></div>
          <div className="architecture-flow">
            {study.architecture.map((part, index) => (
              <div className="architecture-step" key={part.label}>
                <span className="architecture-index">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{part.label}</h3><p>{part.detail}</p></div>
                {index < study.architecture.length - 1 && <span className="architecture-arrow" aria-hidden="true">↓</span>}
              </div>
            ))}
          </div>
        </section>

        <div className="case-two-col">
          <section className="case-section"><p className="eyebrow">THE PROBLEM</p><h2>Why build it?</h2><p>{study.problem}</p></section>
          <section className="case-section"><p className="eyebrow">MY APPROACH</p><h2>What I focused on.</h2><p>{study.approach}</p></section>
        </div>

        <section className="case-section">
          <p className="eyebrow">CAPABILITIES</p><h2>What it is designed to do.</h2>
          <div className="case-capabilities">{study.capabilities.map((item, i) => <div key={item}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
        </section>

        <section className="case-section">
          <p className="eyebrow">ENGINEERING NOTES</p><h2>Decisions behind the work.</h2>
          <ul className="case-engineering">{study.engineering.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="case-section case-stack-section">
          <div><p className="eyebrow">TECHNOLOGY</p><h2>Tools in the stack.</h2></div>
          <div className="case-stack">{study.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        {study.note && <p className="case-note">{study.note}</p>}
        <section className="case-links"><div><p className="eyebrow">EXPLORE FURTHER</p><h2>See the work.</h2></div><div className="case-link-list">{study.links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} <span>↗</span></a>)}</div></section>
        <footer className="case-footer"><Link href="/#projects">← All projects</Link><Link href="/#contact">Get in touch ↗</Link></footer>
      </div>
      </main>
      <Footer />
    </>
  );
}
