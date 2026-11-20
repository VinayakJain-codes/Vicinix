export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  problem: string;
  delivered: string;
  results: { value: string; label: string }[];
  evidence: string;
  productHref: string;
  approved: boolean;
};

// Publish only approved accounts. Record the evidence basis rather than implying an independent audit.
export const CASE_STUDIES: CaseStudy[] = [{
  slug: "event-ticketing",
  title: "Ticketing for a real event",
  client: "Event organiser · client name withheld",
  problem: "The organiser needed software to manage ticketing and attendance for an event.",
  delivered: "Vicinix provided its event management software for the live event. A demonstration can be arranged on request.",
  results: [{ value: "~800", label: "Tickets sold" }, { value: "~600", label: "People attended" }],
  evidence: "Approximate figures supplied by Vicinix from its client engagement. These totals have not been independently audited; no accuracy percentage is claimed.",
  productHref: "/products/vicinix-events",
  approved: true,
}];

export const PUBLISHED_CASE_STUDIES = CASE_STUDIES.filter(study => study.approved);
