import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import Playground from "./Playground";
import "./playground.css";

export const metadata: Metadata = {
  title: "Vicinix Business Playground",
  description: "Explore all eight Vicinix software products and marketing in an interactive 3D business playground with sample workflows.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return <><Navbar /><main className="pg">
    <div className="pg-heading"><h1>Vicinix Business Playground</h1>
      <p>Build a miniature business. Connect software from the full Vicinix suite and explore how it could work together.</p>
    </div><Playground />
  </main><Footer /></>;
}
