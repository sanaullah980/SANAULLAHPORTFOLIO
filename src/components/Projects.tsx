'use client';

import { useCallback, useState } from 'react';
import { profile, type Project } from '@/content/profile';
import { SanaDetails } from './SanaAI';
import { ProjectPreview } from './ProjectPreview';

export function Projects() {
  const { projects } = profile;
  const items: Project[] = projects.items;
  const [sanaOpen, setSanaOpen] = useState(false);
  const closeSana = useCallback(() => setSanaOpen(false), []);
  return (
    <section className="projects section-wrap" id="projects" aria-labelledby="projects-title">
      <div className="section-heading projects-heading">
        <div>
          <p className="eyebrow">{projects.eyebrow}</p>
          <h2 id="projects-title">
            {projects.title} <span className="accent-text">{projects.titleAccent}</span>
          </h2>
        </div>
        <p className="section-intro">{projects.intro}</p>
      </div>
      <div className="project-grid">
        {items.map((p, i) => (
          <article key={p.title} className={`project-card reveal${p.featured ? ' project-featured' : ''}${p.soon ? ' project-is-soon' : ''}${p.detail ? ' project-highlight' : ''}`}>
            <div className="project-topline">
              <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
              <span className={`project-status status-${p.status}`}>
                <i /> {projects.statusLabels[p.status]}
              </span>
            </div>
            <ProjectPreview kind={p.icon} />
            <p className="project-kind">{p.kind}</p>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="tag-row">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {p.soon ? (
              <span className="project-soon" aria-label="Available soon">
                {projects.soonNote}
              </span>
            ) : (
              <div className="project-actions">
                {p.slug && <a className="project-link" href={`/projects/${p.slug}`}>Explore case study <span aria-hidden="true">→</span></a>}
                {p.detail === 'sana' && <button type="button" className="project-detail-btn" aria-haspopup="dialog" onClick={() => setSanaOpen(true)}>Try browser demos <span aria-hidden="true">↗</span></button>}
                {p.link && <a className="project-external-link" href={p.link.href} target="_blank" rel="noreferrer">{p.link.label} ↗</a>}
              </div>
            )}
          </article>
        ))}
      </div>
      <a className="all-projects-link" href={profile.github} target="_blank" rel="noreferrer">
        {projects.allLink} <span aria-hidden="true">↗</span>
      </a>
      {sanaOpen && <SanaDetails onClose={closeSana} />}
    </section>
  );
}
