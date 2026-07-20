# Admin Screen Inventory

## Total

The proposed Admin Panel contains **95 routable screens/views**. Dialogs, drawers, previews and responsive variants are not counted separately.

| Module | Screens |
|---|---:|
| Dashboard | 2 |
| Orders | 4 |
| Products | 5 |
| Categories | 3 |
| Product modifiers | 5 |
| Branches | 4 |
| Opening hours | 3 |
| Delivery and Collection | 3 |
| Delivery zones | 4 |
| Customers | 5 |
| Promotions and vouchers | 4 |
| Payments | 3 |
| Refunds | 4 |
| Website content | 7 |
| Banners and media | 4 |
| Notifications | 5 |
| Reports | 9 |
| Staff | 4 |
| Roles and permissions | 4 |
| AI Ordering Assistant | 7 |
| Settings | 3 |
| Audit logs | 3 |
| **Total** | **95** |

The detailed inventory below identifies the same **95 routable screens**, including operational, reporting and specialist configuration views.

## Route-level inventory

### Overview

1. Dashboard overview
2. Operational alerts and tasks

### Orders

3. Order queue
4. Order status board
5. Order detail
6. Receipt/fulfilment view

### Catalogue

7. Product list
8. Product create
9. Product edit
10. Product detail/preview
11. Product branch overrides
12. Category list/reorder
13. Category create
14. Category edit/preview
15. Option-group list
16. Option-group editor
17. Modifier library
18. Product-option assignments
19. Dependency preview

### Locations

20. Branch list
21. Branch create
22. Branch edit
23. Branch detail/service summary
24. Weekly opening-hours editor
25. Holiday/exception calendar
26. Temporary status override
27. Service settings by branch
28. Fees/minimums editor
29. Estimate/scheduling rules
30. Delivery-zone list
31. Delivery-zone create/edit
32. Coverage test
33. Zone-overlap review

### Customers

34. Customer list
35. Customer profile summary
36. Customer addresses/favourites
37. Customer orders/activity
38. Customer consent/privacy requests

### Marketing

39. Promotion list
40. Promotion create/edit
41. Voucher-code inventory
42. Promotion usage detail
43. Notification centre
44. Notification template list
45. Notification template editor
46. Campaign composer
47. Delivery log

### Finance

48. Payment transaction list
49. Payment detail
50. Settlement/reconciliation summary
51. Refund queue
52. Refund request
53. Refund approval detail
54. Refund history

### Website content

55. Page/content inventory
56. Page section editor
57. Blog list/editor
58. FAQ manager
59. Legal-content versions
60. Navigation/footer/global content
61. Contact/franchise/newsletter submissions
62. Banner list/editor
63. Banner schedule
64. Asset library
65. Asset detail/usage

### Reports

66. Sales report
67. Orders and fulfilment report
68. Product-performance report
69. Branch-performance report
70. Customer report
71. Promotion report
72. Payment/refund report
73. Assistant analytics report
74. Export history

### Administration

75. Staff list
76. Staff create/invite
77. Staff profile
78. Staff branch assignments/activity
79. Role list
80. Role editor matrix
81. Permission detail
82. Role comparison
83. Assistant overview
84. Assistant behavior settings
85. Intent and phrase rules
86. Recommendation rules
87. Response templates/exclusions
88. Assistant test console
89. Assistant version history/analytics
90. General and brand settings
91. Commerce/auth/privacy settings
92. Integrations and feature flags
93. Audit-log list
94. Audit-event detail
95. Audit export

## Required shared dialogs and drawers

- Create, edit, archive, delete and unsaved-change confirmations
- Bulk-action confirmation and completion summary
- Order status/cancellation
- Refund request/approval/rejection
- Product/category dependency warning
- Branch closure/service disable
- Publish/schedule/unpublish
- Customer anonymization
- Staff suspension and permission escalation
- Assistant publish/rollback and unsafe-rule warning
- Filter, column, saved-view and export drawers

## Responsive behavior

- Desktop: persistent navigation, dense tables, split detail layouts.
- Tablet: collapsible navigation, reduced columns, detail drawers.
- Mobile: card-based records, sticky primary action, bottom-sheet filters, grouped forms and no horizontal page overflow.
- Permission matrices and wide financial tables may horizontally scroll inside labelled containers.
- Order queue, refund approvals and assistant test console receive mobile-specific priority layouts.
