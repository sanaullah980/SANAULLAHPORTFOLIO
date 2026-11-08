'use client';

import { useActionState } from 'react';
import { unlockProjects } from '../../app/actions';

const initialState = { error: '' };

export function ProjectUnlock() {
  const [state, action, pending] = useActionState(unlockProjects, initialState);
  return (
    <div className="project-lock-panel">
      <div className="project-lock-icon" aria-hidden="true">⌑</div>
      <p className="eyebrow">PRIVATE WORK · RESTRICTED ACCESS</p>
      <h3>This project collection is protected.</h3>
      <p className="project-lock-copy">Enter the password to view the projects, case studies and demos.</p>
      <form action={action} className="project-lock-form">
        <label className="sr-only" htmlFor="projects-password">Password</label>
        <input id="projects-password" name="password" type="password" placeholder="Enter password" autoComplete="current-password" required />
        <button type="submit" disabled={pending}>{pending ? 'Checking…' : 'Unlock projects'} <span aria-hidden="true">→</span></button>
      </form>
      {state.error && <p className="project-lock-error" role="alert">{state.error}</p>}
      <p className="project-lock-footnote">Access is limited to people with the password.</p>
    </div>
  );
}
