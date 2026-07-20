import type { ModuleKey } from "@/lib/types";
export interface NavItem { label:string;href:string;module:ModuleKey;icon:string; }
export interface NavGroup { label:string;items:NavItem[]; }
export const navigation:NavGroup[]=[
 {label:"Overview",items:[{label:"Dashboard",href:"/dashboard",module:"dashboard",icon:"⌂"}]},
 {label:"Commerce",items:[{label:"Orders",href:"/orders",module:"orders",icon:"▤"},{label:"Customers",href:"/customers",module:"customers",icon:"◎"},{label:"Payments",href:"/payments",module:"payments",icon:"£"},{label:"Refunds",href:"/refunds",module:"payments",icon:"↩"}]},
 {label:"Catalogue",items:[{label:"Products",href:"/menu/products",module:"menu",icon:"◇"},{label:"Categories",href:"/menu/categories",module:"menu",icon:"▦"},{label:"Modifiers",href:"/menu/modifiers",module:"menu",icon:"≡"}]},
 {label:"Locations",items:[{label:"Branches",href:"/branches",module:"branches",icon:"⌖"}]},
 {label:"Engagement",items:[{label:"Promotions",href:"/promotions",module:"promotions",icon:"%"},{label:"Content",href:"/content",module:"content",icon:"▣"},{label:"Notifications",href:"/notifications",module:"notifications",icon:"◉"}]},
 {label:"Insights",items:[{label:"Reports",href:"/reports",module:"reports",icon:"⌁"},{label:"AI Assistant",href:"/ai-assistant",module:"ai-assistant",icon:"✦"}]},
 {label:"Administration",items:[{label:"Staff",href:"/staff",module:"staff",icon:"♙"},{label:"Roles",href:"/roles",module:"staff",icon:"⌘"},{label:"Settings",href:"/settings",module:"settings",icon:"⚙"},{label:"Audit log",href:"/audit-log",module:"audit-log",icon:"◷"}]},
];
