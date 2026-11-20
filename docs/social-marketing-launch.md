# Marketing & Events launch notes

The service lives at `/social-media`, with a separate Marketing & Events homepage section after the software suite, desktop/mobile navigation links, and a footer link. The homepage hero offers two clear paths: Software & Technology and Marketing & Events. Scope covers social media, advertising, branding, event planning and coordination for businesses, brands and organisers, including restaurants and cafes. Pricing is quote-only. The partner is unnamed. Client testimonials, analytics and screenshots remain unpublished until approved material is supplied.

## Quote delivery

Per the owner's decision, leads are sent through the existing EmailJS browser SDK. There is no Supabase project or database storage. Requests are emailed to `vinayak@vicinix.co.in`. WhatsApp links use `+91 89236 78493`.

1. In EmailJS, create a dedicated template for social quotes. Set **To Email** to `vinayak@vicinix.co.in`, **Subject** to `{{subject}}` and the plain-text body to `{{message}}`. This recipient must be configured in the dashboard: passing it as a template parameter cannot override a hardcoded recipient in an existing template.
2. Configure `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` and `NEXT_PUBLIC_EMAILJS_SOCIAL_TEMPLATE_ID` in the deployment environment. If no social template is supplied, the contact/default template is used; verify its recipient first. No private EmailJS key belongs in a public variable.
3. Allow the production domain in EmailJS security settings. The form includes a honeypot and a 60-second SDK throttle; these are browser-side deterrents, not server-enforced rate limits. Enable EmailJS CAPTCHA if abuse requires stronger protection.
4. Redeploy after environment changes. Submit a real test with the owner's consent, verify inbox receipt, and check that all fields appear. The form never simulates success when configuration is absent or delivery fails. A successful SDK response means EmailJS accepted the message, not confirmed inbox receipt.

## Analytics

`lib/social-analytics.ts` pushes events to `window.dataLayer` and emits `vicinix:analytics` custom events. No contact details or form contents are included.

| Event | Trigger | Placement |
| --- | --- | --- |
| `social_quote_click` | Quote CTA clicked | `homepage_teaser`, `social_hero`, `website_bundle` |
| `social_quote_submit` | EmailJS accepts submission | `quote_form` |
| `social_whatsapp_click` | WhatsApp link clicked | `quote_intro`, `quote_form` |

No analytics provider is installed by this change. Connect these events to your GA/GTM configuration, respecting your site's consent settings, to collect them remotely. Use page views to measure service-page traffic.

## Content still needed

- Approved social analytics numbers with dates, measurement periods and screenshots.
- Approved testimonials with names and business attribution. `Testimonial` in `Cards.tsx` is ready to use once permission exists.
- Actual project screenshots. Current proof cards link to the existing Vicinix Events product and Menu/Invoice demos and use product icons, not fabricated screenshots or client work.

## Before launch

- Verify EmailJS delivery and analytics collection on the deployed environment.
- Confirm the internal pricing sheet, partner agreement, scope limits, ad-spend separation and pilot-client plan.
- Keep contract lengths and content-shoot terms specific in each proposal; the FAQs do not invent a fixed policy.
- Publish through the existing site's deployment process. No deployment, social post or client message is performed by this code change.

EmailJS SDK option reference: https://www.emailjs.com/docs/sdk/options/
