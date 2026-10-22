# Additive CRM Migration Blueprint — not executable SQL

Do not apply before schema inventory, backup verification, and explicit approval.

## Proposed entities
- `client_profiles`: user_id (auth.users PK/FK), display_name, phone, timestamps.
- `organizations`: id UUID PK, legal_name, country, created_by, timestamps.
- `organization_members`: org_id, user_id, role, invitation_state; unique(org_id,user_id).
- `client_request_ownership`: reference FK to existing request (if reference unique), user_id nullable, org_id nullable, verified_at, linked_by; enforce exactly one ownership target per row.
- `crm_audit_logs`: actor_id, action, resource type/id, timestamp; restricted read access.
- `crm_outbox`: durable pending email/notification jobs, retry count, deduplication key.

Keep `client_requests` and `request_history` intact. Avoid changing old request IDs.
Prefer separate ownership table until the real schema is known.

## Access-control test matrix
- Anonymous: create enquiry only; cannot enumerate requests or clients.
- Individual A: own requests only; no access to individual B.
- Org member A: org requests within membership permissions; no access to org B.
- Org admin: invite/remove members; cannot access other organizations.
- Operator: approved operational scope, MFA, audited actions.
- Contractor: explicit assigned case and minimum data only.
- Service role: server-side only, never shipped to browser.

## Transition
1. Preserve current contact route and request reference.
2. Store enquiry, identity invitation intent, and notification in a reliable transactional/outbox workflow.
3. Send verification link after successful request persistence.
4. Link existing enquiries only after verified identity and ownership checks.
5. Offer legacy reference/email status lookup during transition with rate limits and non-sensitive response; deprecate after migration.
6. Keep shared operator-key access only during a controlled transition; remove after role-based operator access passes acceptance tests.
7. Do not run seed jobs on routine page loads.

## Rollback
Keep existing tables and endpoints until acceptance. New schema is additive. Rollback switches off new feature flag; do not drop data as part of emergency rollback.
