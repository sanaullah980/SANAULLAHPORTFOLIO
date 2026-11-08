import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const PROJECTS_COOKIE_NAME = 'portfolio_projects_access';
export const PROJECTS_SESSION_SECONDS = 60 * 60 * 24 * 7;

const sessionSecret = () =>
  process.env.PROJECTS_SESSION_SECRET || process.env.PROJECTS_PASSWORD || 'pakistan';
const sign = (payload: string) =>
  createHmac('sha256', sessionSecret()).update(payload).digest('base64url');

export function createProjectAccessToken(expires: number) {
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export async function hasProjectsAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PROJECTS_COOKIE_NAME)?.value;
  if (!token) return false;
  const [expires, signature, extra] = token.split('.');
  if (!expires || !signature || extra || !/^\d+$/.test(expires) || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
