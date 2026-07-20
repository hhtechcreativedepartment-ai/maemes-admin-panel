# Admin Mock Data Plan

## Principles

- Keep all mock records inside `maemes-admin-panel`.
- Never import from or write to `maemes-piri-piri`.
- Use strict canonical Admin types and service interfaces.
- Store only synthetic or sanitized data.
- Namespace persistence under `maemes.admin.*`.
- Mock services simulate latency, validation, pagination, errors and optimistic concurrency.
- Seed reset must be explicit and must never affect customer-site storage.

## Reusable reference data

The following customer-site data can be manually normalized into Admin fixtures:

- 18 categories from `lib/menuData.ts`
- Active menu products and their media/price/configuration fields
- Shared flavours, Meal/Go Large rules, drinks, fries, dips, sides, cake and Piri Piri modifier
- Product popup modifiers and free toppings
- Six branches with addresses, hours, static status, services, estimates, minimums and fees
- Three promotions from `data/promos.ts`
- Two sanitized demo users, two addresses and masked card metadata from `data/users.ts`
- Seed/local order shapes and status examples
- Blog posts, FAQs, homepage sections, global links and public asset paths
- Assistant intent, response, recommendation and quick-action structures

The inactive `data/products.ts`, `data/branches.ts`, stores and parallel types are comparison inputs only, not seed sources.

## Canonical mock entities

| Entity | Key fields |
|---|---|
| AdminUser | id, name, workEmail, roleIds, branchIds, status, lastActiveAt |
| Role/Permission | id, name, capabilities, scope, status |
| Category | id, name, slug, imageAssetId, sortOrder, status, schedule |
| Product | id, sku, slug, name, categoryId, description, price, calories, media, flags, status, version |
| OptionGroup | id, name, selectionType, required, min/max, options, dependencies |
| Option/Modifier | id, name, priceDelta, status, sortOrder |
| ProductAssignment | productId, optionGroupId, overrides, sortOrder |
| Branch | id, name, address, postcode, phone, timezone, media, status |
| OpeningSchedule | branchId, weeklyIntervals, exceptions, override |
| ServiceRule | branchId, type, enabled, fee, minimum, estimate, paymentRules |
| DeliveryZone | id, branchId, method, demoCoverage, priority, fee/minimum overrides, status |
| Customer | id, masked profile, tags, status, consent summary, metrics |
| Address/Favourite | customerId, sanitized address or product relation |
| Order | id, number, branchId, customerId, serviceType, lines, totals, paymentState, status, timestamps |
| Payment | id, orderId, providerRef, maskedMethod, amount, status |
| Refund | id, paymentId, amount, reason, status, requester/approver |
| Promotion | id, code/rule, value, scope, validity, limits, status |
| ContentPage/Section | id, route, sectionType, structured fields, status, schedule, revision |
| Banner/Asset | placement, renditions, alt text, usage, schedule/status |
| NotificationTemplate/Campaign/Log | channel, audience, variables, schedule, status |
| AssistantConfig | version, enabled, greeting, actions, intents, rules, templates, exclusions, retention |
| AuditEvent | id, actor, action, entity, before/after summary, result, timestamp |

## Suggested mock folders

```text
src/
  features/<module>/
    types.ts
    mock-data.ts
    mock-service.ts
  shared/
    mocks/
      seed.ts
      latency.ts
      errors.ts
      pagination.ts
    storage/
      admin-storage.ts
```

## Storage keys

- `maemes.admin.session`
- `maemes.admin.preferences`
- `maemes.admin.savedViews`
- `maemes.admin.catalogue`
- `maemes.admin.branches`
- `maemes.admin.orders`
- `maemes.admin.customers`
- `maemes.admin.promotions`
- `maemes.admin.finance`
- `maemes.admin.content`
- `maemes.admin.notifications`
- `maemes.admin.staff`
- `maemes.admin.assistant`
- `maemes.admin.audit`

Large media remains path metadata only; do not store binary assets in `localStorage`.

## Mock behavior

- Deterministic seed IDs and dates.
- 250–600ms default latency with an opt-in error simulator.
- Pagination, sorting and filtering occur in mock services, not components.
- Mutations increment `version` and write audit events.
- Archive is reversible; delete is simulated only for safe unused records.
- Order/refund transitions use explicit transition maps.
- Finance mocks expose masked methods only.
- Permission checks run in a mock authorization service.
- Reset-to-seed and export/import mock JSON are development utilities.

## Data quality and migration

Normalization must:

1. Preserve active menu IDs as legacy references.
2. Convert category names to category IDs.
3. Convert category-inferred options into explicit assignments.
4. Preserve `pickup` only as a legacy import value and expose `collection` canonically.
5. Map both order status vocabularies into one canonical transition set.
6. Flag missing descriptions/images/calories rather than invent values.
7. Record the source file and source version for traceability.
