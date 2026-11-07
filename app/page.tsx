import { Ambient } from '@/components/Ambient';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Journey } from '@/components/Journey';
import { SanaAI } from '@/components/SanaAI';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/RevealObserver';
import { profile } from '@/content/profile';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Ambient />
      <Header />
      <main id="main">
        <Hero />
        <SanaAI />
        <section className="story section-wrap" id="story" aria-labelledby="story-title">
          <div className="section-heading">
            <p className="eyebrow">{profile.story.eyebrow}</p>
            <h2 id="story-title">
              {profile.story.title} <span className="accent-text">{profile.story.titleAccent}</span>
            </h2>
            <p className="section-intro">{profile.story.intro}</p>
          </div>
          <Journey />
        </section>
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
