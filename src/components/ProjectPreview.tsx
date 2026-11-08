import type { ProjectIconKey } from '@/content/profile';

const projectScreenshots: Partial<Record<ProjectIconKey, { src: string; alt: string }>> = {
  business: {
    src: 'https://raw.githubusercontent.com/sanaullah980/SANAULLAHPORTFOLIO/main/pictures/WhatsApp%20Image%202026-11-08%20at%2011.56.16%20PM.jpeg',
    alt: 'MyBusiness mobile dashboard showing sales, cash, stock and business shortcuts',
  },
  connect: {
    src: 'https://raw.githubusercontent.com/sanaullah980/SANAULLAHPORTFOLIO/main/pictures/WhatsApp%20Image%202026-11-08%20at%2011.56.15%20PM.jpeg',
    alt: 'Connect PAF campus portal welcome screen',
  },
  fragrance: {
    src: 'https://raw.githubusercontent.com/sanaullah980/SANAULLAHPORTFOLIO/main/pictures/WhatsApp%20Image%202026-11-08%20at%2011.56.13%20PM.jpeg',
    alt: 'Rajput Fragrance premium perfume storefront',
  },
};

/** Render the supplied product screenshot when available, otherwise use an illustrative preview. */
export function ProjectPreview({ kind }: { kind: ProjectIconKey }) {
  const screenshot = projectScreenshots[kind];

  if (screenshot) {
    return (
      <div
        className={`project-preview preview-image preview-${kind}`}
        role="img"
        aria-label={screenshot.alt}
        style={{ aspectRatio: '16 / 9', overflow: 'hidden', background: '#090909' }}
      >
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>
    );
  }

  if (kind === 'ai') return (
    <div className="project-preview preview-ai" role="img" aria-label="Illustrative Sana AI command and response preview">
      <div className="preview-ai-head"><span className="preview-ai-orb">✳</span><div><b>Sana AI</b><small>BUSINESS ASSISTANT · CONCEPT PREVIEW</small></div></div>
      <div className="preview-prompt"><small>YOU · ROMAN URDU</small>Ali ka is mahine ka khata dikhao</div>
      <div className="preview-response"><small>SANA AI · STRUCTURED INTENT</small><b>customer.ledger</b><span>customer: Ali&nbsp;&nbsp; period: this month</span></div>
      <div className="preview-languages"><i>ENGLISH</i><i>اردو</i><i>ROMAN URDU</i></div>
    </div>
  );

  return (
    <div className="project-preview preview-cpp" role="img" aria-label="Illustrative C++ terminal preview">
      <div className="preview-terminal-head"><i/><i/><i/><span>inventory.cpp</span></div>
      <div className="preview-code"><span>01</span> <b>#include</b> &lt;iostream&gt;<br/><span>02</span> <b>int</b> main() {'{'}<br/><span>03</span> &nbsp; Product inventory[ ];<br/><span>04</span> &nbsp; inventory.manage();<br/><span>05</span> {'}'} </div>
      <span className="preview-caption">C++ · PROGRAMMING FOUNDATIONS</span>
    </div>
  );
}
