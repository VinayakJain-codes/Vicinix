import Image from "next/image";

const screenshots = [
  { src: "/images/events/ticket-designer.png", width: 1535, height: 707, title: "Branded ticket designer", description: "The organiser interface with design controls and a QR ticket preview.", alt: "Vicinix Events ticket designer showing branding controls and a sample QR ticket for Santa’s Afterhours." },
  { src: "/images/events/event-details.png", width: 967, height: 630, title: "Public event page", description: "Event details, venue information and directions in one place.", alt: "Santa’s Afterhours public event page showing the organiser, date, time and New Delhi venue." },
  { src: "/images/events/ticket-selection.png", width: 1098, height: 696, title: "Ticket selection", description: "Multiple ticket categories with prices and remaining availability.", alt: "Event ticket selection showing Early Bird, VIP Entry and Couple VIP ticket categories." },
];

export default function EventScreenshots() {
  return <section id="event-screenshots" aria-labelledby="event-screenshots-title" className="mb-16 scroll-mt-28">
    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Vicinix Events · software screenshots</p>
    <h2 id="event-screenshots-title" className="font-serif text-3xl font-bold sm:text-4xl">From the event page to the ticket.</h2>
    <p className="mb-8 mt-4 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">Explore the public event page, ticket selection and organiser tools. These screenshots show the interface; ticket prices and availability are examples captured at that moment.</p>
    <div className="grid gap-6 md:grid-cols-2">{screenshots.map((shot, index) => <figure key={shot.src} className={`overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] ${index === 0 ? "md:col-span-2" : ""}`}>
      <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${shot.title}`} className="block bg-[#1e1e1e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-primary)]">
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={index === 0 ? "(max-width: 1280px) 100vw, 1216px" : "(max-width: 768px) 100vw, 600px"} className="h-auto w-full" />
      </a>
      <figcaption className="p-5 sm:p-6"><h3 className="text-xl font-semibold">{shot.title}</h3><p className="mt-2 leading-relaxed text-[var(--text-muted)]">{shot.description}</p><a href={shot.src} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--gold-primary)] underline underline-offset-4">View full-size {shot.title.toLowerCase()}</a></figcaption>
    </figure>)}</div>
  </section>;
}
