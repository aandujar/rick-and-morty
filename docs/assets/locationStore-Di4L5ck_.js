var h=Object.defineProperty;var L=(n,t,s)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[t]=s;var a=(n,t,s)=>L(n,typeof t!="symbol"?t+"":t,s);import{A as y,i as m}from"./index-BC3BUcym.js";import{a as g}from"./http-common-BMdtxsgn.js";class p{getAll(t){return g.get("/location",{params:t})}getById(t){return g.get(`/location/${t}`)}}const l=new p;class v{constructor(t,s,o,r,c){a(this,"id");a(this,"name");a(this,"type");a(this,"dimension");a(this,"residents");a(this,"image");this.id=t,this.name=s,this.type=o,this.dimension=r,this.residents=c,this.image=`/src/assets/images/dimension/${this.id}.jpg`}}const B=y("location",()=>{const n=m(!1),t=m([]);let s=m({});function o(e){t.value=[...e]}function r(e){e!=null&&e.id?s.value=new v(e.id,e.name,e.type,e.dimension,e.residents):s.value={}}async function c(e){return new Promise((d,u)=>{l.getAll(e).then(i=>{o(i.status===200?i.data.results:[]),d(i.data.info)}).catch(i=>{o([]),u(i)})})}async function f(e){return new Promise((d,u)=>{l.getById(e).then(i=>{r(i.status===200?i.data:{}),d(i.data)}).catch(i=>{r({}),u(i)})})}return{locations:t,loading:n,locationDetail:s,getLocations:c,setLocations:o,getLocationById:f,setLocation:r}});export{v as L,B as u};