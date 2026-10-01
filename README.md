# Kajiado Land Verification API

Foundational backend architecture: TypeScript, Fastify, PostgreSQL, and PostGIS. Keep official land records separate from user-submitted allegations, and treat verification responses as evidence-backed summaries rather than legal determinations.

## Initial layout

```text
apps/
  api/
    src/
      app.ts
      server.ts
      config/                 # Environment parsing and service configuration
      common/                 # Shared errors, auth, validation, localization
      modules/
        verification/         # Routes, controller, service, repository, DTOs
        parcels/              # Parcel lookup and boundary access
        subdivisions/         # County approval records
        caveats/              # Official caveat and dispute records
        reports/              # Public fraud reports and moderation
        payments/             # Daraja STK Push and callback processing
        users/                # Accounts and access policy
      infrastructure/
        database/             # PostgreSQL pool and transaction helpers
        daraja/               # Safaricom Daraja HTTP client
      i18n/                   # English and Swahili message catalogs
    db/
      migrations/             # Ordered, forward-only SQL migrations
      seeds/                   # Non-production reference data only
    test/
      integration/
      unit/
```

Within each feature module, routes define the HTTP contract, controllers translate HTTP input/output, services own use cases and policy, and repositories own SQL access. Keep database access out of route handlers. Use parameterized SQL and a migration runner; the schema in `apps/api/db/migrations/0001_initial.sql` is the starting migration.

## Schema contents

- `users` stores account/contact metadata and role/language preferences; it intentionally has no land-owner profile.
- `land_parcels` stores searchable plot/title references, registry provenance, group-ranch restriction markers, and optional parcel boundaries.
- `subdivisions` stores application and approval state; `parcel_subdivision_links` ties approved subdivision children back to the parent parcel.
- `caveats_disputes` stores sourced official notices. `fraud_reports` is separate and represents allegations that require moderation, not authoritative findings.
- `payments` records Daraja correlation and reconciliation state. `verification_logs` records lookup outcomes and sources checked without duplicating owner data.

## Security baseline

- Keep owner names, identity numbers, contact details, title scans, and unredacted dispute evidence out of public parcel responses. Use an explicit public DTO/view allowlist instead of serializing database rows.
- Run the API with a restricted database role. Use separate migration/admin credentials; grant public-facing queries only the columns or views they need. Keep moderation notes, raw evidence keys, and contact data reviewer-only.
- Hash passwords with Argon2id. Encrypt retained phone numbers and sensitive evidence at the application/storage layer with keys held in a managed secret store; never log credentials, access tokens, full callback payloads, or unredacted personal data.
- Require authorization for reviewer/admin actions, validate and rate-limit all inputs, protect report submission against abuse, and use parameterized queries. Serve evidence from private object storage using short-lived, scoped links.
- Treat M-Pesa callbacks as untrusted input: correlate the checkout and merchant request IDs, validate amount/currency and transaction result, enforce idempotency, and reconcile uncertain outcomes against Daraja. Store Daraja secrets outside the repository.
- Define retention and deletion rules for reports, payment metadata, and verification logs; document the lawful basis and access process for personal data under applicable Kenyan data-protection requirements.

## Data and deployment notes

- Requires PostgreSQL 15+ and PostGIS 3.x. Apply migrations with a database role permitted to install/use PostGIS, then run the API with a least-privilege application role.
- Plot and title references are indexed for lookup but deliberately not unique, so duplicate references remain detectable. Do not infer title legitimacy from a matching string alone.
- Parcel boundaries use WGS 84 (`SRID 4326`). Validate survey coordinate provenance and datum before comparing a submitted physical boundary.
- Import only records obtained from an authorized county/land registry source. Persist each source and its checked-at time; an absent record is not proof of fraud.
- Do not return owner identity or raw dispute evidence from public verification endpoints. Keep payment credentials and encryption keys outside the database and source control.
- Daraja callbacks should be correlated by `CheckoutRequestID`, processed idempotently, and checked against the expected amount and transaction result. The callback URL is not an authentication mechanism; do not trust callback fields without correlation and reconciliation.

## Local database

Create a PostgreSQL database with PostGIS available, then apply migrations using the migration tool selected by the API package. Never use production owner records as seed data.

## Run the API

From `apps/api`, run `npm install` and `npm run dev`. The starter server listens on `http://127.0.0.1:3000`; `GET /health` is a liveness check and does not imply database connectivity. Set `PORT` or `HOST` to override the defaults. Verification endpoints will be added with the database-backed modules.