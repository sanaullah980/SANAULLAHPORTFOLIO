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
  label: string; // shown above the title and under the ground line
  railLabel: string; // short label in the bottom rail
  title: string;
  text: string;
  tags?: string[];
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
  siteTitle: 'Sanaullah — Data Science, AI/ML & Business Intelligence',
  description:
    'Sanaullah — BS Data Science student at PAF-IAST building AI-powered business software. Creator of Sana AI, a multilingual business analyzer, predictor and calculator.',
  ogDescription: 'AI-powered business intelligence: analysis, forecasting and financial calculation in English, Urdu and Roman Urdu.',
  photo: '/photo.jpg',
  github: GITHUB,

  nav: [
    { href: '#sana-ai', label: 'Sana AI' },
    { href: '#story', label: 'Background' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'Profile' },
  ],
  navCta: 'Get in touch',

  hero: {
    eyebrow: 'DATA SCIENCE · AI/ML · BUSINESS SOFTWARE',
    titleLine1: 'Intelligent software',
    titleLine2: 'for real businesses.',
    lead:
      'I’m Sanaullah — a BS Data Science student at PAF-IAST who designs AI-powered tools and business-management software. My flagship project, Sana AI, is a multilingual business intelligence suite that analyzes performance, predicts sales and calculates the numbers that matter.',
    primaryCta: 'Explore Sana AI',
    primaryHref: '#sana-ai',
    secondaryCta: 'View GitHub',
    note: 'BS Data Science · PAF-IAST · Open to collaboration and opportunities',
    chipTop: 'AI / ML',
    chipBottom: 'Sana AI in development',
    index: '01 / PROFILE',
    scrollCue: 'SCROLL TO EXPLORE',
  },

  sana: {
    id: 'sana-ai',
    eyebrow: 'FLAGSHIP PROJECT',
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
      },
      {
        marker: '02',
        label: 'SOFTWARE · PRODUCTS',
        railLabel: 'Software',
        title: 'Business and web software',
        text: 'Designing and building practical applications — from a shop-operations management system to a university timetable tool — with JavaScript, TypeScript and Firebase.',
        tags: ['Web apps', 'JavaScript', 'Firebase'],
      },
      {
        marker: '03',
        label: 'AI / ML · SANA AI',
        railLabel: 'Applied AI',
        title: 'Applied AI for business',
        text: 'Developing Sana AI: a multilingual assistant built around a fine-tuned Qwen model (LoRA), designed to turn English, Urdu and Roman Urdu requests into analysis, forecasts and calculations.',
        tags: ['Python', 'NLP', 'Fine-tuning'],
      },
      {
        marker: '04',
        label: 'DIRECTION · GOAL',
        railLabel: 'Direction',
        title: 'Toward AI/ML engineering',
        text: 'Building a strong foundation and shipping intelligent software that solves meaningful, real-world business problems.',
      },
    ] satisfies Chapter[],
  },

  projects: {
    eyebrow: 'MORE WORK · 04 PROJECTS',
    title: 'Software built',
    titleAccent: 'to be used.',
    intro:
      'Web applications and engineering projects that sit alongside Sana AI. Each project is labelled with its current status; Rajput Fragrance is live.',
    allLink: 'See my GitHub profile',
    items: [
      {
        icon: 'business',
        status: 'progress',
        kind: 'BUSINESS MANAGEMENT · WEB / PWA',
        title: 'MyBusiness',
        text: 'A business-management system for shop operations, covering inventory, sales, customer and supplier ledgers, expenses, cashbook, reports, staff and backup. Under active development.',
        tags: ['JavaScript', 'Firebase', 'Firestore', 'PWA'],
        link: { label: 'Open project', href: 'https://mybusiness-green.vercel.app' },
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
        text: 'A university timetable tool designed to process schedules from uploaded PDFs — including scanned documents — and make relevant timetable information easy to find.',
        tags: ['TypeScript', 'PDF.js', 'OCR', 'Firebase'],
        link: { label: 'Open Connect PAF', href: 'https://connectpaf.vercel.app' },
      },
      {
        icon: 'cpp',
        status: 'progress',
        kind: 'SYSTEMS FUNDAMENTALS · CONSOLE',
        title: 'C++ Inventory System',
        text: 'A command-line inventory-management application that applies C++ program structure and problem-solving. More implementation detail will be added as it develops.',
        tags: ['C++', 'Console app', 'Data structures'],
        link: { label: 'More on GitHub', href: GITHUB },
      },
    ] satisfies Project[],
    statusLabels: { progress: 'IN PROGRESS', complete: 'COMPLETED' },
  },

  skills: {
    eyebrow: 'TECHNICAL STACK',
    title: 'Tools and',
    titleAccent: 'disciplines.',
    intro: 'Core technologies across software engineering, data science and applied AI.',
    groups: [
      { title: 'Programming', items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
      {
        title: 'AI & data',
        items: [
          'Machine learning',
          'NLP',
          'LLMs',
          'Fine-tuning',
          'Forecasting',
          'Business analytics',
          'Pandas',
          'NumPy',
          'Scikit-learn',
        ],
      },
      {
        title: 'Tools & platforms',
        items: ['Git / GitHub', 'Firebase', 'Firestore', 'Hugging Face', 'Google Colab', 'PyTorch', 'Transformers'],
      },
    ],
  },

  about: {
    eyebrow: 'PROFILE',
    titleLine1: 'Data, software,',
    titleLine2: 'and applied AI.',
    text: 'I’m a Data Science student who works across software and AI. I build practical systems — from business-management workflows to the multilingual language-model pipeline behind Sana AI — with a focus on tools that help small and medium businesses understand and plan with their own numbers.',
    degree: 'BS Data Science',
    school: 'PAF-IAST · Pakistan · 3rd Semester',
  },

  contact: {
    eyebrow: 'LET’S WORK TOGETHER',
    titleLine1: 'Interested in Sana AI',
    titleLine2: 'or building something?',
    text: 'I’m glad to connect about AI/ML, data science, business software and collaboration.',
    cta: 'Connect on GitHub',
    extras: [] as string[],
  },

  footer: { text: 'Designed and built by Sanaullah.', backToTop: 'Back to top ↑' },
};
