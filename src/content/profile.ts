/**
 * Single source of truth for everything shown on the site.
 * Edit text, links and projects here; no other file needs to change.
 */

export type ProjectStatus = 'progress' | 'complete' | 'soon';
export type ProjectIconKey = 'business' | 'ai' | 'fragrance' | 'connect' | 'cpp';

export interface Project {
  icon: ProjectIconKey;
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
      { value: '16', label: 'Projects · AI & software' },
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
        stats: [{ value: '16', label: 'Projects' }, { value: 'PWA', label: 'Installable web app' }, { value: 'Firebase', label: 'Back-ends' }],
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

  projects: {
    eyebrow: 'SELECTED WORK · SOFTWARE & AI PROJECTS',
    title: 'Software built',
    titleAccent: 'to be used.',
    intro:
      'Business platforms, AI agents, education tools and software projects built to solve practical problems. MyBusiness is being used in the market, with connected tools supporting its everyday workflows.',
    allLink: 'See my GitHub profile',
    items: [
      {
        icon: 'business',
        status: 'complete',
        featured: true,
        slug: 'mybusiness',
        kind: 'BUSINESS MANAGEMENT · WEB / ANDROID',
        title: 'MyBusiness',
        text: 'A business-management application covering inventory, retail and wholesale sales, customer and supplier ledgers, expenses, cashbook, reports and staff operations. Implemented in the real market, where people use it to manage their businesses and benefit from its day-to-day workflows.',
        tags: ['JavaScript', 'Firebase', 'Firestore', 'PWA', 'Android', 'Real-world use'],
        link: { label: 'Open live application', href: 'https://mybusiness-green.vercel.app' },
      },
      {
        icon: 'ai',
        status: 'progress',
        kind: 'MYBUSINESS · AI DOCUMENT AUTOMATION',
        title: 'Text Extraction Agent',
        text: 'An AI-powered text extraction agent integrated into MyBusiness to read and extract useful information from text-based content, reducing manual data entry and making business workflows quicker.',
        tags: ['AI Agent', 'Text Extraction', 'Automation', 'MyBusiness'],
      },
      {
        icon: 'ai',
        status: 'progress',
        kind: 'MYBUSINESS · AI WORK ASSISTANT',
        title: 'GrowBusiness Work Assistant',
        text: 'An in-app work assistant for MyBusiness that helps users complete common tasks faster, understand requests and move through business actions with less manual effort.',
        tags: ['AI Assistant', 'Workflow Support', 'Business Automation', 'MyBusiness'],
      },
      {
        icon: 'business',
        status: 'complete',
        kind: 'MYBUSINESS · MANAGEMENT MODULE',
        title: 'Employee Management System',
        text: 'An employee and staff management system integrated into MyBusiness, supporting real business operations. It helps manage staff-related workflows within the same application people use to run their businesses.',
        tags: ['Employee Management', 'Staff Operations', 'MyBusiness', 'Real-world use'],
      },
      {
        icon: 'ai',
        status: 'progress',
        featured: true,
        detail: 'sana',
        slug: 'sana-ai',
        kind: 'ARTIFICIAL INTELLIGENCE · LANGUAGE MODELS',
        title: 'Sana AI',
        text: 'A multilingual business assistant that routes English, Urdu and Roman Urdu commands to a business analyzer, sales predictor and financial calculator using a fine-tuned Qwen model (LoRA).',
        tags: ['Python', 'Qwen 3 · 0.6B', 'LoRA', 'NLP'],
        link: { label: 'Explore model on Hugging Face', href: 'https://huggingface.co/sanaullah980/mybusiness-qwen3-0.6b-merged' },
      },
      {
        icon: 'fragrance',
        status: 'complete',
        slug: 'rajput-fragrance',
        kind: 'E-COMMERCE · LIVE WEBSITE',
        title: 'Rajput Fragrance',
        text: 'A fragrance-shopping website presenting product collections and brand information, with WhatsApp ordering and a cash-on-delivery order form.',
        tags: ['Website', 'E-commerce', 'WhatsApp ordering'],
        link: { label: 'Visit live website', href: 'https://www.rajputfragrance.online/' },
      },
      {
        icon: 'connect',
        status: 'progress',
        kind: 'EDUCATION · STUDENT & CAMPUS PLATFORM',
        title: 'Connect PAF',
        text: 'An education-focused application designed to make academic work easier for students, teachers and administrators. It includes timetable and PDF workflows, admin-controlled role permissions, and CampusChat — a built-in messaging space where users can communicate with one another.',
        tags: ['Education Platform', 'Role Management', 'CampusChat', 'Firebase'],
      },
      {
        icon: 'connect',
        status: 'progress',
        kind: 'CONNECT PAF · DOCUMENT AUTOMATION',
        title: 'PDF Extraction Agent',
        text: 'A PDF extraction agent integrated into Connect PAF to process uploaded academic documents and extract timetable and other relevant information, including content from scanned PDFs.',
        tags: ['PDF Extraction', 'OCR', 'PDF.js', 'Connect PAF'],
      },
      {
        icon: 'connect',
        status: 'progress',
        kind: 'CONNECT PAF · ACCESS CONTROL',
        title: 'Role Management System',
        text: 'A role-based access management module integrated into Connect PAF. Administrators can assign roles and permissions so students, teachers and other users only access the features and information intended for them.',
        tags: ['Role-Based Access', 'Admin Controls', 'Permissions', 'Connect PAF'],
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · MANAGEMENT SYSTEM',
        title: 'Library Management System',
        text: 'A C++ library-management application for organizing book records and supporting common library operations such as managing entries, searching records and handling issue and return workflows.',
        tags: ['C++', 'Record Management', 'Library'],
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · MANAGEMENT SYSTEM',
        title: 'Hospital Management System',
        text: 'A C++ hospital-management project focused on organizing patient and hospital records and supporting structured day-to-day management workflows.',
        tags: ['C++', 'Record Management', 'Hospital'],
      },
      {
        icon: 'cpp',
        status: 'progress',
        slug: 'cpp-inventory',
        kind: 'C++ · BUSINESS INVENTORY & MANAGEMENT',
        title: 'Business Inventory and Management System',
        text: 'A C++ console-based business inventory system featuring password-protected logins, runtime data editing and a mini database for storing and managing business records.',
        tags: ['C++', 'Password Login', 'Runtime Data Editing', 'Mini Database'],
        link: { label: 'More on GitHub', href: GITHUB },
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · GAME DEVELOPMENT',
        title: 'Tic-Tac-Toe Game',
        text: 'A console-based C++ Tic-Tac-Toe game built around turn handling, board updates and win or draw detection.',
        tags: ['C++', 'Game Logic', 'Console App'],
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · GAME DEVELOPMENT',
        title: 'Snake Game',
        text: 'A C++ Snake game implementing movement, food collection, collision detection and score tracking.',
        tags: ['C++', 'Game Logic', 'Console App'],
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · WORD GAME',
        title: 'Word Guessing Game',
        text: 'A C++ word-guessing game that uses input handling, attempts and feedback to let players work out a hidden word.',
        tags: ['C++', 'Strings', 'Game Logic'],
      },
      {
        icon: 'cpp',
        status: 'complete',
        kind: 'C++ · SECURITY UTILITY',
        title: 'Password Analyzing System',
        text: 'A C++ utility that evaluates password strength using checks such as length and character variety, then provides feedback on password quality.',
        tags: ['C++', 'String Processing', 'Password Strength'],
      },
    ] satisfies Project[],
    statusLabels: { progress: 'IN DEVELOPMENT', complete: 'COMPLETED', soon: 'COMING SOON' },
    soonNote: 'Will be available soon',
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
