import type { ProductItem } from "@/lib/catalog";

export default function ProductStatusBadge({ product }: { product: Pick<ProductItem, "status" | "statusLabel"> }) {
  const colors = product.status === "live"
    ? "border-emerald-600/30 bg-emerald-600/10 text-[var(--text-primary)]"
    : product.status === "planned" || product.status === "in-progress"
      ? "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)]"
      : "border-[var(--border-highlight)] bg-[var(--badge-bg)] text-[var(--gold-primary)]";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${colors}`}>{product.statusLabel}</span>;
}
