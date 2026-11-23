export const venues = {
  cafe: { name: "Café", shop: "Juniper Coffee", item: "Flat white", price: 180, source: "Table 04", destination: "Kitchen", offer: "Coffee for two", color: "#25675b" },
  bakery: { name: "Bakery", shop: "Sunday Bakehouse", item: "Almond croissant", price: 220, source: "Counter 02", destination: "Bake counter", offer: "Fresh from the oven", color: "#a75742" },
  store: { name: "Retail", shop: "Field Supply", item: "Canvas tote", price: 450, source: "Shelf 03", destination: "Pickup desk", offer: "New arrivals", color: "#476488" },
  event: { name: "Events & venues", shop: "Gather Festival", item: "Day pass", price: 750, source: "Gate A", destination: "Event desk", offer: "Meet you at Gather", color: "#995d59" },
  security: { name: "Security operations", shop: "Northgate Security", item: "Site service", price: 500, source: "Checkpoint 01", destination: "Control room", offer: "Care for every corner", color: "#485b75" },
  campus: { name: "College & school", shop: "Oakwood Campus", item: "Campus kit", price: 350, source: "Student desk", destination: "Campus office", offer: "A new chapter begins", color: "#68618b" },
  business: { name: "Business & finance", shop: "Forma Works", item: "Service package", price: 1200, source: "Sales desk", destination: "Operations", offer: "Room for your next idea", color: "#5a7165" },
} as const;

export type Venue = keyof typeof venues;
export const modules = ["ordering", "payments", "loyalty", "guard", "events", "tax", "erp", "college", "marketing"] as const;
export type Module = typeof modules[number];
export const details = {
  ordering: { name: "Menu", description: "QR ordering and kitchen queue", color: "#418a77", productId: "vicinix-menu" },
  payments: { name: "Invoice", description: "Create and settle an invoice", color: "#be8542", productId: "vicinix-invoice" },
  loyalty: { name: "Loyalty", description: "Stamp cards and sample rewards", color: "#8573a4", productId: "vicinix-loyalty" },
  guard: { name: "Guard", description: "Checkpoints and incident reporting", color: "#526c8f", productId: "vicinix-guard" },
  events: { name: "Events", description: "Tickets and gate check-in", color: "#b36b79", productId: "vicinix-events" },
  tax: { name: "Tax", description: "Explore a sample tax worksheet", color: "#5f8873", productId: "vicinix-tax" },
  erp: { name: "ERP", description: "Stock and fulfilment workflows", color: "#a3804c", productId: "vicinix-erp" },
  college: { name: "College ERP", description: "Class attendance and fee records", color: "#746496", productId: "vicinix-college-erp" },
  marketing: { name: "Marketing", description: "Design a campaign preview", color: "#ba7060", productId: null },
} as const;
export const presets: Record<Venue, Module[]> = {
  cafe: ["ordering", "payments"], bakery: ["ordering", "payments", "loyalty"],
  store: ["payments", "erp", "loyalty"], event: ["events", "guard", "payments", "marketing"],
  security: ["guard", "erp"], campus: ["college", "payments"], business: ["payments", "tax", "erp"],
};
export type Position = [number, number];
export type Positions = Record<Module, Position>;
export const defaultPositions: Positions = {
  ordering: [-3.8, 1.8], payments: [0, 3], loyalty: [3.8, 1.8],
  marketing: [-3.8, -0.4], guard: [-3.8, -2.5], events: [-1.9, 3],
  tax: [3.8, -2.5], erp: [3.8, -0.4], college: [1.9, 3],
};
export interface Setup { venue: Venue; enabled: Module[]; positions: Positions }
export const initialSetup: Setup = { venue: "cafe", enabled: ["ordering", "payments"], positions: defaultPositions };
export const storageKey = "vicinix.playground.v1";
export function constrainPosition([x, z]: Position): Position {
  let nextX = Math.max(-4, Math.min(4, x));
  const nextZ = Math.max(-2.8, Math.min(3, z));
  // Keep tools outside the shop footprint so every tool remains selectable.
  if (Math.abs(nextX) < 2.2 && nextZ > -2.6 && nextZ < 1.7) nextX = nextX < 0 ? -2.4 : 2.4;
  return [nextX, nextZ];
}
export function restore(): Setup {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved && typeof saved.venue === "string" && Object.hasOwn(venues, saved.venue) && Array.isArray(saved.enabled)) {
      const positions = { ...defaultPositions };
      for (const id of modules) {
        const value = saved.positions?.[id];
        if (Array.isArray(value) && value.length === 2 && value.every(n => typeof n === "number" && Number.isFinite(n))) {
          positions[id] = constrainPosition(value as Position);
        }
      }
      return { venue: saved.venue, enabled: modules.filter(id => saved.enabled.includes(id)), positions };
    }
  } catch { /* Storage can be unavailable in private browsing. */ }
  return initialSetup;
}
