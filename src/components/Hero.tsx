import { profile } from '@/content/profile';
import { PortraitFrame } from './PortraitFrame';

export function Hero() {
  const { hero } = profile;
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> {hero.eyebrow}
        </p>
        <h1 id="hero-title">
          {hero.titleLine1}
          <br />
          <span className="accent-text">{hero.titleLine2}</span>
        </h1>
        <p className="hero-lead">{hero.lead}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={hero.primaryHref}>
            {hero.primaryCta} <span aria-hidden="true">↓</span>
          </a>
          <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
            {hero.secondaryCta} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-note">
          <span className="note-line" />
          <span>{hero.note}</span>
        </div>
      </div>
      <PortraitFrame />
      <a className="scroll-cue" href="#story" aria-label="Scroll to my journey">
        <span /> {hero.scrollCue}
      </a>
    </section>
  );
}
