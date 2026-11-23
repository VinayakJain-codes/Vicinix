# Forms and mobile launch audit

Date: 20 November 2026. Scope: local repository, browser viewport testing and production compilation. These changes have not been deployed.

## Delivery fixes

- Contact and custom software forms no longer simulate a successful send when the service, public key or selected template is missing. They return an actionable error and direct email fallback.
- Success requires an EmailJS SDK response with status 200. The confirmation describes submission for email delivery, rather than claiming the request was stored in a database.
- Provider failures, network failures and rate limits return readable errors. Raw provider errors and submitted contact details are not logged by the delivery helper.
- Both forms reject whitespace-only required fields, prevent duplicate in-flight submission, recover their loading state after exceptions, and retain the draft on failure.
- Feedback receives focus so visitors can find errors above a long form. Error colors work with the site's theme variables.
- Contact and enquiry inputs have associated labels, field names, applicable autofill hints and 16px input text. The enquiry submit label is shorter for narrow screens.
- Contact and enquiry share a 60-second browser SDK throttle. This is a browser-side deterrent, not server-enforced abuse protection.

## Mobile findings and fixes

| Finding | Resolution |
| --- | --- |
| Marketing hero content and quote CTA were clipped at 320px, even though the page had no horizontal scrollbar. | Constrain the grid to a shrinking single column and stack the decorative card content on mobile. Rechecked at 320 and 430px. |
| Demos and enquiry links followed the complete product catalog in mobile navigation. | Move direct links above solutions and products. |
| Mobile flyout relied on fixed positioning inside a header that can use backdrop filters. | Use a full-height dynamic-viewport header with a separately scrolling flex child. |
| Background scrolling, menu state and keyboard dismissal needed handling. | Lock body scrolling while open; restore on close/unmount; close on Escape, navigation clicks and desktop breakpoint transitions. Escape restores focus to the toggle. |
| Menu and theme controls had small tap areas. | Set minimum 44px targets and expose the navigation toggle's expanded state and controlled region. Restore a visible theme-toggle focus outline. |
| Invoice demo search used 12px text and no accessible name. | Use 16px text, add an accessible name and enlarge status-filter targets to 44px. Expose selected filter state. |
| Homepage hero sentences ran together when the desktop line break was hidden. | Add an explicit separating space. |

## Verification

- Twelve isolated regression tests passed. Run `npm run test:forms`. Tests use the real TypeScript modules with a fake EmailJS SDK; they never send messages. Coverage includes each form's missing configuration, provider acceptance/failure, network errors, rate limits, dedicated template selection, reply/contact parameters and whitespace validation.
- Final `npm run build` passed, including TypeScript and generation of 28 static pages. The build needed network access for the existing Google Fonts integration; the initial restricted-network attempt failed to fetch fonts.
- `git diff --check` passed.
- Browser viewport matrix: 320, 390 and 430px wide, with an 844px height for the route matrix. Checked `/`, `/demos`, `/enquire?goal=website`, `/contact?product=vicinix-guard`, `/social-media`, `/products/vicinix-events` and `/products/vicinix-loyalty`.
- Menu and Invoice demo entry pages were also checked at 320 and 430px. Invoice filters and the directory table intentionally scroll within their own horizontal containers; they do not widen the page.
- Browser form checks confirmed that contact/enquiry validation failures preserve the draft, focus the error, release the busy state and leave retry available. Marketing quote validation rejects an invalid phone number and focuses its feedback.
- Verified homepage website-goal navigation selects Business Website and prefills the scope. Verified Guard product preselection on the contact form.
- Verified mobile menu dismissal with Escape, restored focus/scrolling and cleanup when resizing to the 1280px desktop breakpoint.
- No failed completed images were detected in the main route matrix. Lazy images outside the viewed area are not covered by this observation.

## Remaining launch checks

1. Send an owner-authorized real submission through each deployed form and confirm inbox receipt, complete field contents and reply routing. SDK acceptance alone cannot confirm inbox delivery. No live emails were sent during this audit.
2. Verify production EmailJS templates, recipient addresses and allowed production domains in its dashboard. Contact/enquiry retain the existing configured recipient; marketing quotes retain `vinayak@vicinix.co.in`. Rebuild/redeploy after changing public environment variables because Next.js embeds them in the client bundle at build time.
3. Check actual iOS Safari and Android Chrome with the on-screen keyboard, autofill and device safe areas. This audit used browser viewport overrides rather than physical devices.
4. Run a deployed performance audit with mobile network/CPU throttling. No Lighthouse score, Core Web Vitals measurement, exhaustive accessibility audit, payment test or complete demo workflow certification is claimed here.

The existing untracked `output/` and `tmp/` assets were left untouched.
