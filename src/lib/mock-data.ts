import type { AdminState, DemoRole } from "./types";

export const roles: DemoRole[] = [
  { id: "super-admin", name: "Super Admin", description: "Full prototype access", modules: ["dashboard","orders","menu","branches","customers","promotions","payments","content","notifications","reports","staff","ai-assistant","settings","audit-log"] },
  { id: "branch-manager", name: "Branch Manager", description: "Branch operations and assigned staff", modules: ["dashboard","orders","branches","customers","reports","staff"] },
  { id: "order-manager", name: "Order Manager", description: "Order and customer operations", modules: ["dashboard","orders","customers"] },
  { id: "menu-manager", name: "Menu Manager", description: "Catalogue and modifier management", modules: ["dashboard","menu"] },
  { id: "marketing-manager", name: "Marketing Manager", description: "Campaigns and customer content", modules: ["dashboard","promotions","content","notifications","ai-assistant","reports"] },
  { id: "support", name: "Support Staff", description: "Customer support and order lookup", modules: ["dashboard","orders","customers"] },
];

const branches = [
  { id:"croydon",name:"Maeme’s Croydon",address:"45 London Road, Croydon",postcode:"CR0 2RF",phone:"020 8000 1001",email:"croydon@example.test",status:"Open" as const,active:true,delivery:true,collection:true,fee:2.49,minimum:12,deliveryEstimate:"35–45 min",collectionEstimate:"15–20 min",manager:"Amelia Brooks" },
  { id:"tooting",name:"Maeme’s Tooting",address:"118 Upper Tooting Road, London",postcode:"SW17 7EN",phone:"020 8000 1002",email:"tooting@example.test",status:"Opening Soon" as const,active:true,delivery:true,collection:true,fee:1.99,minimum:10,deliveryEstimate:"30–40 min",collectionEstimate:"15 min",manager:"Noah Shah" },
  { id:"bromley",name:"Maeme’s Bromley",address:"82 High Street, Bromley",postcode:"BR1 1EY",phone:"020 8000 1003",email:"bromley@example.test",status:"Closed" as const,active:true,delivery:false,collection:true,fee:2.99,minimum:15,deliveryEstimate:"Unavailable",collectionEstimate:"20 min",manager:"Maya Lewis" },
];
const categoryNames = ["Offers","Grilled Collection","Maeme’s Burgers","Fried Wings","Fried Chicken","Fried Boneless","Box Meals","Sharing Meal","Vegetarian Collection","Fried Collection","Maeme’s Platter","Kids Meal","Dessert Collection","Sides & Extras","Ice Cream","Dips","Milkshakes","Drinks"];
const products = [
  ["prd-101","Quarter Chicken","Grilled Collection",5.49,420],["prd-102","Chicken Nuggets — 5 Pieces","Fried Boneless",3.5,310],
  ["prd-103","Classic Chicken Burger","Maeme’s Burgers",6.49,590],["prd-104","Smash Burger","Maeme’s Burgers",7.49,720],
  ["prd-105","6 Fried Wings","Fried Wings",5.99,640],["prd-106","Chicken & Rice Box","Box Meals",8.99,820],
  ["prd-107","Family Platter","Maeme’s Platter",24.99,2400],["prd-108","Halloumi Wrap","Vegetarian Collection",6.25,510],
  ["prd-109","Piri Piri Fries","Sides & Extras",3.25,390],["prd-110","Chocolate Cake Slice","Dessert Collection",3.75,430],
  ["prd-111","Garlic Sauce","Dips",0.5,90],["prd-112","Oreo Milkshake","Milkshakes",4.95,610],
].map(([id,name,category,price,calories],i)=>({id:String(id),name:String(name),category:String(category),description:`Freshly prepared ${String(name).toLowerCase()} from Maeme’s active menu reference.`,price:Number(price),mealPrice:i<9?Number(price)+2:undefined,largePrice:i<9?0.9:undefined,calories:Number(calories),status:(i===9?"Unavailable":"Available") as "Available"|"Unavailable",popular:[0,2,3,6].includes(i),featured:[0,3,6].includes(i),behaviour:(i>8?"Direct Add":"Customise") as "Direct Add"|"Customise",branches:branches.map(b=>b.id),sortOrder:i+1,version:1}));

const orderStatuses=["New","Confirmed","Preparing","Ready for Collection","Out for Delivery","Delivered","Collected","Cancelled","Refund Requested","Refunded"];
const orders=Array.from({length:24},(_,i)=>({id:`ord-${1001+i}`,number:`MM-${24071+i}`,customer:["Aisha Khan","Daniel Reed","Sofia Patel","Leo Williams"][i%4],phone:`07•• ••• ${String(1200+i).slice(-4)}`,branchId:branches[i%3].id,type:(i%3===0?"Collection":"Delivery") as "Collection"|"Delivery",status:orderStatuses[i%orderStatuses.length],paymentStatus:i%7===0?"Failed":i%9===0?"Refunded":"Paid",paymentMethod:i%3===0?"Cash on Delivery":"Visa •••• 4242",total:Number((12.5+(i*2.37)%42).toFixed(2)),createdAt:new Date(Date.now()-i*36e5).toISOString(),address:i%3===0?undefined:`${12+i} Fictional Road, London`,lines:[{name:products[i%products.length].name,quantity:1+(i%2),price:products[i%products.length].price,modifiers:i%2?["Meal","Medium","Piri Piri Fries"]:["Regular","Lemon & Herb"]}],notes:i%5===0?"No cutlery, please.":undefined}));

export const seedState: AdminState = {
  branches,
  products,
  categories: categoryNames.map((name,i)=>({id:`cat-${i+1}`,name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),products:products.filter(p=>p.category===name).length,visible:true,sortOrder:i+1,status:"Published"})),
  orders,
  customers:Array.from({length:10},(_,i)=>({id:`cus-${i+1}`,name:["Aisha Khan","Daniel Reed","Sofia Patel","Leo Williams","Mia Clarke"][i%5]+(i>4?` ${i}`:""),email:`customer${i+1}@example.test`,phone:`07•• ••• ${2200+i}`,joined:`2026-0${(i%6)+1}-12`,branchId:branches[i%3].id,orders:2+i,spend:55+i*37,status:i===8?"Suspended":"Active",consent:i%3!==0,addresses:[`${20+i} Example Street, London`],favourites:[products[i%products.length].name],notes:i%4===0?["Requested contact about a late demo order."]:[]})),
  promotions:[
    {id:"pro-1",name:"Welcome 20%","code":"WELCOME20",type:"Percentage",value:20,minimum:15,starts:"2026-07-01",ends:"2026-08-31",status:"Active",redemptions:184},
    {id:"pro-2",name:"Free Delivery Friday","code":"FREEFRIDAY",type:"Free delivery",value:0,minimum:20,starts:"2026-07-01",ends:"2026-09-30",status:"Scheduled",redemptions:72},
    {id:"pro-3",name:"Family Feast","code":"FAMILY5",type:"Fixed",value:5,minimum:30,starts:"2026-06-01",ends:"2026-07-31",status:"Active",redemptions:96},
  ],
  payments:orders.slice(0,16).map((o,i)=>({id:`pay-${i+1}`,orderId:o.id,customer:o.customer,method:o.paymentMethod,providerRef:`DEMO-${81000+i}`,amount:o.total,status:o.paymentStatus,createdAt:o.createdAt})),
  staff:[
    {id:"staff-1",name:"Amelia Brooks",email:"amelia@example.test",roleId:"super-admin",branchIds:branches.map(b=>b.id),status:"Active",lastLogin:"Today, 08:42"},
    {id:"staff-2",name:"Noah Shah",email:"noah@example.test",roleId:"branch-manager",branchIds:["croydon"],status:"Active",lastLogin:"Yesterday, 18:10"},
    {id:"staff-3",name:"Maya Lewis",email:"maya@example.test",roleId:"menu-manager",branchIds:branches.map(b=>b.id),status:"Invited",lastLogin:"Never"},
  ],
  notifications:[
    {id:"not-1",title:"Weekend meal deal",channel:"App push",audience:"All customers",status:"Scheduled",scheduledAt:"2026-07-24 11:00"},
    {id:"not-2",title:"Croydon opening hours",channel:"Website announcement",audience:"Croydon customers",status:"Sent",scheduledAt:"2026-07-19 09:00"},
  ],
  assistant:{enabled:true,welcome:"Hi, I’m Maeme’s Ordering Assistant. What would you like today?",quickReplies:["Start an order","View the menu","Reorder a favourite"],voice:true,recommendations:true,favourites:true,reorder:true,maxRecommendations:4,fallback:"I couldn’t match that. Try a product or menu category.",unavailable:"That item is currently unavailable.",closedBranch:"This branch is currently closed. Please choose another branch.",version:3},
  audit:Array.from({length:18},(_,i)=>({id:`audit-${i+1}`,staff:["Amelia Brooks","Noah Shah","Maya Lewis"][i%3],role:["Super Admin","Branch Manager","Menu Manager"][i%3],action:["Updated","Published","Viewed","Archived"][i%4],module:["Orders","Menu","Branches","Content"][i%4],record:`Record ${100+i}`,timestamp:new Date(Date.now()-i*72e5).toISOString(),branch:i%2?"Croydon":"All branches",result:i===13?"Failed":"Success",ip:"192.0.2.••"})),
};
