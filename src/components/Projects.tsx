'use client';

import { useCallback, useState } from 'react';
import { profile, type Project, type ProjectGroup } from '@/content/profile';
import { SanaDetails } from './SanaAI';
import { ProjectPreview } from './ProjectPreview';

export function Projects() {
  const { projects } = profile;
  const items: Project[] = projects.items;
  const featuredOrder: ProjectGroup[] = ['MyBusiness', 'Sana AI', 'Connect PAF', 'Rajput Fragrance'];
  const remainingOrder: ProjectGroup[] = ['Management Systems', 'Games', 'Other'];
  const groupOrder: ProjectGroup[] = [...featuredOrder, ...remainingOrder];
  const groupedItems = groupOrder
    .map((group) => ({
      group,
      items: items.map((project, index) => ({ project, index })).filter(({ project }) => project.group === group),
    }))
    .filter(({ items: groupItems }) => groupItems.length > 0);
  const [sanaOpen, setSanaOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
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

      <div className="project-groups" id="all-project-groups">
        {groupedItems
          .filter(({ group }) => showAllProjects || featuredOrder.includes(group))
          .map(({ group, items: groupItems }) => {
          const groupId = `project-group-${group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
          return (
            <div
              className={`project-group project-group-${group.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
              key={group}
              aria-labelledby={groupId}
            >
              <div className="project-group-panel">
                <div className="project-group-heading">
                  <span className="project-group-rule" aria-hidden="true" />
                  <div className="project-group-heading-copy">
                    <h3 id={groupId}>{group}</h3>
                    <span className="project-group-count">{String(groupItems.length).padStart(2, '0')} PROJECTS</span>
                  </div>
                  <span className="project-group-rule" aria-hidden="true" />
                </div>

                <div className="project-grid">
                  {groupItems.map(({ project: p, index: i }) => (
                    <article
                      key={p.title}
                      className={`project-card reveal${p.featured ? ' project-featured' : ''}${group === 'Sana AI' ? ' project-sana-featured' : ''}${p.soon ? ' project-is-soon' : ''}${p.detail ? ' project-highlight' : ''}`}
                    >
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
                        {p.tags.map((t) => <span key={t}>{t}</span>)}
                      </div>
                      {p.soon ? (
                        <span className="project-soon" aria-label="Available soon">{projects.soonNote}</span>
                      ) : (
                        <div className="project-actions">
                          {p.slug && <a className="project-link" href={`/projects/${p.slug}`}>Explore case study <span aria-hidden="true">→</span></a>}
                          {p.detail === 'sana' && (
                            <button type="button" className="project-detail-btn" aria-haspopup="dialog" onClick={() => setSanaOpen(true)}>
                              Try browser demos <span aria-hidden="true">↗</span>
                            </button>
                          )}
                          {p.link && <a className="project-external-link" href={p.link.href} target="_blank" rel="noreferrer">{p.link.label} ↗</a>}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="all-projects-link"
        aria-expanded={showAllProjects}
        aria-controls="all-project-groups"
        onClick={() => setShowAllProjects((visible) => !visible)}
      >
        {showAllProjects ? 'Show featured projects' : 'See all projects'}
        <span aria-hidden="true">{showAllProjects ? '↑' : '↓'}</span>
      </button>
      {sanaOpen && <SanaDetails onClose={closeSana} />}
    </section>
  );
}
