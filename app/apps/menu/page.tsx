import Link from "next/link";
import {
  ChefHat,
  Smartphone,
  Sliders,
  ArrowRight,
  Sparkles,
  QrCode,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

export default function MenuHubPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/solutions/it-solutions" className="hover:text-[var(--gold-primary)] transition-colors">
              IT Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--gold-primary)]">Vicinix Menu</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] bg-[var(--badge-bg)] border border-[var(--border-subtle)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[MENU] BY VICINIX · RESTAURANT OPERATING SYSTEM</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Explore the Vicinix Menu Ecosystem
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Vicinix Menu connects diners, chefs, and restaurant managers into a synchronized contactless workflow. Select an interface below to test the live system:
            </p>
          </div>

          {/* 3 Interactive Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            {/* Card 1: Diner Mobile View */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 hover:border-[var(--gold-primary)] transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Guest Experience
                </span>
                <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  Table 04 Diner Screen
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Simulate what a guest sees upon scanning their table QR code. Browse visual categories, filter veg/spicy, customize dishes, and watch real-time order status (Placed → Cooking → Served).
                </p>
                <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>App-Free Universal Web UX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dish Customization & Cart Drawer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Table-Side Razorpay Bill Pay</span>
                  </div>
                </div>
              </div>

              <Link
                href="/apps/menu/table/4"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md group-hover:scale-[1.02]"
              >
                <span>Launch Table 4 Diner View</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Kitchen Display (KOD) */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 hover:border-[var(--gold-primary)] transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                  <ChefHat className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Kitchen Command
                </span>
                <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  Kitchen Order Display (KOD)
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Experience the touchscreen station for head chefs. Live Kanban pipeline with color-coded preparation timers, dietary notes, and one-click status triggers.
                </p>
                <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Elapsed Prep Timers & Urgency Colors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Audio Chime Simulation for New Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Diner Stepper Synchronization</span>
                  </div>
                </div>
              </div>

              <Link
                href="/apps/menu/kitchen"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--border-highlight)] bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] transition-all shadow-md group-hover:scale-[1.02]"
              >
                <span>Launch Kitchen Screen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Restaurant Admin & QR Suite */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 hover:border-[var(--gold-primary)] transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Manager Suite
                </span>
                <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  Menu Admin & QR Suite
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Manage restaurant service on the fly. 1-click 86 item availability toggles, and generate printable luxury QR standees for Tables 1 through 20.
                </p>
                <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Out-of-Stock (86) Toggling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Printable Luxury QR Standees (T1-T20)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dynamic Table Routing</span>
                  </div>
                </div>
              </div>

              <Link
                href="/apps/menu/admin"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--border-highlight)] bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] transition-all shadow-md group-hover:scale-[1.02]"
              >
                <span>Launch Restaurant Admin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
