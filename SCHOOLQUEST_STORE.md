# SchoolQuest Store — rollout and safeguarding

## Current scope (first commit)

- Authenticated catalogue page at `/dashboard/store`, linked from desktop and mobile navigation.
- Actual stock/price records (none seeded); tablets, school T-shirts and **printed** textbooks.
- Site Manager product creation at `/dashboard/admin/store`, draft/published states and verified publisher authorization requirement.
- Server-priced cart and order-request submission. A request is **not** payment, sale or stock reservation. Admin can confirm or cancel an unfulfilled request.
- Tablet bundle flag for a **proposed** complimentary 30-day SchoolQuest Pro entitlement; there is **no redemption, auto grant, renewal or payment collection** from a requested order.
- Database schema includes future `StoreBundleGrant` for auditable, once-per-order grant after verified payment and fulfilment. This model is intentionally not wired into Pro until verification and store policy review.

## Operational launch gates

1. Back up the production database and apply reviewed Prisma migrations. Confirm existing subscriptions still work.
2. Enter real negotiated product prices, actual inventory, and warranty/return details. Do not populate fictional publisher authorizations.
3. Obtain and retain publisher distribution agreements, edition, ISBN, rights scope, stock and territory for printed books. **Digital books need separate electronic rights and app-store billing review**; do not list digital copies in this physical store.
4. Establish seller of record, tax treatment, consumer protection terms, child-safe guardian purchasing, delivery area/fees, contacts, cancellations and refunds.
5. Build verified **physical product payment** checkout using approved Yo Payments methods, Apple Pay or Google Pay only through approved processors. Do not use StoreKit/Play Billing for stand-alone physical goods. Never accept an order request as a completed payment.
6. Add atomic inventory reservation, fulfilment state, verified payment reference, refunds/returns and reconciliation before money collection.
7. Tablet bundle: decide whether the trial is a **marketing promotion provided after independently verified physical purchase**, versus a digital entitlement bundled into in-app purchase; validate Apple/Google rules in each storefront. A tablet customer must not get an auto-renewing paid subscription. Grant at most 30 days with explicit terms, account matching, verification, duplicate prevention and audit log. Avoid a redeemable code that bypasses store billing policies.
8. Confirm access to any paid digital learning within iOS/Android apps complies with App Store Review Guideline 3.1 and Google Play payments rules; keep native subscription purchase available where required.
9. Create a verified activation and fulfilment service only after payment/ownership controls are reviewed. Do not permit arbitrary staff to toggle free Pro without evidence.
10. Validate permissions and data access for orders containing purchaser contact/location details; avoid requiring minors to disclose home addresses.

## Test flows

- No published products → honest empty state.
- Product cannot publish with invalid price or no stock for customer availability.
- Printed book cannot publish without verified permission and publisher details.
- Prices and quantities are enforced server-side; cart values cannot override the total.
- Student cannot access Site Manager inventory and orders.
- Failed order submission does not change stock or grant Pro.
- Bundle flag does not auto-grant Pro on order request or admin confirmation.
- Another user's order cannot be read or modified.
- Explicitly confirm checkout not yet enabled before production release.

Official policies to verify before launch:
- Apple: https://developer.apple.com/app-store/review/guidelines/
- Google: https://support.google.com/googleplay/android-developer/answer/9858738
