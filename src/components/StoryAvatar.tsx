import type { MutableRefObject } from 'react';

/**
 * Static portrait used in the journey section: a framed photo, no 3D model and no movement.
 * (The props are kept so Journey does not need to change.)
 */
export default function StoryAvatar({
  photo,
}: {
  walking?: MutableRefObject<boolean>;
  chapter?: MutableRefObject<number>;
  photo: string;
}) {
  return (
    <figure className="story-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="Sanaullah in a navy suit" width={1080} height={1059} />
      <figcaption>Sanaullah · Data Science &amp; AI/ML</figcaption>
    </figure>
  );
}
