export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  status: string;
  problem: string;
  approach: string;
  capabilities: string[];
  architecture: { label: string; detail: string }[];
  engineering: string[];
  stack: string[];
  links: { label: string; href: string }[];
  note?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mybusiness', number: '01', title: 'MyBusiness', category: 'BUSINESS MANAGEMENT · WEB / ANDROID',
    summary: 'A shop-management platform that brings everyday operations — stock, sales, purchasing, customer accounts and financial records — into one practical workflow.',
    status: 'Active development',
    problem: 'Small shops often manage inventory, customer credit, supplier balances and daily cash records across separate notebooks or disconnected tools. That makes it harder to keep an accurate picture of the business.',
    approach: 'Build a connected business-management application around the workflows a shop owner uses every day. Keep the interface mobile-first and design data handling with offline use and safe synchronization in mind.',
    capabilities: ['Inventory and stock management', 'Retail and wholesale sales workflows', 'Purchases and supplier records', 'Customer Khata and transaction history', 'Expenses, cashbook and business reports', 'Staff, attendance and reminders', 'Backup and restore workflows', 'Web/PWA experience with an Android app direction'],
    architecture: [
      { label: 'Web / Android UI', detail: 'Mobile-first screens for daily shop operations' },
      { label: 'Application logic', detail: 'Sales, stock, purchase and ledger workflows' },
      { label: 'Local data layer', detail: 'Offline-oriented access and local persistence' },
      { label: 'Firebase / Firestore', detail: 'Authentication and cloud synchronization' },
      { label: 'Backup & restore', detail: 'Portable business backup and recovery flow' },
    ],
    engineering: ['Keep existing business records safe when application code changes.', 'Treat offline operation as a core workflow rather than an afterthought.', 'Keep financial calculations and ledger effects consistent across sales and payments.', 'Separate business workflows into focused modules to make maintenance easier.'],
    stack: ['JavaScript', 'Firebase Authentication', 'Cloud Firestore', 'PWA', 'Android'],
    links: [{ label: 'Source code', href: 'https://github.com/sanaullah980/mybusiness' }, { label: 'Open web application', href: 'https://mybusiness-green.vercel.app' }],
    note: 'The project is under active development. The architecture shown here describes the intended application flow; individual features and platform availability may evolve.'
  },
  {
    slug: 'sana-ai', number: '02', title: 'Sana AI', category: 'APPLIED AI · MULTILINGUAL BUSINESS ASSISTANT',
    summary: 'A domain-focused AI assistant exploring how a compact language model can understand business instructions in English, Urdu and Roman Urdu and connect them to useful business operations.',
    status: 'Model development and experimentation',
    problem: 'Many shop owners are more comfortable expressing business requests in everyday language than navigating complex menus or writing structured queries. A business assistant needs to understand intent and return predictable, useful outputs.',
    approach: 'Fine-tune a lightweight Qwen language model with business-domain examples, then structure its outputs around business intents and specialized calculation or analysis components. Keep model understanding distinct from deterministic business calculations.',
    capabilities: ['English, Urdu and Roman Urdu command understanding', 'Business intent and action recognition', 'Business analysis concepts', 'Sales forecasting experimentation', 'Financial calculations such as profit, margin and break-even', 'Structured outputs for downstream application workflows'],
    architecture: [
      { label: 'User command', detail: 'Natural language in English, Urdu or Roman Urdu' },
      { label: 'Fine-tuned Qwen model', detail: 'Domain-specific intent and command interpretation' },
      { label: 'Structured intent', detail: 'A predictable representation of the requested operation' },
      { label: 'Business engines', detail: 'Analyzer, predictor and financial calculator' },
      { label: 'Response', detail: 'A clear result suitable for the user or application' },
    ],
    engineering: ['Prepare domain-specific examples for realistic business language.', 'Experiment with LoRA fine-tuning to adapt a compact base model.', 'Evaluate command variants, multilingual phrasing and ambiguous quantities.', 'Use deterministic formulas for calculations instead of asking the language model to invent arithmetic.'],
    stack: ['Python', 'Qwen 3 · 0.6B', 'LoRA', 'PyTorch', 'Hugging Face', 'Transformers', 'Google Colab'],
    links: [{ label: 'Merged model on Hugging Face', href: 'https://huggingface.co/sanaullah980/mybusiness-qwen3-0.6b-merged' }, { label: 'GitHub profile', href: 'https://github.com/sanaullah980' }],
    note: 'Sana AI is an active research and development project. Forecasting and analysis capabilities are being developed and evaluated; they should not be interpreted as a deployed, production-validated service.'
  },
  {
    slug: 'rajput-fragrance', number: '03', title: 'Rajput Fragrance', category: 'E-COMMERCE · LIVE WEBSITE',
    summary: 'A live fragrance-brand website that presents product collections and gives customers a direct path to place an order.',
    status: 'Live website',
    problem: 'A product-focused fragrance brand needs a clear online presence where visitors can browse products, understand the brand and move easily from discovery to ordering.',
    approach: 'Create a responsive storefront experience with product presentation, brand information and a simple customer ordering journey.',
    capabilities: ['Fragrance product and collection presentation', 'Brand information and browsing experience', 'WhatsApp-based ordering path', 'Cash-on-delivery order form', 'Responsive website layout'],
    architecture: [
      { label: 'Storefront', detail: 'Responsive website and navigation' },
      { label: 'Product presentation', detail: 'Collections and fragrance information' },
      { label: 'Customer action', detail: 'Product enquiry and ordering flow' },
      { label: 'Order channel', detail: 'WhatsApp and cash-on-delivery form' },
    ],
    engineering: ['Prioritize clear product presentation and readable layouts.', 'Make the ordering path easy to discover.', 'Support a consistent experience across desktop and mobile screens.'],
    stack: ['Web development', 'Responsive design', 'E-commerce'],
    links: [{ label: 'Visit live website', href: 'https://www.rajputfragrance.online/' }],
  },
  {
    slug: 'cpp-inventory', number: '04', title: 'C++ Inventory System', category: 'C++ · PROGRAMMING FUNDAMENTALS',
    summary: 'A console-based inventory-management project used to practice structured programming and apply core C++ problem-solving skills to a practical domain.',
    status: 'Learning project',
    problem: 'Inventory is a useful domain for practicing how programs represent records, accept user input and organize operations around stored information.',
    approach: 'Use a console application to explore program structure and inventory-related logic while strengthening C++ fundamentals.',
    capabilities: ['Console-based interaction', 'Inventory-management problem domain', 'C++ programming practice', 'Structured problem solving'],
    architecture: [
      { label: 'Console interface', detail: 'User input and displayed results' },
      { label: 'Program logic', detail: 'Inventory-related operations' },
      { label: 'Data representation', detail: 'C++ structures and records as implemented' },
    ],
    engineering: ['Practice clear control flow and program organization.', 'Apply core C++ syntax and problem-solving techniques.', 'Build a foundation for more advanced data structures and application design.'],
    stack: ['C++', 'Console application'],
    links: [{ label: 'GitHub profile', href: 'https://github.com/sanaullah980' }],
    note: 'This is presented as a programming-fundamentals project. Detailed implementation claims are intentionally limited until the repository and feature set are documented.'
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
