import{a as o,A as s,_ as r,S as m}from"./index-55db424e.js";import{p as h}from"./putPreloader-57526610.js";import{P as d}from"./page-21062680.js";let i;const g=async()=>{const{dcId:e,token:u,tgAddr:n}=i;let a;try{o.managers.apiManager.setBaseDcId(e);const t=await o.managers.apiManager.invokeApi("auth.importWebTokenAuthorization",{api_id:s.id,api_hash:s.hash,web_auth_token:u},{dcId:e,ignoreErrors:!0});t._==="auth.authorization"&&(o.managers.apiManager.setUser(t.user),a=r(()=>import("./pageIm-cf5006d3.js"),["./pageIm-cf5006d3.js","./index-55db424e.js","./index-5c4b8e53.css","./page-21062680.js"],import.meta.url))}catch(t){switch(t.type){case"SESSION_PASSWORD_NEEDED":{t.handled=!0,a=r(()=>import("./pagePassword-904ac80e.js"),["./pagePassword-904ac80e.js","./index-55db424e.js","./index-5c4b8e53.css","./putPreloader-57526610.js","./page-21062680.js","./button-d617d270.js","./htmlToSpan-f8875352.js","./wrapEmojiText-b6556074.js","./loginPage-e49e5df0.js"],import.meta.url);break}default:{console.error("authorization import error:",t);const p=m.authState._;p==="authStateSignIn"?a=r(()=>import("./pageSignIn-ecca6b7a.js"),["./pageSignIn-ecca6b7a.js","./index-55db424e.js","./index-5c4b8e53.css","./putPreloader-57526610.js","./page-21062680.js","./countryInputField-f93f47c8.js","./button-d617d270.js","./wrapEmojiText-b6556074.js","./scrollable-8e639525.js","./pageSignQR-7e1dddc7.js","./textToSvgURL-c6ebb454.js"],import.meta.url):p==="authStateSignQr"&&(a=r(()=>import("./pageSignQR-7e1dddc7.js").then(_=>_.a),["./pageSignQR-7e1dddc7.js","./index-55db424e.js","./index-5c4b8e53.css","./page-21062680.js","./button-d617d270.js","./putPreloader-57526610.js","./textToSvgURL-c6ebb454.js"],import.meta.url));break}}}location.hash=n?.trim()?"#?tgaddr="+encodeURIComponent(n):"",a&&a.then(t=>t.default.mount())},l=new d("page-signImport",!0,()=>{h(l.pageEl.firstElementChild,!0),g()},e=>{i=e,o.managers.appStateManager.pushToState("authState",{_:"authStateSignImport",data:i})});export{l as default};
//# sourceMappingURL=pageSignImport-e1a46864.js.map
