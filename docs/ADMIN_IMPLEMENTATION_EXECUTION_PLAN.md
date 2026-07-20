# Admin Implementation Execution Plan

## Scope

This execution implements the approved frontend-only prototype on
`feature/admin-control-panel`. It does not import from or write to the customer
website and does not create APIs, databases, real authentication, payment, OTP,
mapping, messaging, or AI integrations.

## Delivery slices

1. Establish canonical TypeScript entities, permission rules, deterministic
   fixtures, namespaced local persistence, mock latency, errors, and audit writes.
2. Build mock authentication, route protection, responsive navigation, global
   branch scope, search, notifications, profile controls, breadcrumbs, and
   feedback primitives.
3. Deliver operational dashboard, orders, catalogue, locations, customers,
   marketing, finance, content, reports, staff, assistant, settings, and audit
   screens through a central route registry.
4. Add functional create/edit/status/archive/restore/test flows, confirmation,
   loading, empty, error, table, mobile-card, and keyboard states.
5. Validate the required URLs and workflows, then run lint and production build.

## Replacement boundary

Screens consume `AdminServices` interfaces. `localAdminServices` is the only
prototype adapter. A future backend should replace that adapter while retaining
the screen and entity contracts, with server-side authorization, validation,
idempotency, concurrency, pricing, and audit enforcement.

## Safety decisions

- All people, orders, transactions, messages, and addresses are fictional.
- Payment methods are masked; no PAN, CVV, token, or credential is collected.
- Role checks are demonstrative only and are not a security boundary.
- Delivery zones are labelled simulations and make no map/backend claim.
- Assistant tests are deterministic and cannot create carts, payments, or orders.
- Destructive prototype actions require confirmation and are reversible where
  practical.
