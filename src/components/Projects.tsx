'use client';

import { useCallback, useState } from 'react';
import type { Project, ProjectGroup } from '@/content/profile';
import { SanaDetails } from './SanaAI';
import { ProjectPreview } from './ProjectPreview';

type IndexedProject = { project: Project; index: number };

export function Projects({ projects }: { projects: typeof import('@/content/projects').projectsData }) {
  const items: Project[] = projects.items;
  const featuredTitles = ['MyBusiness', 'Sana AI', 'Connect PAF', 'Rajput Fragrance'];
  const groupOrder: ProjectGroup[] = ['MyBusiness', 'Connect PAF', 'Management Systems', 'Games', 'Other'];
  const featuredItems: IndexedProject[] = featuredTitles
    .map((title) => {
      const index = items.findIndex((project) => project.title === title);
      return index >= 0 ? { project: items[index], index } : null;
    })
    .filter((item): item is IndexedProject => item !== null);
  const featuredSet = new Set(featuredTitles);
  const additionalGroups = groupOrder
    .map((group) => ({
      group,
      items: items
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => project.group === group && !featuredSet.has(project.title)),
    }))
    .filter(({ items: groupItems }) => groupItems.length > 0);

  const [sanaOpen, setSanaOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const closeSana = useCallback(() => setSanaOpen(false), []);

  const renderProjectCard = ({ project: p, index: i }: IndexedProject) => (
    <article
      key={p.title}
      className={`project-card reveal${p.featured ? ' project-featured' : ''}${p.title === 'Sana AI' ? ' project-sana-featured' : ''}${p.soon ? ' project-is-soon' : ''}${p.detail ? ' project-highlight' : ''}`}
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
  );

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
        <div className="project-group project-group-featured">
          <div className="project-group-panel">
            <div className="project-group-heading">
              <span className="project-group-rule" aria-hidden="true" />
              <div className="project-group-heading-copy">
                <h3>Featured Projects</h3>
                <span className="project-group-count">04 SELECTED WORKS</span>
              </div>
              <span className="project-group-rule" aria-hidden="true" />
            </div>
            <div className="project-grid featured-project-grid">
              {featuredItems.map(renderProjectCard)}
            </div>
          </div>
        </div>

        {showAllProjects && additionalGroups.map(({ group, items: groupItems }) => {
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
                  {groupItems.map(renderProjectCard)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {additionalGroups.length > 0 && (
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
      )}
      {sanaOpen && <SanaDetails onClose={closeSana} />}
    </section>
  );
}
