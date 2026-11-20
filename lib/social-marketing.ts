export const SOCIAL_WHATSAPP_URL = "https://wa.me/918923678493?text=" + encodeURIComponent("Hi Vicinix, I'd like a marketing or event management quote for my business.");

export const SOCIAL_SERVICES = [
  { title: "Content worth stopping for", description: "Reels, posts and stories that bring your brand, products and people to life. A content plan built around your audience, offers and goals.", icon: "content" },
  { title: "A page that stays active", description: "Planned posting, thoughtful captions and day-to-day page management. Stay visible while your team focuses on the business.", icon: "posting" },
  { title: "Campaigns that reach your audience", description: "Instagram and Meta campaigns to reach the people who matter to your business or event. Creative, targeting and optimisation aligned with your goals.", icon: "ads" },
  { title: "Branding with a clear message", description: "Campaign concepts, brand messaging and visual creatives that feel consistent across your channels. Deliverables are agreed around your brand and campaign needs.", icon: "branding" },
  { title: "Events, planned and promoted", description: "Support for launches, business events and community experiences, from promotion and registrations to planning and coordination. On-site work and vendors are scoped in your quote.", icon: "events" },
  { title: "Know what is working", description: "A monthly report covering reach, engagement and trackable enquiries. Clear next steps for the following month, without the jargon.", icon: "reporting" },
] as const;

export const SOCIAL_FAQS = [
  { question: "What does event management include?", answer: "We can scope event promotion, registration support, planning and coordination. Venue sourcing, vendor bookings, staffing, production and on-site execution are included only when explicitly agreed in your quote. Third-party costs are quoted separately." },
  { question: "How does pricing work?", answer: "Every proposal is tailored to your business, brand or event. We discuss your goals, platforms, content needs and campaign or event scope, then send a written quote. There are no public package prices." },
  { question: "Is the advertising budget included?", answer: "Ad spend is separate from the service fee and agreed before campaigns start. Your quote will distinguish content and management work from the budget paid to Meta." },
  { question: "How long is the contract?", answer: "The engagement length, review dates and cancellation terms are agreed in your written proposal before work starts. Tell us if you want to begin with a pilot." },
  { question: "Who creates the content?", answer: "We plan and create the agreed reels, posts and stories. We confirm whether you will supply photos and footage or need a shoot before quoting; shoot arrangements and travel are scoped separately." },
  { question: "How do you measure results?", answer: "We agree on goals at the start, then review reach, engagement, profile activity and trackable enquiries each month. Bookings and walk-ins depend on several factors, so we do not promise a fixed number of customers." },
  { question: "What do you need from us?", answer: "Your business or event details, audience, brand assets, offers and a person who can approve content. We also arrange appropriate page access; you keep ownership of your accounts." },
  { question: "Can you build a website or event registration system too?", answer: "Yes. We can scope a business website, campaign landing page or event registration experience alongside marketing. For restaurants and cafes, we can also include Vicinix Menu. Each deliverable is agreed in the proposal." },
  { question: "Who do you work with?", answer: "We welcome restaurants, cafes, shops, service businesses, brands and event organisers in Meerut and beyond. Share your location and requirements so we can confirm remote support and any on-site work." },
];

export type SocialLead = { name: string; businessName: string; phone: string; instagram: string; needs: string; budget: string };

export function validateSocialLead(lead: SocialLead): string | null {
  if (lead.name.trim().length < 2 || lead.name.trim().length > 100) return "Please enter your name (2–100 characters).";
  if (lead.businessName.trim().length < 2 || lead.businessName.trim().length > 160) return "Please enter your business name (2–160 characters).";
  const digits = lead.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(lead.phone) || digits.length < 10 || digits.length > 15) return "Please enter a valid phone or WhatsApp number, including your country code if outside India.";
  if (lead.instagram && !/^@?[a-zA-Z0-9._]{1,30}$/.test(lead.instagram)) return "Enter an Instagram handle, such as @yourcafe, or leave it blank.";
  if (lead.needs.trim().length < 10 || lead.needs.trim().length > 2000) return "Tell us what you need in 10–2,000 characters.";
  if (lead.budget.length > 100) return "Please keep the budget range within 100 characters.";
  return null;
}
