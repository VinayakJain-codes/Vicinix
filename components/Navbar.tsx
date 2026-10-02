"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight, Shield, DollarSign, Cpu, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { PRODUCTS, CATEGORIES, ProductItem } from "@/lib/catalog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const solutionsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setSolutionsOpen(false);
    setProductsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadge = (status: ProductItem["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
            Delivered
          </span>
        );
      case "in-progress":
        return (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
            In Dev
          </span>
        );
      case "new":
        return (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-[var(--border-highlight)] text-[var(--gold-primary)] bg-[var(--badge-bg)]">
            New
          </span>
        );
      case "concept":
        return (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-neutral-500/30 text-neutral-400 bg-neutral-500/10">
            Concept
          </span>
        );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif tracking-widest text-2xl font-bold text-[var(--text-primary)] transition-colors">
              VICINIX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                type="button"
                onClick={() => {
                  setSolutionsOpen(!solutionsOpen);
                  setProductsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  solutionsOpen || pathname.startsWith("/solutions")
                    ? "text-[var(--gold-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180 text-[var(--gold-primary)]" : ""
                  }`}
                />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-xl bg-[var(--dropdown-bg)] border border-[var(--border-subtle)] p-2 shadow-xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-3 py-2">
                    Industry Verticals
                  </div>
                  {Object.values(CATEGORIES).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/solutions/${cat.slug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors group"
                    >
                      <div className="mt-0.5 p-2 rounded-md bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)]">
                        {cat.id === "security" && <Shield className="w-4 h-4" />}
                        {cat.id === "finance" && <DollarSign className="w-4 h-4" />}
                        {cat.id === "it-solutions" && <Cpu className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors flex items-center gap-1">
                          {cat.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                          {cat.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                type="button"
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setSolutionsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  productsOpen || pathname.startsWith("/products")
                    ? "text-[var(--gold-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    productsOpen ? "rotate-180 text-[var(--gold-primary)]" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 rounded-xl bg-[var(--dropdown-bg)] border border-[var(--border-subtle)] p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      The Vicinix Suite
                    </span>
                    <span className="text-[11px] font-mono text-[var(--gold-primary)]">
                      7 Products
                    </span>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto space-y-1 pr-1">
                    {PRODUCTS.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors">
                            {prod.fullName}
                          </div>
                          <div className="text-xs text-[var(--text-muted)] line-clamp-1">
                            {prod.tagline}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-3">
                          {getStatusBadge(prod.status)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/about"
                  ? "text-[var(--gold-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Company
            </Link>

            <Link
              href="/enquire"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/enquire"
                  ? "text-[var(--gold-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
              <span>Custom Software</span>
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "text-[var(--gold-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/enquire"
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-[var(--border-highlight)] bg-[var(--badge-bg)] hover:bg-[var(--gold-primary)] text-[var(--text-primary)] hover:text-black transition-all duration-300 shadow-sm"
            >
              <span>Enquire Software</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Flyout Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[var(--bg-base)] border-t border-[var(--border-subtle)] p-6 overflow-y-auto space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div>
            <div className="text-xs font-mono uppercase text-[var(--gold-primary)] mb-3 tracking-wider">
              Solutions
            </div>
            <div className="space-y-2">
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/solutions/${cat.slug}`}
                  className="block p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {cat.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">
                    {cat.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-[var(--gold-primary)] mb-3 tracking-wider">
              Products
            </div>
            <div className="space-y-2">
              {PRODUCTS.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                >
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {prod.fullName}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {prod.tagline}
                    </div>
                  </div>
                  {getStatusBadge(prod.status)}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-subtle)] pt-4 space-y-2">
            <Link
              href="/about"
              className="block py-2 text-sm font-medium text-[var(--text-primary)]"
            >
              Company / About
            </Link>
            <Link
              href="/enquire"
              className="block py-2 text-sm font-medium text-[var(--gold-primary)]"
            >
              Enquire for Custom Software →
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium text-[var(--text-primary)]"
            >
              Contact Support & Sales
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
