import type { MutableRefObject } from 'react';

/**
 * Static figure for the journey section: the photo with its background removed (public/photo-cutout.png), standing
 * on the ground line. No 3D model, no movement.
 * (The props are kept so Journey does not need to change.)
 */
export default function StoryAvatar({
}: {
  walking?: MutableRefObject<boolean>;
  chapter?: MutableRefObject<number>;
  photo?: string;
}) {
  return (
    <figure className="story-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/photo-cutout.png" alt="Sanaullah in a navy suit" width={527} height={1034} />
    </figure>
  );
}
