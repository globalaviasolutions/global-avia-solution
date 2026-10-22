# Security Solutions Africa — CRM Phase 1 Audit (draft)

Scope: business organizations and individual clients. No production migration is authorized.

## Verified from current source
- `POST /api/contact` generates ASS-YYYYMMDD-HEX references and inserts into `client_requests` using a server-side Supabase service-role key.
- If database write fails, contact endpoint can still send an email to operations; this creates an email-only request that needs reconciliation.
- `POST /api/client-portal/status` authenticates only by reference plus email. This must not authorize access to a full account.
- `GET/PATCH /api/operations-dashboard` uses a shared `x-operations-key`, and reads up to 250 requests and 1,000 history rows.
- The contractor seeding helper can insert contractors during runtime; move seeding to a controlled administrative workflow.
- Vercel production has environment variable names for Supabase and Resend; no Supabase SQL metadata was read.

## Blocking unknowns before executable migrations
- Actual table definitions, primary keys, foreign keys, constraints, indexes, triggers, grants, and RLS policies.
- Existing Auth configuration and email provider settings.
- Backups/PITR availability, data volume, duplicate email patterns, and pending email-only enquiries.
- Which assignment and contractor tables exist in the live schema.
- Data retention requirements and processing geography.

## Security model
- Each person has one authenticated identity (`auth.users.id`) after verifying email.
- Organizations have members with scoped roles. Membership must be invitation/approval based, never inferred from email domain.
- Private clients have no mandatory organization.
- Request ownership is a verified user or organization membership; legacy email matching must not grant ownership.
- Admin/operator access uses individual identities and MFA, not shared credentials.
- Contractors only see explicitly assigned minimum data, after operator approval.
- Supabase service-role keys remain server-only and must never be exposed in client bundles.

## Release gates
1. Read-only inventory and tested backup/restore.
2. Stage-only additive migrations and rollback rehearsal.
3. RLS tests with two organizations, two individuals, and contractor role.
4. Auth email verification, session, and invitation tests.
5. Historical request linking only after email ownership verification; manual review for ambiguity.
6. Shadow-write/reconciliation for contact submissions and notification outbox.
7. Feature flag enablement in preview, monitored canary rollout, explicit production approval.

No production SQL should be executed from this document.
