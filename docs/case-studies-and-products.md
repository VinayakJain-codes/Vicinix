# Case studies and product availability

## Current product availability

- **Events: Live client deployment.** Confirmed by the owner in this conversation. A demonstration can be requested; client access remains private.
- **Menu and Invoice: Interactive demo.** Local sample applications are available; these do not establish a live client deployment.
- **Guard: Demo on request.** Live deployment has not been confirmed for publication.
- **Tax: In development.** No release date is promised by the availability badge.
- **ERP and College ERP: Planned.** Their pages describe proposed scope.
- **Loyalty: Planned, with a concept preview.** Sample visits and reward redemption demonstrate the journey. State resets on refresh. No customer accounts, persisted rewards, authorised staff tools, purchases or Menu integration are implemented by this preview.

`lib/catalog.ts` is the source of truth. `ProductStatusBadge` is shared by the navigation, product pages, category cards and homepage. Update the catalog when availability changes; do not infer live deployments from a demo or a product description.

## Publishing case studies

`lib/case-studies.ts` holds structured case-study content, with a publication flag. Add an approved account describing the problem, delivered work and results. `CaseStudies` renders only approved entries on the homepage and marketing page; the event account also appears on the Events product page.

The current event account uses owner-supplied approximate figures: about 800 tickets sold and 600 attendees. The event/client name is withheld. These are not independently audited and no accuracy percentage or conversion rate is implied. Obtain reports, screenshots, event date and naming permission before adding those details. Do not present these approximate figures as precise verified analytics.

For each future account, retain the evidence basis, measurement period, permission to publish, any rounding or limitations, and the client-approved attribution. Keep unpublished entries marked `approved: false` until that material is ready.

## Goal chooser

- Get more enquiries: marketing services.
- Manage an event: Events product and a link to marketing/event coordination.
- Build a website: enquiry form with website type preselected.
- Automate my business: enquiry form with internal operations type preselected.

The Loyalty pilot link also preselects a relevant enquiry type. Enquiries use the site's existing EmailJS flow.
