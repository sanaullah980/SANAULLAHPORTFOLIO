'use client';

import { useEffect, useRef } from 'react';

/** Soft blurred shapes behind the glass; they drift slowly as the page scrolls. */
export function Ambient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      ref.current?.style.setProperty('--p', String(window.scrollY / 400));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true" ref={ref}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
