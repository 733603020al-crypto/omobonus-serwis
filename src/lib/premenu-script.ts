// Inline script for the mobile menu before hydration.
// Until React mounts the real Radix drawer, the hamburger is a plain placeholder
// button ([data-premenu]) with no handler, so a tap right after the page appears
// used to do nothing. This script opens a static copy of the same drawer (same
// markup and classes as MobileMenuSheet + Sheet) on such a tap. Its links are
// plain <a>, so they work without React. The copy lives until it is closed; once
// the real drawer is mounted the placeholder is gone and taps go to React.
// Labels/hrefs come from the placeholder's data-premenu JSON (per locale).
const X_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x size-4" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
const MAIL_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail w-4 h-4 shrink-0" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>'
const WORDMARK_SPAN = 'transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(191,167,106,0.35)]'

const OVERLAY_CLASS =
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50'
const CONTENT_CLASS =
  'data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-[78vw] max-w-[360px] border-l-0 bg-transparent p-0 sm:max-w-[420px]'
const FORM_CLASS =
  'inline-flex items-center justify-center gap-2 min-w-[200px] rounded-full px-8 py-[14px] md:py-[10px] font-sans font-semibold text-[16px] transition-all duration-300 ease-out hover:-translate-y-1 bg-transparent text-[#bfa76a] border border-[#bfa76a]/80 hover:bg-[#bfa76a]/10 hover:shadow-[0_0_20px_rgba(191,167,106,0.35)] w-full'
const CLOSE_CLASS =
  'ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-1 right-1 flex items-center justify-center p-3.5 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'

const source = `(function(){
if(window.__premenu)return;window.__premenu=1;
var d=document,data=null,box=null,prevOverflow='';
function read(){var e=d.querySelector('[data-premenu^="{"]');if(e)try{data=JSON.parse(e.getAttribute('data-premenu'))}catch(x){}}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function a(h,t){return '<a href="'+esc(h)+'">'+t+'</a>'}
function close(){if(!box)return;var b=box;box=null;d.documentElement.style.overflow=prevOverflow;d.removeEventListener('keydown',key,true);
for(var i=0;i<b.children.length;i++)b.children[i].setAttribute('data-state','closed');setTimeout(function(){b.remove()},300)}
function key(e){if(e.key==='Escape')close()}
function open(){read();if(!data||box)return;var m=data;box=d.createElement('div');box.setAttribute('data-premenu-drawer','');
box.innerHTML='<div data-state="open" class="${OVERLAY_CLASS}"></div>'+
'<div role="dialog" aria-modal="true" aria-label="Menu" data-state="open" class="${CONTENT_CLASS}" tabindex="-1">'+
'<div class="relative isolate overflow-hidden rounded-l-lg border border-[#bfa76a]/30"><div class="absolute inset-0 bg-cover bg-center" style="background-image: var(--bg-parchment);"></div><div class="absolute inset-0 bg-black/55"></div>'+
'<div class="relative z-10 flex flex-col gap-6 px-6 py-8 font-cormorant text-[20px] text-white">'+
a(m.home,'<div class="flex gap-2 tracking-wide font-cormorant text-base md:text-[22px]"><span class="text-white ${WORDMARK_SPAN}">Omobonus</span><span class="text-[#bfa76a] ${WORDMARK_SPAN}">serwis</span></div>')+
'<nav class="flex flex-col gap-4">'+a(m.services[0],esc(m.services[1]))+a(m.about[0],esc(m.about[1]))+a(m.contact[0],esc(m.contact[1]))+'</nav>'+
'<a class="${FORM_CLASS}" href="'+esc(m.contact[0])+'">${MAIL_ICON}<span>'+esc(m.form)+'</span></a></div></div>'+
'<button type="button" data-premenu-close class="${CLOSE_CLASS}">${X_ICON}<span class="sr-only">Close</span></button></div>';
box.firstChild.addEventListener('click',close);box.querySelector('[data-premenu-close]').addEventListener('click',close);
box.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('a'))setTimeout(close,0)});
prevOverflow=d.documentElement.style.overflow;d.documentElement.style.overflow='hidden';
d.addEventListener('keydown',key,true);d.body.appendChild(box);box.lastChild.focus({preventScroll:true})}
read();
d.addEventListener('click',function(e){var t=e.target;if(t&&t.closest&&t.closest('[data-premenu]')){e.preventDefault();open()}},true);
})()`

export const PREMENU_SCRIPT = source.replace(/\n/g, '')
