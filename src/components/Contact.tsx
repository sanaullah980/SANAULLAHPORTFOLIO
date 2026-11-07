import { profile } from '@/content/profile';

export function Contact() {
  const { contact } = profile;
  return (
    <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">{contact.eyebrow}</p>
      <h2 id="contact-title">
        {contact.titleLine1}
        <br />
        <span className="accent-text">{contact.titleLine2}</span>
      </h2>
      <p className="contact-copy">{contact.text}</p>
      <a className="button button-primary contact-button" href={profile.github} target="_blank" rel="noreferrer">
        {contact.cta} <span aria-hidden="true">↗</span>
      </a>
      <div className="contact-social">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {contact.extras.map((x) => (
          <span key={x}>
            <span>·</span> {x}
          </span>
        ))}
      </div>
    </section>
  );
}
