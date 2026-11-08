import { profile } from '@/content/profile';

export function About() {
  const { about } = profile;
  return (
    <section className="about section-wrap" id="about" aria-labelledby="about-title">
      <div className="about-mark" aria-hidden="true">
        {profile.initial}
        <span>.</span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">{about.eyebrow}</p>
        <h2 id="about-title">
          {about.titleLine1}
          <br />
          <span className="accent-text">{about.titleLine2}</span>
        </h2>
        <p>{about.text}</p>
        <div className="education-line">
          <span className="education-icon">✳</span>
          <span>
            <strong>{about.degree}</strong>
            <small>{about.school}</small>
          </span>
        </div>
      </div>
    </section>
  );
}
