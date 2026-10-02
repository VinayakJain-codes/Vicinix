"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Copy,
  DollarSign,
  TrendingUp,
  CreditCard,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  InvoiceRecord,
  loadStoredInvoices,
  saveInvoicesToStorage,
} from "@/lib/invoice-store";

export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setInvoices(loadStoredInvoices());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      const updated = invoices.filter((inv) => inv.id !== id);
      setInvoices(updated);
      saveInvoicesToStorage(updated);
    }
  };

  const handleMarkAsPaid = (id: string) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: "paid" as const } : inv
    );
    setInvoices(updated);
    saveInvoicesToStorage(updated);
  };

  const copyPayLink = (inv: InvoiceRecord) => {
    const link = `${window.location.origin}/apps/invoice/${inv.id}#payment`;
    navigator.clipboard.writeText(link);
    setCopiedId(inv.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // KPIs
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalCollected = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalOutstanding = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "viewed")
    .reduce((acc, inv) => acc + inv.totalAmount, 0);
  const overdueCount = invoices.filter((inv) => inv.status === "overdue").length;

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || inv.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: InvoiceRecord["status"]) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold">
            <Clock className="w-3 h-3" />
            Sent
          </span>
        );
      case "viewed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
            <Eye className="w-3 h-3" />
            Viewed
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-neutral-500/10 border border-neutral-500/30 text-neutral-400 font-semibold">
            Draft
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-semibold">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </span>
        );
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/solutions/finance" className="hover:text-[var(--gold-primary)] transition-colors">
              Finance
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--gold-primary)]">Vicinix Invoice</span>
          </nav>

          {/* Top Banner / Product Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)] mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>[INVOICE] BY VICINIX · PRODUCTION ENGINE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                Invoicing & Receivables Studio
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Full-lifecycle billing, statutory GST calculations, recurring retainers, and Razorpay-powered payment links.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/apps/invoice/new"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Invoice</span>
              </Link>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                <span>TOTAL INVOICED</span>
                <DollarSign className="w-4 h-4 text-[var(--gold-primary)]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                ₹{totalBilled.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                Across {invoices.length} billed invoices
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                <span>COLLECTED (PAID)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">
                ₹{totalCollected.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                {totalBilled > 0 ? ((totalCollected / totalBilled) * 100).toFixed(1) : 0}% collection efficiency
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                <span>OUTSTANDING</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                ₹{totalOutstanding.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                Pending client settlement
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                <span>OVERDUE ACCOUNTS</span>
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                {overdueCount}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                Requires automated reminder
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-8">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search invoice # or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--gold-primary)] focus:outline-none transition-colors font-mono"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {["all", "paid", "sent", "viewed", "draft"].map((status) => (
                <button
                  type="button"
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    selectedStatus === status
                      ? "bg-[var(--gold-primary)] text-black font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-elevated)]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Directory Table */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] font-mono uppercase text-[var(--text-muted)]">
                  <tr>
                    <th className="py-3.5 px-6">Invoice #</th>
                    <th className="py-3.5 px-6">Client / Company</th>
                    <th className="py-3.5 px-6">Issue / Due Date</th>
                    <th className="py-3.5 px-6 text-right">Taxable & GST</th>
                    <th className="py-3.5 px-6 text-right">Total Amount</th>
                    <th className="py-3.5 px-6 text-center">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] font-sans">
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-[var(--text-muted)] font-mono">
                        No invoices found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((inv) => (
                      <tr
                        key={inv.id}
                        className="hover:bg-[var(--bg-elevated)]/50 transition-colors group"
                      >
                        <td className="py-4 px-6 font-mono font-semibold text-[var(--gold-primary)]">
                          <Link href={`/apps/invoice/${inv.id}`} className="hover:underline">
                            {inv.invoiceNumber}
                          </Link>
                          {inv.isRecurring && (
                            <span className="block text-[10px] font-mono text-[var(--text-muted)]">
                              ↻ {inv.recurringFrequency}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-[var(--text-primary)]">
                            {inv.client.companyName}
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)]">
                            {inv.client.name} · State {inv.client.stateCode}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono text-[var(--text-muted)] text-[11px]">
                          <div>Issued: {inv.issueDate}</div>
                          <div>Due: {inv.dueDate}</div>
                        </td>
                        <td className="py-4 px-6 text-right font-mono">
                          <div className="text-[var(--text-primary)]">
                            ₹{(inv.subtotal - inv.totalDiscount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)]">
                            +₹{inv.totalTax.toLocaleString("en-IN", { maximumFractionDigits: 2 })} GST
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-serif font-bold text-sm text-[var(--text-primary)]">
                          ₹{inv.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {getStatusBadge(inv.status)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/apps/invoice/${inv.id}`}
                              className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--gold-primary)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors"
                              title="View & Print Vector PDF"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => copyPayLink(inv)}
                              className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--gold-primary)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors cursor-pointer"
                              title="Copy Razorpay Pay Link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {inv.status !== "paid" && (
                              <button
                                type="button"
                                onClick={() => handleMarkAsPaid(inv.id)}
                                className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                                title="Mark as Paid"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDelete(inv.id)}
                              className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-red-500/50 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Invoice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {copiedId === inv.id && (
                            <span className="text-[10px] font-mono text-[var(--gold-primary)] block mt-1">
                              Pay Link Copied!
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
