import type { ProjectIconKey } from '@/content/profile';

/** Small CSS-built project snapshots. They are illustrative previews, not product screenshots. */
export function ProjectPreview({ kind }: { kind: ProjectIconKey }) {
  if (kind === 'business') return (
    <div className="project-preview preview-business" role="img" aria-label="Illustrative business dashboard preview">
      <div className="preview-windowbar"><i/><i/><i/><span>MYBUSINESS / OVERVIEW</span></div>
      <div className="preview-dashboard">
        <div className="preview-sidebar"><b>MB.</b><i/><i/><i/><i/></div>
        <div className="preview-main"><small>BUSINESS OVERVIEW</small><strong>Good morning.</strong><div className="preview-metrics"><i/><i/><i/></div><div className="preview-chart"><b/><b/><b/><b/><b/><b/><b/></div></div>
      </div>
      <span className="preview-caption">INVENTORY · SALES · FINANCE</span>
    </div>
  );
  if (kind === 'ai') return (
    <div className="project-preview preview-ai" role="img" aria-label="Illustrative Sana AI command and response preview">
      <div className="preview-ai-head"><span className="preview-ai-orb">✳</span><div><b>Sana AI</b><small>BUSINESS ASSISTANT · CONCEPT PREVIEW</small></div></div>
      <div className="preview-prompt"><small>YOU · ROMAN URDU</small>Ali ka is mahine ka khata dikhao</div>
      <div className="preview-response"><small>SANA AI · STRUCTURED INTENT</small><b>customer.ledger</b><span>customer: Ali&nbsp;&nbsp; period: this month</span></div>
      <div className="preview-languages"><i>ENGLISH</i><i>اردو</i><i>ROMAN URDU</i></div>
    </div>
  );
  if (kind === 'connect') return (
    <div className="project-preview preview-connect" role="img" aria-label="Illustrative timetable extraction preview">
      <div className="preview-doc"><small>INPUT · TIMETABLE.PDF</small><div/><div/><div/><div/><div/></div>
      <div className="preview-extract">PDF <span>→</span> OCR <span>→</span> SCHEDULE</div>
      <div className="preview-calendar"><b>MON</b><b>TUE</b><b>WED</b><i/><i/><i/><i/><i/><i/></div>
      <span className="preview-caption">DOCUMENT → ORGANIZED TIMETABLE</span>
    </div>
  );
  if (kind === 'fragrance') return (
    <div className="project-preview preview-fragrance" role="img" aria-label="Illustrative fragrance storefront preview">
      <div className="preview-store-head"><b>RAJPUT <span>FRAGRANCE</span></b><small>COLLECTION / 2026</small></div>
      <div className="preview-bottles"><i/><i/><i/></div>
      <div className="preview-store-foot"><b>SCENTS THAT STAY.</b><span>EXPLORE THE COLLECTION ↗</span></div>
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
