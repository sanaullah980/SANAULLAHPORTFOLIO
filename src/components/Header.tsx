'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { profile } from '@/content/profile';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homePath = pathname === '/';
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <header className="site-header" id="top" ref={headerRef}>
      <a className="brand" href={homePath ? '#top' : '/#top'} aria-label={`${profile.name} home`}>
        {profile.initial}
        <span>.</span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <nav className={`nav${open ? ' is-open' : ''}`} id="primary-nav" aria-label="Main navigation">
        {profile.nav.map((item) => (
          <a key={item.href} href={homePath ? item.href : `/${item.href}`} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-contact" href={homePath ? '#contact' : '/#contact'} onClick={() => setOpen(false)}>
          {profile.navCta} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
