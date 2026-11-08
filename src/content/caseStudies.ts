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
    summary: 'A business-management platform used in the real market to help people manage inventory, sales, purchases, customer accounts, staff and financial records in one workflow.',
    status: 'Implemented · Real-world use',
    problem: 'Small shops often manage inventory, customer credit, supplier balances, staff and daily cash records across separate notebooks or disconnected tools. That makes it harder to keep an accurate picture of the business.',
    approach: 'Build a connected business-management application around the workflows a shop owner uses every day. The application has been implemented in the real market and is used by people to manage their businesses. Keep the interface mobile-first and design data handling with offline use and safe synchronization in mind.',
    capabilities: ['Inventory and stock management', 'Retail and wholesale sales workflows', 'Purchases and supplier records', 'Customer Khata and transaction history', 'Expenses, cashbook and business reports', 'Staff and employee management, attendance and reminders', 'Backup and restore workflows', 'Integrated text extraction agent and GrowBusiness Work Assistant', 'Web/PWA experience with an Android app direction'],
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
    note: 'MyBusiness is implemented and used in real business settings. Its feature set continues to evolve as workflows and user needs develop.'
  },
  {
    slug: 'sana-ai', number: '05', title: 'Sana AI', category: 'APPLIED AI · MULTILINGUAL BUSINESS ASSISTANT',
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
    slug: 'rajput-fragrance', number: '06', title: 'Rajput Fragrance', category: 'E-COMMERCE · LIVE WEBSITE',
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
    slug: 'cpp-inventory', number: '12', title: 'Business Inventory and Management System', category: 'C++ · BUSINESS INVENTORY & MANAGEMENT',
    summary: 'A C++ console-based business inventory and management system featuring password-protected logins, runtime data editing and a mini database for business records.',
    status: 'C++ project',
    problem: 'A small business inventory workflow needs a way to protect access, maintain records and allow updates while the program is running.',
    approach: 'Use a C++ console application with password-protected logins, runtime data editing and a lightweight mini-database approach to organize and update inventory records.',
    capabilities: ['Password-protected user login', 'Runtime data editing', 'Mini database for business records', 'Console-based inventory management', 'Structured C++ problem solving'],
    architecture: [
      { label: 'Console interface', detail: 'User input and displayed results' },
      { label: 'Program logic', detail: 'Inventory-related operations' },
      { label: 'Data representation', detail: 'Mini database and editable business records' },
    ],
    engineering: ['Protect the application flow with password-based login.', 'Allow users to edit stored information while the program is running.', 'Organize business records through a lightweight mini-database structure.', 'Apply C++ control flow, data handling and problem-solving techniques.'],
    stack: ['C++', 'Console application'],
    links: [{ label: 'GitHub profile', href: 'https://github.com/sanaullah980' }],
    note: 'The project demonstrates C++ programming through a practical business inventory and record-management workflow.'
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
