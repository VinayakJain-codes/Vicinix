"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChefHat,
  QrCode,
  Sliders,
  CheckCircle2,
  XCircle,
  Printer,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Utensils,
  Plus,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  MenuItem,
  loadStoredMenuItems,
  saveMenuItemsToStorage,
} from "@/lib/menu-store";

export default function MenuAdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedTableQR, setSelectedTableQR] = useState(4);
  const [origin, setOrigin] = useState("https://vicinix.co.in");

  useEffect(() => {
    setMenuItems(loadStoredMenuItems());
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const toggleAvailability = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setMenuItems(updated);
    saveMenuItemsToStorage(updated);
  };

  const handlePrintQR = () => {
    window.print();
  };

  const tableUrl = `${origin}/apps/menu/table/${selectedTableQR}`;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/apps/menu"
            className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
              [MENU] BY VICINIX · RESTAURANT CONTROL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Menu Operations & Table QR Suite
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 86 / Stockout Manager */}
        <div className="lg:col-span-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xl space-y-6 print:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[var(--gold-primary)]" />
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Instant 86 / Availability Switcher
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {menuItems.filter((i) => i.isAvailable).length} Active ·{" "}
              {menuItems.filter((i) => !i.isAvailable).length} Out of Stock
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Need to 86 an item during dinner service? Toggle availability below to instantly update all active diner tables without restarting orders.
          </p>

          <div className="divide-y divide-[var(--border-subtle)]/40">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-[var(--bg-elevated)]/40 px-2 rounded-xl transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.isVeg ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                    <h3 className="font-semibold text-xs text-[var(--text-primary)]">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                    ₹{item.price} · {item.category.toUpperCase()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAvailability(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    item.isAvailable
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
                  }`}
                >
                  {item.isAvailable ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>86 (Out)</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Table QR Generator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-xl space-y-6 print:border-none print:shadow-none print:p-0">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] print:hidden">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[var(--gold-primary)]" />
                <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                  Table QR Code Generator
                </h2>
              </div>
              <button
                type="button"
                onClick={handlePrintQR}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-highlight)] text-xs font-mono uppercase text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-black transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Standee</span>
              </button>
            </div>

            <div className="print:hidden space-y-2">
              <label className="block text-xs font-mono text-[var(--text-muted)]">
                Select Table Standee:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTableQR(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                      selectedTableQR === t
                        ? "bg-[var(--gold-primary)] text-black"
                        : "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    T-{t}
                  </button>
                ))}
              </div>
            </div>

            {/* Printable Luxury QR Standee Card */}
            <div className="rounded-3xl border-2 border-[var(--gold-primary)] bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg-surface)] p-8 text-center shadow-2xl space-y-4 print:border-2 print:border-black print:bg-white print:text-black">
              <div className="flex items-center justify-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-widest text-[var(--text-primary)] print:text-black">
                  VICINIX DINING
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)]" />
              </div>

              <div className="font-mono text-xs uppercase tracking-widest text-[var(--gold-primary)] font-bold">
                TABLE NUMBER {selectedTableQR}
              </div>

              {/* Styled SVG QR Simulation */}
              <div className="p-6 rounded-2xl bg-white border border-[var(--border-subtle)] w-fit mx-auto shadow-inner">
                <QrCode className="w-40 h-40 text-black mx-auto" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-base font-bold text-[var(--text-primary)] print:text-black">
                  Scan to View Digital Menu & Order
                </h3>
                <p className="text-xs text-[var(--text-muted)] print:text-neutral-600 max-w-xs mx-auto">
                  Instant table ordering from your camera. No apps to install. Track live preparation.
                </p>
              </div>

              <div className="pt-2 text-[10px] font-mono text-[var(--gold-primary)] print:text-black">
                {tableUrl}
              </div>
            </div>

            <div className="print:hidden text-center">
              <Link
                href={`/apps/menu/table/${selectedTableQR}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--gold-primary)] hover:underline"
              >
                <span>Preview Table {selectedTableQR} Diner Screen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
