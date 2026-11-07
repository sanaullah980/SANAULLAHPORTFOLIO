/**
 * Single source of truth for everything shown on the site.
 * Edit text, links and projects here; no other file needs to change.
 */

export type ProjectStatus = 'progress' | 'complete';
export type ProjectIconKey = 'business' | 'ai' | 'fragrance' | 'connect' | 'cpp';

export interface Project {
  icon: ProjectIconKey;
  status: ProjectStatus;
  featured?: boolean;
  kind: string;
  title: string;
  text: string;
  tags: string[];
  link: { label: string; href: string };
}

export interface Chapter {
  marker: string;
  label: string; // "NOW · PAF-IAST" – shown above the title and under the ground line
  railLabel: string; // short label in the bottom rail
  title: string;
  text: string;
  tags?: string[];
  stats: { value: string; label: string }[];
}

export const profile = {
  name: 'Sanaullah',
  initial: 'S',
  siteTitle: 'Sanaullah — Data Science & AI/ML',
  description:
    'Sanaullah — Data Science student, software developer, and AI/ML enthusiast at PAF-IAST.',
  ogDescription: 'I build practical software and explore intelligent systems for real-world problems.',
  photo: '/photo.jpg',
  github: 'https://github.com/sanaullah980',
  email: 'sanaullahmawia980@gmail.com',
  location: 'Pakistan',

  nav: [
    { href: '#story', label: 'My journey' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
  ],
  navCta: 'Get in touch',

  hero: {
    eyebrow: 'DATA SCIENCE STUDENT · PAKISTAN',
    titleLine1: 'Building useful things.',
    titleLine2: 'Learning what’s next.',
    lead:
      'I’m Sanaullah — a BS Data Science student, software developer, and AI/ML enthusiast at PAF-IAST. I turn ideas into practical applications and explore how intelligent systems can solve real problems.',
    primaryCta: 'Explore my work',
    secondaryCta: 'GitHub',
    note: 'Currently in my 3rd semester · Open to learning and collaboration',
    chipTop: 'curious by nature',
    chipBottom: 'building in progress',
    index: '01 / THE INTRO',
    scrollCue: 'SCROLL TO EXPLORE',
    stats: [
      { value: '3rd', label: 'Semester · BS Data Science' },
      { value: '5', label: 'Projects · web & AI' },
      { value: 'AI/ML', label: 'Main focus' },
    ],
  },

  story: {
    eyebrow: 'A WORK IN PROGRESS',
    title: 'The journey',
    titleAccent: 'so far.',
    intro:
      'I’m early in my career, learning by making things. Here’s what I’m studying and building along the way.',
    cue: 'Scroll to explore',
    railLabel: 'Journey chapters',
    chapters: [
      {
        marker: '01',
        label: 'NOW · PAF-IAST',
        railLabel: 'Now',
        title: 'Studying data science',
        text: 'I’m pursuing a BS in Data Science at Pakistan-Austria Fachhochschule, currently in my third semester. My academic interests include AI, machine learning, mathematics, programming, and problem-solving.',
        tags: ['Data Science', 'Algorithms', 'Mathematics'],
        stats: [
          { value: 'BS', label: 'Data Science' },
          { value: '3rd', label: 'Semester' },
          { value: 'PAF-IAST', label: 'University' },
        ],
      },
      {
        marker: '02',
        label: 'BUILDING · SOFTWARE',
        railLabel: 'Building',
        title: 'Making software for everyday needs',
        text: 'From business-management workflows to a university timetable tool, I enjoy shaping ideas into useful web and application experiences. Most of these projects are still in active development.',
        tags: ['Web apps', 'JavaScript', 'Firebase'],
        stats: [
          { value: '5', label: 'Projects' },
          { value: 'PWA', label: 'Web + installable' },
          { value: 'Firebase', label: 'Back-ends' },
        ],
      },
      {
        marker: '03',
        label: 'EXPLORING · AI / ML',
        railLabel: 'Exploring',
        title: 'Learning to build intelligent systems',
        text: 'I’m experimenting with lightweight language models, fine-tuning, and multilingual natural-language interfaces—with the goal of connecting AI to practical tools.',
        tags: ['Python', 'NLP', 'Model experiments'],
        stats: [
          { value: 'LoRA', label: 'Fine-tuning' },
          { value: '3', label: 'Languages: EN · UR · Roman' },
          { value: 'HF', label: 'Hugging Face' },
        ],
      },
      {
        marker: '04',
        label: 'NEXT · THE GOAL',
        railLabel: 'Next',
        title: 'Grow into an AI/ML engineer',
        text: 'My goal is to keep strengthening my foundations and build intelligent software that solves meaningful, real-world problems.',
        tags: ['Machine learning', 'Software engineering', 'Real-world impact'],
        stats: [
          { value: 'AI/ML', label: 'Career goal' },
          { value: 'Math', label: 'Strong foundations' },
          { value: 'Open', label: 'To collaborate' },
        ],
      },
    ] satisfies Chapter[],
  },

  projects: {
    eyebrow: 'SELECTED WORK · 05 PROJECTS',
    title: 'Ideas made',
    titleAccent: 'tangible.',
    intro:
      'A mix of software projects and experiments. In-progress work is labelled clearly; Rajput Fragrance is completed.',
    allLink: 'See my GitHub profile',
    items: [
      {
        icon: 'business',
        status: 'progress',
        featured: true,
        kind: 'BUSINESS MANAGEMENT · WEB / PWA',
        title: 'MyBusiness',
        text: 'A business-management system for shop operations, covering workflows such as inventory, sales, customer and supplier ledgers, expenses, cashbook, reports, staff, and backup. Under active development.',
        tags: ['JavaScript', 'Firebase', 'Firestore', 'PWA'],
        link: { label: 'Open project', href: 'https://mybusiness-green.vercel.app' },
      },
      {
        icon: 'ai',
        status: 'progress',
        featured: true,
        kind: 'ARTIFICIAL INTELLIGENCE · NLP',
        title: 'Sana AI',
        text: 'A learning project exploring lightweight language-model fine-tuning and a business-focused assistant for natural-language commands in English, Urdu, and Roman Urdu.',
        tags: ['Python', 'Qwen', 'Hugging Face', 'LoRA'],
        link: { label: 'More on GitHub', href: 'https://github.com/sanaullah980' },
      },
      {
        icon: 'fragrance',
        status: 'complete',
        kind: 'E-COMMERCE · WEBSITE',
        title: 'Rajput Fragrance',
        text: 'A fragrance-shopping website presenting product collections and brand information, with WhatsApp ordering and a cash-on-delivery order form.',
        tags: ['Website', 'E-commerce', 'WhatsApp ordering'],
        link: { label: 'Visit live website', href: 'https://www.rajputfragrance.online/' },
      },
      {
        icon: 'connect',
        status: 'progress',
        kind: 'EDUCATION · TIMETABLE TOOL',
        title: 'Connect PAF',
        text: 'A university timetable project intended to process schedules from uploaded PDFs—including scanned documents—and make relevant timetable information easier to find.',
        tags: ['TypeScript', 'PDF.js', 'OCR', 'Firebase'],
        link: { label: 'Open Connect PAF', href: 'https://connectpaf.vercel.app' },
      },
      {
        icon: 'cpp',
        status: 'progress',
        kind: 'PROGRAMMING FUNDAMENTALS · CONSOLE',
        title: 'C++ Inventory System',
        text: 'A command-line inventory-management project for practicing C++, program structure, and problem-solving. Additional implementation details will be added as the project develops.',
        tags: ['C++', 'Console app', 'Programming fundamentals'],
        link: { label: 'More on GitHub', href: 'https://github.com/sanaullah980' },
      },
    ] satisfies Project[],
    statusLabels: { progress: 'IN PROGRESS', complete: 'COMPLETED' },
  },

  skills: {
    eyebrow: 'TOOLS & TOPICS',
    title: 'What I’m',
    titleAccent: 'working with.',
    intro:
      'A snapshot of the technologies and subjects I’m learning and using. No inflated skill ratings—just areas I’m actively exploring.',
    groups: [
      { title: 'Programming', items: ['C++', 'Python', 'JavaScript', 'HTML', 'CSS'] },
      {
        title: 'AI & data',
        items: ['Machine learning', 'NLP', 'LLMs', 'Fine-tuning', 'Data analysis', 'Pandas', 'NumPy', 'Scikit-learn'],
      },
      {
        title: 'Tools & platforms',
        items: ['Git / GitHub', 'Firebase', 'Firestore', 'Hugging Face', 'Google Colab', 'PyTorch', 'Transformers'],
      },
    ],
  },

  about: {
    eyebrow: 'A LITTLE ABOUT ME',
    titleLine1: 'Curiosity, code,',
    titleLine2: 'and a lot to learn.',
    text: 'I’m a Data Science student who likes working across software and AI. I enjoy solving problems, learning new tools, and building practical projects—from business workflows to language-model experiments. I’m at the beginning of the journey, and I’m excited about what comes next.',
    degree: 'BS Data Science',
    school: 'PAF-IAST · Pakistan · 3rd Semester',
  },

  contact: {
    eyebrow: 'LET’S CONNECT',
    titleLine1: 'Have an idea?',
    titleLine2: 'Let’s build and learn.',
    text: 'I’m always glad to connect with people interested in software, data science, and AI/ML. Email is the fastest way to reach me.',
    cta: 'Email me',
    cardTitle: 'Contact details',
    rows: [
      { label: 'Email', value: 'sanaullahmawia980@gmail.com', href: 'mailto:sanaullahmawia980@gmail.com' },
      { label: 'GitHub', value: 'github.com/sanaullah980', href: 'https://github.com/sanaullah980' },
      { label: 'Studying', value: 'BS Data Science · PAF-IAST' },
      { label: 'Based in', value: 'Pakistan' },
    ],
  },

  footer: { text: 'Designed and built with curiosity by Sanaullah.', backToTop: 'Back to top ↑' },
};
