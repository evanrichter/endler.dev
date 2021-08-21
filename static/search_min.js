async function lazyLoad(){await init("/tinysearch_engine_bg.wasm")}var loaded=!1;function autocomplete(e){var t;function n(e){if(!e)return!1;!function(e){for(var t=0;t<e.length;t++)e[t].classList.remove("autocomplete-active")}(e),t>=e.length&&(t=0),t<0&&(t=e.length-1),e[t].classList.add("autocomplete-active")}function a(t){for(var n=document.getElementsByClassName("autocomplete-items"),a=0;a<n.length;a++)t!=n[a]&&t!=e&&n[a].parentNode.removeChild(n[a])}e.addEventListener("click",(function(e){loaded||(lazyLoad(),loaded=!0)})),e.addEventListener("input",(function(e){var n,o,i,c=this.value;if(a(),!c)return!1;t=-1,(n=document.createElement("DIV")).setAttribute("id",this.id+"autocomplete-list"),n.setAttribute("class","autocomplete-items"),this.parentNode.appendChild(n);let r=search(c,3);for(i=0;i<r.length;i++){let e=r[i];(o=document.createElement("DIV")).innerHTML=e[0],o.addEventListener("click",(function(t){window.location.href=`${e[1]}?q=${encodeURIComponent(c)}`})),n.appendChild(o)}})),e.addEventListener("keydown",(function(e){var a=document.getElementById(this.id+"autocomplete-list");a&&(a=a.getElementsByTagName("div")),40==e.keyCode?(t++,n(a)):38==e.keyCode?(t--,n(a)):13==e.keyCode&&(e.preventDefault(),t>-1&&a&&a[t].click())})),document.addEventListener("click",(function(e){a(e.target)}))}let wasm;autocomplete(document.getElementById("tinysearch"));let cachedTextDecoder=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});cachedTextDecoder.decode();let cachegetUint8Memory0=null;function getUint8Memory0(){return null!==cachegetUint8Memory0&&cachegetUint8Memory0.buffer===wasm.memory.buffer||(cachegetUint8Memory0=new Uint8Array(wasm.memory.buffer)),cachegetUint8Memory0}function getStringFromWasm0(e,t){return cachedTextDecoder.decode(getUint8Memory0().subarray(e,e+t))}const heap=new Array(32).fill(void 0);heap.push(void 0,null,!0,!1);let heap_next=heap.length;function addHeapObject(e){heap_next===heap.length&&heap.push(heap.length+1);const t=heap_next;return heap_next=heap[t],heap[t]=e,t}let WASM_VECTOR_LEN=0,cachedTextEncoder=new TextEncoder("utf-8");const encodeString="function"==typeof cachedTextEncoder.encodeInto?function(e,t){return cachedTextEncoder.encodeInto(e,t)}:function(e,t){const n=cachedTextEncoder.encode(e);return t.set(n),{read:e.length,written:n.length}};function passStringToWasm0(e,t,n){if(void 0===n){const n=cachedTextEncoder.encode(e),a=t(n.length);return getUint8Memory0().subarray(a,a+n.length).set(n),WASM_VECTOR_LEN=n.length,a}let a=e.length,o=t(a);const i=getUint8Memory0();let c=0;for(;c<a;c++){const t=e.charCodeAt(c);if(t>127)break;i[o+c]=t}if(c!==a){0!==c&&(e=e.slice(c)),o=n(o,a,a=c+3*e.length);const t=getUint8Memory0().subarray(o+c,o+a);c+=encodeString(e,t).written}return WASM_VECTOR_LEN=c,o}function getObject(e){return heap[e]}function dropObject(e){e<36||(heap[e]=heap_next,heap_next=e)}function takeObject(e){const t=getObject(e);return dropObject(e),t}export function search(e,t){var n=passStringToWasm0(e,wasm.__wbindgen_malloc,wasm.__wbindgen_realloc),a=WASM_VECTOR_LEN;return takeObject(wasm.search(n,a,t))}async function load(e,t){if("function"==typeof Response&&e instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if("application/wasm"==e.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{const n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}async function init(e){void 0===e&&(e=new URL("tinysearch_engine_bg.wasm",import.meta.url));const t={wbg:{}};t.wbg.__wbindgen_json_parse=function(e,t){return addHeapObject(JSON.parse(getStringFromWasm0(e,t)))},("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e));const{instance:n,module:a}=await load(await e,t);return wasm=n.exports,init.__wbindgen_wasm_module=a,wasm}export default init;