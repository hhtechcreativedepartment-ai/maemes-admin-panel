# Admin Information Architecture

## Navigation model

Desktop uses a persistent left navigation with global search, branch scope, notifications and staff profile in the top bar. Mobile uses a compact top bar and slide-over navigation. Primary groups:

1. Overview
2. Commerce
3. Catalogue
4. Locations
5. Customers
6. Marketing
7. Content
8. Operations
9. Administration

All destructive operations use confirmation dialogs. Lists use responsive tables on desktop and record cards on small screens. Loading uses skeletons; errors provide retry and reference IDs; empty states explain the feature and show the permitted create action.

## Shared operational conventions

- **Statuses:** consistent chips with accessible text, not colour alone.
- **Search/filter:** URL-like mock state, saved views and clear-all.
- **Bulk actions:** selection count, permission-aware actions, confirmation and completion summary.
- **Create/edit:** form sections, validation summary, unsaved-changes warning, save draft/publish where applicable.
- **Archive/delete:** archive preferred; permanent delete restricted to Super Admin and records without dependencies.
- **Responsive:** priority columns remain visible; secondary data moves into drawers/cards; primary actions remain reachable.
- **Permissions:** View, Create, Edit, Publish/Approve, Archive/Delete, Export and Sensitive-data access are separate capabilities.

## Modules

### 1. Dashboard

- **Purpose/screens:** operational overview, live-style order board preview, branch comparison, alerts and tasks.
- **Widgets:** orders, sales, average order value, fulfilment time, cancellations, branch availability, top products, low availability, promotion use, assistant usage.
- **Filters:** date range, branch, service type and channel.
- **Actions:** drill into modules, acknowledge alerts, export snapshot.
- **States/responsive:** configurable skeleton cards; stacked mobile cards; retry per widget.
- **Mock/API:** aggregated order/branch/product metrics; future reporting endpoints.
- **Permissions:** dashboard view; financial widgets require Finance or Owner.

### 2. Orders

- **Screens:** order queue, kanban/status board, order detail, receipt preview, cancellation dialog.
- **Table/filter:** order number, time, branch, customer, Delivery/Collection, payment, total, status; search ID/phone; filter status/date/branch/service/payment.
- **Statuses:** received, confirmed, preparing, ready, out for delivery, completed/collected, cancelled, payment pending/failed.
- **Actions:** accept, advance status, print/view receipt, cancel, resend notification; bulk status/export only where safe.
- **CRUD:** orders are created by customers, not staff by default; edits limited to notes/status with audit history; never delete financial records.
- **States/responsive:** queue empty state; polling skeleton; stale/update conflict errors; mobile order cards.
- **Mock/API/permissions:** seeded orders and transition rules; future idempotent order, status, receipt and tracking APIs; branch staff scoped to assigned branches.

### 3. Products

- **Screens:** product list, create/edit wizard, detail/preview, branch availability/pricing, archive dialog, import preview.
- **Table/filter:** image, name, ID/SKU, category, price, availability, offer/popular, image completeness; category/status/branch/price filters.
- **Forms:** identity, descriptions, media, price/calories, dietary data, option assignments, included items, offer flags, branch overrides and display order.
- **Actions:** duplicate, publish/unpublish, assign category/options, bulk availability/price export; archive preferred.
- **States:** no-products onboarding, image/validation errors, unsaved changes; mobile card list.
- **Mock/API/permissions:** normalized canonical product records; Catalogue Editor edits, Publisher publishes, Pricing Manager changes prices.

### 4. Categories

- **Screens:** sortable category list, create/edit, category preview.
- **Fields/actions:** title, slug, image, status, sort order, schedule, SEO; reorder and bulk publish/archive.
- **Search/status:** name/slug; draft, scheduled, published, archived.
- **Delete:** blocked while products are assigned; reassignment dialog.
- **Mock/API/permissions:** 18 active categories; future category CRUD/reorder; catalogue publishing permission.

### 5. Product modifiers

- **Screens:** option groups, group editor, modifier library, product assignments, dependency preview.
- **Tables/forms:** group title/type/required/min/max; option name/price/status; modifier price; defaults; Meal/Go Large dependencies; branch overrides.
- **Search/filter:** type, product/category assignment, status, price delta.
- **Actions:** clone, assign/unassign, reorder, bulk enable/disable; archive only after dependency check.
- **States:** unassigned-library empty state, circular-dependency error, mobile accordion editor.
- **Mock/API/permissions:** flavours, drinks, fries/Piri Piri, dips, sides, cake, extras, free toppings; future validated configuration API; Catalogue/Price permissions.

### 6. Branches

- **Screens:** branch list/map placeholder, branch detail, create/edit, service summary.
- **Fields:** name, address, postcode, phone, images, timezone, status, service flags, estimates, minimum and fee.
- **Filters/status:** area, open state, Delivery/Collection, active/coming soon/archived.
- **Actions:** duplicate settings, activate/deactivate, bulk export; archive with dependency warning.
- **States:** no branches, invalid postcode, unsaved changes; mobile branch cards.
- **Mock/API/permissions:** six canonical branches; future branch/location API; Location Admin and regional scope.

### 7. Opening hours

- **Screens:** weekly schedule, exception/holiday calendar, status override.
- **Forms:** daily intervals, overnight hours, temporary closure, next-opening message and effective dates.
- **Filters/actions:** branch/date/status; copy schedule to branches, bulk closure, restore normal schedule.
- **Statuses:** open, closed, opening soon, closing soon, temporarily closed.
- **States:** timezone/overlap errors; calendar mobile agenda.
- **Mock/API/permissions:** static weekly hours plus exceptions; future timezone-aware status API; Operations Manager approval.

### 8. Delivery and Collection settings

- **Screens:** branch service settings, fee/minimum editor, estimate rules, scheduling rules.
- **Forms:** enablement, order windows, static/conditional fees, minimums, estimates, Collection payment rules.
- **Actions:** copy settings, bulk enable/disable with confirmation.
- **States:** contradictory settings and closed-branch warnings; responsive cards.
- **Mock/API/permissions:** canonical branch fields; future fulfilment rules engine; Operations/Pricing approval.

### 9. Delivery zones

- **Screens:** zone list, postcode/radius/polygon editor placeholder, coverage test, overlap review.
- **Table/filter:** zone, branch, method, postcodes/radius, fee, minimum, priority, status.
- **Actions:** import/export postcodes, activate, duplicate, resolve overlap, archive.
- **States:** no coverage, invalid postcode, overlapping rules; mobile list with test form.
- **Mock/API/permissions:** synthetic non-geographic demo zones only; future geocoding and authoritative validation API; Location Admin.

### 10. Customers

- **Screens:** customer list, profile, addresses, favourites, orders, notes/consents, anonymization request.
- **Table/filter:** masked identity, joined date, last order, order count/value, status; search name/masked phone/email; segment filters.
- **Actions:** add note/tag, disable account, export permitted data, anonymize with strong confirmation; no permanent deletion of order records.
- **States:** no customers, restricted data, loading tabs, ownership errors; mobile summary.
- **Mock/API/permissions:** sanitized users/addresses/favourites/order links; future identity, consent and privacy APIs; PII permission required.

### 11. Promotions and vouchers

- **Screens:** campaign list, create/edit wizard, code inventory, usage detail.
- **Fields:** code, title, description, amount/percentage, validity, scope, minimum, branch/product/customer limits, usage limits and stacking.
- **Filters/status:** active/scheduled/expired/paused/draft; type, branch and date.
- **Actions:** duplicate, pause, bulk code generation/export; archive after expiry.
- **States:** code collision, invalid dates/rules, no campaigns; mobile campaign cards.
- **Mock/API/permissions:** three existing promos plus generated campaigns; future validation/redemption API; Marketing creates, Finance approves.

### 12. Payments

- **Screens:** transaction list, payment detail, settlement/reconciliation summary.
- **Table/filter:** transaction/order, masked method, provider, amount, state, branch/date.
- **Statuses:** pending, authorized, captured, failed, cancelled, partially/fully refunded, disputed.
- **Actions:** view provider reference, export/reconcile; no card data and no arbitrary editing/deletion.
- **States:** restricted access, provider unavailable, no transactions; mobile summaries.
- **Mock/API/permissions:** sanitized demo transactions; future gateway/webhook/reconciliation API; Finance-only sensitive access.

### 13. Refunds

- **Screens:** refund queue, create request, approval detail, refund history.
- **Forms/actions:** order/item/amount/reason/evidence; submit, approve/reject, retry failed refund; never exceed captured balance.
- **Filters/status:** requested, approved, processing, completed, rejected, failed.
- **States:** ineligible order, duplicate/excess refund, empty queue; mobile approval cards.
- **Mock/API/permissions:** mock refund records and approval policy; future idempotent gateway refund API; requester/approver separation.

### 14. Website content

- **Screens:** page inventory, visual section list, section editor, blog, FAQ, legal versions, navigation/footer, enquiry submissions.
- **Fields:** heading/copy/media/CTA/order/status/schedule/SEO/alt text; structured content, not arbitrary code.
- **Search/filter:** page, content type, status, author/date.
- **Actions:** preview, duplicate, schedule, publish/unpublish, restore revision, archive; bulk publish restricted.
- **States:** empty section, invalid link/media, preview failure; mobile form sections.
- **Mock/API/permissions:** content copied into normalized fixtures; future CMS/revision/publishing API; Content Editor/Publisher.

### 15. Banners and media

- **Screens:** banner list/editor/schedule, asset library, asset detail/usage.
- **Fields:** desktop/mobile asset, alt text, CTA, placement, branch/audience, start/end and priority.
- **Actions:** upload placeholder, replace, crop/focal metadata, schedule, reorder, archive; dependency-aware asset deletion.
- **States:** missing rendition/alt text, schedule conflicts, empty library; responsive preview.
- **Mock/API/permissions:** references to existing public assets; future object storage/CDN/media API; Media Editor and Publisher.

### 16. Notifications

- **Screens:** notification centre, template list/editor, campaign composer, delivery log, preference defaults.
- **Channels/status:** in-app, email, SMS, push; draft, scheduled, sending, sent, failed, paused.
- **Filters/actions:** channel/audience/date/status; duplicate, test-send to mock recipient, schedule, cancel; archive templates.
- **States:** empty templates, invalid variables, delivery failures; mobile log cards.
- **Mock/API/permissions:** safe templates and synthetic logs; future provider, preference and event API; Marketing/Operations with approval.

### 17. Reports

- **Screens:** sales, orders/fulfilment, products, branches, customers, promotions, payments/refunds, assistant analytics, export history.
- **Filters/actions:** date, branch, channel, service; compare periods, save view, CSV/PDF export placeholder.
- **States:** no data, partial metric failure, stale data; mobile KPI cards.
- **Mock/API/permissions:** deterministic aggregates; future warehouse/reporting API; financial reports restricted.

### 18. Staff

- **Screens:** staff list, invite/create mock user, profile, branch assignments, activity.
- **Fields/status:** name, work email, role, branches, active/invited/suspended.
- **Actions:** resend invite, suspend/reactivate, reset mock access, bulk branch assignment; deactivate rather than delete.
- **States:** no staff, duplicate email, last-owner protection; mobile cards.
- **Mock/API/permissions:** synthetic staff only; future workforce identity API; Staff Admin.

### 19. Roles and permissions

- **Screens:** role list, role editor matrix, permission detail, role comparison.
- **Actions:** clone role, assign, publish permission changes, archive unused custom role.
- **States:** no custom roles, privilege escalation warning, dependency conflict; horizontally scrollable matrix/mobile grouped permissions.
- **Mock/API/permissions:** role/capability fixtures; future authorization API; Super Admin only for high-risk grants.

### 20. AI Ordering Assistant management

- **Screens:** overview, behavior settings, intents/phrases, recommendations, response templates, exclusions, test console, conversation analytics/version history.
- **Fields:** enabled state, greeting/actions, supported intents, deterministic patterns, recommendation weights, budgets, voice/fallback copy, disclaimers, session retention.
- **Search/status/actions:** intent/category/status; enable/disable, reorder actions, duplicate/version, test, publish/rollback; archive old versions.
- **States:** no configuration, invalid/colliding rule, unsafe-response warning, test failure; mobile stacked editor.
- **Mock/API/permissions:** current parser/state/services represented as typed rules; future orchestration/config/analytics APIs; AI Manager plus Publisher.

### 21. Settings

- **Screens:** general brand, commerce defaults, payment methods, authentication/OTP policy, privacy/retention, analytics, integrations placeholders, feature flags.
- **Actions:** save section, reset mock defaults, export configuration; destructive reset requires typed confirmation.
- **States:** validation/dependency errors, restricted secrets, unsaved changes; mobile section navigation.
- **Mock/API/permissions:** non-secret configuration only; future secure config/secrets services; module-specific Administrators.

### 22. Audit logs

- **Screens:** audit list, event detail, export.
- **Table/filter:** actor, action, entity, entity ID, before/after summary, time, branch, result; search/filter/export.
- **Actions:** view only; no create/edit/delete/clear.
- **States:** no events, restricted fields, export failure; mobile event cards.
- **Mock/API/permissions:** generated immutable mock events; future append-only audit API; Auditor/Super Admin.
