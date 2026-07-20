import { seedState } from "./mock-data";
import type { AdminSession, AdminState, AuditEvent, ListQuery, ListResult, ModuleKey, RoleId } from "./types";

export interface EntityService<T extends { id: string }> {
  list(query?: ListQuery): Promise<ListResult<T>>;
  get(id: string): Promise<T | undefined>;
  save(record: T): Promise<T>;
}
export interface AuthAdminService { login(roleId: RoleId): Promise<AdminSession>; logout(): Promise<void>; }
export interface DashboardService { summary(): Promise<{ revenue:number; orders:number; average:number; customers:number }>; }
export type OrderAdminService = EntityService<AdminState["orders"][number]> & { updateStatus(id:string,status:string):Promise<void> };
export type MenuAdminService = EntityService<AdminState["products"][number]>;
export type CategoryAdminService = EntityService<AdminState["categories"][number]>;
export interface ModifierAdminService { list(): Promise<string[]>; }
export type BranchAdminService = EntityService<AdminState["branches"][number]>;
export type CustomerAdminService = EntityService<AdminState["customers"][number]>;
export type PromotionAdminService = EntityService<AdminState["promotions"][number]>;
export type PaymentAdminService = EntityService<AdminState["payments"][number]>;
export interface ContentAdminService { list(): Promise<string[]>; }
export type NotificationAdminService = EntityService<AdminState["notifications"][number]>;
export interface ReportAdminService { summary(module: ModuleKey): Promise<number[]>; }
export type StaffAdminService = EntityService<AdminState["staff"][number]>;
export interface AssistantAdminService { test(message:string):Promise<string>; }
export interface SettingsAdminService { save(section:string):Promise<void>; }
export type AuditAdminService = EntityService<AuditEvent>;
export interface AdminServices {
  auth:AuthAdminService; dashboard:DashboardService; orders:OrderAdminService; menu:MenuAdminService;
  categories:CategoryAdminService; modifiers:ModifierAdminService; branches:BranchAdminService;
  customers:CustomerAdminService; promotions:PromotionAdminService; payments:PaymentAdminService;
  content:ContentAdminService; notifications:NotificationAdminService; reports:ReportAdminService;
  staff:StaffAdminService; assistant:AssistantAdminService; settings:SettingsAdminService; audit:AuditAdminService;
}

const wait=(ms=260)=>new Promise<void>(resolve=>setTimeout(resolve,ms));
const clone=<T,>(value:T):T=>JSON.parse(JSON.stringify(value)) as T;
const makeEntity=<K extends keyof AdminState>(key:K,getState:()=>AdminState,setState:(state:AdminState)=>void):EntityService<Extract<AdminState[K],{id:string}[]>[number]>=>({
  async list(query={}){await wait(); const all=(getState()[key] as unknown as {id:string;[k:string]:unknown}[]); const term=query.search?.toLowerCase(); let items=term?all.filter(x=>JSON.stringify(x).toLowerCase().includes(term)):all; if(query.status)items=items.filter(x=>String(x.status)===query.status); if(query.branchId)items=items.filter(x=>x.branchId===query.branchId||(Array.isArray(x.branches)&&x.branches.includes(query.branchId))); const page=query.page??1,pageSize=query.pageSize??10; return {items:clone(items.slice((page-1)*pageSize,page*pageSize)),total:items.length,page,pageSize} as never;},
  async get(id){await wait(120); return clone((getState()[key] as unknown as {id:string}[]).find(x=>x.id===id)) as never;},
  async save(record){await wait(); const state=clone(getState()); const list=state[key] as unknown as {id:string}[]; const index=list.findIndex(x=>x.id===record.id); if(index>=0) list[index]=clone(record); else list.unshift(clone(record)); setState(state); return clone(record) as never;}
});

export function createLocalAdminServices(getState:()=>AdminState,setState:(state:AdminState)=>void):AdminServices {
  const orders=makeEntity("orders",getState,setState);
  return {
    auth:{async login(roleId){await wait(); return {userId:"demo-admin",name:"Amelia Brooks",email:"admin@example.test",roleId,branchIds:roleId==="branch-manager"?["croydon"]:seedState.branches.map(b=>b.id)}},async logout(){await wait(120)}},
    dashboard:{async summary(){await wait();const o=getState().orders;return {revenue:o.reduce((a,b)=>a+b.total,0),orders:o.length,average:o.reduce((a,b)=>a+b.total,0)/o.length,customers:getState().customers.length}}},
    orders:{...orders,async updateStatus(id,status){const order=await orders.get(id);if(order)await orders.save({...order,status});}},
    menu:makeEntity("products",getState,setState),categories:makeEntity("categories",getState,setState),
    modifiers:{async list(){await wait();return ["Regular or Meal","Go Large","Flavours","Drinks","Fries","Piri Piri seasoning","Sides","Dips","Cake slices","Extras","Free toppings"]}},
    branches:makeEntity("branches",getState,setState),customers:makeEntity("customers",getState,setState),
    promotions:makeEntity("promotions",getState,setState),payments:makeEntity("payments",getState,setState),
    content:{async list(){await wait();return ["Homepage","Our Food","Our App","Store pages","Legal content","Newsletter"]}},
    notifications:makeEntity("notifications",getState,setState),
    reports:{async summary(){await wait();return [48,62,55,78,69,84,73]}},
    staff:makeEntity("staff",getState,setState),
    assistant:{async test(message){await wait(350);const m=message.toLowerCase();if(m.includes("burger"))return "I found Classic Chicken Burger and Smash Burger. Choose one to preview customisation.";if(m.includes("menu"))return "Choose a category: Grilled Collection, Maeme’s Burgers, Fried Chicken, Sides & Extras, or Drinks.";return getState().assistant.fallback;}},
    settings:{async save(){await wait()}},audit:makeEntity("audit",getState,setState),
  };
}
