(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function F(){}function Le(e){return e()}function Te(){return Object.create(null)}function W(e){e.forEach(Le)}function Qe(e){return typeof e=="function"}function Z(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let de;function $e(e,t){return de||(de=document.createElement("a")),de.href=t,e===de.href}function Xe(e){return Object.keys(e).length===0}function je(e,...t){if(e==null)return F;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Ne(e){let t;return je(e,n=>t=n)(),t}function Ye(e,t,n){e.$$.on_destroy.push(je(t,n))}let ge=!1;function Je(){ge=!0}function Ze(){ge=!1}function xe(e,t,n,r){for(;e<t;){const i=e+(t-e>>1);n(i)<=r?e=i+1:t=i}return e}function et(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const c=[];for(let s=0;s<t.length;s++){const u=t[s];u.claim_order!==void 0&&c.push(u)}t=c}const n=new Int32Array(t.length+1),r=new Int32Array(t.length);n[0]=-1;let i=0;for(let c=0;c<t.length;c++){const s=t[c].claim_order,u=(i>0&&t[n[i]].claim_order<=s?i+1:xe(1,i,h=>t[n[h]].claim_order,s))-1;r[c]=n[u]+1;const f=u+1;n[f]=c,i=Math.max(f,i)}const o=[],l=[];let a=t.length-1;for(let c=n[i]+1;c!=0;c=r[c-1]){for(o.push(t[c-1]);a>=c;a--)l.push(t[a]);a--}for(;a>=0;a--)l.push(t[a]);o.reverse(),l.sort((c,s)=>c.claim_order-s.claim_order);for(let c=0,s=0;c<l.length;c++){for(;s<o.length&&l[c].claim_order>=o[s].claim_order;)s++;const u=s<o.length?o[s]:null;e.insertBefore(l[c],u)}}function _(e,t){if(ge){for(et(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function M(e,t,n){ge&&!n?_(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function y(e){e.parentNode.removeChild(e)}function Fe(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function v(e){return document.createElement(e)}function C(e){return document.createTextNode(e)}function G(){return C(" ")}function A(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function $(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function K(e){return e===""?null:+e}function R(e){return Array.from(e.childNodes)}function tt(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function Ge(e,t,n,r,i=!1){tt(e);const o=(()=>{for(let l=e.claim_info.last_index;l<e.length;l++){const a=e[l];if(t(a)){const c=n(a);return c===void 0?e.splice(l,1):e[l]=c,i||(e.claim_info.last_index=l),a}}for(let l=e.claim_info.last_index-1;l>=0;l--){const a=e[l];if(t(a)){const c=n(a);return c===void 0?e.splice(l,1):e[l]=c,i?c===void 0&&e.claim_info.last_index--:e.claim_info.last_index=l,a}}return r()})();return o.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,o}function nt(e,t,n,r){return Ge(e,i=>i.nodeName===t,i=>{const o=[];for(let l=0;l<i.attributes.length;l++){const a=i.attributes[l];n[a.name]||o.push(a.name)}o.forEach(l=>i.removeAttribute(l))},()=>r(t))}function w(e,t,n){return nt(e,t,n,v)}function P(e,t){return Ge(e,n=>n.nodeType===3,n=>{const r=""+t;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>C(t),!0)}function q(e){return P(e," ")}function L(e,t){e.value=t==null?"":t}function Se(e,t){for(let n=0;n<e.options.length;n+=1){const r=e.options[n];if(r.__value===t){r.selected=!0;return}}e.selectedIndex=-1}function rt(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function Ce(e,t,n){e.classList[n?"add":"remove"](t)}let fe;function ae(e){fe=e}function lt(){if(!fe)throw new Error("Function called outside component initialization");return fe}function it(e){lt().$$.on_mount.push(e)}function ot(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(r=>r.call(this,t))}const se=[],ve=[],pe=[],Pe=[],st=Promise.resolve();let we=!1;function ut(){we||(we=!0,st.then(qe))}function me(e){pe.push(e)}const be=new Set;let he=0;function qe(){const e=fe;do{for(;he<se.length;){const t=se[he];he++,ae(t),ct(t.$$)}for(ae(null),se.length=0,he=0;ve.length;)ve.pop()();for(let t=0;t<pe.length;t+=1){const n=pe[t];be.has(n)||(be.add(n),n())}pe.length=0}while(se.length);for(;Pe.length;)Pe.pop()();we=!1,be.clear(),ae(e)}function ct(e){if(e.fragment!==null){e.update(),W(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(me)}}const _e=new Set;let Y;function at(){Y={r:0,c:[],p:Y}}function ft(){Y.r||W(Y.c),Y=Y.p}function H(e,t){e&&e.i&&(_e.delete(e),e.i(t))}function J(e,t,n,r){if(e&&e.o){if(_e.has(e))return;_e.add(e),Y.c.push(()=>{_e.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}}function ue(e){e&&e.c()}function ce(e,t){e&&e.l(t)}function ee(e,t,n,r){const{fragment:i,on_mount:o,on_destroy:l,after_update:a}=e.$$;i&&i.m(t,n),r||me(()=>{const c=o.map(Le).filter(Qe);l?l.push(...c):W(c),e.$$.on_mount=[]}),a.forEach(me)}function te(e,t){const n=e.$$;n.fragment!==null&&(W(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(e,t){e.$$.dirty[0]===-1&&(se.push(e),ut(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ne(e,t,n,r,i,o,l,a=[-1]){const c=fe;ae(e);const s=e.$$={fragment:null,ctx:null,props:o,update:F,not_equal:i,bound:Te(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:Te(),dirty:a,skip_bound:!1,root:t.target||c.$$.root};l&&l(s.root);let u=!1;if(s.ctx=n?n(e,t.props||{},(f,h,...m)=>{const k=m.length?m[0]:h;return s.ctx&&i(s.ctx[f],s.ctx[f]=k)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](k),u&&dt(e,f)),h}):[],s.update(),u=!0,W(s.before_update),s.fragment=r?r(s.ctx):!1,t.target){if(t.hydrate){Je();const f=R(t.target);s.fragment&&s.fragment.l(f),f.forEach(y)}else s.fragment&&s.fragment.c();t.intro&&H(e.$$.fragment),ee(e,t.target,t.anchor,t.customElement),Ze(),qe()}ae(c)}class re{$destroy(){te(this,1),this.$destroy=F}$on(t,n){const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!Xe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const x=[];function ht(e,t=F){let n;const r=new Set;function i(a){if(Z(e,a)&&(e=a,n)){const c=!x.length;for(const s of r)s[1](),x.push(s,e);if(c){for(let s=0;s<x.length;s+=2)x[s][0](x[s+1]);x.length=0}}}function o(a){i(a(e))}function l(a,c=F){const s=[a,c];return r.add(s),r.size===1&&(n=t(i)||F),a(e),()=>{r.delete(s),r.size===0&&(n(),n=null)}}return{set:i,update:o,subscribe:l}}function z(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function ze(e,t){const n=indexedDB.open(e);n.onupgradeneeded=()=>n.result.createObjectStore(t);const r=z(n);return(i,o)=>r.then(l=>o(l.transaction(t,i).objectStore(t)))}let ye;function V(){return ye||(ye=ze("keyval-store","keyval")),ye}function Ve(e,t=V()){return t("readonly",n=>z(n.get(e)))}function Ke(e,t,n=V()){return n("readwrite",r=>(r.put(t,e),z(r.transaction)))}function pt(e,t=V()){return t("readwrite",n=>(e.forEach(r=>n.put(r[1],r[0])),z(n.transaction)))}function _t(e,t=V()){return t("readonly",n=>Promise.all(e.map(r=>z(n.get(r)))))}function mt(e,t,n=V()){return n("readwrite",r=>new Promise((i,o)=>{r.get(e).onsuccess=function(){try{r.put(t(this.result),e),i(z(r.transaction))}catch(l){o(l)}}}))}function We(e,t=V()){return t("readwrite",n=>(n.delete(e),z(n.transaction)))}function gt(e,t=V()){return t("readwrite",n=>(e.forEach(r=>n.delete(r)),z(n.transaction)))}function bt(e=V()){return e("readwrite",t=>(t.clear(),z(t.transaction)))}function Ee(e,t){return e.openCursor().onsuccess=function(){!this.result||(t(this.result),this.result.continue())},z(e.transaction)}function yt(e=V()){return e("readonly",t=>{if(t.getAllKeys)return z(t.getAllKeys());const n=[];return Ee(t,r=>n.push(r.key)).then(()=>n)})}function vt(e=V()){return e("readonly",t=>{if(t.getAll)return z(t.getAll());const n=[];return Ee(t,r=>n.push(r.value)).then(()=>n)})}function wt(e=V()){return e("readonly",t=>{if(t.getAll&&t.getAllKeys)return Promise.all([z(t.getAllKeys()),z(t.getAll())]).then(([r,i])=>r.map((o,l)=>[o,i[l]]));const n=[];return e("readonly",r=>Ee(r,i=>n.push([i.key,i.value])).then(()=>n))})}const kt=Object.freeze(Object.defineProperty({__proto__:null,clear:bt,createStore:ze,del:We,delMany:gt,entries:wt,get:Ve,getMany:_t,keys:yt,promisifyRequest:z,set:Ke,setMany:pt,update:mt,values:vt},Symbol.toStringTag,{value:"Module"})),{get:Et,set:It}=kt,Tt=(e,t)=>{const n=ht(t);return typeof indexedDB>"u"||((async()=>{const r=await Et(e);r!=null&&n.set(r)})(),n.subscribe(r=>{It(e,r)})),n};function $t(e){return new Promise(t=>{const n=new FileReader;n.readAsDataURL(e),n.onload=async()=>{typeof n.result=="string"&&t(n.result)}})}const Q=Nt();function Nt(){const{subscribe:e,update:t,set:n}=Tt("chosen-images",[]);return{subscribe:e,push:(...r)=>{t(i=>[...i,...r])},delete:(...r)=>{t(i=>{var o;for(let l of r)(o=i[l])!=null&&o.FullResKey&&We(i[l].FullResKey),i[l]=null;return i.filter(l=>l)})},get:()=>Ne(Q),getLink:async r=>{const i=Ne(Q)[r];if(i.FullResKey){const o=await Ve(i.FullResKey);return await $t(o)}return i.url}}}function St(e){let t,n,r,i,o;return{c(){t=v("img"),this.h()},l(l){t=w(l,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){$e(t.src,n=e[0].url)||$(t,"src",n),$(t,"alt",r=e[0].name),$(t,"class","svelte-9h94g7"),Ce(t,"selected",e[1])},m(l,a){M(l,t,a),i||(o=A(t,"click",e[2]),i=!0)},p(l,[a]){a&1&&!$e(t.src,n=l[0].url)&&$(t,"src",n),a&1&&r!==(r=l[0].name)&&$(t,"alt",r),a&2&&Ce(t,"selected",l[1])},i:F,o:F,d(l){l&&y(t),i=!1,o()}}}function Ct(e,t,n){let{data:r}=t,{selected:i}=t;function o(l){ot.call(this,e,l)}return e.$$set=l=>{"data"in l&&n(0,r=l.data),"selected"in l&&n(1,i=l.selected)},[r,i,o]}class Pt extends re{constructor(t){super(),ne(this,t,Ct,St,Z,{data:0,selected:1})}}function Re(e,t,n){const r=e.slice();return r[6]=t[n],r[8]=n,r}function Ue(e){let t,n;function r(){return e[5](e[8])}return t=new Pt({props:{data:e[6],selected:e[0][e[8]]}}),t.$on("click",r),{c(){ue(t.$$.fragment)},l(i){ce(t.$$.fragment,i)},m(i,o){ee(t,i,o),n=!0},p(i,o){e=i;const l={};o&2&&(l.data=e[6]),o&1&&(l.selected=e[0][e[8]]),t.$set(l)},i(i){n||(H(t.$$.fragment,i),n=!0)},o(i){J(t.$$.fragment,i),n=!1},d(i){te(t,i)}}}function Rt(e){let t,n,r,i,o,l,a,c,s,u,f,h,m,k,U,S=e[1],b=[];for(let p=0;p<S.length;p+=1)b[p]=Ue(Re(e,S,p));const j=p=>J(b[p],1,1,()=>{b[p]=null});return{c(){t=v("div"),n=v("div"),r=v("button"),i=C("delete"),o=G(),l=v("button"),a=C("unselect"),c=G(),s=v("button"),u=C("invert selection"),f=G(),h=v("div");for(let p=0;p<b.length;p+=1)b[p].c();this.h()},l(p){t=w(p,"DIV",{class:!0});var g=R(t);n=w(g,"DIV",{class:!0});var d=R(n);r=w(d,"BUTTON",{});var E=R(r);i=P(E,"delete"),E.forEach(y),o=q(d),l=w(d,"BUTTON",{});var N=R(l);a=P(N,"unselect"),N.forEach(y),c=q(d),s=w(d,"BUTTON",{});var D=R(s);u=P(D,"invert selection"),D.forEach(y),d.forEach(y),f=q(g),h=w(g,"DIV",{class:!0});var B=R(h);for(let I=0;I<b.length;I+=1)b[I].l(B);B.forEach(y),g.forEach(y),this.h()},h(){$(n,"class","header"),$(h,"class","content svelte-115ye2s"),$(t,"class","gallery")},m(p,g){M(p,t,g),_(t,n),_(n,r),_(r,i),_(n,o),_(n,l),_(l,a),_(n,c),_(n,s),_(s,u),_(t,f),_(t,h);for(let d=0;d<b.length;d+=1)b[d].m(h,null);m=!0,k||(U=[A(r,"click",e[2]),A(l,"click",e[4]),A(s,"click",e[3])],k=!0)},p(p,[g]){if(g&3){S=p[1];let d;for(d=0;d<S.length;d+=1){const E=Re(p,S,d);b[d]?(b[d].p(E,g),H(b[d],1)):(b[d]=Ue(E),b[d].c(),H(b[d],1),b[d].m(h,null))}for(at(),d=S.length;d<b.length;d+=1)j(d);ft()}},i(p){if(!m){for(let g=0;g<S.length;g+=1)H(b[g]);m=!0}},o(p){b=b.filter(Boolean);for(let g=0;g<b.length;g+=1)J(b[g]);m=!1},d(p){p&&y(t),Fe(b,p),k=!1,W(U)}}}function Ut(e,t,n){let r;Ye(e,Q,s=>n(1,r=s));let i={};function o(){const s=Object.entries(i).filter(u=>u[1]).map(u=>Number(u[0]));Q.delete(...s),n(0,i={})}function l(){n(0,i=Object.fromEntries(r.map((s,u)=>[u,!i[u]])))}return[i,r,o,l,()=>n(0,i={}),s=>n(0,i[s]=!i[s],i)]}class Bt extends re{constructor(t){super(),ne(this,t,Ut,Rt,Z,{})}}function At(){return new Worker("/assets/worker2.d62fb0ab.js")}function Dt(e){let t,n,r;return{c(){t=v("input"),this.h()},l(i){t=w(i,"INPUT",{type:!0,accept:!0}),this.h()},h(){$(t,"type","file"),t.multiple=!0,$(t,"accept","image/*")},m(i,o){M(i,t,o),n||(r=A(t,"change",e[0]),n=!0)},p:F,i:F,o:F,d(i){i&&y(t),n=!1,r()}}}function Ot(e){let t;const n=async c=>{const s=c.target,{files:u}=s;o(),console.log(u);for(const f of u)i({type:"process",data:f})},r=c=>{const s={name:c.name,url:c.thumbnail,FullResKey:a(c.largeSize)};Q.push(s)},i=c=>{console.log("post message"),!(typeof Worker>"u"||!t)&&(console.log("ok"),t.postMessage(c))},o=()=>{console.log("starting woker"),!(typeof Worker>"u"||t)&&(console.log("ok"),t=new At,t.onmessage=l,console.log("worker is:",t))},l=c=>{const s=c.data;switch(console.log(s),s.type){case"process":r(s.data);break;default:console.log(s.type,s.data);break}};function a(c){const s=Date.now().toString();return Ke(s,c),s}return[n]}class Mt extends re{constructor(t){super(),ne(this,t,Ot,Dt,Z,{})}}async function Lt(e,t){let{subreddits:n,keywords:r,nsfw:i,count:o=10}=t;n.length==0&&(n=[""]),r.length==0&&(r=[""]),e+=e.includes("?")?"&":"?";const l=e+"include_over_18="+(i?"on":"off");n=n.map(m=>m.toLowerCase()),r=r.map(m=>m.toLowerCase());const a=Math.min(o,100),c=[];let s=await Be(`${l}&limit=${a}`),u=s.children;const f=m=>{let k=m.data;return n.some(U=>k.subreddit.toLowerCase().includes(U))||r.some(U=>k.title.toLowerCase().includes(U))};for(let m=0;m<u.length;m++)f(u[m])&&c.push(u[m].data);let h=u.length;for(;(s==null?void 0:s.after)&&h<o;){s=await Be(e+"&after="+s.after),u=s.children;for(let m=0;m<u.length;m++)f(u[m])&&c.push(u[m].data);h+=u.length}return c}async function Be(e){try{console.log("fetch",e);const t=await fetch(e);return t.status==403&&console.log("forbidden, don't forget to sign into reddit"),console.log(t),(await t.json()).data}catch(t){console.log(t)}}function Ae(e,t,n){const r=e.slice();return r[20]=t[n],r}function jt(e){let t,n,r,i,o,l,a,c,s=e[2]==0&&De(e);return{c(){s&&s.c(),t=C(`\r
            search: `),n=v("input"),r=v("br"),i=C(`\r
            subreddits: `),o=v("input"),l=v("br"),this.h()},l(u){s&&s.l(u),t=P(u,`\r
            search: `),n=w(u,"INPUT",{type:!0,placeholder:!0}),r=w(u,"BR",{}),i=P(u,`\r
            subreddits: `),o=w(u,"INPUT",{type:!0,placeholder:!0}),l=w(u,"BR",{}),this.h()},h(){$(n,"type","text"),$(n,"placeholder",'keywords split by " ,;"'),$(o,"type","text"),$(o,"placeholder",'keywords split by " ,;"')},m(u,f){s&&s.m(u,f),M(u,t,f),M(u,n,f),L(n,e[1]),M(u,r,f),M(u,i,f),M(u,o,f),L(o,e[0]),M(u,l,f),a||(c=[A(n,"input",e[15]),A(o,"input",e[16])],a=!0)},p(u,f){u[2]==0?s?s.p(u,f):(s=De(u),s.c(),s.m(t.parentNode,t)):s&&(s.d(1),s=null),f&2&&n.value!==u[1]&&L(n,u[1]),f&1&&o.value!==u[0]&&L(o,u[0])},d(u){s&&s.d(u),u&&y(t),u&&y(n),u&&y(r),u&&y(i),u&&y(o),u&&y(l),a=!1,W(c)}}}function Ft(e){let t,n,r,i,o;return{c(){t=C("url: "),n=v("input"),r=v("br"),this.h()},l(l){t=P(l,"url: "),n=w(l,"INPUT",{type:!0}),r=w(l,"BR",{}),this.h()},h(){$(n,"type","text")},m(l,a){M(l,t,a),M(l,n,a),L(n,e[3]),M(l,r,a),i||(o=A(n,"input",e[12]),i=!0)},p(l,a){a&8&&n.value!==l[3]&&L(n,l[3])},d(l){l&&y(t),l&&y(n),l&&y(r),i=!1,o()}}}function De(e){let t,n,r,i,o,l,a,c,s=e[7],u=[];for(let f=0;f<s.length;f+=1)u[f]=Oe(Ae(e,s,f));return{c(){t=C("username: u/"),n=v("input"),r=v("br"),i=C(`\r
                category: \r
                `),o=v("select");for(let f=0;f<u.length;f+=1)u[f].c();l=v("br"),this.h()},l(f){t=P(f,"username: u/"),n=w(f,"INPUT",{type:!0}),r=w(f,"BR",{}),i=P(f,`\r
                category: \r
                `),o=w(f,"SELECT",{});var h=R(o);for(let m=0;m<u.length;m+=1)u[m].l(h);h.forEach(y),l=w(f,"BR",{}),this.h()},h(){$(n,"type","text"),e[5]===void 0&&me(()=>e[14].call(o))},m(f,h){M(f,t,h),M(f,n,h),L(n,e[4]),M(f,r,h),M(f,i,h),M(f,o,h);for(let m=0;m<u.length;m+=1)u[m].m(o,null);Se(o,e[5]),M(f,l,h),a||(c=[A(n,"input",e[13]),A(o,"change",e[14])],a=!0)},p(f,h){if(h&16&&n.value!==f[4]&&L(n,f[4]),h&128){s=f[7];let m;for(m=0;m<s.length;m+=1){const k=Ae(f,s,m);u[m]?u[m].p(k,h):(u[m]=Oe(k),u[m].c(),u[m].m(o,null))}for(;m<u.length;m+=1)u[m].d(1);u.length=s.length}h&160&&Se(o,f[5])},d(f){f&&y(t),f&&y(n),f&&y(r),f&&y(i),f&&y(o),Fe(u,f),f&&y(l),a=!1,W(c)}}}function Oe(e){let t,n=e[20]+"",r,i;return{c(){t=v("option"),r=C(n),this.h()},l(o){t=w(o,"OPTION",{});var l=R(t);r=P(l,n),l.forEach(y),this.h()},h(){t.__value=i=e[20],t.value=t.__value},m(o,l){M(o,t,l),_(t,r)},p:F,d(o){o&&y(t)}}}function Gt(e){let t,n,r,i,o,l,a,c,s,u,f,h,m,k,U,S,b,j,p,g,d,E;function N(I,T){return I[2]==2?Ft:jt}let D=N(e),B=D(e);return{c(){t=v("div"),n=v("div"),r=v("button"),i=C("user"),o=G(),l=v("button"),a=C("search"),c=G(),s=v("button"),u=C("custom"),f=G(),h=v("div"),B.c(),m=C(`\r
        count: `),k=v("input"),U=v("br"),S=C(`\r
        nsfw: `),b=v("input"),j=G(),p=v("button"),g=C("load"),this.h()},l(I){t=w(I,"DIV",{class:!0});var T=R(t);n=w(T,"DIV",{class:!0});var O=R(n);r=w(O,"BUTTON",{});var le=R(r);i=P(le,"user"),le.forEach(y),o=q(O),l=w(O,"BUTTON",{});var ie=R(l);a=P(ie,"search"),ie.forEach(y),c=q(O),s=w(O,"BUTTON",{});var oe=R(s);u=P(oe,"custom"),oe.forEach(y),O.forEach(y),f=q(T),h=w(T,"DIV",{class:!0});var X=R(h);B.l(X),m=P(X,`\r
        count: `),k=w(X,"INPUT",{type:!0}),U=w(X,"BR",{}),S=P(X,`\r
        nsfw: `),b=w(X,"INPUT",{type:!0}),X.forEach(y),j=q(T),p=w(T,"BUTTON",{});var Ie=R(p);g=P(Ie,"load"),Ie.forEach(y),T.forEach(y),this.h()},h(){$(n,"class","head"),$(k,"type","number"),$(b,"type","checkbox"),$(h,"class","options"),$(t,"class","redditSearch")},m(I,T){M(I,t,T),_(t,n),_(n,r),_(r,i),_(n,o),_(n,l),_(l,a),_(n,c),_(n,s),_(s,u),_(t,f),_(t,h),B.m(h,null),_(h,m),_(h,k),L(k,e[6].count),_(h,U),_(h,S),_(h,b),b.checked=e[6].nsfw,_(t,j),_(t,p),_(p,g),d||(E=[A(r,"click",e[9]),A(l,"click",e[10]),A(s,"click",e[11]),A(k,"input",e[17]),A(b,"change",e[18]),A(p,"click",e[8])],d=!0)},p(I,[T]){D===(D=N(I))&&B?B.p(I,T):(B.d(1),B=D(I),B&&(B.c(),B.m(h,m))),T&64&&K(k.value)!==I[6].count&&L(k,I[6].count),T&64&&(b.checked=I[6].nsfw)},i:F,o:F,d(I){I&&y(t),B.d(),d=!1,W(E)}}}function Me(e){return e.split(/[ ,;]/).filter(t=>t.trim().length>0)}function qt(e,t,n){let r=0,i="",o="",l="",a="",c=["upvoted","posts"],s,u;function f(){let N="https://www.reddit.com";switch(r){case 0:N+=`/user/${a}/${s}`;break;case 1:N+=`/search/?q=${u.keywords.join(" ")}`;break;case 2:N=i;break}return N}async function h(){var I;let N=f(),D=N.split(/\/\?|\?/);N=`${D[0]}.json${D[1]?"?"+D[1]:""}`,r==1&&n(6,u.keywords=[],u);const B=await Lt(N,u);for(let T of B)Q.push({url:(I=T==null?void 0:T.url_overridden_by_dest)!=null?I:T==null?void 0:T.url,name:T==null?void 0:T.title})}const m=()=>n(2,r=0),k=()=>n(2,r=1),U=()=>n(2,r=2);function S(){i=this.value,n(3,i)}function b(){a=this.value,n(4,a)}function j(){s=rt(this),n(5,s),n(7,c)}function p(){l=this.value,n(1,l)}function g(){o=this.value,n(0,o)}function d(){u.count=K(this.value),n(6,u),n(0,o),n(1,l)}function E(){u.nsfw=this.checked,n(6,u),n(0,o),n(1,l)}return e.$$.update=()=>{e.$$.dirty&3&&n(6,u={subreddits:Me(o),keywords:Me(l),nsfw:!0,count:5})},[o,l,r,i,a,s,u,c,h,m,k,U,S,b,j,p,g,d,E]}class zt extends re{constructor(t){super(),ne(this,t,qt,Gt,Z,{})}}async function He(e){return new Promise((t,n)=>{let r=new Image;r.src=e,r.onload=function(){t(r)},r.onerror=function(i,o){n()}})}async function Vt(e){const t=await He(e);return[t.width,t.height]}async function Kt(e,t){const[n,r]=await Vt(t);return{ratio:n/r,items:[e]}}async function Wt(e,t,n,r,i,o){const l=await He(t),a=l.width/l.height,c=i/o;let s=a>c?c/a*l.width:l.width,u=a>c?l.height:a/c*l.height,f=(l.width-s)/2,h=(l.height-u)/2;e.drawImage(l,f,h,s,u,n,r,i,o)}function Ht(e,t,n){const r=e/t;return r>n?e*=n/r:t*=r/n,[e,t]}function Qt(e,t,n,r,i,o,l=0){console.log(n,r,i,o);let[a,c]=Ht(i,o,t.ratio);return ke(e,t,n,r,a+l,c+l,l),[a,c]}async function ke(e,t,n,r,i,o,l=0){if(t.horizontal==null||typeof t.items[0]=="number"){let c=t.items[0];if(c<0)return;const s=await Q.getLink(c);Wt(e,s,n,r,i-l,o-l);return}let a=0;if(t.horizontal==!0)for(let c of t.items){let s=c.ratio/t.ratio*i;await ke(e,c,n+a,r,s,o,l),a+=s}else for(let c of t.items){let s=t.ratio/c.ratio*o;await ke(e,c,n,r+a,i,s,l),a+=s}}async function Xt(e){let t=Q.get();const n=[];for(let d=0;d<t.length;d++){let E=t[d];n.push(Kt(d,E.url))}let o=(await Promise.allSettled(n)).filter(d=>d.status=="fulfilled").map(d=>d.value);const l=o.length;o=[...o].sort((d,E)=>d.ratio-E.ratio);let a=o.reduce((d,E)=>d+E.ratio,0);const c=a/l;a=o.reduce((d,E)=>d+Math.sqrt(c/E.ratio)*E.ratio,0);const s=Math.round(Math.sqrt(a/e)),u=a/s;let f=[],h=0,m=0,k=0;for(let d=0;d<o.length;d++){const E=h/k;let N=u*Math.sqrt(E/c)-h;if(N<0){let D=m<-N;f.push(D?d-1:d),h=D?o[d-1].ratio:0,k=0}h+=o[d].ratio,k++,m=N}let U=0,S=[];f.push(o.length);for(let d of f){const E=o.slice(U,d),D=E.map(B=>B.ratio).reduce((B,I)=>B+I,0);S.push({ratio:D,horizontal:!0,items:[...E]}),U=d}const b=S.map(d=>d.ratio),p={ratio:1/b.reduce((d,E)=>d+1/E,0),horizontal:!1,items:[...S]};function g(d){return d.items.reduce((N,D)=>N+D.items[0],0)/d.items.length}p.items.sort((d,E)=>g(d)-g(E));for(let d of p.items)d.items.sort((E,N)=>E.items[0]-N.items[0]);return p}function Yt(e){let t,n,r,i,o,l,a,c,s,u,f,h,m,k,U,S,b,j,p,g,d,E,N,D,B;return{c(){t=v("div"),n=v("div"),r=C("1280x720, 1920\xD71080, 2560\xD71440, 3200\xD71800, 3840\xD72160"),i=v("br"),o=C(`\r
        width: `),l=v("input"),a=C(`\r
        height: `),c=v("input"),s=C(`\r
        margin: `),u=v("input"),f=C(`\r
        border: `),h=v("input"),m=C(`\r
        background: `),k=v("input"),U=G(),S=v("button"),b=C("generate"),j=G(),p=v("div"),g=v("canvas"),d=G(),E=v("button"),N=C("snapshot"),this.h()},l(I){t=w(I,"DIV",{class:!0});var T=R(t);n=w(T,"DIV",{class:!0});var O=R(n);r=P(O,"1280x720, 1920\xD71080, 2560\xD71440, 3200\xD71800, 3840\xD72160"),i=w(O,"BR",{}),o=P(O,`\r
        width: `),l=w(O,"INPUT",{type:!0}),a=P(O,`\r
        height: `),c=w(O,"INPUT",{type:!0}),s=P(O,`\r
        margin: `),u=w(O,"INPUT",{type:!0}),f=P(O,`\r
        border: `),h=w(O,"INPUT",{type:!0}),m=P(O,`\r
        background: `),k=w(O,"INPUT",{type:!0}),U=q(O),S=w(O,"BUTTON",{});var le=R(S);b=P(le,"generate"),le.forEach(y),O.forEach(y),j=q(T),p=w(T,"DIV",{class:!0});var ie=R(p);g=w(ie,"CANVAS",{height:!0,width:!0,class:!0}),R(g).forEach(y),ie.forEach(y),d=q(T),E=w(T,"BUTTON",{});var oe=R(E);N=P(oe,"snapshot"),oe.forEach(y),T.forEach(y),this.h()},h(){$(l,"type","number"),$(c,"type","number"),$(u,"type","number"),$(h,"type","number"),$(k,"type","color"),$(n,"class","settings"),$(g,"height",e[2]),$(g,"width",e[1]),$(g,"class","svelte-1ryfd5b"),$(p,"class","display"),$(t,"class","collagesContainer svelte-1ryfd5b")},m(I,T){M(I,t,T),_(t,n),_(n,r),_(n,i),_(n,o),_(n,l),L(l,e[1]),_(n,a),_(n,c),L(c,e[2]),_(n,s),_(n,u),L(u,e[3]),_(n,f),_(n,h),L(h,e[4]),_(n,m),_(n,k),L(k,e[5]),_(n,U),_(n,S),_(S,b),_(t,j),_(t,p),_(p,g),e[13](g),_(t,d),_(t,E),_(E,N),D||(B=[A(l,"input",e[8]),A(c,"input",e[9]),A(u,"input",e[10]),A(h,"input",e[11]),A(k,"input",e[12]),A(S,"click",e[6]),A(E,"click",e[7])],D=!0)},p(I,[T]){T&2&&K(l.value)!==I[1]&&L(l,I[1]),T&4&&K(c.value)!==I[2]&&L(c,I[2]),T&8&&K(u.value)!==I[3]&&L(u,I[3]),T&16&&K(h.value)!==I[4]&&L(h,I[4]),T&32&&L(k,I[5]),T&4&&$(g,"height",I[2]),T&2&&$(g,"width",I[1])},i:F,o:F,d(I){I&&y(t),e[13](null),D=!1,W(B)}}}function Jt(e,t,n){let r,i;it(()=>{i=r.getContext("2d"),i.imageSmoothingEnabled=!0,i.imageSmoothingQuality="high"});let o=1280,l=720,a=5,c=10,s="#F5DEB3",u=[o,l];async function f(){n(0,r.width=o,r),n(0,r.height=l,r),i.fillStyle=s,i.clearRect(0,0,o,l),i.fillRect(0,0,o,l);const p=await Xt(o/l),[g,d]=Qt(i,p,c,c,o-c*2,l-c*2,a);u=[g+c*2,d+c*2]}async function h(){const[p,g]=u,d=await createImageBitmap(r);n(0,r.width=p,r),n(0,r.height=g,r),i.drawImage(d,0,0);const E=r.toDataURL();let N=document.createElement("a");N.href=E,N.download="collage.png",N.click()}function m(){o=K(this.value),n(1,o)}function k(){l=K(this.value),n(2,l)}function U(){a=K(this.value),n(3,a)}function S(){c=K(this.value),n(4,c)}function b(){s=this.value,n(5,s)}function j(p){ve[p?"unshift":"push"](()=>{r=p,n(0,r)})}return[r,o,l,a,c,s,f,h,m,k,U,S,b,j]}class Zt extends re{constructor(t){super(),ne(this,t,Jt,Yt,Z,{})}}function xt(e){let t,n,r,i,o,l,a,c,s,u,f,h,m,k,U,S,b,j;return o=new zt({}),a=new Mt({}),h=new Bt({}),b=new Zt({}),{c(){t=v("main"),n=v("h1"),r=C("1. Choose images"),i=G(),ue(o.$$.fragment),l=G(),ue(a.$$.fragment),c=G(),s=v("h1"),u=C("2. Manage images"),f=G(),ue(h.$$.fragment),m=G(),k=v("h1"),U=C("3. Generate Collage"),S=G(),ue(b.$$.fragment),this.h()},l(p){t=w(p,"MAIN",{class:!0});var g=R(t);n=w(g,"H1",{class:!0});var d=R(n);r=P(d,"1. Choose images"),d.forEach(y),i=q(g),ce(o.$$.fragment,g),l=q(g),ce(a.$$.fragment,g),c=q(g),s=w(g,"H1",{class:!0});var E=R(s);u=P(E,"2. Manage images"),E.forEach(y),f=q(g),ce(h.$$.fragment,g),m=q(g),k=w(g,"H1",{class:!0});var N=R(k);U=P(N,"3. Generate Collage"),N.forEach(y),S=q(g),ce(b.$$.fragment,g),g.forEach(y),this.h()},h(){$(n,"class","svelte-enb3qt"),$(s,"class","svelte-enb3qt"),$(k,"class","svelte-enb3qt"),$(t,"class","svelte-enb3qt")},m(p,g){M(p,t,g),_(t,n),_(n,r),_(t,i),ee(o,t,null),_(t,l),ee(a,t,null),_(t,c),_(t,s),_(s,u),_(t,f),ee(h,t,null),_(t,m),_(t,k),_(k,U),_(t,S),ee(b,t,null),j=!0},p:F,i(p){j||(H(o.$$.fragment,p),H(a.$$.fragment,p),H(h.$$.fragment,p),H(b.$$.fragment,p),j=!0)},o(p){J(o.$$.fragment,p),J(a.$$.fragment,p),J(h.$$.fragment,p),J(b.$$.fragment,p),j=!1},d(p){p&&y(t),te(o),te(a),te(h),te(b)}}}class en extends re{constructor(t){super(),ne(this,t,null,xt,Z,{})}}new en({target:document.body});
