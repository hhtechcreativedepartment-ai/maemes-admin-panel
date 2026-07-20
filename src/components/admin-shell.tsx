"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigation } from "@/config/navigation";
import { roles } from "@/lib/mock-data";
import { useAdmin } from "@/lib/admin-context";
import { Toasts } from "./ui";

export function AdminShell({children}:{children:React.ReactNode}){
 const {session,hydrated,state,branchId,setBranchId,logout,toasts}=useAdmin();const pathname=usePathname();const router=useRouter();
 const [open,setOpen]=useState(false),[collapsed,setCollapsed]=useState(false),[search,setSearch]=useState(""),[profile,setProfile]=useState(false),[notices,setNotices]=useState(false);
 useEffect(()=>{if(hydrated&&!session)router.replace(`/login?next=${encodeURIComponent(pathname)}`)},[hydrated,session,pathname,router]);
 const role=roles.find(r=>r.id===session?.roleId);const groups=useMemo(()=>navigation.map(g=>({...g,items:g.items.filter(i=>role?.modules.includes(i.module))})).filter(g=>g.items.length),[role]);
 if(!hydrated)return <div className="app-loader"><span className="brand-mark">M</span><p>Preparing your workspace…</p></div>;
 if(!session)return <div className="app-loader"><span className="brand-mark">M</span></div>;
 const crumbs=pathname.split("/").filter(Boolean);
 return <div className={`app-shell ${collapsed?"is-collapsed":""}`}>
  <aside className={`sidebar ${open?"is-open":""}`} aria-label="Main navigation">
   <div className="sidebar-brand"><span className="brand-mark">M</span><div><strong>Maeme’s</strong><small>Management Control</small></div><button onClick={()=>setOpen(false)} className="mobile-only" aria-label="Close navigation">×</button></div>
   <nav>{groups.map(g=><div className="nav-group" key={g.label}><p>{g.label}</p>{g.items.map(i=><Link onClick={()=>setOpen(false)} key={i.href} href={i.href} className={pathname===i.href||pathname.startsWith(i.href+"/")?"active":""}><i>{i.icon}</i><span>{i.label}</span></Link>)}</div>)}</nav>
   <div className="sidebar-foot"><Link href="/settings">? <span>Help & support</span></Link><button onClick={()=>setCollapsed(v=>!v)}><i>⇤</i><span>Collapse sidebar</span></button></div>
  </aside>
  {open&&<button className="drawer-scrim" aria-label="Close navigation" onClick={()=>setOpen(false)}/>}
  <div className="workspace">
   <header className="topbar">
    <button className="menu-toggle" aria-label="Open navigation" onClick={()=>setOpen(true)}>☰</button>
    <label className="global-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&search.trim())router.push(`/orders?search=${encodeURIComponent(search)}`)}} placeholder="Search orders, products, customers…"/><kbd>⌘ K</kbd></label>
    <label className="branch-select"><span className="sr-only">Current branch</span><select value={branchId} onChange={e=>setBranchId(e.target.value)}><option value="all">All branches</option>{state.branches.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}</select></label>
    <div className="popover-wrap"><button className="icon-btn" aria-label="Notifications" onClick={()=>setNotices(v=>!v)}>♢<b>3</b></button>{notices&&<div className="popover notice-pop"><h3>Operational alerts</h3><p><b>Failed payment</b><small>Order MM-24078 · 8 min ago</small></p><p><b>Bromley is closed</b><small>Collection remains scheduled</small></p><Link href="/notifications">Open notification centre</Link></div>}</div>
    <div className="popover-wrap"><button className="profile-button" onClick={()=>setProfile(v=>!v)}><span>AB</span><div><b>{session.name}</b><small>{role?.name}</small></div><i>⌄</i></button>{profile&&<div className="popover profile-pop"><p>{session.email}<small>Frontend prototype account</small></p><Link href="/settings">Profile settings</Link><button onClick={async()=>{await logout();router.push("/login")}}>Log out</button></div>}</div>
   </header>
   <div className="breadcrumbs"><Link href="/dashboard">Home</Link>{crumbs.map((c,i)=><span key={`${c}-${i}`}>› <span>{c.replaceAll("-"," ")}</span></span>)}</div>
   <main id="main-content">{children}</main>
  </div>
  <Toasts items={toasts}/>
 </div>
}
