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

## Confirmed from production read-only SQL (2026-10-22)
- Nine public tables: assignment_documents, assignment_team, assignments, client_requests, contractor_dispatches, contractors, operation_timeline, request_history, team_members.
- All nine have RLS enabled; zero public policies returned by pg_policies.
- Seven FKs: assignment_documents.reference, assignment_team.reference, assignments.reference, contractor_dispatches.reference, operation_timeline.reference -> client_requests.reference (ON DELETE CASCADE); assignment_team.team_member_id -> team_members.id (ON DELETE CASCADE); contractor_dispatches.contractor_id -> contractors.id (ON DELETE CASCADE).
- client_requests.reference has a unique constraint; assignments.reference also unique.
- Existing table definitions were supplied by user from information_schema; no customer data inspected.
- Security note: RLS enabled with no policies denies ordinary API roles by default; service_role bypasses RLS. Do not expose service_role or introduce permissive catch-all policies.
- Data integrity note: avoid deletion of client_requests in migration because of cascading child deletion. Additive ownership links only.
- Next gates: inspect indexes/triggers, Auth configuration, storage bucket policies, backup/restore, then create staging-only executable migration.

## Production index inventory (read-only, user-provided)
- 29 indexes across 9 public tables.
- client_requests: PK(id), UNIQUE(reference), lookup btree(reference,email). No standalone email index.
- request_history and operation_timeline: btree(reference, timestamp DESC).
- assignment_documents: btree(reference,created_at DESC), UNIQUE(storage_path).
- contractor_dispatches: btree(contractor_id), btree(reference,created_at DESC), btree(status), UNIQUE(token_hash).
- contractors: company_name and email indexes plus UNIQUE(lower(trim(email))).
- assignments: UNIQUE(reference) and an additional btree(reference), possibly redundant; do not drop without workload analysis.
- New ownership tables should index user_id and organization_id separately. Do not rely on existing (reference,email) index for listing a user's requests.
- Next read-only checks: triggers (including auth schema), relevant auth settings, storage buckets/policies, and backup/restore readiness. Do not copy sensitive trigger function bodies or secrets into tickets.
