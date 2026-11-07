'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile, type Chapter } from '@/content/profile';
import { Words } from './Words';

const StoryAvatar = dynamic(() => import('./StoryAvatar'), { ssr: false });

const chapters: Chapter[] = profile.story.chapters;

function ChapterCard({ chapter, journey }: { chapter: Chapter; journey: boolean }) {
  return (
    <div className="timeline-card">
      <p className="timeline-label">{chapter.label}</p>
      <h3>{journey ? <Words text={chapter.title} /> : chapter.title}</h3>
      <p>{chapter.text}</p>
      {chapter.tags && (
        <div className="tag-row">
          {chapter.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Vertical timeline by default (phones, reduced motion, no JS).
 * On desktop, vertical scroll drives a horizontal walk and the 3D character
 * walks along the ground line while the chapters slide past.
 */
export function Journey() {
  const [journey, setJourney] = useState(false);
  const [active, setActive] = useState(0);
  const [cue, setCue] = useState(true);

  const space = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const walking = useRef(false);
  const activeRef = useRef(0);
  const previous = useRef(0);
  const stopTimer = useRef(0);
  const cueTimer = useRef(0);

  // Decide between the walk and the plain vertical list
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 701px)');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setJourney(wide.matches && motion.matches);
    update();
    wide.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const s = space.current;
    const st = stage.current;
    if (!s || !st) return;
    const travel = Math.max(1, s.offsetHeight - st.offsetHeight);
    const top = s.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (index / (chapters.length - 1)) * travel, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!journey) return;
    const s = space.current;
    const st = stage.current;
    const tr = track.current;
    if (!s || !st || !tr) return;
    const max = chapters.length - 1;
    let frame = 0;

    const showCue = () => setCue(true);
    const hideCue = () => {
      setCue(false);
      window.clearTimeout(cueTimer.current);
      cueTimer.current = window.setTimeout(showCue, 6000);
    };

    const update = () => {
      frame = 0;
      const travel = Math.max(1, s.offsetHeight - st.offsetHeight);
      const passed = Math.min(travel, Math.max(0, -s.getBoundingClientRect().top));
      const p = passed / travel;
      tr.style.transform = `translate3d(${-p * max * 100}vw, 0, 0)`;
      if (fill.current) fill.current.style.transform = `scaleX(${p})`;

      if (Math.abs(p - previous.current) > 0.00005) {
        walking.current = true;
        hideCue();
        window.clearTimeout(stopTimer.current);
        stopTimer.current = window.setTimeout(() => {
          walking.current = false;
        }, 190);
      }
      previous.current = p;

      const index = Math.round(p * max);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      s.style.height = `${st.offsetHeight * chapters.length}px`;
      request();
    };

    measure();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null;
    ro?.observe(st);

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const rect = s.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;
      if (e.key === 'ArrowRight' && activeRef.current < max) {
        e.preventDefault();
        goTo(activeRef.current + 1);
      } else if (e.key === 'ArrowLeft' && activeRef.current > 0) {
        e.preventDefault();
        goTo(activeRef.current - 1);
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', measure);
      document.removeEventListener('keydown', onKey);
      ro?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(stopTimer.current);
      window.clearTimeout(cueTimer.current);
      walking.current = false;
    };
  }, [journey, goTo]);

  if (!journey) {
    return (
      <div className="timeline">
        {chapters.map((c) => (
          <article className="timeline-item" key={c.marker}>
            <div className="timeline-marker">{c.marker}</div>
            <ChapterCard chapter={c} journey={false} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="journey-scroll-space journey-enabled-wrap" ref={space} aria-label="Scroll through the journey">
      <div className="journey-stage" ref={stage} role="group" aria-roledescription="scrolling timeline">
        <div className="timeline journey-track" ref={track}>
          {chapters.map((c, i) => (
            <article className="timeline-item journey-card" key={c.marker} aria-current={i === active ? 'step' : undefined}>
              <div className="timeline-marker">{c.marker}</div>
              <ChapterCard chapter={c} journey />
              <div className="chapter-marker" aria-hidden="true">
                <strong>{c.marker}</strong>
                <span>{c.label.replace(/\s*·\s*/, ' · ')}</span>
              </div>
            </article>
          ))}
        </div>

        <StoryAvatar walking={walking} photo={profile.photo} />

        <span className="journey-hint" aria-hidden="true" data-visible={cue ? '' : undefined}>
          {profile.story.cue}
        </span>

        <div className="journey-progress" role="group" aria-label={profile.story.railLabel}>
          <div className="rail-line" aria-hidden="true">
            <span ref={fill} />
          </div>
          {chapters.map((c, i) => (
            <button key={c.marker} type="button" aria-current={i === active ? 'step' : undefined} onClick={() => goTo(i)}>
              <b>{c.marker}</b>
              {c.railLabel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
