"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChefHat,
  Clock,
  CheckCircle2,
  Flame,
  Volume2,
  VolumeX,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Utensils,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  TableOrder,
  OrderStatus,
  loadStoredOrders,
  saveOrdersToStorage,
} from "@/lib/menu-store";

export default function KitchenOrderDisplay() {
  const [orders, setOrders] = useState<TableOrder[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    setOrders(loadStoredOrders());
    const interval = setInterval(() => {
      setOrders(loadStoredOrders());
      setCurrentTime(Date.now());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const advanceOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: nextStatus } : o
    );
    setOrders(updated);
    saveOrdersToStorage(updated);
  };

  const getElapsedMinutes = (createdAt: string) => {
    const diffMs = currentTime - new Date(createdAt).getTime();
    return Math.max(0, Math.floor(diffMs / 60000));
  };

  const placedOrders = orders.filter((o) => o.status === "placed");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const servedOrders = orders.filter((o) => o.status === "served");

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 p-4 sm:p-6 lg:p-8">
      
      {/* Top Kitchen Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/apps/menu"
            className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)]">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                [MENU] BY VICINIX · TOUCHSCREEN KOD
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Live Kitchen Order Display
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-mono uppercase cursor-pointer ${
              audioEnabled
                ? "border-[var(--gold-primary)] text-[var(--gold-primary)] bg-[var(--badge-bg)]"
                : "border-[var(--border-subtle)] text-[var(--text-muted)]"
            }`}
            title="Toggle Kitchen Order Chime"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Chime {audioEnabled ? "ON" : "OFF"}</span>
          </button>

          <ThemeToggle />
        </div>
      </header>

      {/* Kanban Column Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Column 1: Placed / Incoming */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Incoming Tickets
              </h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              {placedOrders.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {placedOrders.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-[var(--text-muted)]">
                No new incoming tickets.
              </div>
            ) : (
              placedOrders.map((order) => {
                const elapsed = getElapsedMinutes(order.createdAt);
                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl border border-blue-500/30 bg-[var(--bg-elevated)] space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-xl font-bold text-[var(--gold-primary)]">
                        TABLE #{order.tableNumber}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border ${
                          elapsed > 15
                            ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                            : "bg-neutral-800 text-neutral-300 border-neutral-700"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{elapsed}m ago</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2">
                      Ticket {order.orderNumber} · {order.customerName || "Diner"}
                    </div>

                    {/* Order items */}
                    <div className="space-y-2 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-[var(--text-primary)]">
                              {item.quantity}x
                            </span>{" "}
                            <span className="font-medium text-[var(--text-primary)]">
                              {item.name}
                            </span>
                            {item.notes && (
                              <div className="text-[11px] text-amber-400 font-mono pl-5">
                                Note: {item.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(order.id, "preparing")}
                      className="w-full py-2.5 rounded-lg bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Start Preparing</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 2: In Preparation */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                On the Cook Station
              </h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              {preparingOrders.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-[var(--text-muted)]">
                Station clear.
              </div>
            ) : (
              preparingOrders.map((order) => {
                const elapsed = getElapsedMinutes(order.createdAt);
                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl border border-amber-500/40 bg-[var(--bg-elevated)] space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-xl font-bold text-[var(--gold-primary)]">
                        TABLE #{order.tableNumber}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border ${
                          elapsed > 15
                            ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>Cooking: {elapsed}m</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2">
                      Ticket {order.orderNumber}
                    </div>

                    <div className="space-y-2 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-[var(--gold-primary)]">
                              {item.quantity}x
                            </span>{" "}
                            <span className="font-medium text-[var(--text-primary)]">
                              {item.name}
                            </span>
                            {item.notes && (
                              <div className="text-[11px] text-amber-400 font-mono pl-5">
                                Note: {item.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(order.id, "served")}
                      className="w-full py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Ready to Serve</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 3: Ready / Served */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary)]">
                Served at Tables
              </h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              {servedOrders.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {servedOrders.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-[var(--text-muted)]">
                No orders currently served.
              </div>
            ) : (
              servedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-emerald-500/30 bg-[var(--bg-elevated)] space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-serif text-xl font-bold text-[var(--gold-primary)]">
                      TABLE #{order.tableNumber}
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Served
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
                    <span>Ticket {order.orderNumber}</span>
                    <span className="text-[var(--gold-primary)]">₹{order.totalAmount}</span>
                  </div>

                  <div className="space-y-1 text-xs text-[var(--text-muted)]">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => advanceOrderStatus(order.id, "completed")}
                    className="w-full py-2 rounded-lg border border-[var(--border-subtle)] hover:border-emerald-500 text-xs font-mono uppercase text-[var(--text-muted)] hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Clear Ticket
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
