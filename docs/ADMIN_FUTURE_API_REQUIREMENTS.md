# Future API Requirements

## General contract

The frontend prototype must depend on service interfaces so mock implementations can later be replaced. Future APIs require:

- HTTPS, versioning, pagination, filtering, sorting and field validation
- Authenticated staff sessions and server-enforced authorization
- Branch/region scope enforcement
- Stable opaque IDs and canonical schemas
- Optimistic concurrency (`version` or ETag)
- Idempotency keys for high-risk mutations
- Structured error codes with safe messages and correlation IDs
- Immutable audit events
- UTC timestamps plus branch timezone
- Soft delete/archive and dependency checks
- Rate limiting, abuse protection and export controls
- PII masking and least-privilege fields

## Required service domains

### Identity and authorization

- Staff sign-in/session/logout
- Staff CRUD, invitations, suspension and branch assignments
- Roles, permissions and scope evaluation
- Customer identity lookup, OTP initiation/verification and account state
- Consent, retention, export and anonymization workflows

### Catalogue

- Category CRUD, reorder, schedule and archive
- Product CRUD, search, versions, publish/archive
- Media upload/signing, renditions, alt text and usage
- Option groups/options/modifiers/dependencies
- Product assignments and branch price/availability overrides
- Menu snapshot by branch and effective time
- Configuration validation and server price calculation

### Branch and fulfilment

- Branch CRUD and status
- Weekly hours, exceptions and temporary overrides
- Real current/next status
- Delivery/Collection settings
- Delivery zones and postcode/geospatial validation
- Fees, minimums and estimates
- Cart revalidation when branch/service changes

### Orders

- Order search/queue/detail
- Idempotent order creation
- Valid status transitions with concurrency checks
- Cancellation eligibility
- Receipt retrieval/rendering
- Tracking timeline/events
- Operational notes and notification resend

### Payments and refunds

- Payment-intent/authorization/capture status
- Tokenized saved methods; never raw PAN/CVV
- Webhook processing and reconciliation
- Idempotent partial/full refunds
- Refund approval workflow, balances and failure recovery
- Settlement and dispute reporting

### Customers and engagement

- Customer list/profile/order metrics
- Saved addresses and ownership validation
- Favourites and reorder history
- Tags, notes and segments
- Promotion CRUD, eligibility, validation and redemption
- Notification templates, campaigns, preferences and delivery logs
- Newsletter/contact/franchise submission inboxes

### Content

- Structured page/section CRUD
- Draft, preview, approval, schedule and publish
- Revision history and rollback
- Blog, FAQ and legal versioning
- Navigation/footer/global settings
- Banners, placements and targeting

### AI Ordering Assistant

- Versioned assistant configuration
- Intent, recommendation, copy and exclusion rules
- Test/simulation endpoint with no order side effects
- Conversation analytics with redaction
- Safe publish/rollback
- Runtime tools that validate branch, product, cart, address, payment and order operations

### Reporting and audit

- Aggregated KPI queries
- Saved report definitions
- Asynchronous export jobs and expiring download URLs
- Append-only audit search/detail/export

## Representative endpoints

Endpoint names are illustrative and must be aligned with the future backend:

```text
GET/POST /admin/products
GET/PATCH /admin/products/{id}
POST /admin/products/{id}/publish
GET/POST /admin/option-groups
GET/POST /admin/branches
GET/PUT /admin/branches/{id}/hours
GET/PUT /admin/branches/{id}/services
GET/POST /admin/delivery-zones
GET /admin/orders
POST /admin/orders/{id}/transitions
POST /admin/orders/{id}/cancel
GET /admin/payments
POST /admin/refunds
POST /admin/refunds/{id}/approve
GET/POST /admin/promotions
GET/POST /admin/content/pages
POST /admin/content/{id}/publish
GET/POST /admin/assistant/configurations
POST /admin/assistant/configurations/{id}/test
POST /admin/assistant/configurations/{id}/publish
GET /admin/audit-events
```

## Events/webhooks

Future event topics:

- order.created/status_changed/cancelled
- payment.authorized/captured/failed/refunded/disputed
- branch.status_changed
- product.availability_changed
- promotion.redeemed
- customer.created/consent_changed/anonymized
- content.published
- notification.sent/failed
- assistant.session_started/product_added/order_completed/error

## Security requirements

- Never return full card details, CVV, OTP secrets or private provider credentials.
- PII fields require purpose-based permissions and access logging.
- Refund approval must prevent self-approval above policy thresholds.
- Price, discount, delivery eligibility and totals are server authoritative.
- Assistant input is untrusted; tool schemas and authorization are mandatory.
- Exports require explicit permission, watermark/audit metadata and expiry.
