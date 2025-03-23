var v=Object.defineProperty;var S=(r,e,o)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var p=(r,e,o)=>S(r,typeof e!="symbol"?e+"":e,o);import{a as x,S as P,i as d}from"./assets/vendor-8qRJBGGt.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const w="https://pixabay.com/api/",q="49486452-3d44cfba97bed6ab675a762ac";async function y({page:r,perPage:e,query:o}){const l=new URLSearchParams({key:q,q:o,page:r,per_page:e,image_type:"photo",orientation:"horizontal",safesearch:!0});return(await x.get(`${w}?${l}`)).data}function T({webformatURL:r,largeImageURL:e,tags:o,likes:l,views:t,comments:i,downloads:c}){return`
  <div class="gallery-item">
    <li>
      <a class="gallery-link" href="${e}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${o}"
        />
      </a>
    </li>
    <ul class="gallery-ul">
      <li class="gallery-li">
        <p>Likes</p>
        <p>${l}</p>
      </li>
      <li class="gallery-li">
        <p>Views</p>
        <p>${t}</p>
      </li>
      <li class="gallery-li">
        <p>Comments</p>
        <p>${i}</p>
      </li>
      <li class="gallery-li">
        <p>Downloads</p>
        <p>${c}</p>
      </li>
    </ul>
  </div>`}function f(r){return r.map(T).join("")}const u=class u{constructor(e){this.button=e,this.prevText=""}disable(){this.button.disabled=!0,this.prevText=this.button.textContent,this.button.textContent="Loading..."}enable(){this.button.disabled=!1,this.button.textContent=this.prevText||this.button.textContent}hide(){this.button.classList.add(u.HIDDEN_CLASS)}show(){this.button.classList.remove(u.HIDDEN_CLASS)}};p(u,"HIDDEN_CLASS","is-hidden");let h=u;const n={form:document.querySelector(".js-form"),gallery:document.querySelector(".js-gallery"),notFoundText:document.querySelector(".js-not-found-text"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more")},m="active",s={page:1,perPage:15,query:"",maxPage:1},a=new h(n.loadMoreBtn),b=new P(".gallery a",{captionsData:"alt",captionDelay:250});function E(r){r.preventDefault(),n.notFoundText.innerHTML="";const o=r.currentTarget.elements.user_query.value.trim();if(console.dir(o),o===""){d.show({title:"",message:"Введіть будь-ласка запит!"});return}return o}async function L(r){if(s.page+=1,a.disable(),console.log("Page is: ",s.page),s.page>=s.maxPage){d.show({title:"",message:"We're sorry, but you've reached the end of search results."}),a.hide(),a.button.removeEventListener("submit",g);return}try{const e=await y(s);if(e.total===0){a.hide(),a.button.removeEventListener("click",L);return}const o=f(e.hits);n.gallery.insertAdjacentHTML("beforeend",o),b.refresh();const t=document.querySelector(".gallery-image").getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"}),a.enable(),s.page>=s.maxPage&&(d.show({title:"",message:"We're sorry, but you've reached the end of search results."}),a.hide(),a.button.removeEventListener("submit",g))}catch(e){console.log(e),a.hide()}}function g(r){s.query=E(r),s.query&&(s.page=1,n.loader.classList.add(m),y(s).then(e=>{if(n.loader.classList.remove(m),console.dir(e),e.total===0){n.gallery.innerHTML="",a.hide(),d.show({title:"",message:"Sorry, there are no images matching your search query. Please try again!"});return}if(s.maxPage=Math.ceil(e.total/s.perPage),n.gallery.innerHTML=f(e.hits),console.log("Max page is: ",s.maxPage),console.log("Page is: ",s.page),b.refresh(),document.querySelector(".gallery-image").getBoundingClientRect(),window.scrollBy({behavior:"smooth"}),s.page>=s.maxPage){a.hide(),a.button.removeEventListener("submit",g);return}a.show(),a.button.addEventListener("click",L)}).catch(e=>{n.loader.classList.remove(m),console.log(e)}).finally(()=>{n.form.reset()}))}n.form.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
