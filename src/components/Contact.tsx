import { profile } from '@/content/profile';

export function Contact() {
  const { contact } = profile;
  return (
    <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact-main">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 id="contact-title">
          {contact.titleLine1}
          <br />
          <span className="accent-text">{contact.titleLine2}</span>
        </h2>
        <p className="contact-copy">{contact.text}</p>
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            {contact.cta} <span aria-hidden="true">✉</span>
          </a>
          <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <aside className="contact-card" aria-label={contact.cardTitle}>
        <p className="eyebrow">{contact.cardTitle}</p>
        <dl>
          {contact.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>
                {'href' in row && row.href ? (
                  <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
