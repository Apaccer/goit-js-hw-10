import"./assets/styles-b42242f6.js";import{a as i}from"./assets/vendor-216cde32.js";const s=document.querySelector(".form");function m(o){const t=s.elements.delay.value,e=s.elements.state.value;return new Promise((n,r)=>{e==="fulfilled"?setTimeout(()=>{n(t)},t):e==="rejected"&&setTimeout(()=>{r(t)},t)})}function c(o){o.preventDefault(),m().then(e=>{i.success({icon:"",position:"topRight",message:`✅ Fulfilled promise in ${e}ms`})},e=>{i.error({icon:"",position:"topRight",message:`❌ Rejected promise in ${e}ms`})})}s.addEventListener("submit",c);
//# sourceMappingURL=commonHelpers2.js.map