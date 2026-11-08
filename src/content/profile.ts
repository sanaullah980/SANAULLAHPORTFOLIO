/**
 * Single source of truth for everything shown on the site.
 * Edit text, links and projects here; no other file needs to change.
 */

export type ProjectStatus = 'progress' | 'complete' | 'soon';
export type ProjectIconKey = 'business' | 'ai' | 'fragrance' | 'connect' | 'cpp';
export type ProjectGroup = 'MyBusiness' | 'Sana AI' | 'Connect PAF' | 'Rajput Fragrance' | 'Management Systems' | 'Games' | 'Other';

export interface Project {
  icon: ProjectIconKey;
  group: ProjectGroup;
  status: ProjectStatus;
  featured?: boolean;
  slug?: string;
  kind: string;
  title: string;
  text: string;
  tags: string[];
  link?: { label: string; href: string };
  detail?: 'sana';
  /** true = not public yet: shows an "available soon" note instead of a link */
  soon?: boolean;
}

export interface Chapter {
  marker: string;
  label: string; // shown above the title and under the ground line
  railLabel: string; // short label in the bottom rail
  title: string;
  text: string;
  tags?: string[];
  stats?: { value: string; label: string }[];
}

export type SanaModuleKey = 'analyzer' | 'predictor' | 'calculator';

export interface SanaModule {
  key: SanaModuleKey;
  index: string;
  name: string;
  short: string;
  tagline: string;
  points: string[];
}

const GITHUB = 'https://github.com/sanaullah980';

export const profile = {
  name: 'Sanaullah',
  initial: 'S',
  siteTitle: 'Sanaullah — Software Developer & Applied AI/ML Engineer',
  description:
    'Sanaullah is a Software Developer and BS Data Science student at PAF-IAST, building practical web, Android and AI-powered applications.',
  ogDescription: 'I build practical software and intelligent systems for real-world business problems.',
  photo: '/photo.jpg',
  github: GITHUB,
  email: 'sanaullahmawia980@gmail.com',
  location: 'Pakistan',

  nav: [
    { href: '#story', label: 'Background' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'Profile' },
  ],
  navCta: 'Get in touch',

  hero: {
    eyebrow: 'SOFTWARE DEVELOPMENT · APPLIED AI/ML · DATA SCIENCE',
    titleLine1: 'Software developer,',
    titleLine2: 'applied AI/ML engineer.',
    lead:
      'I’m Sanaullah, a BS Data Science student, entrepreneur and software developer at PAF-IAST. I build practical web and Android applications, business software and multilingual AI systems, and lead an organization while turning ideas into useful products that solve real-world problems.',
    primaryCta: 'View my work',
    primaryHref: '#projects',
    secondaryCta: 'View GitHub',
    note: 'BS Data Science · PAF-IAST · Open to collaboration and opportunities',
    chipTop: 'AI / ML',
    chipBottom: 'Business software',
    index: '01 / PROFILE',
    scrollCue: 'SCROLL TO EXPLORE',
    stats: [
      { value: '3rd', label: 'Semester · BS Data Science' },
      { value: '17', label: 'Projects · AI & software' },
      { value: 'AI/ML', label: 'Main focus' },
    ],
  },

  sana: {
    id: 'sana-ai',
    eyebrow: 'PROJECT DETAILS',
    title: 'Sana AI',
    titleAccent: 'Business Intelligence Suite.',
    status: 'IN ACTIVE DEVELOPMENT',
    lead:
      'A multilingual AI assistant for business owners. Ask in English, Urdu or Roman Urdu — Sana AI is designed to understand the request and route it to three specialised engines: a business analyzer, a sales predictor and a financial calculator.',
    languages: ['English', 'اردو', 'Roman Urdu'],
    modulesLabel: 'THREE ENGINES · ONE ASSISTANT',
    modules: [
      {
        key: 'analyzer',
        index: '01',
        name: 'Business Analyzer',
        short: 'Analyzer',
        tagline: 'Understand what the numbers are saying.',
        points: [
          'Totals, averages, growth and best / worst periods',
          'Volatility and trend detection',
          'Plain-language summaries of business performance',
        ],
      },
      {
        key: 'predictor',
        index: '02',
        name: 'Sales Predictor',
        short: 'Predictor',
        tagline: 'See where the business is heading.',
        points: [
          'Trend-based sales forecasting',
          'A forecast range around every prediction',
          'Planning support for stock and cash flow',
        ],
      },
      {
        key: 'calculator',
        index: '03',
        name: 'Financial Calculator',
        short: 'Calculator',
        tagline: 'Get the numbers right, instantly.',
        points: ['Profit, margin and markup', 'Break-even point and ROI', 'Pricing and expense scenarios'],
      },
    ] satisfies SanaModule[],
    demoTitle: 'Try the engines',
    demoNote:
      'These previews run in your browser with standard statistical and accounting formulas to illustrate each engine. The language model is not connected to this page.',
    pipelineLabel: 'HOW IT WORKS',
    pipeline: [
      { step: '01', title: 'Command', text: 'The user types a request in English, Urdu or Roman Urdu.' },
      { step: '02', title: 'Understanding', text: 'A fine-tuned Qwen model (LoRA) interprets the intent.' },
      { step: '03', title: 'Engines', text: 'The request is routed to the analyzer, predictor or calculator.' },
      { step: '04', title: 'Business data', text: 'Sales, inventory and expense figures feed the engines.' },
      { step: '05', title: 'Answer', text: 'A clear result is returned in the user’s own language.' },
    ],
    stackLabel: 'BUILT WITH',
    stack: ['Python', 'Qwen', 'Hugging Face', 'LoRA', 'Transformers', 'PyTorch', 'Google Colab'],
    link: { label: 'Follow development on GitHub', href: GITHUB },
  },

  story: {
    eyebrow: 'BACKGROUND',
    title: 'Education and',
    titleAccent: 'focus areas.',
    intro: 'A data-science foundation, applied through hands-on software and AI projects.',
    cue: 'Scroll to explore',
    railLabel: 'Background chapters',
    chapters: [
      {
        marker: '01',
        label: 'EDUCATION · PAF-IAST',
        railLabel: 'Education',
        title: 'BS in Data Science',
        text: 'Studying at Pakistan-Austria Fachhochschule (PAF-IAST), with coursework and interests spanning AI, machine learning, mathematics, algorithms and programming.',
        tags: ['Data Science', 'Algorithms', 'Mathematics'],
        stats: [{ value: 'BS', label: 'Data Science' }, { value: '3rd', label: 'Semester' }, { value: 'PAF-IAST', label: 'University' }],
      },
      {
        marker: '02',
        label: 'SOFTWARE · PRODUCTS',
        railLabel: 'Software',
        title: 'Business and web software',
        text: 'Designing and building practical applications — from a shop-operations management system to a university timetable tool — with JavaScript, TypeScript and Firebase.',
        tags: ['Web apps', 'JavaScript', 'Firebase'],
        stats: [{ value: '17', label: 'Projects' }, { value: 'PWA', label: 'Installable web app' }, { value: 'Firebase', label: 'Back-ends' }],
      },
      {
        marker: '03',
        label: 'AI / ML · APPLIED AI',
        railLabel: 'Applied AI',
        title: 'Applied AI for business',
        text: 'Fine-tuning lightweight language models (Qwen, LoRA) and building multilingual, business-focused assistants that understand English, Urdu and Roman Urdu.',
        tags: ['Python', 'NLP', 'Fine-tuning'],
        stats: [{ value: 'LoRA', label: 'Fine-tuning' }, { value: '3', label: 'Languages: EN · UR · Roman' }, { value: 'HF', label: 'Hugging Face' }],
      },
      {
        marker: '04',
        label: 'DIRECTION · GOAL',
        railLabel: 'Direction',
        title: 'Toward AI/ML engineering',
        text: 'Building a strong foundation and shipping intelligent software that solves meaningful, real-world business problems.',
        tags: ['Machine learning', 'Software engineering'],
        stats: [{ value: 'AI/ML', label: 'Career goal' }, { value: 'Math', label: 'Strong foundations' }, { value: 'Open', label: 'To collaboration' }],
      },
    ] satisfies Chapter[],
  },



  skills: {
    eyebrow: 'TECHNICAL TOOLKIT · SKILLS & EXPERTISE',
    title: 'What I',
    titleAccent: 'work with.',
    intro:
      'A practical toolkit across applied AI, software development, mobile applications and data science. Technologies are included where they connect to my learning and project work.',
    roles: [
      'Machine Learning',
      'NLP',
      'AI Agent Development',
      'Model Training',
      'Web Development',
      'Android Development',
      'Firebase',
      'Entrepreneurship',
      'Leadership',
      'Organization Management',
    ],
    groups: [
      {
        title: 'Machine Learning & AI',
        icon: 'ML',
        text: 'Training, fine-tuning and evaluating models for practical use.',
        items: ['Machine Learning', 'Model Training & Fine-Tuning', 'LoRA', 'Large Language Models (LLMs)', 'Scikit-learn', 'PyTorch', 'Data Analysis'],
      },
      {
        title: 'NLP & AI Agents',
        icon: 'AI',
        text: 'Language-aware assistants that understand commands and act on them.',
        items: ['Natural Language Processing (NLP)', 'AI Agent Development', 'Multilingual NLP (EN · UR · Roman Urdu)', 'Prompt Engineering', 'Hugging Face Transformers'],
      },
      {
        title: 'Web Development',
        icon: 'WEB',
        text: 'Responsive, installable web applications and business tools.',
        items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Progressive Web Apps (PWA)', 'Responsive Design', 'Vercel Deployment'],
      },
      {
        title: 'Android Development',
        icon: 'APP',
        text: 'Mobile experiences for everyday business and student needs.',
        items: ['Android App Development', 'Mobile UI Design', 'Firebase Integration', 'App Publishing Basics'],
      },
      {
        title: 'Firebase & Databases',
        icon: 'DB',
        text: 'Back-ends, authentication and data storage for live apps.',
        items: ['Firebase Authentication', 'Cloud Firestore', 'Realtime Database', 'Firebase Hosting', 'Database Design'],
      },
      {
        title: 'Leadership & Entrepreneurship',
        icon: 'LEAD',
        text: 'Leading an organization, coordinating people and turning ideas into practical products.',
        items: ['Entrepreneurship', 'Leadership', 'Organization Management', 'Project Coordination', 'Product Thinking'],
      },
      {
        title: 'AI Infrastructure & Analytics',
        icon: 'AI+BI',
        text: 'Tools for local model execution, knowledge retrieval and data visualization.',
        items: ['Retrieval-Augmented Generation (RAG)', 'Ollama', 'GGUF Model Runtime', 'Microsoft Power BI'],
      },
      {
        title: 'Languages & Tools',
        icon: '</>',
        text: 'Core programming foundations and everyday tooling.',
        items: ['Python', 'C++', 'JavaScript', 'Data Structures & Algorithms', 'Pandas', 'NumPy', 'Git & GitHub', 'Google Colab'],
      },
    ],
  },

  about: {
    eyebrow: 'PROFILE',
    titleLine1: 'Data, software,',
    titleLine2: 'and applied AI.',
    text: 'I’m a Data Science student, entrepreneur and hands-on software developer interested in the space where software engineering, machine learning and real-world problem solving meet. I lead an organization and enjoy taking ideas from requirements and system design through implementation, testing and iteration. My projects focus on useful applications for business operations, education, document automation and multilingual AI.',
    degree: 'BS Data Science',
    school: 'PAF-IAST · Pakistan · 3rd Semester',
  },

  contact: {
    eyebrow: 'LET’S WORK TOGETHER',
    titleLine1: 'Have an idea?',
    titleLine2: 'Let’s build it together.',
    text: 'I’m glad to connect about AI/ML, data science, business software and collaboration. Email is the fastest way to reach me.',
    cta: 'Email me',
    cardTitle: 'Contact details',
    rows: [
      { label: 'Email', value: 'sanaullahmawia980@gmail.com', href: 'mailto:sanaullahmawia980@gmail.com' },
      { label: 'GitHub', value: 'github.com/sanaullah980', href: GITHUB },
      { label: 'Studying', value: 'BS Data Science · PAF-IAST' },
      { label: 'Based in', value: 'Pakistan' },
    ] as { label: string; value: string; href?: string }[],
  },

  footer: { text: 'Designed and built by Sanaullah.', backToTop: 'Back to top ↑' },
};
