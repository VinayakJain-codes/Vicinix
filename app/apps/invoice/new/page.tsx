"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  CheckCircle2,
  Percent,
  Calculator,
  Building,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  InvoiceItem,
  InvoiceRecord,
  BUSINESS_PROFILE,
  calculateInvoiceTaxes,
  loadStoredInvoices,
  saveInvoicesToStorage,
} from "@/lib/invoice-store";

const INDIAN_STATES = [
  { code: "09", name: "09 - Uttar Pradesh (Origin State)" },
  { code: "07", name: "07 - Delhi" },
  { code: "27", name: "27 - Maharashtra" },
  { code: "29", name: "29 - Karnataka" },
  { code: "33", name: "33 - Tamil Nadu" },
  { code: "06", name: "06 - Haryana" },
  { code: "19", name: "19 - West Bengal" },
  { code: "24", name: "24 - Gujarat" },
  { code: "08", name: "08 - Rajasthan" },
  { code: "36", name: "36 - Telangana" },
];

export default function NewInvoicePage() {
  const router = useRouter();

  const nextInvNum = `VIC-2026-00${Math.floor(45 + Math.random() * 50)}`;
  const today = new Date().toISOString().split("T")[0];
  const dueDateDefault = new Date(Date.now() + 15 * 86400000)
    .toISOString()
    .split("T")[0];

  const [invoiceNumber, setInvoiceNumber] = useState(nextInvNum);
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState(dueDateDefault);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<
    "weekly" | "monthly" | "quarterly" | "annually"
  >("monthly");

  const [client, setClient] = useState({
    id: `cli-${Date.now()}`,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    gstin: "",
    stateCode: "07", // Default Delhi (Inter-state)
    address: "",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "item-init-1",
      description: "Enterprise Software License & Cloud Architecture",
      hsnSacCode: "998313",
      quantity: 1,
      unitPrice: 50000,
      gstRate: 18,
      discountPercent: 0,
      total: 50000,
    },
  ]);

  const [notes, setNotes] = useState(
    "Thank you for partnering with Vicinix. Pay instantly using the embedded Razorpay link or direct NEFT/RTGS."
  );
  const [terms, setTerms] = useState(
    "Payment due within 15 days of invoice date. Unpaid invoices subject to 1.5% interest per month."
  );

  // Recalculate taxes
  const taxSummary = calculateInvoiceTaxes(
    items,
    client.stateCode,
    BUSINESS_PROFILE.stateCode
  );

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        description: "",
        hsnSacCode: "998314",
        quantity: 1,
        unitPrice: 0,
        gstRate: 18,
        discountPercent: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: any
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };

    // Auto-compute total for this item
    const qty = Number(updated[index].quantity) || 0;
    const price = Number(updated[index].unitPrice) || 0;
    const disc = Number(updated[index].discountPercent) || 0;
    const rawTotal = qty * price;
    const discountAmt = (rawTotal * disc) / 100;
    updated[index].total = rawTotal - discountAmt;

    setItems(updated);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!client.companyName || !client.email) {
      alert("Please enter the client's company name and email.");
      return;
    }

    const newInvoice: InvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      issueDate,
      dueDate,
      client,
      items,
      subtotal: taxSummary.subtotal,
      totalDiscount: taxSummary.totalDiscount,
      cgstAmount: taxSummary.cgstAmount,
      sgstAmount: taxSummary.sgstAmount,
      igstAmount: taxSummary.igstAmount,
      totalTax: taxSummary.totalTax,
      totalAmount: taxSummary.totalAmount,
      currency: "INR",
      status: "sent",
      paymentLink: `https://pay.vicinix.co.in/${invoiceNumber.toLowerCase()}`,
      notes,
      terms,
      isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : undefined,
    };

    const currentInvoices = loadStoredInvoices();
    const updated = [newInvoice, ...currentInvoices];
    saveInvoicesToStorage(updated);

    router.push(`/apps/invoice/${newInvoice.id}`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Return & Title */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)] mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/apps/invoice"
                className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Invoice Studio
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Create Tax Invoice
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveInvoice}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Generate & Save Invoice</span>
            </button>
          </div>

          <form onSubmit={handleSaveInvoice} className="space-y-8">
            
            {/* Header Grid: Business Profile vs Client Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Business Profile (From) */}
              <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Billed From (Vicinix Profile)
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    ORIGIN: UP (09)
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono">
                  <div className="font-sans font-bold text-sm text-[var(--text-primary)]">
                    {BUSINESS_PROFILE.name}
                  </div>
                  <div>GSTIN: {BUSINESS_PROFILE.gstin}</div>
                  <div>State: {BUSINESS_PROFILE.state} ({BUSINESS_PROFILE.stateCode})</div>
                  <div>Address: {BUSINESS_PROFILE.address}</div>
                  <div>Email: {BUSINESS_PROFILE.email}</div>
                  <div className="pt-2 text-[10px] text-[var(--gold-primary)]">
                    UPI: {BUSINESS_PROFILE.bankDetails.upiId} | Bank: {BUSINESS_PROFILE.bankDetails.bankName}
                  </div>
                </div>
              </div>

              {/* Right Column: Client Profile (Billed To) */}
              <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Billed To (Client Details)
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">
                    * Required for Tax
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Company / Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech Solutions"
                      value={client.companyName}
                      onChange={(e) => setClient({ ...client, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={client.name}
                      onChange={(e) => setClient({ ...client, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Client Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="billing@acme.com"
                      value={client.email}
                      onChange={(e) => setClient({ ...client, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Client GSTIN
                    </label>
                    <input
                      type="text"
                      placeholder="07AAAAA0000A1Z5"
                      value={client.gstin}
                      onChange={(e) => setClient({ ...client, gstin: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Place of Supply (State) *
                    </label>
                    <select
                      value={client.stateCode}
                      onChange={(e) => setClient({ ...client, stateCode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none font-mono"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      placeholder="Suite 401, Tech Park..."
                      value={client.address}
                      onChange={(e) => setClient({ ...client, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Meta Strip: Invoice #, Dates, Recurring */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--gold-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--gold-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono focus:border-[var(--gold-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                  Recurring Retainer
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="recToggle"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--gold-primary)]"
                  />
                  <label htmlFor="recToggle" className="text-xs text-[var(--text-primary)] cursor-pointer">
                    Auto-Schedule
                  </label>
                  {isRecurring && (
                    <select
                      value={recurringFrequency}
                      onChange={(e) => setRecurringFrequency(e.target.value as any)}
                      className="px-2 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] ml-auto"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold">
                  Line Items & Services
                </span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-highlight)] text-xs font-mono uppercase text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-black transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="font-mono text-[var(--text-muted)] uppercase border-b border-[var(--border-subtle)]">
                    <tr>
                      <th className="py-2.5 pr-4 w-5/12">Description</th>
                      <th className="py-2.5 px-2 w-2/12">HSN/SAC</th>
                      <th className="py-2.5 px-2 w-1/12 text-center">Qty</th>
                      <th className="py-2.5 px-2 w-2/12 text-right">Price (₹)</th>
                      <th className="py-2.5 px-2 w-1/12 text-center">GST %</th>
                      <th className="py-2.5 px-2 w-1/12 text-center">Disc %</th>
                      <th className="py-2.5 pl-4 text-right">Total (₹)</th>
                      <th className="py-2.5 pl-2 text-center w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]/40 font-mono">
                    {items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-[var(--bg-elevated)]/30">
                        <td className="py-3 pr-4 font-sans">
                          <input
                            type="text"
                            required
                            placeholder="Service or Product name..."
                            value={item.description}
                            onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none font-sans"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            placeholder="998313"
                            value={item.hsnSacCode}
                            onChange={(e) => handleItemChange(idx, "hsnSacCode", e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                          />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                            className="w-16 px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] text-center focus:border-[var(--gold-primary)] focus:outline-none"
                          />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(idx, "unitPrice", Number(e.target.value))}
                            className="w-24 px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] text-right focus:border-[var(--gold-primary)] focus:outline-none"
                          />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <select
                            value={item.gstRate}
                            onChange={(e) => handleItemChange(idx, "gstRate", Number(e.target.value))}
                            className="px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                          >
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.discountPercent || 0}
                            onChange={(e) => handleItemChange(idx, "discountPercent", Number(e.target.value))}
                            className="w-16 px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] text-center focus:border-[var(--gold-primary)] focus:outline-none"
                          />
                        </td>
                        <td className="py-3 pl-4 text-right font-serif font-semibold text-sm text-[var(--text-primary)]">
                          ₹{item.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 pl-2 text-center">
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="p-1.5 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Notes & Terms */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3">
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)]">
                    Notes & Payment Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none leading-relaxed"
                  />
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] pt-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    rows={2}
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Tax Calculations Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] text-xs font-mono uppercase text-[var(--gold-primary)] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    Automated Tax Computation
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {taxSummary.isIntraState ? "CGST + SGST" : "INTER-STATE IGST"}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span>Subtotal:</span>
                    <span>₹{taxSummary.subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>

                  {taxSummary.totalDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Total Discounts:</span>
                      <span>-₹{taxSummary.totalDiscount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span>Taxable Base:</span>
                    <span>₹{taxSummary.taxableAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>

                  {taxSummary.isIntraState ? (
                    <>
                      <div className="flex items-center justify-between text-[var(--text-muted)]">
                        <span>CGST (Central Tax 9%):</span>
                        <span>₹{taxSummary.cgstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex items-center justify-between text-[var(--text-muted)]">
                        <span>SGST (State Tax 9%):</span>
                        <span>₹{taxSummary.sgstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-[var(--text-muted)]">
                      <span>IGST (Integrated Tax 18%):</span>
                      <span>₹{taxSummary.igstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[var(--gold-primary)] pt-1 border-t border-[var(--border-subtle)] font-semibold">
                    <span>Total Statutory Tax:</span>
                    <span>₹{taxSummary.totalTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-base font-serif font-bold text-[var(--text-primary)]">
                    <span>Grand Total:</span>
                    <span className="text-[var(--gold-primary)] text-xl">
                      ₹{taxSummary.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save & Generate Vector PDF</span>
                  </button>
                </div>
              </div>

            </div>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}
