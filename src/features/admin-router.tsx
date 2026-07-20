"use client";
import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { AuthScreen } from "./auth/auth-screen";
import { DashboardScreen } from "./dashboard/dashboard-screen";
import { OrdersScreen, OrderDetail, CustomersScreen, PaymentsScreen, RefundsScreen } from "./operations/operations-screens";
import { CategoriesScreen, ModifiersScreen, ProductForm, ProductsScreen } from "./catalogue/catalogue-screens";
import { BranchesScreen, BranchForm } from "./locations/location-screens";
import { ContentScreen, NotificationsScreen, PromotionsScreen } from "./engagement/engagement-screens";
import { AssistantScreen, AuditScreen, ReportsScreen, RolesScreen, SettingsScreen, StaffScreen } from "./governance/governance-screens";
import { PageHeader, Section } from "@/components/ui";

export function AdminRouter(){
 const pathname=usePathname(),seg=pathname.split("/").filter(Boolean);
 if(pathname==="/"||pathname==="/login")return <AuthScreen/>;
 if(pathname==="/forgot-password")return <AuthScreen mode="forgot"/>;
 if(pathname==="/reset-password")return <AuthScreen mode="reset"/>;
 let screen:React.ReactNode;
 if(pathname==="/dashboard")screen=<DashboardScreen/>;
 else if(seg[0]==="orders")screen=seg.length===2&&!["live","cancelled","refunds"].includes(seg[1])?<OrderDetail id={seg[1]}/>:<OrdersScreen mode={(seg[1] as "live"|"cancelled"|"refunds")??"all"}/>;
 else if(pathname==="/menu/products")screen=<ProductsScreen/>;
 else if(pathname==="/menu/products/new")screen=<ProductForm isNew/>;
 else if(seg[0]==="menu"&&seg[1]==="products"&&seg[2])screen=<ProductForm id={seg[2]}/>;
 else if(pathname==="/menu/categories")screen=<CategoriesScreen/>;
 else if(pathname==="/menu/modifiers")screen=<ModifiersScreen/>;
 else if(pathname==="/menu/flavours")screen=<ModifiersScreen kind="flavours"/>;
 else if(pathname==="/menu/extras")screen=<ModifiersScreen kind="extras"/>;
 else if(pathname==="/branches")screen=<BranchesScreen/>;
 else if(pathname==="/branches/new")screen=<BranchForm isNew/>;
 else if(seg[0]==="branches"&&seg[1])screen=<BranchForm id={seg[1]} section={seg[2]??"details"}/>;
 else if(pathname==="/customers/segments")screen=<Generic title="Customer segments" description="Audience definitions based on fictional behaviour and consent." items={["New customers","Loyal customers","At-risk customers","Delivery regulars","Collection regulars"]}/>;
 else if(seg[0]==="customers")screen=<CustomersScreen id={seg[1]}/>;
 else if(seg[0]==="promotions")screen=<PromotionsScreen id={seg[1]&&seg[1]!=="new"?seg[1]:undefined} isNew={seg[1]==="new"}/>;
 else if(seg[0]==="payments")screen=<PaymentsScreen id={seg[1]}/>;
 else if(pathname==="/refunds")screen=<RefundsScreen/>;
 else if(seg[0]==="content")screen=<ContentScreen section={seg[1]??"overview"}/>;
 else if(seg[0]==="notifications")screen=<NotificationsScreen isNew={seg[1]==="new"} templates={seg[1]==="templates"}/>;
 else if(seg[0]==="reports")screen=<ReportsScreen report={seg[1]??"overview"}/>;
 else if(seg[0]==="staff")screen=<StaffScreen id={seg[1]&&seg[1]!=="new"?seg[1]:undefined} isNew={seg[1]==="new"}/>;
 else if(pathname==="/roles")screen=<RolesScreen/>;
 else if(pathname==="/permissions")screen=<RolesScreen permissions/>;
 else if(seg[0]==="ai-assistant")screen=<AssistantScreen view={seg[1]??"overview"} conversationId={seg[1]==="conversations"?seg[2]:undefined}/>;
 else if(seg[0]==="settings")screen=<SettingsScreen section={seg[1]??"general"}/>;
 else if(pathname==="/audit-log")screen=<AuditScreen/>;
 else screen=<Generic title="Admin workspace" description="This specialist view uses the shared operational pattern." items={["Search and filters","Create and edit workflow","Loading, empty and error states","Permission-aware actions"]}/>;
 return <AdminShell>{screen}</AdminShell>;
}
function Generic({title,description,items}:{title:string;description:string;items:string[]}){return <><PageHeader title={title} description={description}/><Section title="Frontend prototype capabilities"><div className="modifier-grid">{items.map((x,i)=><article key={x}><span className="metric-icon">{i+1}</span><h3>{x}</h3><p>Prepared for a typed future service adapter and server authorization.</p></article>)}</div></Section></>}
