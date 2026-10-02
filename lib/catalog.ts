export type ProductStatus = "delivered" | "in-progress" | "new" | "concept";

export type CategoryId = "security" | "finance" | "it-solutions";

export interface PricingTier {
  name: string;
  deploymentModel: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  category: CategoryId;
  status: ProductStatus;
  statusLabel: string;
  tagline: string;
  summary: string;
  overview: string[];
  features: ProductFeature[];
  specifications: { label: string; value: string }[];
  pricing?: {
    tiers: PricingTier[];
    notes?: string;
  };
  roadmap?: {
    stage: string;
    details: string;
    completed: boolean;
  }[];
  cta: {
    primaryText: string;
    primaryHref: string;
    secondaryText?: string;
    secondaryHref?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface CategoryItem {
  id: CategoryId;
  slug: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  heroPitch: string;
  productSlugs: string[];
  seo: {
    title: string;
    description: string;
  };
}

export const CATEGORIES: Record<CategoryId, CategoryItem> = {
  security: {
    id: "security",
    slug: "security",
    name: "Vicinix Security",
    title: "Vicinix Security Operations",
    tagline: "Autonomous guard operations & physical facility defense",
    description:
      "Enterprise systems engineered for physical guard management, checkpoint geofencing, patrol logging, and incident escalations.",
    heroPitch:
      "Transforming security operations from legacy manual logs into verified, geo-stamped, real-time command centers.",
    productSlugs: ["vicinix-guard"],
    seo: {
      title: "Vicinix Security — Enterprise Guard & Facility Management",
      description:
        "Real-time security personnel tracking, automated shift dispatching, and incident verification with Vicinix Security.",
    },
  },
  finance: {
    id: "finance",
    slug: "finance",
    name: "Vicinix Finance",
    title: "Vicinix Financial Infrastructure",
    tagline: "Automated billing, reconciliation & statutory compliance",
    description:
      "Precision financial software for seamless invoicing, recurring subscription billing, GST ledgers, and automated payment gateways.",
    heroPitch:
      "Eliminating billing friction and tax reconciliation delays with cryptographic invoice tracking and native payment links.",
    productSlugs: ["vicinix-tax", "vicinix-invoice"],
    seo: {
      title: "Vicinix Finance — Smart Invoicing & Tax Automation",
      description:
        "Modern billing, Razorpay-integrated invoicing, and GST compliance tooling for high-growth businesses.",
    },
  },
  "it-solutions": {
    id: "it-solutions",
    slug: "it-solutions",
    name: "Vicinix IT Solutions",
    title: "Vicinix IT & Enterprise Logistics",
    tagline: "Digital enterprise logistics, QR commerce & institutional operations",
    description:
      "High-throughput event access systems, contactless dining operating systems, and next-generation modular cloud ERP architectures.",
    heroPitch:
      "Bridging the physical-to-digital divide through instantaneous QR pipelines, kitchen displays, and unified campus ERPs.",
    productSlugs: [
      "vicinix-events",
      "vicinix-menu",
      "vicinix-erp",
      "vicinix-college-erp",
    ],
    seo: {
      title: "Vicinix IT Solutions — Event Entry, QR Menus & Cloud ERP",
      description:
        "High-performance operational software: Vicinix Events QR access, Vicinix Menu restaurant ordering, and enterprise ERP solutions.",
    },
  },
};

export const PRODUCTS: ProductItem[] = [
  // --- 1. VICINIX GUARD (DELIVERED) ---
  {
    id: "vicinix-guard",
    slug: "vicinix-guard",
    name: "Guard",
    fullName: "Vicinix Guard",
    category: "security",
    status: "delivered",
    statusLabel: "Delivered",
    tagline: "Real-time security workforce & automated checkpoint dispatch platform",
    summary:
      "A comprehensive guard management system featuring GPS-geofenced patrols, QR checkpoint verification, instant incident escalation, and executive compliance reporting.",
    overview: [
      "Vicinix Guard equips private security agencies and facility managers with unbreakable verification. Replacing paper logbooks with cryptographic digital checkpoints, every guard patrol is geolocated, time-stamped, and instantly streamed to the central security dashboard.",
      "With automated anomaly detection, missed checkpoints trigger instant supervisor alerts, ensuring perimeter integrity across high-value commercial properties, residential townships, and industrial campuses.",
    ],
    features: [
      {
        title: "NFC & QR Checkpoint Patrols",
        description:
          "Guards scan tamper-resistant physical markers along their route. Scans are cryptographically signed with GPS coordinates and network timestamps.",
        iconName: "ShieldCheck",
      },
      {
        title: "Live Command Center",
        description:
          "Bird's-eye map view tracking active patrols, guard battery status, current duty assignments, and panic button triggers in real time.",
        iconName: "Monitor",
      },
      {
        title: "Automated Incident Escalation",
        description:
          "Guards capture audio, photos, and incident classification on-site. Critical alerts dispatch SMS and WhatsApp notifications to field supervisors immediately.",
        iconName: "AlertTriangle",
      },
      {
        title: "Biometric & Geofenced Attendance",
        description:
          "Eliminates buddy punching through facial verification and geofence boundary locks at entry gates.",
        iconName: "MapPin",
      },
      {
        title: "Client Transparency Portal",
        description:
          "Property owners receive automated daily shift compliance reports, patrol completion percentages, and incident resolution audit trails.",
        iconName: "FileSpreadsheet",
      },
      {
        title: "Offline Sync Engine",
        description:
          "Basements and remote perimeters without mobile network connectivity seamlessly store patrol logs locally and synchronize upon reconnection.",
        iconName: "WifiOff",
      },
    ],
    specifications: [
      { label: "Deployment", value: "Cloud SaaS + Dedicated Agency Instance" },
      { label: "Guard Client", value: "Lightweight Android & iOS PWA" },
      { label: "Verification Method", value: "QR, NFC Tag, GPS Geofencing" },
      { label: "Alert Latency", value: "< 450ms supervisor broadcast" },
      { label: "Export Formats", value: "PDF, Excel, CSV, Automated Webhooks" },
      { label: "Compliance", value: "ISO 27001 Data Encryption at rest" },
    ],
    pricing: {
      tiers: [
        {
          name: "Agency Core",
          deploymentModel: "Turnkey Agency Cluster",
          description: "Engineered for professional security firms and facility managers.",
          features: [
            "Unlimited Checkpoint Patrols",
            "Real-time GPS Tracking & Geofencing",
            "Daily Anomaly & Incident Reports",
            "Supervisor Mobile Command Access",
            "Direct Engineering Support",
          ],
        },
        {
          name: "Operations Pro",
          deploymentModel: "Multi-Facility Fleet Scale",
          description: "Engineered for medium agencies with multi-site operations.",
          isPopular: true,
          features: [
            "Multi-Property Command Center",
            "Incident Photo & Voice Uploads",
            "Client White-label Portals",
            "Supervisor WhatsApp & SMS Alerts",
            "Priority 24/7 Rapid Response",
          ],
        },
        {
          name: "Enterprise Fleet",
          deploymentModel: "Sovereign Enterprise SLA",
          description: "For nationwide security corporations and large industrial complexes.",
          features: [
            "Unlimited Guards & Properties",
            "Custom API & CCTV Integration",
            "Dedicated Account Solutions Architect",
            "On-Premise / Private Cloud Instance",
            "Custom Feature Engineering",
            "Formal 99.95% Uptime SLA Guarantee",
          ],
        },
      ],
      notes: "Custom onboarding, dedicated agency instance setup, and ruggedized NFC tags included.",
    },
    cta: {
      primaryText: "Request Guard Deployment",
      primaryHref: "/contact?product=vicinix-guard",
      secondaryText: "View Deployment Models",
      secondaryHref: "#editions",
    },
    seo: {
      title: "Vicinix Guard — Real-Time Security Workforce Management",
      description:
        "Automate guard patrols, eliminate paper logs, and enforce perimeter security with Vicinix Guard.",
      keywords: ["guard management system", "patrol tracking software", "security operations software"],
    },
  },

  // --- 2. VICINIX TAX (IN PROGRESS) ---
  {
    id: "vicinix-tax",
    slug: "vicinix-tax",
    name: "Tax",
    fullName: "Vicinix Tax",
    category: "finance",
    status: "in-progress",
    statusLabel: "In Development",
    tagline: "Automated GST filing, ledger reconciliation, and compliance engine",
    summary:
      "A next-generation tax automation platform that bridges accounting software, bank feeds, and statutory tax portals into an autonomous reconciliation engine.",
    overview: [
      "Vicinix Tax is being engineered to take the agony out of indirect tax compliance. Traditional tax filing requires hours of manual cross-checking between purchase registers, sales ledgers, and government tax returns.",
      "Using our proprietary fuzzy matching algorithms, Vicinix Tax automatically flags mismatching vendor GSTINs, uncredited input tax credits (ITC), and discrepancies before returns are submitted.",
    ],
    features: [
      {
        title: "Automated 2B vs Purchase Reconciliation",
        description:
          "Ingest supplier invoices and automatically cross-reference with official tax portal returns to maximize eligible input tax credits.",
        iconName: "CheckCheck",
      },
      {
        title: "Vendor Compliance Scoring",
        description:
          "Assigns compliance reliability scores to vendors based on historical filing punctuality to safeguard your working capital.",
        iconName: "TrendingUp",
      },
      {
        title: "One-Click E-Way Bill & E-Invoicing",
        description:
          "Generate government-compliant IRN codes and QR-stamped E-way bills directly from sales ledger entries without double entry.",
        iconName: "FileCheck",
      },
      {
        title: "Multi-GSTIN Corporate Entity Engine",
        description:
          "Manage state-wise GSTIN numbers under a unified master organization view with consolidated ledger analytics.",
        iconName: "Layers",
      },
      {
        title: "Anomaly & Penalty Guardrails",
        description:
          "Smart validation prevents common calculation errors, tax rate mismatches, and HSN code classification oversights.",
        iconName: "ShieldAlert",
      },
      {
        title: "CA Collaboration Workspace",
        description:
          "Role-based access allowing internal accountants and external chartered accountants to review audit trails seamlessly.",
        iconName: "Users",
      },
    ],
    specifications: [
      { label: "Status", value: "Active Development (Beta Q2 2026)" },
      { label: "Statutory Coverage", value: "Indian GST (GSTR-1, GSTR-3B, GSTR-9)" },
      { label: "Reconciliation Speed", value: "100,000 invoices in < 12 seconds" },
      { label: "ERP Connectors", value: "Tally, Zoho Books, Vicinix Invoice API" },
    ],
    roadmap: [
      { stage: "Architecture & Portal Connector", details: "Direct API bridge to GSTN sandbox.", completed: true },
      { stage: "Automated Reconciliation Engine", details: "Fuzzy algorithm for vendor ITC matching.", completed: true },
      { stage: "Closed Beta with Pilot CAs", details: "Live testing with 15 corporate accounting firms.", completed: false },
      { stage: "Public Launch & Vicinix Invoice Sync", details: "Native 1-click sync with Vicinix Invoice.", completed: false },
    ],
    cta: {
      primaryText: "Join Early Access Beta",
      primaryHref: "/contact?subject=Early+Access+Vicinix+Tax",
      secondaryText: "Explore Finance Suite",
      secondaryHref: "/solutions/finance",
    },
    seo: {
      title: "Vicinix Tax — Automated GST Reconciliation & Compliance Engine",
      description:
        "Prevent lost input tax credits, automate GST filing, and verify vendor compliance with Vicinix Tax.",
      keywords: ["GST reconciliation software", "automated tax filing", "e-invoicing software"],
    },
  },

  // --- 3. VICINIX INVOICE (DELIVERED) ---
  {
    id: "vicinix-invoice",
    slug: "vicinix-invoice",
    name: "Invoice",
    fullName: "Vicinix Invoice",
    category: "finance",
    status: "delivered",
    statusLabel: "Delivered / Live Studio",
    tagline: "Full-lifecycle invoicing, recurring subscription billing, and Razorpay-powered payment links",
    summary:
      "A fast, modern invoicing platform designed to create, schedule, send, and collect payments on branded invoices with embedded Razorpay checkout links and automated accounting hooks.",
    overview: [
      "Vicinix Invoice is engineered as the premier billing backbone for modern enterprises, agencies, and SaaS providers. It replaces clunky legacy billing tools with a lightning-fast, keyboard-driven interface.",
      "Clients can view high-fidelity PDF invoices or click an interactive web link to pay instantly via UPI, Credit Cards, NetBanking, or International Cards via Razorpay. Once paid, the system automatically triggers receipts, marks ledger accounts, and feeds into Vicinix Tax.",
    ],
    features: [
      {
        title: "Embedded Razorpay 'Pay Now' Links",
        description:
          "Every invoice dispatched via email or WhatsApp includes an instant payment button supporting UPI, Credit Cards, NetBanking, and EMI.",
        iconName: "CreditCard",
      },
      {
        title: "Automated Recurring Billing",
        description:
          "Configure subscription retainers, weekly schedules, or annual licenses that automatically generate and dispatch invoices on designated dates.",
        iconName: "RefreshCw",
      },
      {
        title: "Statutory Tax & GST Native",
        description:
          "Automatic calculation of CGST, SGST, IGST, and TDS based on client state and supply location with auto-suggested HSN/SAC codes.",
        iconName: "Percent",
      },
      {
        title: "Custom Branded PDF Generator",
        description:
          "Produce editorial-grade, vector-crisp PDF invoices reflecting your brand typography, custom color accents, and payment terms.",
        iconName: "FileText",
      },
      {
        title: "Smart Receivables & Dunning",
        description:
          "Automated polite reminder sequences over WhatsApp and email for pending and overdue invoices, slashing Days Sales Outstanding (DSO).",
        iconName: "Clock",
      },
      {
        title: "Central Payment Backbone",
        description:
          "Designed to serve as the unified transaction engine across the entire Vicinix product suite in Phase 4.",
        iconName: "Cpu",
      },
    ],
    specifications: [
      { label: "Payment Gateway", value: "Native Razorpay Integration + Webhooks" },
      { label: "Payment Modes", value: "UPI, Cards, NetBanking, International FX" },
      { label: "PDF Rendering", value: "Sub-second serverless vector generation" },
      { label: "Notification Channels", value: "WhatsApp Business API, Email, SMS" },
      { label: "Multi-Currency", value: "INR, USD, EUR, GBP supported" },
    ],
    pricing: {
      tiers: [
        {
          name: "Studio Core",
          deploymentModel: "Cloud Studio Instance",
          description: "For boutique studios, agencies, and high-growth technology providers.",
          features: [
            "Unlimited Invoices & Retainers",
            "Real-time GST / IGST Tax Computation",
            "Branded Vector PDF Document Engine",
            "Embedded Razorpay Checkout Portal",
            "WhatsApp & Email Payment Dispatch",
          ],
        },
        {
          name: "Business Scale",
          deploymentModel: "Automated Retainer Cluster",
          description: "Engineered for multi-entity firms and high-frequency recurring billing.",
          isPopular: true,
          features: [
            "All Studio Core Capabilities",
            "Automated Recurring Retainer Scheduler",
            "Multi-Currency Settlement (INR, USD, EUR)",
            "Automated Dunning & Overdue Reminders",
            "Custom Domain Pay Links (pay.yourbrand.com)",
            "Dedicated Support & API Access",
          ],
        },
        {
          name: "Enterprise Core",
          deploymentModel: "Sovereign Multi-Entity Core",
          description: "Dedicated billing core for high-volume enterprise logistics and SaaS.",
          features: [
            "Unlimited Multi-State GSTINs",
            "Direct ERP Webhook Synchronizers",
            "Dedicated Solutions Architect",
            "Custom SLA & Audit Logs",
            "Central Payment Backbone Integration",
          ],
        },
      ],
      notes: "Direct Razorpay infrastructure. Zero third-party transaction commissions.",
    },
    cta: {
      primaryText: "Launch Invoicing Studio",
      primaryHref: "/apps/invoice",
      secondaryText: "Create Invoice",
      secondaryHref: "/apps/invoice/new",
    },
    seo: {
      title: "Vicinix Invoice — Modern Billing, Recurring Subscriptions & Razorpay",
      description:
        "Create beautiful invoices, collect payments instantly via Razorpay, and automate recurring billing with Vicinix Invoice.",
      keywords: ["invoicing software", "Razorpay invoice payments", "recurring billing system"],
    },
  },

  // --- 4. VICINIX EVENTS (DELIVERED) ---
  {
    id: "vicinix-events",
    slug: "vicinix-events",
    name: "Events",
    fullName: "Vicinix Events",
    category: "it-solutions",
    status: "delivered",
    statusLabel: "Delivered",
    tagline: "High-throughput QR ticketing, gate pass verification, and event logistics",
    summary:
      "A battle-tested access control and event entry platform capable of scanning thousands of attendee QR tickets per minute with sub-second gate validation and live occupancy metrics.",
    overview: [
      "Vicinix Events was designed to eliminate gate congestion and eradicate ticket counterfeiting. Built for corporate conferences, exhibitions, concerts, and VIP galas, the platform powers the entire attendee entry lifecycle.",
      "Event organizers can issue encrypted QR passes via email and WhatsApp. At turnstiles or entry gates, staff use the ultra-fast Vicinix Scanner app to validate passes in under 300 milliseconds, even in poor connectivity conditions.",
    ],
    features: [
      {
        title: "Sub-Second Gate QR Scanner",
        description:
          "Proprietary optical scanning engine that decodes dynamic QR codes in under 300ms from phone screens or printed badges.",
        iconName: "QrCode",
      },
      {
        title: "Anti-Passback & Fraud Defense",
        description:
          "Instant duplicate pass rejection prevents ticket sharing, screenshots, and unauthorized multiple entries across all gates.",
        iconName: "ShieldCheck",
      },
      {
        title: "Live Venue Occupancy Telemetry",
        description:
          "Real-time analytics dashboard tracking attendance flow, peak entry hours, gate throughput, and VIP arrivals.",
        iconName: "BarChart3",
      },
      {
        title: "WhatsApp & Apple Wallet Passes",
        description:
          "Automated ticket delivery directly into attendees' WhatsApp chat or Apple Wallet with personalized seating details.",
        iconName: "Smartphone",
      },
      {
        title: "Multi-Zone Tiered Access",
        description:
          "Easily configure backstage, VIP lounge, general admission, and media credentials on a single unified pass.",
        iconName: "Key",
      },
      {
        title: "Zero-Latency Offline Mode",
        description:
          "Local mesh network synchronizes scan statuses across all gate devices instantly, ensuring zero gate stalls during internet drops.",
        iconName: "Radio",
      },
    ],
    specifications: [
      { label: "Scan Latency", value: "< 300 milliseconds per ticket" },
      { label: "Hardware Support", value: "Any Android / iOS device or 2D laser terminal" },
      { label: "Throughput Capacity", value: "10,000+ attendees per hour per gate bank" },
      { label: "Data Security", value: "Encrypted AES-256 rotating QR tokens" },
    ],
    pricing: {
      tiers: [
        {
          name: "Turnkey Event Pass",
          deploymentModel: "Single Venue Instance",
          description: "Ideal for conferences, workshops, and private summits.",
          features: [
            "Gate Scanner Accounts Included",
            "Branded WhatsApp Ticket Delivery",
            "Real-time Gate Check-in Telemetry",
            "Anti-Passback Duplicate Protection",
            "Post-Event Attendance Audit Export",
          ],
        },
        {
          name: "Festival & Summit",
          deploymentModel: "High-Throughput Turnstile Cluster",
          description: "Built for major summits, multi-day festivals, and conventions.",
          isPopular: true,
          features: [
            "Multi-Zone & VIP Access Control",
            "Sub-300ms Optical QR Validation",
            "Anti-Passback Fraud Defense",
            "Live Venue Occupancy Dashboard",
            "Dedicated On-Site Technical Engineer",
          ],
        },
        {
          name: "Annual Enterprise Pass",
          deploymentModel: "Sovereign Arena License",
          description: "For venue managers, stadium operators, and recurring event organizers.",
          features: [
            "Unlimited Events & Attendee Throughput",
            "Hardware Scanner Integration",
            "Custom Turnstile & Barrier API",
            "Custom Branded Organizer Mobile App",
            "Dedicated Event Command Support",
          ],
        },
      ],
      notes: "Turnstile hardware integrations and RFID wristband support available on demand.",
    },
    cta: {
      primaryText: "Commission Event Deployment",
      primaryHref: "/contact?product=vicinix-events",
      secondaryText: "View Deployment Models",
      secondaryHref: "#editions",
    },
    seo: {
      title: "Vicinix Events — High-Throughput QR Entry & Ticketing Verification",
      description:
        "Eliminate gate queues and stop duplicate tickets with Vicinix Events high-speed QR check-in platform.",
      keywords: ["event check-in software", "QR ticket scanner", "event access control"],
    },
  },

  // --- 5. VICINIX MENU (DELIVERED) ---
  {
    id: "vicinix-menu",
    slug: "vicinix-menu",
    name: "Menu",
    fullName: "Vicinix Menu",
    category: "it-solutions",
    status: "delivered",
    statusLabel: "Delivered / Live Suite",
    tagline: "Table QR digital menu, live kitchen order display, and contactless table checkout",
    summary:
      "An intelligent restaurant operating system enabling guests to scan table QR codes, browse rich visual menus, place customized orders directly to the kitchen, and pay seamlessly via Razorpay.",
    overview: [
      "Vicinix Menu modernizes dining operations for cafes, high-volume bistros, and luxury restaurants. By placing dynamic, table-specific QR codes on each table, diners instantly open an app-free digital menu on their smartphones.",
      "Orders fire directly into the Kitchen Order Display (KOD) system, organized by table number and prep station. Diners track their order progression in real time (Placed → Preparing → Served), and can settle their bill at their own pace.",
    ],
    features: [
      {
        title: "App-Free Instant QR Menu",
        description:
          "Guests simply aim their phone camera at the table QR code. No apps to download, zero friction, with instantaneous high-definition food photography.",
        iconName: "Smartphone",
      },
      {
        title: "Live Kitchen Order Display (KOD)",
        description:
          "Replaces paper kitchen tickets with digital screen stations. Orders are sorted chronologically with preparation timers and dietary tags.",
        iconName: "ChefHat",
      },
      {
        title: "Dynamic Menu & 86 Item Toggling",
        description:
          "Sold out of a special? Mark items unavailable instantly from the manager's phone, updating all diner tables in real time.",
        iconName: "Sliders",
      },
      {
        title: "Live Order Status Tracking",
        description:
          "Guests monitor their dish lifecycle: 'Order Received' → 'In the Kitchen' → 'On its way to Table #14'.",
        iconName: "Clock",
      },
      {
        title: "Table-Side Razorpay Settlement",
        description:
          "Diners view their live running bill, split dishes with friends, and pay with Razorpay (UPI, Google Pay, Cards) without waiting for a waiter.",
        iconName: "CreditCard",
      },
      {
        title: "Real-Time Table Turnover Analytics",
        description:
          "Provides management with visibility into average prep durations, popular dishes, peak table occupancy hours, and revenue per table.",
        iconName: "TrendingUp",
      },
    ],
    specifications: [
      { label: "Guest UX", value: "Universal Mobile Web (PWA, No Install)" },
      { label: "Kitchen Interface", value: "Tablet & Touchscreen KOD Display" },
      { label: "Payment Gateway", value: "Razorpay Table Checkout (Optional)" },
      { label: "Printer Support", value: "ESC/POS Thermal Kitchen Ticket Printers" },
      { label: "Order Latency", value: "< 250ms from phone click to kitchen screen" },
    ],
    pricing: {
      tiers: [
        {
          name: "Boutique Cafe & Bistro",
          deploymentModel: "Single Outlet Cloud",
          description: "Engineered for boutique cafes, bistros, and dining rooms.",
          features: [
            "Table QR Standee Package Included",
            "App-Free Diner Mobile Web Menu",
            "Real-time Kitchen Order Display (KOD)",
            "Instant 86 Out-of-Stock Toggling",
            "Razorpay Table Checkout Integration",
          ],
        },
        {
          name: "Fine Dining Pro",
          deploymentModel: "Multi-Station Kitchen KOD",
          description: "For high-volume restaurants, breweries, and luxury dining spaces.",
          isPopular: true,
          features: [
            "Multi-Station Kitchen KOD Displays",
            "Elapsed Cooking Timers & Urgency Chimes",
            "Brushed Gold Acrylic Table Standees",
            "Thermal ESC/POS Kitchen Printer Support",
            "Table Turnover Analytics & Revenue Telemetry",
            "Priority Support & Menu Onboarding",
          ],
        },
        {
          name: "Chain & Resort",
          deploymentModel: "Enterprise Multi-Property Cluster",
          description: "For nationwide hospitality chains, food courts, and resort properties.",
          features: [
            "Central Recipe & Menu Provisioning",
            "Custom POS & Inventory ERP Integration",
            "Multi-Outlet Centralized Dashboard",
            "Dedicated Account Onboarding Engineer",
            "24/7 Priority Emergency Support",
          ],
        },
      ],
      notes: "Brushed gold acrylic standees and kitchen touchscreen tablets provisioned on request.",
    },
    cta: {
      primaryText: "Launch Restaurant Suite",
      primaryHref: "/apps/menu",
      secondaryText: "Try Table 4 Diner View",
      secondaryHref: "/apps/menu/table/4",
    },
    seo: {
      title: "Vicinix Menu — Table QR Digital Menu & Kitchen Display System",
      description:
        "Speed up table turnover, empower kitchen staff, and provide seamless contactless table checkout with Vicinix Menu.",
      keywords: ["restaurant QR menu", "kitchen display system", "digital table ordering"],
    },
  },

  // --- 6. VICINIX ERP (CONCEPT) ---
  {
    id: "vicinix-erp",
    slug: "vicinix-erp",
    name: "ERP",
    fullName: "Vicinix ERP",
    category: "it-solutions",
    status: "concept",
    statusLabel: "Concept / Roadmap",
    tagline: "Next-generation modular cloud ERP for inventory, multi-entity ledger, and operations",
    summary:
      "A sovereign, composable enterprise resource planning platform engineered to replace bloated legacy enterprise software with modern API-first modules.",
    overview: [
      "Traditional ERP systems are notorious for multi-year rollouts, archaic user interfaces, and extortionate maintenance contracts. Vicinix ERP is architected from the ground up for modern businesses needing agile, high-performance modularity.",
      "From real-time warehouse inventory and supply chain tracking to automated HRMS and consolidated multi-entity accounting, Vicinix ERP connects every departmental silo into one responsive truth.",
    ],
    features: [
      {
        title: "Composable Modular Architecture",
        description:
          "Activate only what you need: Inventory, Procurement, Sales, HR & Payroll, or Manufacturing, scaling on demand.",
        iconName: "Boxes",
      },
      {
        title: "Real-Time Multi-Warehouse Ledger",
        description:
          "Track batch numbers, serializations, and inter-warehouse stock transfers with barcode validation.",
        iconName: "Package",
      },
      {
        title: "Automated Procurement & PO Approvals",
        description:
          "Intelligent reorder point calculations trigger purchase requests with hierarchical executive sign-offs.",
        iconName: "FileCheck",
      },
      {
        title: "Modern HRMS & Performance",
        description:
          "Complete employee lifecycle management, automated salary slips, leave tracking, and organizational charts.",
        iconName: "Users",
      },
    ],
    specifications: [
      { label: "Status", value: "Architectural Concept & Prototype Stage" },
      { label: "Target Verticals", value: "Manufacturing, Retail Chains, Logistics" },
      { label: "Architecture", value: "Microservices & Event-Driven Cloud Backend" },
      { label: "API Capabilities", value: "100% GraphQL & REST API Coverage" },
    ],
    cta: {
      primaryText: "Join Enterprise Advisory Board",
      primaryHref: "/contact?subject=ERP+Advisory+Board",
      secondaryText: "Learn More",
      secondaryHref: "/solutions/it-solutions",
    },
    seo: {
      title: "Vicinix ERP — Modular Cloud Enterprise Resource Planning",
      description:
        "The modern alternative to legacy ERPs. Modular, lightning-fast inventory, accounting, and operations management.",
      keywords: ["cloud ERP software", "modular enterprise software", "supply chain management"],
    },
  },

  // --- 7. VICINIX COLLEGE & K-12 ERP (CONCEPT) ---
  {
    id: "vicinix-college-erp",
    slug: "vicinix-college-erp",
    name: "College & K–12 ERP",
    fullName: "Vicinix College & K–12 ERP",
    category: "it-solutions",
    status: "concept",
    statusLabel: "Concept / Roadmap",
    tagline: "Unified campus operating system: admissions, fee reconciliation, and academic lifecycle",
    summary:
      "A purpose-engineered campus management platform unifying student enrollment, automated fee collection, examination grading, faculty scheduling, and parent communication.",
    overview: [
      "Educational institutions juggle fragmented point solutions for fees, exams, attendance, and student records. Vicinix College & K–12 ERP integrates the entire academic and administrative lifecycle into a singular, intuitive campus cloud.",
      "Parents enjoy transparent mobile portals for fee installments and report cards, faculty benefit from streamlined grading and timetable tools, and trustees gain live financial oversight.",
    ],
    features: [
      {
        title: "Automated Student Fee Engine",
        description:
          "Manages complex scholarship structures, fee installments, bus charges, and automated receipts with Razorpay integration.",
        iconName: "DollarSign",
      },
      {
        title: "Admissions & Merit List Pipeline",
        description:
          "Digital application intake, document verification, quota allocations, and merit ranking automation.",
        iconName: "GraduationCap",
      },
      {
        title: "Examination & Gradebook Analytics",
        description:
          "CBSE, ICSE, and University grading compliance with automated report card generation and student performance alerts.",
        iconName: "BookOpen",
      },
      {
        title: "Parent & Student Mobile Portal",
        description:
          "Instant push notifications for homework, attendance alerts, exam schedules, and circulars.",
        iconName: "Smartphone",
      },
    ],
    specifications: [
      { label: "Status", value: "Educational Roadmap & Architecture Phase" },
      { label: "Institution Scale", value: "From 500-student schools to 20,000-student universities" },
      { label: "Compliance", value: "National Education Policy (NEP) & Multi-Board Ready" },
      { label: "Security", value: "FERPA/COPPA compliant student data governance" },
    ],
    cta: {
      primaryText: "Register Institution for Pilot",
      primaryHref: "/contact?subject=Institution+Pilot+Vicinix+College+ERP",
      secondaryText: "View IT Solutions",
      secondaryHref: "/solutions/it-solutions",
    },
    seo: {
      title: "Vicinix College & K-12 ERP — Unified Campus Operating System",
      description:
        "Modern school and university ERP. Automate student fees, academic grading, admissions, and parent communications.",
      keywords: ["school management ERP", "college management system", "campus operating system"],
    },
  },
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId): ProductItem[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getCategoryById(id: CategoryId): CategoryItem | undefined {
  return CATEGORIES[id];
}
