'use server';

import { timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import {
  createProjectAccessToken,
  PROJECTS_COOKIE_NAME,
  PROJECTS_SESSION_SECONDS,
} from '@/lib/project-access';

export async function unlockProjects(_previous: { error: string }, formData: FormData) {
  const submitted = String(formData.get('password') || '');
  const expected = process.env.PROJECTS_PASSWORD || 'pakistan';
  const submittedBuffer = Buffer.from(submitted);
  const expectedBuffer = Buffer.from(expected);
  const matches = submittedBuffer.length === expectedBuffer.length && timingSafeEqual(submittedBuffer, expectedBuffer);

  if (!matches) return { error: 'Incorrect password. Please try again.' };

  const expires = Math.floor(Date.now() / 1000) + PROJECTS_SESSION_SECONDS;
  const cookieStore = await cookies();
  cookieStore.set(PROJECTS_COOKIE_NAME, createProjectAccessToken(expires), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: PROJECTS_SESSION_SECONDS,
  });
  return { error: '' };
}
