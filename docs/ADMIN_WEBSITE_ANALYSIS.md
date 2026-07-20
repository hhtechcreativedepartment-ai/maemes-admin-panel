# Maeme's Customer Website Analysis

## Scope and source-of-truth decision

This document is a read-only analysis of the sibling `maemes-piri-piri` repository. No customer-site file was changed. The Admin Panel is a separate frontend-only prototype and must not import runtime code from the customer repository.

The customer site is a Next.js 16 App Router, React 19 and strict TypeScript prototype. Its active runtime is primarily four React Context providers backed by browser `localStorage`:

- `AuthProvider` in `lib/authContext.tsx`
- `CartProvider` in `lib/cartContext.tsx`
- `OrdersProvider` in `lib/ordersContext.tsx`
- `FavouritesProvider` in `lib/favouritesContext.tsx`

The active ordering sources are `lib/menuData.ts`, `lib/productOptionConfig.ts`, `lib/branchData.ts`, the four Contexts, and the checkout/tracking routes. Files under `data/`, `store/` and `types/index.ts` form a second, largely inactive model and must not be treated as authoritative without reconciliation.

## Website pages and manageable content

| Route | Customer feature | Admin-managed concerns |
|---|---|---|
| `/` | Homepage | Hero content/media, featured dishes, category carousel, brand story, reviews, how-it-works, store preview, app promotion, CTAs |
| `/menu` | Complete menu | Categories, products, images, prices, descriptions, options, offers, display order |
| `/food` | Our Food | Hero video/poster, flavour content, quality/innovation sections, imagery, CTA copy |
| `/app` | Our App | App hero media, benefits, QR/download links, promotional copy |
| `/branches`, `/stores` | Branch/store discovery | Branch identity, address, phone, hours, status, service availability, estimates, fees, minimums, store imagery |
| `/cart` | Cart | Cross-sells, service charge presentation, totals, edit/remove rules |
| `/checkout` | Checkout | Delivery/Collection rules, addresses, payment choices, vouchers, fees, notes, confirmation |
| `/login` | Mock OTP login | Login copy, OTP policy/configuration in a future system, customer account state |
| `/account` | Customer account | Profile, addresses, favourites, promos, current orders, order history |
| `/account/orders/[orderId]` | Receipt/detail | Order and receipt presentation |
| `/order-success/[orderId]` | Confirmation | Confirmation copy, estimate and tracking link |
| `/orders` | Order lookup/history entry | Order retrieval UX |
| `/track/[orderNumber]` | Demo tracking | Order status labels and status progression |
| `/blog`, `/blog/[slug]` | Blog | Posts, categories, images, excerpts, body, publish state |
| `/contact` | Contact | Contact details, support hours, enquiry submissions |
| `/franchising` | Franchise marketing | Hero, benefits, journey, FAQ, enquiry submissions |
| `/privacy-policy` | Legal content | Versioned privacy copy and publication |
| `/terms-and-conditions` | Legal content | Versioned terms and publication |

Global manageable content includes header navigation, footer links/contact/app badges, social links, newsletter copy/submissions, site metadata, logos, icons, and brand media. Header, footer and newsletter are currently hardcoded and have no management interface.

## Menu catalogue

`lib/menuData.ts` defines 18 category records:

1. Offers
2. Grilled Collection
3. Maeme's Burgers
4. Fried Wings
5. Fried Chicken
6. Fried Boneless
7. Box Meals
8. Sharing Meal
9. Vegetarian Collection
10. Fried Collection
11. Maeme's Platter
12. Kids Meal
13. Dessert Collection
14. Sides & Extras
15. Ice Cream
16. Dips
17. Milkshakes
18. Drinks

Category fields are `id`, `title`, `slug`, `anchor`, and `image`. Missing admin concepts include status, branch scope, sort order, scheduled visibility, SEO metadata, and archive state.

The active `MenuItem` record supports:

- Numeric ID, slug, name and category
- Description, base price, optional calories and image
- Popular, offer and starting-price flags
- Serving/size information
- Included items
- Included-drink and required-dip rules
- Quick-add options
- Popup modifiers
- Free toppings
- Meal supplement, meal total and Go Large supplement

The catalogue covers grilled chicken, burgers, vegetarian food, sides, platters, fried chicken/wings/boneless items, boxes, sharing meals, kids meals, desserts, ice cream, dips, drinks and milkshakes. Many records use a placeholder image or blank description. Availability, stock, allergens, ingredients, dietary tags, tax class, SKU, cost, branch overrides and effective dates do not exist.

## Product options and modifiers

`lib/productOptionConfig.ts` contains shared configuration rather than product-owned option groups:

- Full-option categories: Grilled Collection, Maeme's Burgers, Vegetarian Collection and Fried Collection
- Regular/Meal choices, with category-dependent supplements
- Go Large, with category-dependent supplements
- Nine flavour values
- Meal groups: fries, drink, dip, sides/extras and cake slice
- Piri Piri seasoning modifier
- Included dips derived from menu products
- Product popup modifiers such as extra fillet, strip, chicken, paneer or patty
- Nineteen free Smash Burger toppings

Other product-specific flows in the customization modal include platter sides/drinks/cake, kids included drinks, box-meal drinks, sharing-meal dip counts, and fried meal configurations.

Admin management therefore needs reusable option groups, options, modifiers, selection constraints, dependencies, default choices, price deltas, product assignments and branch overrides. The current category-based inference is not sufficient for a production catalogue.

## Commerce workflows

### Cart

The active cart stores full configured line items in `cartItems`. It supports add, remove, quantity update, clear, subtotal and configuration-aware line identity. Prices and totals are client-calculated. Admin settings should eventually manage service charge, tax display, cross-sell products, limits and cart notices, but these require server validation in production.

### Delivery and Collection

The internal value is `pickup`, while customer-facing labels convert it to “Collection.” Branch records contain:

- Delivery and Collection flags
- Static delivery and Collection estimates
- Static minimum delivery amount
- Static delivery fee
- Address, postcode, phone
- Seven-day opening hours
- Static `isOpen`

Postcode matching uses an exact/prefix heuristic and defaults to the first branch. No delivery-zone polygons, radius, postcode lists or live status service exist.

### Checkout and payments

Checkout supports saved/new addresses, Cash on Delivery for Delivery, card-only Collection, demo saved cards, vouchers, notes and final submission. It stores checkout drafts, addresses and cards locally. The card gateway helper is a placeholder and the active checkout creates orders without processing payment. No refunds, captures, voids, settlements, disputes or reconciliation exist.

### Orders, receipts and tracking

Orders are generated locally with client IDs, totals and status. The active status model is `received`, `preparing`, `ready`, `completed`, `cancelled`; a conflicting model uses `confirmed`, `preparing`, `on-the-way`, `ready`, `completed`, `cancelled`. Tracking advances from elapsed browser time. Cancellation is permitted only at the first step. Receipts are rendered from local order data.

## Customers and engagement

- Mock OTP is fixed to `1234`; account existence is inferred from an even/odd phone number.
- Profiles contain user ID, phone, name, optional email and created date.
- Saved addresses include label, recipient, phone, street/city/postcode and default status.
- Favourites store complete item snapshots in the active Context.
- Previous orders are partly local and partly hardcoded in the account component.
- Promotions exist as three seed vouchers, with amount or percentage discounts.
- Newsletter, contact and franchise forms only show local success states; no submission records are retained.
- No notification centre, email/SMS/push templates, consent management, segmentation or customer-support notes exist.

## Website content and media

Content is distributed across page and section components rather than a CMS. Manageable types include:

- Hero slides, banners, videos, posters and CTA links
- Featured products and category promotions
- Brand story, signature/flavour, quality and innovation content
- Reviews/testimonials
- How-it-works steps
- App-store badges, QR code and app-benefit copy
- Store preview cards and store images
- Blog posts
- FAQs
- Contact details and support hours
- Franchise benefits, journey and enquiry copy
- Legal pages
- Footer/navigation/social/newsletter content

Media currently lives in `public/` with no asset library, metadata, usage tracking, focal point, alt-text workflow or archive controls.

## AI Ordering Assistant

The frontend assistant is lazy-loaded and uses:

- Deterministic text intent parsing
- Native browser speech recognition
- Static menu/branch service adapters
- Active Context cart/auth/favourites/orders
- Persistent safe conversation state
- Inline product customization
- Static recommendations
- Mock addresses, payments, order confirmation and receipt

Admin controls should cover enablement, greeting/quick actions, supported intents, recommendation rules, response copy, fallback/error copy, voice configuration, branch/product exclusions, demo disclaimers, session retention, safe test console, analytics and version history. It must never manage prompts that bypass price, availability or confirmation rules.

## Browser storage inventory

Active keys:

- `cartItems`
- `selectedBranchId`
- `selectedOrderType`
- `currentUser`
- `maemes_favourites`
- `userOrders`
- `currentOrder`
- `lastOrder`
- `maemes.checkout.savedAddresses`
- `maemes.checkout.savedCards`
- `maemes.checkout.draft`
- `maemes.account.dob`
- `maemes_pending_favourite`
- `maemes_profile`
- `checkoutState`
- `maemes.assistant.prototype.v1`

Parallel store keys:

- `maemes.cart`
- `maemes.selectedBranch`
- `maemes.selectedOrderType`
- `maemes.userSession`
- `maemes.users`
- `maemes.orders`
- `maemes.currentOrder`
- `maemes.favourites`
- `maemes.promos`
- `maemes.appliedPromo`
- `maemes.checkout`

Admin mock storage must use a separate namespace such as `maemes.admin.*` and must not read or mutate customer-site storage.

## Duplicate and conflicting models

1. `lib/menuData.ts` versus `data/products.ts`: different IDs, products, prices, descriptions, categories and option structures.
2. `lib/branchData.ts` versus `data/branches.ts`: different interfaces, field names and some fees/minimums/hours.
3. `lib/cartContext.tsx` versus `store/cartStore.ts`: different line-item models and storage keys.
4. `lib/ordersContext.tsx`/`lib/orderUtils.ts` versus `store/orderStore.ts`/`types.Order`: different IDs, status vocabularies and totals.
5. `lib/authContext.tsx` versus `store/authStore.ts`: different session storage and mock identity behavior.
6. `lib/favouritesContext.tsx` versus `store/favouriteStore.ts`: item snapshots versus product IDs.
7. `PremiumCheckoutPage` versus `checkoutStateUtils`/`checkoutStore`: three checkout-state shapes.
8. Internal `pickup` versus customer-facing “Collection.”
9. Hardcoded prior orders in account UI versus Context orders and seed orders.
10. `lib/data.ts` contains an additional store list unrelated to canonical branches.

Before real API integration, canonical schemas and migration rules are mandatory.

## Design system observations

- Primary red `#99041E`
- Primary yellow `#FFC257`
- White and warm neutral backgrounds such as `#fff8ed`
- Dark brown/near-black text is used, but black is not the primary brand surface
- Bold, high-weight headings; compact uppercase eyebrow labels
- Rounded 12–24px cards/controls
- Warm gold borders, restrained shadows and large touch targets
- Responsive grids, horizontal mobile carousels, sticky/fixed navigation and mobile-first layouts

The Admin Panel should translate these into a denser operational system: red for navigation/emphasis, yellow for primary actions/warnings, neutral tables/forms, restrained shadows and clear status colours.

## Features with no current management interface

Every customer-site record is code- or browser-managed. There is no management interface for catalogue, branches, orders, customers, payments, refunds, vouchers, content, assets, submissions, notifications, reports, staff, permissions, assistant behavior, settings or audit logs. There are also no approval, scheduling, publishing, revision, bulk-edit, import/export or branch-override workflows.
