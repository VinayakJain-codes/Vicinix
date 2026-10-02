import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Shield,
  DollarSign,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { CATEGORIES, PRODUCTS, CategoryId, getCategoryById, getProductsByCategory } from "@/lib/catalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "security" },
    { slug: "finance" },
    { slug: "it-solutions" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryById(slug as CategoryId);

  if (!category) {
    return {
      title: "Solutions | Vicinix",
    };
  }

  return {
    title: category.seo.title,
    description: category.seo.description,
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url: `https://vicinix.co.in/solutions/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryById(slug as CategoryId);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.id);

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case "security":
        return <Shield className="w-8 h-8 text-[var(--gold-primary)]" />;
      case "finance":
        return <DollarSign className="w-8 h-8 text-[var(--gold-primary)]" />;
      case "it-solutions":
        return <Cpu className="w-8 h-8 text-[var(--gold-primary)]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-sm font-semibold">
            Delivered
          </span>
        );
      case "in-progress":
        return (
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-sm font-semibold">
            In Development
          </span>
        );
      case "new":
        return (
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border border-[var(--border-highlight)] text-[var(--gold-primary)] bg-[var(--badge-bg)] shadow-sm font-semibold">
            New Architecture
          </span>
        );
      case "concept":
        return (
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border border-neutral-500/30 text-neutral-400 bg-neutral-500/10 shadow-sm font-semibold">
            Concept
          </span>
        );
    }
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-500 apple-ease pt-28 pb-20 overflow-hidden">
        
        {/* Ambient Liquid Orbs */}
        <div className="liquid-orb top-20 left-1/3 w-[500px] h-[350px] bg-[var(--gold-primary)]/15" />
        <div className="liquid-orb top-1/2 -right-10 w-[450px] h-[450px] bg-amber-500/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Solutions</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--gold-primary)]">{category.name}</span>
          </nav>

          {/* Category Hero (Liquid Glass) */}
          <div className="relative overflow-hidden rounded-3xl liquid-glass-elevated p-8 md:p-14 mb-16 shadow-2xl animate-float">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-subtle)] shadow-sm">
                  {getCategoryIcon(category.id)}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Industry Vertical
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4 tracking-tight">
                {category.title}
              </h1>

              <p className="text-lg text-[var(--gold-primary)] font-medium mb-4">
                {category.tagline}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-8">
                {category.heroPitch}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/enquire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Commission Bespoke Solution</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] transition-all duration-300 apple-ease"
                >
                  <span>Talk with Engineers</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Systems Lineup */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Available Systems
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">
                  Platforms by {category.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {categoryProducts.length} Systems Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-3xl liquid-glass p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[var(--gold-primary)] tracking-wide">
                        {product.name} by Vicinix
                      </span>
                      {getStatusBadge(product.status)}
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold-primary)] transition-colors">
                      {product.fullName}
                    </h3>

                    <p className="text-xs font-mono text-[var(--text-muted)] mb-4">
                      {product.tagline}
                    </p>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {product.summary}
                    </p>

                    <div className="space-y-2 mb-8">
                      {product.features.slice(0, 3).map((f) => (
                        <div key={f.title} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                          <span>{f.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-primary)] group-hover:translate-x-1.5 transition-transform duration-300 apple-ease"
                    >
                      <span>Explore System</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={product.cta.primaryHref}
                      className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      {product.cta.primaryText} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bespoke Callout Banner (Liquid Glass) */}
          <div className="rounded-3xl liquid-glass-elevated p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                Have proprietary {category.name} workflows?
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                We engineer bespoke internal tools and platforms tailored specifically to your company&apos;s protocols and infrastructure.
              </p>
            </div>
            <Link
              href="/enquire"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02] flex-shrink-0"
            >
              <span>Enquire for Personal Software</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
