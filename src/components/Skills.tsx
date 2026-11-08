import { profile } from '@/content/profile';

export function Skills() {
  const { skills } = profile;
  return (
    <section className="skills section-wrap" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow">{skills.eyebrow}</p>
        <h2 id="skills-title">
          {skills.title} <span className="accent-text">{skills.titleAccent}</span>
        </h2>
        <p className="section-intro">{skills.intro}</p>
      </div>
      <ul className="skill-roles reveal" aria-label="Focus areas">
        {skills.roles.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <div className="skills-grid">
        {skills.groups.map((g, i) => (
          <article key={g.title} className="skill-panel reveal">
            <span className="skill-badge" aria-hidden="true">
              {g.icon}
            </span>
            <span className="skill-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{g.title}</h3>
            <p className="skill-desc">{g.text}</p>
            <div className="skill-list">
              {g.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
