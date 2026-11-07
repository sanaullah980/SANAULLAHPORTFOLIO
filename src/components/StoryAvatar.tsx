'use client';

import type { MutableRefObject } from 'react';
import AvatarCanvas from './AvatarCanvas';

/** The walking full-body avatar used by the Journey section. */
export default function StoryAvatar({ walking, photo }: { walking: MutableRefObject<boolean>; photo: string }) {
  return <AvatarCanvas variant="walk" walking={walking} photo={photo} />;
}
