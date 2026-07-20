# Admin Implementation Phases

## Phase 0 — Decisions and canonical models

- Approve terminology, especially `collection` versus legacy `pickup`.
- Select canonical product, branch, order, customer and checkout schemas.
- Define staff roles and branch scope.
- Agree screen inventory, route structure and mock-service boundaries.
- Define sanitized seed policy.

**Exit:** documented types, status transitions, permission matrix and data migration map.

## Phase 1 — Application shell and shared foundations

- Admin layout, navigation, top bar and responsive patterns
- Brand/design tokens
- Table, card, form, dialog, drawer, status and feedback primitives
- Mock session/permissions
- Storage, latency, pagination, error and audit mock services

**Exit:** accessible shell and shared states without business modules.

## Phase 2 — Catalogue

- Categories
- Products
- Media references
- Option groups, modifiers and assignments
- Branch availability/price overrides
- Catalogue preview and archive flows

**Exit:** canonical mock menu can represent the active customer catalogue without importing customer code.

## Phase 3 — Locations and fulfilment

- Branches
- Opening hours/exceptions/status overrides
- Delivery and Collection settings
- Fees, minimums and estimates
- Delivery-zone demo editor and coverage tester

**Exit:** branch-scoped menu/service preview works with explicit static-demo labelling.

## Phase 4 — Orders and customers

- Dashboard operational widgets
- Order queue/board/detail/status/cancellation
- Receipt/tracking preview
- Customer profiles, addresses, favourites and history

**Exit:** end-to-end mock operational flow with audited transitions.

## Phase 5 — Finance and promotions

- Payments
- Refund requests and approvals
- Promotions/vouchers
- Reconciliation and financial permissions

**Exit:** safe masked mock finance workflows and separation of duties.

## Phase 6 — Content and engagement

- Page/section CMS
- Blog, FAQ, legal and global content
- Banners and asset library
- Notifications/templates/campaign logs
- Contact, newsletter and franchise submissions

**Exit:** all customer-facing content types have draft/preview/publish workflows.

## Phase 7 — AI Ordering Assistant management

- Behavior and quick-action settings
- Intent/phrase and recommendation rules
- Response templates, exclusions and disclaimers
- Test console, versions, publish/rollback and analytics

**Exit:** safe deterministic configuration can be tested without creating orders.

## Phase 8 — Reports, staff and governance

- Reports/exports
- Staff
- Roles and permissions
- Settings
- Audit logs

**Exit:** governance and operational oversight are complete.

## Phase 9 — Hardening and handoff

- Responsive, accessibility and keyboard review
- Empty/loading/error/offline and large-data states
- Permission and destructive-action testing
- Seed reset/export verification
- Lint and production build
- Future API adapter contract tests and handoff documentation

## Recommended delivery order

Start with catalogue and branches because all orders, content, recommendations and reports depend on stable product/location IDs. Do not build finance or assistant publishing before roles, audit events and confirmation patterns exist.

## Key risks

- Conflicting customer models may cause incorrect seed migration.
- Static prices/statuses can be mistaken for live business data.
- `localStorage` cannot provide real security, concurrency or multi-user behavior.
- A large 95-screen scope needs phased navigation and reusable primitives.
- Production payment/refund/order behavior cannot be faithfully simulated without backend contracts.
- Content editing risks coupling to current JSX unless normalized section schemas are agreed.
- Assistant configuration can become unsafe if staff can bypass validation or confirmation.

## Unresolved questions

1. Which customer catalogue and branch source will the production backend adopt?
2. Which order statuses and transition rules are authoritative?
3. Are prices and availability branch-specific?
4. What delivery-zone representation is required?
5. Which payment, refund and settlement provider will be used?
6. What are refund approval thresholds?
7. Which staff roles, regions and branch scopes are required?
8. Does content require approval and scheduled publishing?
9. Which notification channels/providers are approved?
10. What assistant configuration may non-technical staff edit?
11. What retention/privacy rules apply to customers, conversations and audit logs?
12. Which reports are legally or financially authoritative?
