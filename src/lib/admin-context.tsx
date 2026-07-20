"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedState } from "./mock-data";
import { createLocalAdminServices, type AdminServices } from "./mock-services";
import type { AdminSession, AdminState, RoleId } from "./types";

const STATE_KEY="maemes.admin.state.v1",SESSION_KEY="maemes.admin.session";
type Toast={id:number;message:string;tone:"success"|"danger"};
interface AdminContextValue { state:AdminState; session:AdminSession|null; hydrated:boolean; services:AdminServices; branchId:string; setBranchId:(id:string)=>void; login:(role:RoleId)=>Promise<void>; logout:()=>Promise<void>; toasts:Toast[]; notify:(message:string,tone?:Toast["tone"])=>void; reset:()=>void; }
const Context=createContext<AdminContextValue|null>(null);
const copySeed=()=>JSON.parse(JSON.stringify(seedState)) as AdminState;

export function AdminProvider({children}:{children:React.ReactNode}){
  const [state,setStateRaw]=useState<AdminState>(copySeed);
  const [session,setSession]=useState<AdminSession|null>(null);
  const [hydrated,setHydrated]=useState(false);
  const [branchId,setBranchId]=useState("all");
  const [toasts,setToasts]=useState<Toast[]>([]);
  // Browser persistence hydration is deliberate in this frontend-only prototype.
  useEffect(()=>{try{const stored=localStorage.getItem(STATE_KEY),savedSession=localStorage.getItem(SESSION_KEY);if(stored)setStateRaw(JSON.parse(stored) as AdminState);if(savedSession)setSession(JSON.parse(savedSession) as AdminSession);}catch{}setHydrated(true)},[]);
  const setState=useCallback((next:AdminState)=>{setStateRaw(next);try{localStorage.setItem(STATE_KEY,JSON.stringify(next))}catch{}},[]);
  const services=useMemo(()=>createLocalAdminServices(()=>state,setState),[state,setState]);
  const notify=useCallback((message:string,tone:Toast["tone"]="success")=>{const id=Date.now();setToasts(v=>[...v,{id,message,tone}]);setTimeout(()=>setToasts(v=>v.filter(t=>t.id!==id)),3200)},[]);
  const login=useCallback(async(role:RoleId)=>{const next=await services.auth.login(role);setSession(next);localStorage.setItem(SESSION_KEY,JSON.stringify(next));notify("Demo session started")},[services,notify]);
  const logout=useCallback(async()=>{await services.auth.logout();setSession(null);localStorage.removeItem(SESSION_KEY)},[services]);
  const reset=useCallback(()=>{const next=copySeed();setState(next);notify("Prototype data reset")},[setState,notify]);
  return <Context.Provider value={{state,session,hydrated,services,branchId,setBranchId,login,logout,toasts,notify,reset}}>{children}</Context.Provider>;
}
export function useAdmin(){const value=useContext(Context);if(!value)throw new Error("useAdmin must be used inside AdminProvider");return value}
