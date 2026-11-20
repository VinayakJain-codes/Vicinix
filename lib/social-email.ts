import emailjs from "@emailjs/browser";
import { getEmailJSConfig } from "@/lib/emailjs";
import { type SocialLead, validateSocialLead } from "@/lib/social-marketing";

export async function sendSocialQuote(lead: SocialLead) {
  const error = validateSocialLead(lead);
  if (error) return { success: false, error };
  const config = getEmailJSConfig();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_SOCIAL_TEMPLATE_ID || config.contactTemplateId;
  if (!config.serviceId || !config.publicKey || !templateId) {
    return { success: false, error: "The quote form is temporarily unavailable. Please contact us on WhatsApp or email vinayak@vicinix.co.in." };
  }
  const message = [
    "MARKETING & EVENTS QUOTE REQUEST",
    `Name: ${lead.name}`, `Business: ${lead.businessName}`, `Phone / WhatsApp: ${lead.phone}`,
    `Instagram: ${lead.instagram || "Not provided"}`, `Budget: ${lead.budget || "To discuss"}`,
    "", "What they need:", lead.needs,
    "", `Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  ].join("\n");
  try {
    const response = await emailjs.send(config.serviceId, templateId, {
      to_email: "vinayak@vicinix.co.in", to: "vinayak@vicinix.co.in", recipient: "vinayak@vicinix.co.in",
      recipient_email: "vinayak@vicinix.co.in", to_name: "Vinayak Jain", from_name: lead.name, name: lead.name,
      business_name: lead.businessName, company: lead.businessName, phone: lead.phone, instagram: lead.instagram,
      budget_range: lead.budget || "To discuss", subject: `Marketing & Events quote — ${lead.businessName}`,
      message, body: message, details: message, form_type: "Marketing & Events Quote",
    }, { publicKey: config.publicKey, limitRate: { id: "vicinix-social-quote", throttle: 60_000 } });
    return response.status === 200 ? { success: true } : { success: false, error: "We could not send your request. Please try WhatsApp instead." };
  } catch (error: unknown) {
    const status = typeof error === "object" && error !== null && "status" in error ? error.status : null;
    return { success: false, error: status === 429 ? "Please wait a minute before sending another request." : "We could not send your request. Your details are still here; please try again or use WhatsApp." };
  }
}
