import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="brand footer-brand" href="#top">
        {profile.initial}
        <span>.</span>
      </a>
      <p>{profile.footer.text}</p>
      <a className="footer-mail" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <a href="#top" className="back-top">
        {profile.footer.backToTop}
      </a>
      <span className="footer-year">© {new Date().getFullYear()}</span>
    </footer>
  );
}
