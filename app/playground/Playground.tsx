"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Coffee, Store, Croissant, QrCode, CreditCard, Gift, Megaphone, Plus, Check, RotateCcw, Grip, Box, LayoutGrid, Minus, ShoppingBag, ShieldCheck, Ticket, Calculator, Package, GraduationCap, Building2, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/catalog";
import SoftwareDemo from "./SoftwareDemo";
import { defaultPositions, details, initialSetup, modules, presets, restore, storageKey, venues, type Module, type Position, type Setup, type Venue } from "./model";

const Scene = dynamic(() => import("./Scene"), { ssr: false, loading: () => <div className="pg-loading">Building your miniature business…</div> });
const icons = { ordering: QrCode, payments: CreditCard, loyalty: Gift, marketing: Megaphone, guard: ShieldCheck, events: Ticket, tax: Calculator, erp: Package, college: GraduationCap };
const venueIcons = { cafe: Coffee, bakery: Croissant, store: Store, event: Ticket, security: ShieldCheck, campus: GraduationCap, business: Building2 };

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function Playground() {
  const [setup, setSetup] = useState<Setup>(initialSetup);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [view, setView] = useState<"3d" | "2d">("3d");
  const [selected, setSelected] = useState<Module>("ordering");
  const [dragging, setDragging] = useState<Module | null>(null);
  const [drop, setDrop] = useState<{ id: Module; x: number; y: number; sequence: number } | null>(null);
  const [message, setMessage] = useState("Choose a tool to explore its demo.");
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<{ quantity: number; ready: boolean; paid: boolean } | null>(null);
  const [stamps, setStamps] = useState(2);
  const [rewards, setRewards] = useState(0);
  const [campaign, setCampaign] = useState("A little something for your everyday.");
  const [campaignStyle, setCampaignStyle] = useState("forest");
  const [resetCount, setResetCount] = useState(0);
  const inspector = useRef<HTMLElement>(null);
  const business = venues[setup.venue];
  const BusinessIcon = venueIcons[setup.venue];
  const product = PRODUCTS.find(item => item.id === details[selected].productId);
  const is3d = desktop && view === "3d";

  useEffect(() => {
    setSetup(restore());
    setLoaded(true);
    const query = window.matchMedia("(min-width: 1100px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(setup));
      setSaved(true);
    } catch { setSaved(false); }
  }, [setup, loaded]);

  function inspect(id: Module) {
    setSelected(id);
    setMessage(`${details[id].name} demo opened.`);
    inspector.current?.focus({ preventScroll: true });
    if (!desktop) inspector.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }

  function enable(id: Module, position?: Position) {
    setSetup(current => ({ ...current,
      enabled: modules.filter(module => module === id || current.enabled.includes(module)),
      positions: position ? { ...current.positions, [id]: position } : current.positions,
    }));
    setSelected(id);
    setMessage(`${details[id].name} connected to ${business.shop}.`);
  }

  function changeVenue(venue: Venue) {
    setSetup(current => ({ ...current, venue, enabled: presets[venue] }));
    setSelected(presets[venue][0]);
    setOrder(null);
    setQuantity(1);
    setStamps(2);
    setRewards(0);
    setCampaign("A little something for your everyday.");
    setMessage(`${venues[venue].name} selected. Sample activity reset.`);
  }

  function reset() {
    setResetCount(value => value + 1);
    setSetup({ ...initialSetup, positions: { ...defaultPositions } });
    setSelected("ordering");
    setOrder(null);
    setQuantity(1);
    setStamps(2);
    setRewards(0);
    setCampaign("A little something for your everyday.");
    setCampaignStyle("forest");
    setMessage("Playground reset to the café starter.");
  }

  function placeOrder() {
    setOrder({ quantity, ready: false, paid: false });
    setMessage(`${quantity} × ${business.item} sent to ${business.destination.toLowerCase()}.`);
  }

  function pay() {
    if (!order || order.paid) return;
    setOrder({ ...order, paid: true });
    if (setup.enabled.includes("loyalty")) setStamps(value => Math.min(5, value + 1));
    setMessage(setup.enabled.includes("loyalty") ? "Sample invoice paid. A loyalty stamp was added." : "Sample invoice paid.");
  }

  const flatScene = <div className="pg-flat" aria-label="2D business workflow">
    <div className="pg-flat-shop" style={{ borderColor: business.color }}>
      <div className="pg-flat-awning" style={{ backgroundColor: business.color }} />
      <BusinessIcon size={34} aria-hidden="true" />
      <strong>{business.shop}</strong><span>{business.source} · {business.destination}</span>
      <div className="pg-flat-tables" aria-hidden="true"><i /><i /><i /></div>
    </div>
    <div className="pg-flat-tools">
      {modules.filter(id => setup.enabled.includes(id)).map(id => {
        const Icon = icons[id];
        return <button key={id} onClick={() => inspect(id)} className="pg-flat-tool connected" style={{ "--tool-color": details[id].color } as React.CSSProperties}>
          <Icon size={22} aria-hidden="true" /><span>{details[id].name}</span><small>Open demo</small>
        </button>;
      })}
    </div>
    {!setup.enabled.length && <p className="pg-help">Connect software from the toolkit to build your workflow.</p>}
  </div>;

  return <div className="pg-app">
    <div className="pg-toolbar">
      <div className="pg-business-select">
        <BusinessIcon size={20} aria-hidden="true" />
        <label htmlFor="pg-business">Business type</label>
        <div><select id="pg-business" value={setup.venue} onChange={event => changeVenue(event.target.value as Venue)}>{(Object.keys(venues) as Venue[]).map(venue => <option key={venue} value={venue}>{venues[venue].name}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></div>
      </div>
      <div className="pg-toolbar-end"><span className="pg-save">{loaded ? saved ? "Selections saved on this device" : "Selections kept for this visit" : "Loading your setup…"}</span><button className="pg-reset" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Reset</button></div>
    </div>

    <div className="pg-workspace">
      <aside className="pg-toolbox" aria-label="Business tools">
        <h2>The Vicinix suite</h2><p>{is3d ? "Drag software onto the scene, or use Connect." : "Connect software to try it in your business."}</p>
        <div className="pg-tool-list">{modules.map(id => {
          const Icon = icons[id];
          const enabled = setup.enabled.includes(id);
          const item = PRODUCTS.find(product => product.id === details[id].productId);
          return <div className={`pg-tool ${enabled ? "enabled" : ""}`} key={id} draggable={is3d}
            onDragStart={event => { event.dataTransfer.setData("application/vicinix-tool", id); event.dataTransfer.effectAllowed = "copyMove"; setDragging(id); }} onDragEnd={() => setDragging(null)}>
            <div className="pg-tool-title"><span style={{ color: details[id].color }}><Icon size={21} aria-hidden="true" /></span><strong>{details[id].name}</strong>{is3d && <Grip size={15} className="pg-grip" aria-hidden="true" />}</div>
            {item && <span className="pg-tool-availability">{item.statusLabel}</span>}
            <p>{details[id].description}</p>
            <div className="pg-tool-actions"><button onClick={() => enabled ? inspect(id) : enable(id)} aria-label={`${enabled ? "Open" : "Connect"} ${details[id].name}`}><span>{enabled ? "Open demo" : "Connect"}</span>{enabled ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}</button>
              {enabled && <button className="pg-remove" aria-label={`Disconnect ${details[id].name}`} onClick={() => { setSetup(current => ({ ...current, enabled: current.enabled.filter(module => module !== id) })); setMessage(`${details[id].name} disconnected.`); }}><Minus size={15} aria-hidden="true" /></button>}
            </div>
          </div>;
        })}</div>
        <p className="pg-concept-note">All eight products, plus Marketing. Availability labels describe the products. These previews use sample data.</p>
      </aside>

      <div className="pg-scene-column">
        <div className="pg-stage-heading"><div><span className="pg-eyebrow">Your business, connected</span><h2>{business.shop}</h2></div>{desktop && <div className="pg-view" role="group" aria-label="Scene view"><button aria-pressed={view === "3d"} onClick={() => setView("3d")}><Box size={15} aria-hidden="true" />3D</button><button aria-pressed={view === "2d"} onClick={() => setView("2d")}><LayoutGrid size={15} aria-hidden="true" />2D</button></div>}</div>
        <div className={`pg-stage ${dragging ? "pg-drop-active" : ""}`} onDragOver={event => { if (dragging) { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; } }} onDrop={event => {
          event.preventDefault();
          const id = event.dataTransfer.getData("application/vicinix-tool");
          if (is3d && modules.includes(id as Module)) setDrop({ id: id as Module, x: event.clientX, y: event.clientY, sequence: Date.now() });
          setDragging(null);
        }}>
          {is3d ? <SceneBoundary onUnavailable={() => { setView("2d"); setMessage("The 2D workspace is ready on this device."); }} fallback={flatScene}><Scene setup={setup} selected={selected} orderActive={!!order} stamps={stamps} paid={!!order?.paid} campaign={campaign} drop={drop} onDrop={(id, position) => { enable(id, position); setDrop(null); }} onInspect={inspect} onUnavailable={() => { setView("2d"); setMessage("The 2D workspace is ready on this device."); }} onMove={(id, position) => setSetup(current => ({ ...current, positions: { ...current.positions, [id]: position } }))} fallback={flatScene} /></SceneBoundary> : flatScene}
          {is3d && <div className="pg-stage-hint">Drag tools to arrange · Click a tool to try it</div>}
        </div>
        <div className="pg-flow" aria-label="Connected workflow">
          <span className="pg-flow-start"><ShoppingBag size={16} aria-hidden="true" />Customer</span>
          {modules.filter(id => setup.enabled.includes(id)).map(id => <button key={id} onClick={() => inspect(id)} className={selected === id ? "active" : ""}><span className="pg-flow-line" aria-hidden="true" />{details[id].name}</button>)}
          {!setup.enabled.length && <span className="pg-empty-flow">Connect a tool to start your workflow.</span>}
        </div>
        <p role="status" className="pg-status">{message}</p>
      </div>

      <section className="pg-inspector" ref={inspector} tabIndex={-1} aria-label="Interactive sample demo">
        <div className="pg-inspector-heading"><span className="pg-eyebrow">Interactive preview</span><h2>{product?.fullName || details[selected].name}</h2><span className="pg-sample">{product ? `${product.statusLabel} · sample preview` : "Sample data"}</span></div>
        {!setup.enabled.includes(selected) ? <div className="pg-disconnected"><Box size={34} /><h3>Make the connection.</h3><p>Connect {details[selected].name.toLowerCase()} to explore this part of your business.</p><button className="pg-primary" onClick={() => enable(selected)}>Connect {details[selected].name}</button></div> : <>
          {selected === "ordering" && <div className="pg-demo">
            <div className="pg-menu-item"><div className="pg-item-art" style={{ background: business.color }}>{setup.venue === "cafe" ? <Coffee size={40} /> : setup.venue === "bakery" ? <Croissant size={40} /> : <ShoppingBag size={40} />}</div><span className="pg-eyebrow">{business.source}</span><h3>{business.item}</h3><p>Made for a little everyday joy.</p><strong>₹{business.price}</strong></div>
            <div className="pg-quantity"><span>Quantity</span><div><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(value => value - 1)}><Minus size={16} /></button><output aria-label="Quantity">{quantity}</output><button aria-label="Increase quantity" disabled={quantity >= 9} onClick={() => setQuantity(value => value + 1)}><Plus size={16} /></button></div></div>
            <button className="pg-primary" onClick={placeOrder}>{order ? "Place another sample order" : "Place sample order"}</button>
            {order && <div className="pg-receipt"><span className="pg-eyebrow">{business.destination} queue</span><strong>{order.quantity} × {business.item}</strong><p>{order.ready ? "Ready for collection" : "Preparing your order"}</p>{!order.ready && <button className="pg-secondary" onClick={() => { setOrder({ ...order, ready: true }); setMessage("Order ready for collection."); }}>Mark ready</button>}{setup.enabled.includes("payments") && <button className="pg-text-button" onClick={() => inspect("payments")}>Open invoice</button>}</div>}
          </div>}
          {selected === "payments" && <div className="pg-demo"><div className="pg-receipt pg-invoice"><span className="pg-eyebrow">{business.shop}</span><h3>Sample invoice</h3><p>{order ? "INV-DEMO-001" : "Create an invoice to get started"}</p>{order && <><div className="pg-invoice-row"><span>{order.quantity} × {business.item}</span><strong>₹{business.price * order.quantity}</strong></div><div className="pg-invoice-total"><span>Total</span><strong>₹{business.price * order.quantity}</strong></div><span className={`pg-payment-status ${order.paid ? "paid" : ""}`}>{order.paid ? "Paid in simulation" : "Awaiting sample payment"}</span></>}</div>{!order ? <button className="pg-primary" onClick={() => { setOrder({ quantity: 1, ready: true, paid: false }); setMessage("Sample invoice created."); }}>Create sample invoice</button> : <button className="pg-primary" onClick={pay} disabled={order.paid}>{order.paid ? "Payment complete" : "Simulate payment"}</button>}<p className="pg-help">This preview uses sample amounts. No payment details are needed.</p>{order?.paid && setup.enabled.includes("loyalty") && <button className="pg-secondary" onClick={() => inspect("loyalty")}>View your stamp card</button>}</div>}
          {selected === "loyalty" && <div className="pg-demo"><div className="pg-stamp-card"><span className="pg-eyebrow">{business.shop}</span><h3>Your everyday, rewarded.</h3><div className="pg-stamps">{[0, 1, 2, 3, 4].map(index => <span key={index} className={index < stamps ? "filled" : ""}><Coffee size={22} aria-hidden="true" /></span>)}</div><p>{stamps} of 5 stamps · A treat on your fifth visit</p></div><button className="pg-primary" disabled={stamps === 5} onClick={() => { setStamps(value => Math.min(5, value + 1)); setMessage("Sample visit added to your stamp card."); }}>Add sample visit</button><button className="pg-secondary" disabled={stamps < 5} onClick={() => { setStamps(0); setRewards(value => value + 1); setMessage("Sample reward redeemed. Start your next card."); }}>Redeem sample reward</button><p className="pg-help">{rewards ? `${rewards} sample reward${rewards > 1 ? "s" : ""} redeemed. ` : ""}Connected payments add a stamp when you settle an invoice.</p><p className="pg-help">Vicinix Loyalty · planned concept</p></div>}
          {selected === "marketing" && <div className="pg-demo"><div className={`pg-campaign ${campaignStyle}`}><span>{business.shop}</span><div className="pg-campaign-art"><Coffee size={50} strokeWidth={1} /><i /><i /></div><h3>{business.offer}</h3><p>{campaign}</p><span className="pg-campaign-caption">Find your new favourite.</span></div><label className="pg-caption-label">Campaign caption<textarea maxLength={100} rows={3} value={campaign} onChange={event => setCampaign(event.target.value)} /></label><div className="pg-swatches" role="group" aria-label="Campaign palette">{["forest", "terracotta", "midnight"].map(style => <button key={style} className={style} aria-pressed={campaignStyle === style} aria-label={`${style} palette`} onClick={() => setCampaignStyle(style)}>{campaignStyle === style && <Check size={16} />}</button>)}</div><p className="pg-help">Edit the caption and palette to build your campaign preview.</p></div>}
        </>}
        {(["guard", "events", "tax", "erp", "college"] as Module[]).map(id => <div key={`${setup.venue}-${id}-${resetCount}`} hidden={selected !== id || !setup.enabled.includes(id)}><SoftwareDemo id={id} announce={setMessage} /></div>)}
        {product && <Link className="pg-product-link" href={`/products/${product.slug}`}>Explore {product.fullName}</Link>}
      </section>
    </div>
    <div className="pg-bottom"><p>Explore a possible setup with sample data. Your selections stay in this browser.</p><Link href="/enquire?goal=automation">Discuss a setup for your business</Link></div>
  </div>;
}
