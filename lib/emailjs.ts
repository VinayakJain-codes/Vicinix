import emailjs from "@emailjs/browser";

export const VICINIX_TARGET_EMAIL =
  process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || "vinayakjain2110@gmail.com";

export interface ContactEmailPayload {
  name: string;
  email: string;
  department: string;
  subject: string;
  message: string;
}

export interface EnquiryEmailPayload {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  scopeDescription: string;
  specDocLink?: string;
}

export interface EmailSendResult {
  success: boolean;
  simulated?: boolean;
  error?: string;
}

export function getEmailJSConfig() {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
  const contactTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    "";
  const enquireTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_CUSTOM_SOFTWARE_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_ENQUIRE_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    "";

  return {
    serviceId,
    publicKey,
    contactTemplateId,
    enquireTemplateId,
    isConfigured: Boolean(serviceId && publicKey && (contactTemplateId || enquireTemplateId)),
  };
}

/**
 * Sends a message from the Contact page form to vinayakjain2110@gmail.com via EmailJS.
 */
export async function sendContactEmail(
  data: ContactEmailPayload
): Promise<EmailSendResult> {
  const config = getEmailJSConfig();
  const templateId = config.contactTemplateId;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const formattedMessage = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "       VICINIX CONTACT FORM SUBMISSION  ",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `👤 Sender Name:  ${data.name}`,
    `📧 Sender Email: ${data.email}`,
    `🏢 Department:   ${data.department}`,
    `📌 Subject:      ${data.subject}`,
    `🕒 Submitted At: ${timestamp}`,
    "",
    "━━━━━━━━━━━━━━ MESSAGE ━━━━━━━━━━━━━━━━━",
    data.message,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  const templateParams: Record<string, unknown> = {
    to_email: VICINIX_TARGET_EMAIL,
    to: VICINIX_TARGET_EMAIL,
    recipient: VICINIX_TARGET_EMAIL,
    recipient_email: VICINIX_TARGET_EMAIL,
    to_name: "Vinayak Jain",

    // Full compiled summary so all fields are displayed even with default {{message}} template
    message: formattedMessage,
    body: formattedMessage,
    details: formattedMessage,

    // Individual field parameters for custom EmailJS templates
    from_name: data.name,
    name: data.name,
    from_email: data.email,
    email: data.email,
    reply_to: data.email,
    department: data.department,
    subject: `[Vicinix Contact] ${data.subject} - ${data.name}`,
    user_subject: data.subject,
    user_message: data.message,
    raw_message: data.message,
    form_type: "General Contact Form",
    submitted_at: timestamp,
  };

  // If EmailJS credentials are not yet configured in environment variables,
  // simulate transmission gracefully to avoid crashing during local preview/dev.
  if (!config.serviceId || !config.publicKey || !templateId) {
    console.warn(
      `[EmailJS] Missing environment variables for live sending.\n` +
      `Target recipient: ${VICINIX_TARGET_EMAIL}\n` +
      `To enable live delivery, define NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file.`
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, simulated: true };
  }

  try {
    const response = await emailjs.send(
      config.serviceId,
      templateId,
      templateParams,
      { publicKey: config.publicKey }
    );

    if (response.status === 200) {
      return { success: true, simulated: false };
    } else {
      return {
        success: false,
        error: `EmailJS responded with status ${response.status}: ${response.text}`,
      };
    }
  } catch (err: unknown) {
    console.error("[EmailJS] Failed to dispatch contact email:", err);
    let errorMessage = "Failed to deliver message via EmailJS.";
    if (typeof err === "object" && err !== null && "text" in err) {
      errorMessage = String((err as { text: unknown }).text);
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Sends a commission enquiry from the Personal Software page to vinayakjain2110@gmail.com via EmailJS.
 */
export async function sendEnquiryEmail(
  data: EnquiryEmailPayload
): Promise<EmailSendResult> {
  const config = getEmailJSConfig();
  const templateId = config.enquireTemplateId;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const formattedMessage = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "    BESPOKE SOFTWARE COMMISSION ENQUIRY ",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `👤 Client Name:       ${data.fullName}`,
    `📧 Work Email:        ${data.email}`,
    `🏢 Company:           ${data.company || "Not specified"}`,
    `📞 Phone / WhatsApp:  ${data.phone || "Not specified"}`,
    `💻 Project Type:      ${data.projectType}`,
    `💰 Budget Range:      ${data.budgetRange}`,
    `⏱️  Target Timeline:   ${data.timeline}`,
    `🔗 Spec / Figma Link: ${data.specDocLink || "None provided"}`,
    `🕒 Submitted At:      ${timestamp}`,
    "",
    "━━━━━━━━━━ SCOPE & REQUIREMENTS ━━━━━━━━",
    data.scopeDescription,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  const templateParams: Record<string, unknown> = {
    to_email: VICINIX_TARGET_EMAIL,
    to: VICINIX_TARGET_EMAIL,
    recipient: VICINIX_TARGET_EMAIL,
    recipient_email: VICINIX_TARGET_EMAIL,
    to_name: "Vinayak Jain",

    // Full compiled summary so all fields are displayed even with default {{message}} template
    message: formattedMessage,
    body: formattedMessage,
    details: formattedMessage,
    custom_software_details: formattedMessage,

    // Individual field parameters for custom EmailJS templates
    from_name: data.fullName,
    name: data.fullName,
    full_name: data.fullName,
    client_name: data.fullName,
    from_email: data.email,
    email: data.email,
    client_email: data.email,
    reply_to: data.email,
    company: data.company || "Individual / Not specified",
    organization: data.company || "Individual / Not specified",
    phone: data.phone || "Not specified",
    phone_number: data.phone || "Not specified",
    project_type: data.projectType,
    software_type: data.projectType,
    budget: data.budgetRange,
    budget_range: data.budgetRange,
    timeline: data.timeline,
    scope: data.scopeDescription,
    description: data.scopeDescription,
    scope_description: data.scopeDescription,
    user_message: data.scopeDescription,
    raw_message: data.scopeDescription,
    spec_doc_link: data.specDocLink || "None provided",
    spec_link: data.specDocLink || "None provided",
    subject: `[Vicinix Custom Software] ${data.projectType} from ${data.fullName}`,
    form_type: "Custom Software Engineering Commission",
    submitted_at: timestamp,
  };

  if (!config.serviceId || !config.publicKey || !templateId) {
    console.warn(
      `[EmailJS] Missing environment variables for live sending.\n` +
      `Target recipient: ${VICINIX_TARGET_EMAIL}\n` +
      `To enable live delivery, define NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file.`
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, simulated: true };
  }

  try {
    const response = await emailjs.send(
      config.serviceId,
      templateId,
      templateParams,
      { publicKey: config.publicKey }
    );

    if (response.status === 200) {
      return { success: true, simulated: false };
    } else {
      return {
        success: false,
        error: `EmailJS responded with status ${response.status}: ${response.text}`,
      };
    }
  } catch (err: unknown) {
    console.error("[EmailJS] Failed to dispatch enquiry email:", err);
    let errorMessage = "Failed to deliver enquiry via EmailJS.";
    if (typeof err === "object" && err !== null && "text" in err) {
      errorMessage = String((err as { text: unknown }).text);
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Direct alias for custom software commissions
 */
export const sendCustomSoftwareEmail = sendEnquiryEmail;

