import{d as l,c as n,o as u,b as _,h as r,z as c,t as d,_ as i}from"./index-BC3BUcym.js";var a=(e=>(e.ALIVE="Alive",e.DEAD="Dead",e.UNKNOW="unknown",e))(a||{});const p={class:"character-status"},v=l({__name:"CharacterStatus",props:{status:{}},setup(e){const o=e,t=n(()=>{let s;switch(o.status){case a.DEAD:s="red";break;case a.UNKNOW:s="orange";break;default:s="green";break}return s});return(s,h)=>(u(),_("div",p,[r("div",{class:"character-status__circle",style:c(`--color:${t.value}`)},null,4),r("div",{class:"character-status__text",style:c(`--color:${t.value}`)},d(s.status),5)]))}}),m=i(v,[["__scopeId","data-v-d9e78159"]]);export{m as C,a};
