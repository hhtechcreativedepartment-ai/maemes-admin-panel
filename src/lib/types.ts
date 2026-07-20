export type RoleId = "super-admin" | "branch-manager" | "order-manager" | "menu-manager" | "marketing-manager" | "support";
export type ModuleKey = "dashboard" | "orders" | "menu" | "branches" | "customers" | "promotions" | "payments" | "content" | "notifications" | "reports" | "staff" | "ai-assistant" | "settings" | "audit-log";
export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

export interface DemoRole { id: RoleId; name: string; description: string; modules: ModuleKey[]; }
export interface AdminSession { userId: string; name: string; email: string; roleId: RoleId; branchIds: string[]; }
export interface Branch { id: string; name: string; address: string; postcode: string; phone: string; email: string; status: "Open" | "Closed" | "Opening Soon" | "Temporarily Closed"; active: boolean; delivery: boolean; collection: boolean; fee: number; minimum: number; deliveryEstimate: string; collectionEstimate: string; manager: string; }
export interface Product { id: string; name: string; category: string; description: string; price: number; mealPrice?: number; largePrice?: number; calories?: number; status: "Available" | "Unavailable" | "Archived" | "Draft"; popular: boolean; featured: boolean; behaviour: "Direct Add" | "Customise"; branches: string[]; sortOrder: number; version: number; }
export interface Category { id: string; name: string; slug: string; products: number; visible: boolean; sortOrder: number; status: "Published" | "Draft" | "Archived"; }
export interface OrderLine { name: string; quantity: number; price: number; modifiers: string[]; }
export interface Order { id: string; number: string; customer: string; phone: string; branchId: string; type: "Delivery" | "Collection"; status: string; paymentStatus: string; paymentMethod: string; total: number; createdAt: string; address?: string; lines: OrderLine[]; notes?: string; }
export interface Customer { id: string; name: string; email: string; phone: string; joined: string; branchId: string; orders: number; spend: number; status: "Active" | "Suspended"; consent: boolean; addresses: string[]; favourites: string[]; notes: string[]; }
export interface Promotion { id: string; name: string; code: string; type: string; value: number; minimum: number; starts: string; ends: string; status: "Active" | "Draft" | "Scheduled" | "Expired" | "Paused"; redemptions: number; }
export interface Payment { id: string; orderId: string; customer: string; method: string; providerRef: string; amount: number; status: string; createdAt: string; }
export interface Staff { id: string; name: string; email: string; roleId: RoleId; branchIds: string[]; status: "Active" | "Invited" | "Suspended"; lastLogin: string; }
export interface NotificationRecord { id: string; title: string; channel: string; audience: string; status: string; scheduledAt: string; }
export interface AuditEvent { id: string; staff: string; role: string; action: string; module: string; record: string; timestamp: string; branch: string; result: "Success" | "Failed"; ip: string; }
export interface AssistantConfig { enabled: boolean; welcome: string; quickReplies: string[]; voice: boolean; recommendations: boolean; favourites: boolean; reorder: boolean; maxRecommendations: number; fallback: string; unavailable: string; closedBranch: string; version: number; }

export interface AdminState {
  branches: Branch[]; products: Product[]; categories: Category[]; orders: Order[];
  customers: Customer[]; promotions: Promotion[]; payments: Payment[]; staff: Staff[];
  notifications: NotificationRecord[]; audit: AuditEvent[]; assistant: AssistantConfig;
}

export interface ListQuery { search?: string; page?: number; pageSize?: number; status?: string; branchId?: string; sort?: string; }
export interface ListResult<T> { items: T[]; total: number; page: number; pageSize: number; }
