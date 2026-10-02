"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChefHat,
  ShoppingBag,
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
  Bell,
  Utensils,
  X,
  Search,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  MenuItem,
  OrderItem,
  TableOrder,
  loadStoredMenuItems,
  loadStoredOrders,
  saveOrdersToStorage,
} from "@/lib/menu-store";

export default function DinerTablePage() {
  const params = useParams();
  const rawTableId = params.tableId as string;
  const tableNumber = parseInt(rawTableId.replace(/[^0-9]/g, ""), 10) || 4;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<TableOrder[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [cart, setCart] = useState<Record<string, { item: MenuItem; quantity: number; notes?: string }>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [guestName, setGuestName] = useState("Guest");
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [payingBill, setPayingBill] = useState(false);

  useEffect(() => {
    setMenuItems(loadStoredMenuItems());
    setOrders(loadStoredOrders());
  }, []);

  // Poll for kitchen status updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(loadStoredOrders());
      setMenuItems(loadStoredMenuItems());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Current active order for this table
  const activeOrder = orders.find(
    (o) => o.tableNumber === tableNumber && o.status !== "completed"
  );

  const categories = [
    { id: "all", label: "All Offerings" },
    { id: "starters", label: "Starters" },
    { id: "mains", label: "Mains" },
    { id: "breads", label: "Breads" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" },
  ];

  const addToCart = (item: MenuItem) => {
    if (!item.isAvailable) return;
    setCart((prev) => {
      const existing = prev[item.id];
      if (existing) {
        return {
          ...prev,
          [item.id]: { ...existing, quantity: existing.quantity + 1 },
        };
      }
      return {
        ...prev,
        [item.id]: { item, quantity: 1, notes: "" },
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };

  const updateItemNotes = (itemId: string, notes: string) => {
    setCart((prev) => {
      if (!prev[itemId]) return prev;
      return {
        ...prev,
        [itemId]: { ...prev[itemId], notes },
      };
    });
  };

  const totalCartCount = Object.values(cart).reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = Object.values(cart).reduce(
    (sum, i) => sum + i.item.price * i.quantity,
    0
  );
  const cartGst = Number((cartSubtotal * 0.05).toFixed(2));
  const cartGrandTotal = cartSubtotal + cartGst;

  const handlePlaceOrder = () => {
    if (totalCartCount === 0) return;

    const orderItems: OrderItem[] = Object.values(cart).map((entry) => ({
      menuItemId: entry.item.id,
      name: entry.item.name,
      price: entry.item.price,
      quantity: entry.quantity,
      notes: entry.notes,
      isVeg: entry.item.isVeg,
    }));

    const newOrder: TableOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      tableNumber,
      customerName: guestName,
      items: orderItems,
      status: "placed",
      createdAt: new Date().toISOString(),
      totalAmount: cartGrandTotal,
      paymentStatus: "pending",
    };

    const currentOrders = loadStoredOrders();
    const updated = [newOrder, ...currentOrders];
    saveOrdersToStorage(updated);
    setOrders(updated);
    setCart({});
    setIsCartOpen(false);
  };

  const handlePayTableBill = () => {
    if (!activeOrder) return;
    setPayingBill(true);
    setTimeout(() => {
      const currentOrders = loadStoredOrders();
      const updated = currentOrders.map((o) =>
        o.id === activeOrder.id
          ? { ...o, status: "completed" as const, paymentStatus: "paid_online" as const }
          : o
      );
      saveOrdersToStorage(updated);
      setOrders(updated);
      setPayingBill(false);
    }, 1000);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pb-28">
      
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold-primary)]">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif font-bold text-sm tracking-wide text-[var(--text-primary)] flex items-center gap-1.5">
                VICINIX DINING
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
              </div>
              <div className="text-[10px] font-mono text-[var(--gold-primary)] font-semibold">
                TABLE #{tableNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setWaiterCalled(true);
                setTimeout(() => setWaiterCalled(false), 3000);
              }}
              className="p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Call Server"
            >
              <Bell className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
              {waiterCalled ? (
                <span className="text-[10px] font-mono text-[var(--gold-primary)]">Called!</span>
              ) : null}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Diner Container */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        
        {/* Active Order Live Progress Stepper */}
        {activeOrder && (
          <div className="p-4 rounded-2xl border border-[var(--gold-primary)] bg-[var(--bg-surface)] shadow-xl animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[var(--gold-primary)] font-bold">
                LIVE ORDER #{activeOrder.orderNumber}
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                ₹{activeOrder.totalAmount}
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div
                className={`p-2 rounded-lg border transition-all ${
                  activeOrder.status === "placed" ||
                  activeOrder.status === "preparing" ||
                  activeOrder.status === "served"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                }`}
              >
                1. Placed
              </div>
              <div
                className={`p-2 rounded-lg border transition-all ${
                  activeOrder.status === "preparing" || activeOrder.status === "served"
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-400 font-bold"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                }`}
              >
                2. Cooking
              </div>
              <div
                className={`p-2 rounded-lg border transition-all ${
                  activeOrder.status === "served"
                    ? "border-[var(--gold-primary)] bg-[var(--badge-bg)] text-[var(--gold-primary)] font-bold animate-pulse"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                }`}
              >
                3. Served
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-[var(--text-muted)]">
                {activeOrder.status === "placed" && "Ticket sent to kitchen screen."}
                {activeOrder.status === "preparing" && "Chef is actively preparing your dishes."}
                {activeOrder.status === "served" && "Served at Table #4! Enjoy your meal."}
              </div>

              {activeOrder.status === "served" && (
                <button
                  type="button"
                  onClick={handlePayTableBill}
                  disabled={payingBill}
                  className="px-3 py-1 rounded-lg bg-[var(--gold-primary)] text-black text-[11px] font-semibold uppercase tracking-wider hover:bg-[var(--gold-hover)] cursor-pointer"
                >
                  {payingBill ? "Processing..." : "Settle Bill"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search & Dietary Toggle */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:border-[var(--gold-primary)] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)]">DIETARY FILTER:</span>
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-1 rounded-full border text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                vegOnly
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pure Veg Only</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[var(--gold-primary)] text-black font-bold shadow-sm"
                  : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dish List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const inCartCount = cart[item.id]?.quantity || 0;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isAvailable
                    ? "border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm"
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          item.isVeg
                            ? "border-emerald-500 text-emerald-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                      </span>

                      {item.isChefSpecial && (
                        <span className="text-[10px] font-mono text-[var(--gold-primary)] bg-[var(--badge-bg)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Chef Special
                        </span>
                      )}

                      {item.isSpicy && (
                        <span className="text-[10px] font-mono text-red-400 flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" /> Spicy
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                      <span className="font-serif font-bold text-sm text-[var(--text-primary)]">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~{item.prepTimeMinutes} mins
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="flex-shrink-0">
                    {!item.isAvailable ? (
                      <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        86 Stockout
                      </span>
                    ) : inCartCount > 0 ? (
                      <div className="flex items-center gap-2 border border-[var(--gold-primary)] bg-[var(--badge-bg)] rounded-xl px-2 py-1">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--gold-primary)] hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-[var(--text-primary)] px-1">
                          {inCartCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="text-[var(--gold-primary)] hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="px-3.5 py-1.5 rounded-xl border border-[var(--border-highlight)] bg-[var(--badge-bg)] text-xs font-mono uppercase font-semibold text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-black transition-all cursor-pointer shadow-sm"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Floating Bottom Cart Bar */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-3 duration-200">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full p-4 rounded-2xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-between shadow-2xl hover:bg-[var(--gold-hover)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>{totalCartCount} {totalCartCount === 1 ? "Item" : "Items"} in Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm">₹{cartGrandTotal}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--gold-primary)]" />
                <h3 className="font-serif font-bold text-base text-[var(--text-primary)]">
                  Your Table {tableNumber} Order
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 divide-y divide-[var(--border-subtle)]/40">
              {Object.values(cart).map(({ item, quantity, notes }) => (
                <div key={item.id} className="pt-3 first:pt-0 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">{item.name}</span>
                    <span className="font-serif font-bold">₹{item.price * quantity}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <input
                      type="text"
                      placeholder="Special instructions (e.g. extra crispy)..."
                      value={notes || ""}
                      onChange={(e) => updateItemNotes(item.id, e.target.value)}
                      className="w-8/12 px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none"
                    />

                    <div className="flex items-center gap-2 border border-[var(--border-subtle)] rounded-lg px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--text-muted)] hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs px-1">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="text-[var(--text-muted)] hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Items Subtotal:</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-muted)]">
                <span>Restaurant GST (5%):</span>
                <span>₹{cartGst}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-base font-serif font-bold text-[var(--text-primary)]">
                <span>Grand Total:</span>
                <span className="text-[var(--gold-primary)]">₹{cartGrandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm & Dispatch to Kitchen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Role Quick Switcher */}
      <div className="fixed bottom-2 right-2 z-20">
        <Link
          href="/apps/menu"
          className="px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[10px] font-mono uppercase text-[var(--text-muted)] hover:text-[var(--gold-primary)] shadow-lg backdrop-blur-md"
        >
          Menu Hub ↗
        </Link>
      </div>

    </div>
  );
}
