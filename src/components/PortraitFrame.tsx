'use client';

import { useRef } from 'react';
import { profile } from '@/content/profile';

/** The hero portrait; on desktop it tilts slightly toward the cursor. */
export function PortraitFrame() {
  const visual = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  const enabled = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled() || !visual.current || !frame.current) return;
    const rect = visual.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.current.style.setProperty('--tilt-x', `${x * 7}px`);
    frame.current.style.setProperty('--tilt-y', `${y * 7}px`);
    frame.current.style.setProperty('--tilt-r', `${x * 1.5}deg`);
  };
  const onLeave = () => {
    const el = frame.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0px');
    el.style.setProperty('--tilt-y', '0px');
    el.style.setProperty('--tilt-r', '0deg');
  };

  return (
    <div
      className="hero-visual"
      aria-label={`Portrait of ${profile.name}`}
      ref={visual}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="portrait-frame" ref={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="profile-photo" src={profile.photo} alt={profile.name} />
        <div className="portrait-ring ring-one" />
        <div className="portrait-ring ring-two" />
        <span className="portrait-chip chip-top">
          <span className="chip-spark">✳</span> {profile.hero.chipTop}
        </span>
        <span className="portrait-chip chip-bottom">
          <span className="chip-pulse" /> {profile.hero.chipBottom}
        </span>
      </div>
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <span className="visual-index">{profile.hero.index}</span>
    </div>
  );
}
