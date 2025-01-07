import{P as L,a as k,p as v}from"./page-a83e8811.js";import{j as b,a as c,I,m as S}from"./index-d9a2bfe9.js";import{I as w,B as F}from"./button-38e16a92.js";import{I as P,l as g,r as V,w as E,t as x}from"./wrapEmojiText-52efa31a.js";import{L as A}from"./loginPage-db42028c.js";class C{constructor(e,t){this.container=e,this.input=t,this.passwordVisible=!1,this.onVisibilityClick=o=>{b(o),this.passwordVisible=!this.passwordVisible,this.toggleVisible.replaceChildren(w(this.passwordVisible?"eye2":"eye1")),this.input.type=this.passwordVisible?"text":"password",this.onVisibilityClickAdditional?.()},t.type="password",t.setAttribute("required",""),t.name="notsearch_password",t.autocomplete="off";const s=document.createElement("input");s.classList.add("stealthy"),s.tabIndex=-1,s.type="password",t.parentElement.prepend(s),t.parentElement.insertBefore(s.cloneNode(),t.nextSibling);const a=this.toggleVisible=document.createElement("span");a.classList.add("toggle-visible"),a.append(w("eye1")),e.classList.add("input-field-password"),e.append(a),a.addEventListener("click",this.onVisibilityClick),a.addEventListener("touchend",this.onVisibilityClick)}}class M extends P{constructor(e={}){super({plainText:!0,...e}),this.helpers=new C(this.container,this.input)}}class N{constructor(e,t){this.passwordInputField=e,this.size=t,this.needFrame=0,this.container=document.createElement("div"),this.container.classList.add("media-sticker-wrapper")}load(){return this.loadPromise?this.loadPromise:this.loadPromise=g.loadAnimationAsAsset({container:this.container,loop:!1,autoplay:!1,width:this.size,height:this.size,noCache:!0},"TwoFactorSetupMonkeyPeek").then(e=>(this.animation=e,this.animation.addEventListener("enterFrame",t=>{(this.animation.direction===1&&t>=this.needFrame||this.animation.direction===-1&&t<=this.needFrame)&&(this.animation.setSpeed(1),this.animation.pause())}),this.passwordInputField.helpers.onVisibilityClickAdditional=()=>{this.passwordInputField.helpers.passwordVisible?(this.animation.setDirection(1),this.animation.curFrame=0,this.needFrame=16,this.animation.play()):(this.animation.setDirection(-1),this.animation.curFrame=16,this.needFrame=0,this.animation.play())},g.waitForFirstFrame(e)))}remove(){this.animation&&this.animation.remove()}}function T(i){const e=document.createElement("span");return typeof i=="string"?e.innerHTML=i:e.append(i),e}let n;const z=()=>{const i=new A({className:"page-password",withInputWrapper:!0,titleLangKey:"Login.Password.Title",subtitleLangKey:"Login.Password.Subtitle"}),e=F("btn-primary btn-color-primary"),t=new I.IntlElement({key:"Login.Next"});e.append(t.element);const s=new M({label:"LoginPassword",name:"password"});n=s.input,i.inputWrapper.append(s.container,e);let a;const o=()=>(a||(a=window.setInterval(o,1e4)),c.managers.passwordManager.getState().then(r=>{l=r,l.hint?V(s.label,T(E(l.hint))):s.setLabel()}));let l;const h=r=>{if(r&&b(r),!n.value.length){n.classList.add("error");return}const f=x([n,e],!0),m=n.value;t.update({key:"PleaseWait"});const u=v(e);s.setValueSilently(""+Math.random()),s.setValueSilently(m),c.managers.passwordManager.check(m,l).then(p=>{switch(p._){case"auth.authorization":clearInterval(a),d&&d.remove();break;default:e.removeAttribute("disabled"),t.update({key:p._}),u.remove();break}}).catch(p=>{switch(f(),s.input.classList.add("error"),p.type){default:t.update({key:"PASSWORD_HASH_INVALID"}),n.select();break}u.remove(),o()})};k(e,h),n.addEventListener("keypress",function(r){if(this.classList.remove("error"),t.update({key:"Login.Next"}),r.key==="Enter")return h()});const y=S.isMobile?100:166,d=new N(s,y);return i.imageDiv.append(d.container),Promise.all([d.load(),o()])},j=new L("page-password",!0,z,null,()=>{n.focus(),c.managers.appStateManager.pushToState("authState",{_:"authStatePassword"})});export{j as default};
//# sourceMappingURL=pagePassword-d3657e8d.js.map
