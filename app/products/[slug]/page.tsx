import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Monitor,
  AlertTriangle,
  MapPin,
  FileSpreadsheet,
  WifiOff,
  CheckCheck,
  TrendingUp,
  FileCheck,
  Layers,
  ShieldAlert,
  Users,
  CreditCard,
  RefreshCw,
  Percent,
  FileText,
  Clock,
  Cpu,
  QrCode,
  BarChart3,
  Smartphone,
  Key,
  Radio,
  ChefHat,
  Sliders,
  Boxes,
  Package,
  DollarSign,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { ProductJsonLd } from "@/components/JsonLd";
import { PRODUCTS, getProductBySlug, ProductItem, CATEGORIES } from "@/lib/catalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product | Vicinix",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://vicinix.co.in/products/${product.slug}`,
      siteName: "Vicinix",
    },
  };
}

// Icon helper
const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[var(--gold-primary)]" />,
  Monitor: <Monitor className="w-5 h-5 text-[var(--gold-primary)]" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-[var(--gold-primary)]" />,
  MapPin: <MapPin className="w-5 h-5 text-[var(--gold-primary)]" />,
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 text-[var(--gold-primary)]" />,
  WifiOff: <WifiOff className="w-5 h-5 text-[var(--gold-primary)]" />,
  CheckCheck: <CheckCheck className="w-5 h-5 text-[var(--gold-primary)]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[var(--gold-primary)]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[var(--gold-primary)]" />,
  Layers: <Layers className="w-5 h-5 text-[var(--gold-primary)]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[var(--gold-primary)]" />,
  Users: <Users className="w-5 h-5 text-[var(--gold-primary)]" />,
  CreditCard: <CreditCard className="w-5 h-5 text-[var(--gold-primary)]" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-[var(--gold-primary)]" />,
  Percent: <Percent className="w-5 h-5 text-[var(--gold-primary)]" />,
  FileText: <FileText className="w-5 h-5 text-[var(--gold-primary)]" />,
  Clock: <Clock className="w-5 h-5 text-[var(--gold-primary)]" />,
  Cpu: <Cpu className="w-5 h-5 text-[var(--gold-primary)]" />,
  QrCode: <QrCode className="w-5 h-5 text-[var(--gold-primary)]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[var(--gold-primary)]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[var(--gold-primary)]" />,
  Key: <Key className="w-5 h-5 text-[var(--gold-primary)]" />,
  Radio: <Radio className="w-5 h-5 text-[var(--gold-primary)]" />,
  ChefHat: <ChefHat className="w-5 h-5 text-[var(--gold-primary)]" />,
  Sliders: <Sliders className="w-5 h-5 text-[var(--gold-primary)]" />,
  Boxes: <Boxes className="w-5 h-5 text-[var(--gold-primary)]" />,
  Package: <Package className="w-5 h-5 text-[var(--gold-primary)]" />,
  DollarSign: <DollarSign className="w-5 h-5 text-[var(--gold-primary)]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[var(--gold-primary)]" />,
  BookOpen: <BookOpen className="w-5 h-5 text-[var(--gold-primary)]" />,
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES[product.category];

  const getStatusBadge = (status: ProductItem["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Delivered / Live Production
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Active Development / Beta Q2 2026
          </span>
        );
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-full border border-[var(--border-highlight)] text-[var(--gold-primary)] bg-[var(--badge-bg)] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            New Architecture
          </span>
        );
      case "concept":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase px-3 py-1 rounded-full border border-neutral-500/30 text-neutral-400 bg-neutral-500/10 shadow-sm">
            Concept / Long-Term Roadmap
          </span>
        );
    }
  };

  return (
    <>
      <ProductJsonLd
        name={product.fullName}
        description={product.summary}
        url={`https://vicinix.co.in/products/${product.slug}`}
        category={category.name}
      />
      <Navbar />

      <main className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-500 apple-ease pt-28 pb-24 overflow-hidden">
        
        {/* Apple-grade Liquid Gradient Orbs */}
        <div className="liquid-orb top-24 left-1/4 w-[500px] h-[350px] bg-[var(--gold-primary)]/15" />
        <div className="liquid-orb top-1/2 right-10 w-[400px] h-[400px] bg-amber-500/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--gold-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/solutions/${category.slug}`} className="hover:text-[var(--gold-primary)] transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--gold-primary)]">{product.fullName}</span>
          </nav>

          {/* Product Hero (Liquid Glass Card) */}
          <div className="relative overflow-hidden rounded-3xl liquid-glass-elevated p-8 md:p-14 mb-16 animate-float">
            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  {product.name} by Vicinix
                </span>
                <span className="text-[var(--text-muted)]">·</span>
                {getStatusBadge(product.status)}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-4 tracking-tight">
                {product.fullName}
              </h1>

              <p className="text-lg sm:text-xl text-[var(--gold-primary)] font-medium mb-6">
                {product.tagline}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-8 max-w-3xl">
                {product.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={product.cta.primaryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  <span>{product.cta.primaryText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {product.cta.secondaryText && product.cta.secondaryHref && (
                  <a
                    href={product.cta.secondaryHref}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl liquid-glass text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] transition-all duration-300 apple-ease"
                  >
                    <span>{product.cta.secondaryText}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* In-Depth Overview & Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                System Overview
              </h2>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Architecture & Operational Philosophy
              </h3>
              {product.overview.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Technical Specifications Card (Liquid Glass) */}
            <div className="lg:col-span-5 rounded-2xl liquid-glass p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <Cpu className="w-4 h-4 text-[var(--gold-primary)]" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                  Technical Specifications
                </h4>
              </div>

              <div className="space-y-3">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between text-xs py-1.5 border-b border-[var(--border-subtle)]/50 last:border-none">
                    <span className="font-mono text-[var(--text-muted)]">{spec.label}</span>
                    <span className="font-medium text-[var(--text-primary)] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features Grid (Liquid Glass) */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                Capabilities
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">
                Engineered for Absolute Reliability
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl liquid-glass p-6 group"
                >
                  <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] w-fit mb-4 group-hover:scale-110 transition-transform duration-300 apple-ease">
                    {iconMap[feature.iconName] || <CheckCircle2 className="w-5 h-5 text-[var(--gold-primary)]" />}
                  </div>
                  <h4 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--gold-primary)] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status-Driven Section 1: Enterprise Deployment Editions (NO PRICES MENTIONED) */}
          {product.pricing && (
            <div id="editions" className="mb-20 pt-8 border-t border-[var(--border-subtle)]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Architecture & Scale
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">
                  Deployment Editions
                </h3>
                {product.pricing.notes && (
                  <p className="text-xs font-mono text-[var(--text-muted)] mt-2">
                    {product.pricing.notes}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.pricing.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 apple-ease ${
                      tier.isPopular
                        ? "liquid-glass-elevated border-2 border-[var(--gold-primary)] relative"
                        : "liquid-glass"
                    }`}
                  >
                    {tier.isPopular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-black bg-[var(--gold-primary)] font-bold shadow-md">
                        Standard Deployment
                      </span>
                    )}

                    <div>
                      <h4 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                        {tier.name}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1 mb-4">
                        {tier.description}
                      </p>

                      {/* Deployment Model Badge (NO PRICES) */}
                      <div className="mb-6 px-3 py-2 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--gold-primary)] font-semibold flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{tier.deploymentModel}</span>
                      </div>

                      <div className="space-y-3 mb-8">
                        {tier.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold-primary)] flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/contact?subject=Deployment+Consultation+${encodeURIComponent(product.fullName)}+${encodeURIComponent(tier.name)}`}
                      className={`w-full py-3.5 rounded-xl text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 apple-ease ${
                        tier.isPopular
                          ? "bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-hover)] shadow-md hover:scale-[1.02]"
                          : "liquid-glass text-[var(--text-primary)] hover:border-[var(--gold-primary)]"
                      }`}
                    >
                      Request Deployment Proposal
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status-Driven Section 2: In-Progress / New Roadmap */}
          {product.roadmap && (
            <div id="capabilities" className="mb-20 pt-8 border-t border-[var(--border-subtle)]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                  Engineering Progress
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1 tracking-tight">
                  Product Roadmap & Milestones
                </h3>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {product.roadmap.map((stage, idx) => (
                  <div
                    key={stage.stage}
                    className="flex items-start gap-4 p-5 rounded-2xl liquid-glass"
                  >
                    <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)]">
                      {stage.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-[var(--gold-primary)]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[var(--gold-primary)]">Phase 0{idx + 1}</span>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">{stage.stage}</h4>
                        {stage.completed ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{stage.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion Callout (Liquid Glass) */}
          <div className="rounded-3xl liquid-glass-elevated p-8 md:p-14 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
              Next Step
            </span>
            <h3 className="font-serif text-3xl font-bold text-[var(--text-primary)] mt-2 mb-4 tracking-tight">
              Interested in {product.fullName}?
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed">
              Whether deploying across your organization or exploring bespoke architecture, our engineers are standing by.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={product.cta.primaryHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
              >
                <span>{product.cta.primaryText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl liquid-glass text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] transition-all duration-300 apple-ease"
              >
                <span>Enquire Custom Solution</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
