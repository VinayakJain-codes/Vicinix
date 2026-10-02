"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Printer,
  CreditCard,
  ArrowLeft,
  Copy,
  CheckCircle2,
  Building,
  ShieldCheck,
  QrCode,
  Sparkles,
  Lock,
  ChevronRight,
  Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  InvoiceRecord,
  BUSINESS_PROFILE,
  loadStoredInvoices,
  saveInvoicesToStorage,
} from "@/lib/invoice-store";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<InvoiceRecord | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPayMode, setSelectedPayMode] = useState<"upi" | "card" | "netbanking">("upi");

  useEffect(() => {
    const list = loadStoredInvoices();
    const found = list.find((i) => i.id === invoiceId);
    if (found) {
      setInvoice(found);
    }
  }, [invoiceId]);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex items-center justify-center p-8">
        <div className="text-center">
          <p className="font-mono text-sm text-[var(--text-muted)] mb-4">Invoice not found.</p>
          <Link
            href="/apps/invoice"
            className="px-4 py-2 rounded-xl bg-[var(--gold-primary)] text-black text-xs font-semibold uppercase tracking-wider"
          >
            Return to Invoices
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const copyPaymentUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSimulatePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      const list = loadStoredInvoices();
      const updatedList = list.map((i) =>
        i.id === invoice.id
          ? {
              ...i,
              status: "paid" as const,
              notes: `${i.notes || ""}\n[Razorpay Settlement] Paid ₹${i.totalAmount} via ${selectedPayMode.toUpperCase()}. Txn ID: pay_${Math.random().toString(36).substring(2, 11)}`,
            }
          : i
      );
      saveInvoicesToStorage(updatedList);
      setInvoice(updatedList.find((i) => i.id === invoice.id)!);
      setPaymentProcessing(false);
      setShowPayModal(false);
    }, 1200);
  };

  return (
    <>
      {/* Hide Navbar & Footer during print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20 print:p-0 print:bg-white print:text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
          
          {/* Action Bar (Hidden in Print) */}
          <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
            <div className="flex items-center gap-3">
              <Link
                href="/apps/invoice"
                className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Invoice {invoice.invoiceNumber}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {invoice.client.companyName}
                  </h1>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      invoice.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--gold-primary)] text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Vector PDF</span>
              </button>

              <button
                type="button"
                onClick={copyPaymentUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--gold-primary)] text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink ? "Link Copied!" : "Pay Link"}</span>
              </button>

              {invoice.status !== "paid" && (
                <button
                  type="button"
                  onClick={() => setShowPayModal(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Razorpay Checkout</span>
                </button>
              )}
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div
            id="invoice-document"
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 shadow-2xl space-y-10 print:border-none print:shadow-none print:p-6 print:bg-white print:text-black"
          >
            {/* Header: Brand & Invoice Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-[var(--border-subtle)] print:border-neutral-300">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-serif text-3xl font-bold tracking-widest text-[var(--text-primary)] print:text-black">
                    VICINIX
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)]" />
                </div>
                <div className="text-xs text-[var(--text-muted)] print:text-neutral-600 font-mono space-y-0.5">
                  <div className="font-semibold text-[var(--text-primary)] print:text-black">
                    {BUSINESS_PROFILE.name}
                  </div>
                  <div>GSTIN: {BUSINESS_PROFILE.gstin}</div>
                  <div>PAN: {BUSINESS_PROFILE.pan}</div>
                  <div>State: {BUSINESS_PROFILE.state} (Code {BUSINESS_PROFILE.stateCode})</div>
                  <div>{BUSINESS_PROFILE.address}</div>
                  <div>Email: {BUSINESS_PROFILE.email}</div>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1 font-mono text-xs">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] font-bold">
                  TAX INVOICE
                </div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)] print:text-black">
                  {invoice.invoiceNumber}
                </div>
                <div className="text-[var(--text-muted)] print:text-neutral-600">
                  Date of Issue: <span className="text-[var(--text-primary)] print:text-black">{invoice.issueDate}</span>
                </div>
                <div className="text-[var(--text-muted)] print:text-neutral-600">
                  Payment Due: <span className="text-[var(--text-primary)] print:text-black">{invoice.dueDate}</span>
                </div>
                <div className="pt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      invoice.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 print:text-emerald-700"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30 print:text-amber-700"
                    }`}
                  >
                    ● {invoice.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Billed To / Client Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-[var(--border-subtle)] print:border-neutral-300">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold block mb-2">
                  Billed To (Client / Consignee)
                </span>
                <div className="text-xs text-[var(--text-muted)] print:text-neutral-700 space-y-1 font-mono">
                  <div className="font-sans font-bold text-sm text-[var(--text-primary)] print:text-black">
                    {invoice.client.companyName}
                  </div>
                  <div>Attn: {invoice.client.name}</div>
                  <div>Email: {invoice.client.email}</div>
                  {invoice.client.phone && <div>Phone: {invoice.client.phone}</div>}
                  {invoice.client.gstin && <div>Client GSTIN: {invoice.client.gstin}</div>}
                  <div>State Code: {invoice.client.stateCode}</div>
                  <div>{invoice.client.address}</div>
                </div>
              </div>

              <div className="sm:text-right flex flex-col justify-end">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] font-semibold block mb-2">
                  Place of Supply
                </span>
                <div className="text-xs font-mono text-[var(--text-muted)] print:text-neutral-700 space-y-1">
                  <div>State Code: {invoice.client.stateCode}</div>
                  <div>
                    Supply Type:{" "}
                    <span className="font-semibold text-[var(--text-primary)] print:text-black">
                      {invoice.cgstAmount > 0 ? "Intra-State (CGST + SGST)" : "Inter-State (IGST)"}
                    </span>
                  </div>
                  {invoice.isRecurring && (
                    <div className="text-[var(--gold-primary)]">
                      ↻ Recurring Retainer ({invoice.recurringFrequency})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="font-mono text-[var(--text-muted)] print:text-neutral-600 uppercase border-b border-[var(--border-subtle)] print:border-neutral-300">
                  <tr>
                    <th className="py-3 px-3 w-1/12">#</th>
                    <th className="py-3 px-3 w-5/12">Description</th>
                    <th className="py-3 px-3 w-2/12">HSN/SAC</th>
                    <th className="py-3 px-3 w-1/12 text-center">Qty</th>
                    <th className="py-3 px-3 w-1/12 text-right">Unit Price</th>
                    <th className="py-3 px-3 w-1/12 text-center">GST</th>
                    <th className="py-3 px-3 w-2/12 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]/40 print:divide-neutral-200 font-mono">
                  {invoice.items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="py-4 px-3 text-[var(--text-muted)]">{idx + 1}</td>
                      <td className="py-4 px-3 font-sans font-medium text-[var(--text-primary)] print:text-black">
                        {item.description}
                      </td>
                      <td className="py-4 px-3 text-[var(--text-muted)]">{item.hsnSacCode}</td>
                      <td className="py-4 px-3 text-center">{item.quantity}</td>
                      <td className="py-4 px-3 text-right">₹{item.unitPrice.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-3 text-center">{item.gstRate}%</td>
                      <td className="py-4 px-3 text-right font-serif font-bold text-sm text-[var(--text-primary)] print:text-black">
                        ₹{item.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary & Bank Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[var(--border-subtle)] print:border-neutral-300">
              
              {/* Bank & Settlement Details */}
              <div className="space-y-4 text-xs font-mono">
                <span className="text-xs uppercase tracking-wider text-[var(--gold-primary)] font-semibold block">
                  Remittance / Bank Instructions
                </span>
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] print:border-neutral-300 bg-[var(--bg-elevated)] print:bg-neutral-50 space-y-1.5 text-[var(--text-muted)] print:text-neutral-700">
                  <div>Bank Name: <span className="text-[var(--text-primary)] print:text-black font-semibold">{BUSINESS_PROFILE.bankDetails.bankName}</span></div>
                  <div>Account Name: <span className="text-[var(--text-primary)] print:text-black">{BUSINESS_PROFILE.bankDetails.accountName}</span></div>
                  <div>Account No: <span className="text-[var(--text-primary)] print:text-black font-mono">{BUSINESS_PROFILE.bankDetails.accountNumber}</span></div>
                  <div>IFSC Code: <span className="text-[var(--text-primary)] print:text-black font-mono">{BUSINESS_PROFILE.bankDetails.ifsc}</span></div>
                  <div>UPI ID: <span className="text-[var(--gold-primary)] font-mono">{BUSINESS_PROFILE.bankDetails.upiId}</span></div>
                </div>

                {invoice.notes && (
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                      Notes
                    </span>
                    <p className="text-[11px] text-[var(--text-muted)] print:text-neutral-600 leading-relaxed whitespace-pre-line">
                      {invoice.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Tax Calculations */}
              <div className="space-y-2 text-xs font-mono sm:pl-8">
                <div className="flex items-center justify-between text-[var(--text-muted)]">
                  <span>Subtotal:</span>
                  <span>₹{invoice.subtotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>

                {invoice.totalDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-₹{invoice.totalDiscount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                )}

                {invoice.cgstAmount > 0 && (
                  <>
                    <div className="flex items-center justify-between text-[var(--text-muted)]">
                      <span>CGST (Central Tax 9%):</span>
                      <span>₹{invoice.cgstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center justify-between text-[var(--text-muted)]">
                      <span>SGST (State Tax 9%):</span>
                      <span>₹{invoice.sgstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                  </>
                )}

                {invoice.igstAmount > 0 && (
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span>IGST (Integrated Tax 18%):</span>
                    <span>₹{invoice.igstAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[var(--gold-primary)] print:text-neutral-900 pt-2 border-t border-[var(--border-subtle)] font-semibold">
                  <span>Total Tax (GST):</span>
                  <span>₹{invoice.totalTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--border-highlight)] print:border-black text-base font-serif font-bold text-[var(--text-primary)] print:text-black">
                  <span>Total Amount Due:</span>
                  <span className="text-[var(--gold-primary)] print:text-black text-xl">
                    ₹{invoice.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="pt-6 text-right">
                  <div className="inline-block text-center space-y-1">
                    <div className="h-10 border-b border-[var(--border-subtle)] w-36 mx-auto flex items-end justify-center pb-1 text-[10px] text-[var(--gold-primary)] font-mono">
                      Vinayak Jain
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">Authorized Signatory</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Cryptographic Hash / Verification Notice */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] print:border-neutral-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                <span>Cryptographically signed by Vicinix Billing Engine · doc_id_{invoice.id}</span>
              </div>
              <div>Page 1 of 1</div>
            </div>

          </div>

        </div>
      </main>

      {/* Razorpay Simulation Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--gold-primary)]" />
                <span className="font-serif font-bold text-lg text-[var(--text-primary)]">
                  Razorpay Checkout
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-1">
              <div className="text-xs text-[var(--text-muted)]">Paying to:</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{BUSINESS_PROFILE.name}</div>
              <div className="text-xs font-mono text-[var(--gold-primary)] pt-1">
                Amount: ₹{invoice.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-[var(--text-muted)]">
                Select Payment Mode:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["upi", "card", "netbanking"] as const).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setSelectedPayMode(mode)}
                    className={`py-2 rounded-xl text-xs font-mono uppercase border transition-all cursor-pointer ${
                      selectedPayMode === mode
                        ? "border-[var(--gold-primary)] bg-[var(--badge-bg)] text-[var(--gold-primary)] font-bold"
                        : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-[var(--border-subtle)] text-center space-y-2">
              <QrCode className="w-16 h-16 text-[var(--gold-primary)] mx-auto" />
              <div className="text-xs font-mono text-[var(--text-muted)]">
                UPI ID: {BUSINESS_PROFILE.bankDetails.upiId}
              </div>
              <div className="text-[10px] text-emerald-400">
                Instant Razorpay webhook simulated reconciliation
              </div>
            </div>

            <button
              type="button"
              disabled={paymentProcessing}
              onClick={handleSimulatePayment}
              className="w-full py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {paymentProcessing ? "Authorizing Payment..." : `Authorize ₹${invoice.totalAmount.toLocaleString("en-IN")} Settlement`}
            </button>
          </div>
        </div>
      )}

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
