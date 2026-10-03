/* ===== shell ===== */
const TABS=[['home','홈'],['market','시장'],['portfolio','자산'],['tx','거래'],['watch','시계'],['more','더보기']];
function theme(){S.theme?document.documentElement.dataset.theme=S.theme:delete document.documentElement.dataset.theme}
if('scrollRestoration' in history)history.scrollRestoration='manual';let lastTab=null;
function render(){const chg=tab!==lastTab;lastTab=tab;theme();document.getElementById('app').innerHTML=V[tab]();if(tab==='market')list();if(chg)scrollTo(0,0);
 document.getElementById('nav').innerHTML=TABS.map(([k,l])=>`<button class="${tab===k||(tab==='detail'&&k==='market')||(tab==='wdetail'&&k==='watch')||(tab==='game'&&k==='more')?'on':''}" onclick="tab='${k}';render();scrollTo(0,0)">${l}${k==='more'&&window.billsDue&&billsDue()?'<span class="dot"></span>':''}</button>`).join('')}
setInterval(()=>{fetchPrices();alerts();if(!document.getElementById('m').innerHTML&&!['market','detail','game','watch','wdetail'].includes(tab)&&!document.activeElement.matches('input'))render();if(tab==='market')list();if(tab==='detail'){const e=document.getElementById('dh');if(e)e.innerHTML=dhead(A(dsel))}},4000);
setInterval(()=>{processBank();snap()},30000);processBank();render();addEventListener('load',()=>scrollTo(0,0));
/* 확대·좌우 이동 차단 */
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,e=>e.preventDefault()));
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
addEventListener('wheel',e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
/* 처음 실행하면 난이도 · 목표 배분 설정 */
if(S.onb===0)newSim(true);
