export interface InvoiceItem {
  id: string;
  description: string;
  hsnSacCode: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // e.g. 18 for 18%
  discountPercent?: number;
  total: number;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  gstin?: string;
  stateCode: string;
  address: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string; // e.g. "VIC-2026-0042"
  issueDate: string;
  dueDate: string;
  client: ClientProfile;
  items: InvoiceItem[];
  subtotal: number;
  totalDiscount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  totalAmount: number;
  currency: string;
  status: "draft" | "sent" | "viewed" | "paid" | "overdue";
  paymentLink?: string;
  notes?: string;
  terms?: string;
  isRecurring?: boolean;
  recurringFrequency?: "weekly" | "monthly" | "quarterly" | "annually";
}

export const BUSINESS_PROFILE = {
  name: "Vicinix Technologies Pvt. Ltd.",
  tradeName: "Vicinix",
  gstin: "09AAECV1234F1Z8",
  state: "Uttar Pradesh",
  stateCode: "09",
  pan: "AAECV1234F",
  address: "Vicinix Headquarters, Tech Zone 4, NCR, India - 201306",
  email: "billing@vicinix.co.in",
  phone: "+91 98765 43210",
  bankDetails: {
    bankName: "HDFC Bank Ltd.",
    accountName: "Vicinix Technologies Private Limited",
    accountNumber: "50200088991122",
    ifsc: "HDFC0001234",
    upiId: "vicinix@hdfcbank",
  },
};

export const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: "inv-001",
    invoiceNumber: "VIC-2026-0042",
    issueDate: "2026-09-15",
    dueDate: "2026-09-30",
    client: {
      id: "cli-1",
      name: "Aditya Verma",
      email: "aditya@zenithsecurity.in",
      phone: "+91 98112 34567",
      companyName: "Zenith Facility & Security Services",
      gstin: "07AAACZ1092Q1ZU",
      stateCode: "07", // Delhi (Inter-state -> IGST)
      address: "Tower B, Cyber Hub, DLF Phase 2, Gurugram, HR - 122002",
    },
    items: [
      {
        id: "item-1",
        description: "Vicinix Guard Cloud Instance — Enterprise 100 Guard Tier (Annual)",
        hsnSacCode: "998313",
        quantity: 1,
        unitPrice: 149988,
        gstRate: 18,
        discountPercent: 10,
        total: 134989.2,
      },
      {
        id: "item-2",
        description: "Ruggedized NFC Patrol Checkpoint Tags (Pack of 50)",
        hsnSacCode: "852352",
        quantity: 2,
        unitPrice: 3500,
        gstRate: 18,
        total: 7000,
      },
    ],
    subtotal: 156988,
    totalDiscount: 14998.8,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 25558.06,
    totalTax: 25558.06,
    totalAmount: 167547.26,
    currency: "INR",
    status: "paid",
    paymentLink: "https://pay.vicinix.co.in/inv_001_rzp",
    notes: "Payment received via Razorpay UPI Transfer. Transaction ID: pay_Pz9238Lmq",
    terms: "Payment due within 15 days of invoice date.",
    isRecurring: true,
    recurringFrequency: "annually",
  },
  {
    id: "inv-002",
    invoiceNumber: "VIC-2026-0043",
    issueDate: "2026-09-22",
    dueDate: "2026-10-07",
    client: {
      id: "cli-2",
      name: "Meera Kapoor",
      email: "m.kapoor@solitairedining.com",
      phone: "+91 97234 56789",
      companyName: "Solitaire Luxury Hospitality Group",
      gstin: "09AAGCS4512N1Z3",
      stateCode: "09", // Uttar Pradesh (Intra-state -> CGST + SGST)
      address: "Plot 14, Sector 62, Noida, Uttar Pradesh - 201309",
    },
    items: [
      {
        id: "item-3",
        description: "Vicinix Menu Multi-Outlet Licensing — Table QR & Kitchen Display KOD",
        hsnSacCode: "998314",
        quantity: 3,
        unitPrice: 18500,
        gstRate: 18,
        discountPercent: 5,
        total: 52725,
      },
      {
        id: "item-4",
        description: "Laser-Engraved Brushed Gold Acrylic Table QR Standees (25 Tables)",
        hsnSacCode: "392690",
        quantity: 3,
        unitPrice: 4200,
        gstRate: 18,
        total: 12600,
      },
    ],
    subtotal: 68100,
    totalDiscount: 2775,
    cgstAmount: 5879.25,
    sgstAmount: 5879.25,
    igstAmount: 0,
    totalTax: 11758.5,
    totalAmount: 77083.5,
    currency: "INR",
    status: "sent",
    paymentLink: "https://pay.vicinix.co.in/inv_002_rzp",
    notes: "Dynamic Table QR codes will be synchronized upon receipt of deposit.",
    terms: "30-day payment term. 1.5% interest per month for delayed receivables.",
  },
  {
    id: "inv-003",
    invoiceNumber: "VIC-2026-0044",
    issueDate: "2026-09-25",
    dueDate: "2026-10-10",
    client: {
      id: "cli-3",
      name: "Vikram Malhotra",
      email: "vikram@apexconventions.in",
      phone: "+91 99887 66554",
      companyName: "Apex International Conventions & Summits",
      gstin: "27AABCA3321R1ZT",
      stateCode: "27", // Maharashtra (Inter-state -> IGST)
      address: "BKC Complex, Bandra East, Mumbai, MH - 400051",
    },
    items: [
      {
        id: "item-5",
        description: "Vicinix Events High-Throughput QR Entry Pass Engine — 5,000 Attendee License",
        hsnSacCode: "998313",
        quantity: 1,
        unitPrice: 24999,
        gstRate: 18,
        total: 24999,
      },
      {
        id: "item-6",
        description: "On-Site Gate Scanner Devices (Pair of 2D Laser Scanners)",
        hsnSacCode: "847160",
        quantity: 4,
        unitPrice: 6500,
        gstRate: 18,
        total: 26000,
      },
    ],
    subtotal: 50999,
    totalDiscount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 9179.82,
    totalTax: 9179.82,
    totalAmount: 60178.82,
    currency: "INR",
    status: "viewed",
    paymentLink: "https://pay.vicinix.co.in/inv_003_rzp",
    notes: "Hardware dispatch scheduled via BlueDart Air upon payment confirmation.",
    terms: "Full payment required prior to gate scanner dispatch.",
  },
];

// Helper calculations
export function calculateInvoiceTaxes(
  items: InvoiceItem[],
  clientStateCode: string,
  businessStateCode = BUSINESS_PROFILE.stateCode
) {
  let subtotal = 0;
  let totalDiscount = 0;
  let taxableAmount = 0;
  let totalTax = 0;

  const isIntraState = clientStateCode === businessStateCode;

  items.forEach((item) => {
    const rawItemTotal = item.quantity * item.unitPrice;
    const discount = item.discountPercent ? (rawItemTotal * item.discountPercent) / 100 : 0;
    const itemTaxable = rawItemTotal - discount;
    const itemTax = (itemTaxable * item.gstRate) / 100;

    subtotal += rawItemTotal;
    totalDiscount += discount;
    taxableAmount += itemTaxable;
    totalTax += itemTax;
  });

  const cgstAmount = isIntraState ? totalTax / 2 : 0;
  const sgstAmount = isIntraState ? totalTax / 2 : 0;
  const igstAmount = isIntraState ? 0 : totalTax;
  const totalAmount = taxableAmount + totalTax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    totalDiscount: Number(totalDiscount.toFixed(2)),
    taxableAmount: Number(taxableAmount.toFixed(2)),
    cgstAmount: Number(cgstAmount.toFixed(2)),
    sgstAmount: Number(sgstAmount.toFixed(2)),
    igstAmount: Number(igstAmount.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    isIntraState,
  };
}

// Client-side LocalStorage helper for invoices
const INVOICES_STORAGE_KEY = "vicinix_invoices_v1";

export function loadStoredInvoices(): InvoiceRecord[] {
  if (typeof window === "undefined") return INITIAL_INVOICES;
  try {
    const stored = localStorage.getItem(INVOICES_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(INITIAL_INVOICES));
      return INITIAL_INVOICES;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load invoices from storage", e);
    return INITIAL_INVOICES;
  }
}

export function saveInvoicesToStorage(invoices: InvoiceRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
  } catch (e) {
    console.error("Failed to save invoices to storage", e);
  }
}
