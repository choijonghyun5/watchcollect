/* ===== 실제 장시간에만 거래 =====
   - 한국 주식·ETF·국고채: KRX 정규장 09:00–15:30 (KST), 주말·공휴일 휴장, 새해 첫 거래일은 10:00 개장
   - 미국 주식·ETF: NYSE/Nasdaq 정규장 09:30–16:00 (ET, 서머타임 자동), 휴장일은 규칙으로 계산, 조기 폐장 13:00
   - 미국 국채: 08:00–17:00 (ET), 미국 증시 휴장일 휴장
   - 금·은(국제 선물 기준): 일요일 18:00 ET ~ 금요일 17:00 ET, 매일 17:00–18:00 ET 휴식, 1/1·12/25 휴장
   - 코인: 24시간
   한국 휴장일 목록(KR_HOL)은 해마다 갱신해야 합니다. 목록에 없는 해는 주말만 휴장으로 처리합니다.
   (수능일 지연 개장 등 세부 예외는 반영하지 않았습니다.) */
const KR_HOL=new Set([
 /* 2026 — 한국거래소 휴장일 17일 */
 '2026-01-01','2026-02-16','2026-02-17','2026-02-18','2026-03-02','2026-05-01','2026-05-05','2026-05-25','2026-06-03','2026-07-17','2026-08-17','2026-09-24','2026-09-25','2026-10-05','2026-10-09','2026-12-25','2026-12-31',
 /* 2027 — 공휴일 기준 예정 (확정 공시 후 확인) */
 '2027-01-01','2027-02-08','2027-02-09','2027-03-01','2027-05-03','2027-05-05','2027-05-13','2027-08-16','2027-09-14','2027-09-15','2027-09-16','2027-10-04','2027-10-11','2027-12-27','2027-12-31']);
const KR_YEARS=[2026,2027];
const MK={
 kr:{n:'한국 증시',tz:'Asia/Seoul',o:540,c:930,zn:'KST'},
 us:{n:'미국 증시',tz:'America/New_York',o:570,c:960,zn:'ET'},
 ust:{n:'미국 국채',tz:'America/New_York',o:480,c:1020,zn:'ET'},
 fut:{n:'국제 금·은 시장',tz:'America/New_York',zn:'ET'},
 crypto:{n:'코인 시장',tz:null}};
const _fmt={};
function zp(t,tz){const f=_fmt[tz]||(_fmt[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',weekday:'short'}));
 const o={};f.formatToParts(new Date(t)).forEach(p=>o[p.type]=p.value);
 return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour,mi:+o.minute,wd:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday)}}
/* 해당 시간대의 y-m-d h:mi 를 실제 timestamp 로 */
function zt(y,m,d,h,mi,tz){let u=Date.UTC(y,m-1,d,h,mi);for(let i=0;i<2;i++){const p=zp(u,tz);u+=Date.UTC(y,m-1,d,h,mi)-Date.UTC(p.y,p.m-1,p.d,p.h,p.mi)}return u}
const ymd=(y,m,d)=>y+'-'+String(m).padStart(2,'0')+'-'+String(d).padStart(2,'0');
const dow=(y,m,d)=>new Date(Date.UTC(y,m-1,d)).getUTCDay();
const addD=(y,m,d,n)=>{const x=new Date(Date.UTC(y,m-1,d+n));return[x.getUTCFullYear(),x.getUTCMonth()+1,x.getUTCDate()]};
const nthDow=(y,m,w,n)=>1+((w-dow(y,m,1)+7)%7)+7*(n-1); // m월의 n번째 w요일
const lastDow=(y,m,w)=>{const L=new Date(Date.UTC(y,m,0)).getUTCDate();return L-((dow(y,m,L)-w+7)%7)};
function easter(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=(h+l-7*m+114)%31+1;return[mo,da]}
const _usH={};
function usHol(y){if(_usH[y])return _usH[y];const S=new Set(),add=(m,d)=>S.add(ymd(y,m,d)),obs=(m,d,sat)=>{const w=dow(y,m,d);if(w===0){const[,a,b]=addD(y,m,d,1);add(a,b)}else if(w===6&&sat){const[,a,b]=addD(y,m,d,-1);add(a,b)}else add(m,d)};
 obs(1,1,false);add(1,nthDow(y,1,1,3));add(2,nthDow(y,2,1,3));const[em,ed]=easter(y),[,gm,gd]=addD(y,em,ed,-2);add(gm,gd);add(5,lastDow(y,5,1));if(y>=2022)obs(6,19,true);obs(7,4,true);add(9,nthDow(y,9,1,1));add(11,nthDow(y,11,4,4));obs(12,25,true);
 return _usH[y]=S}
const usOpenDay=(y,m,d)=>{const w=dow(y,m,d);return w>0&&w<6&&!usHol(y).has(ymd(y,m,d))};
function usClose(y,m,d){ // 조기 폐장 13:00
 const tg=nthDow(y,11,4,4);if(m===11&&d===tg+1)return 780;
 if(m===12&&d===24)return 780;
 if(m===7&&d===3&&usOpenDay(y,7,3)&&dow(y,7,4)!==0&&dow(y,7,4)!==6)return 780;
 return null}
function krOpenDay(y,m,d){const w=dow(y,m,d);if(w===0||w===6)return false;return !(KR_YEARS.includes(y)&&KR_HOL.has(ymd(y,m,d)))}
function krOpenMin(y,m,d){ // 새해 첫 거래일은 개장식 때문에 10:00 개장
 if(m!==1)return 540;for(let dd=1;dd<d;dd++)if(krOpenDay(y,1,dd))return 540;return 600}
function sessionOf(k,y,m,d){ // 그 날의 [open, close] 분 (장이 안 열리면 null)
 if(k==='kr')return krOpenDay(y,m,d)?[krOpenMin(y,m,d),930]:null;
 if(k==='us'){if(!usOpenDay(y,m,d))return null;return[570,usClose(y,m,d)||960]}
 if(k==='ust'){if(!usOpenDay(y,m,d))return null;return[480,usClose(y,m,d)?840:1020]}
 return null}
const mkOf=a=>a.k==='coin'?'crypto':a.k==='gold'||a.k==='silver'?'fut':a.k==='bond'?(a.usd?'ust':'kr'):(a.k==='kr'||(a.k==='etf'&&!a.usd))?'kr':'us';
const wdn=['일','월','화','수','목','금','토'];
function fmtT(t,tz){const p=zp(t,tz),pad=n=>String(n).padStart(2,'0');return p.m+'/'+p.d+'('+wdn[p.wd]+') '+pad(p.h)+':'+pad(p.mi)}
/* 선물(금·은): 일 18:00 ET 개장 ~ 금 17:00 ET 폐장, 매일 17:00–18:00 휴식, 1/1·12/25 는 18:00 ET 까지 휴장 */
function futStatus(t){const tz=MK.fut.tz,p=zp(t,tz),mn=p.h*60+p.mi,hol=(m,d)=>(m===1&&d===1)||(m===12&&d===25);
 let open;if(p.wd===6)open=false;else if(p.wd===0)open=mn>=1080;else if(p.wd===5)open=mn<1020;else open=!(mn>=1020&&mn<1080);
 if(open&&mn<1080&&hol(p.m,p.d))open=false;
 if(open){const[y,m,d]=mn<1020?[p.y,p.m,p.d]:addD(p.y,p.m,p.d,1);return{open:true,close:zt(y,m,d,17,0,tz)}}
 // 휴장이 끝나는 시각은 항상 어떤 날의 18:00 ET (금·토 18:00 은 제외)
 let y=p.y,m=p.m,d=p.d;for(let i=0;i<10;i++){const n=zt(y,m,d,18,0,tz),w=dow(y,m,d);if(n>t&&w!==5&&w!==6)return{open:false,next:n};[y,m,d]=addD(y,m,d,1)}
 return{open:false}}
/* 시장 상태 — {open, label, next, close, mk} */
function mktStatus(a,t){t=t||Date.now();const k=mkOf(a),M=MK[k];
 if(k==='crypto')return{open:true,label:'24시간 거래',mk:M.n,k};
 if(k==='fut'){const s=futStatus(t);return s.open?{open:true,label:'거래 가능',close:s.close,mk:M.n,k}:{open:false,label:'장 마감',next:s.next,mk:M.n,k}}
 const tz=M.tz,p=zp(t,tz),mn=p.h*60+p.mi,ss=sessionOf(k,p.y,p.m,p.d);
 if(ss&&mn>=ss[0]&&mn<ss[1])return{open:true,label:'장중',close:zt(p.y,p.m,p.d,Math.floor(ss[1]/60),ss[1]%60,tz),mk:M.n,k};
 let y=p.y,m=p.m,d=p.d;const hol=!ss&&p.wd>0&&p.wd<6,lb=hol?'휴장':ss&&mn<ss[0]?'장 시작 전':'장 마감';
 if(!ss||mn>=ss[1]){[y,m,d]=addD(y,m,d,1)}
 for(let i=0;i<20;i++){const s=sessionOf(k,y,m,d);if(s)return{open:false,label:lb,next:zt(y,m,d,Math.floor(s[0]/60),s[0]%60,tz),mk:M.n,k,hol};[y,m,d]=addD(y,m,d,1)}
 return{open:false,label:'장 마감',mk:M.n,k}}
const isOpen=a=>mktStatus(a).open;
function mktLine(a,s){s=s||mktStatus(a);const tz=MK[s.k].tz||'Asia/Seoul',zn=MK[s.k].zn||'KST';
 if(s.k==='crypto')return'24시간 거래 가능';
 if(s.open)return s.label+(s.close?' · '+new Date(s.close).toLocaleTimeString('ko-KR',{timeZone:tz,hour:'2-digit',minute:'2-digit',hour12:false})+' 마감 ('+zn+')':'');
 const my=new Date(s.next).toLocaleString('ko-KR',{timeZone:'Asia/Seoul',month:'numeric',day:'numeric',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false});
 return s.label+' · 다음 거래 '+my+' (한국시간)'}
function mktGuard(a){const s=mktStatus(a);if(s.open)return true;toast(s.mk+' '+mktLine(a,s));return false}

/* ---- 화면 연결 ---- */
const mktBadge=a=>{const s=mktStatus(a),dot=`<span style="display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;background:${s.open?'#2e9e5b':'var(--faint)'}"></span>`;
 const tail=s.k==='crypto'?'':' · '+(mktLine(a,s).split(' · ').slice(1).join(' · '));
 return dot+'<b style="color:var(--ink)">'+s.mk+' '+(s.k==='crypto'?'24시간 거래':s.label)+'</b>'+tail};
/* 매매 시트: 장이 닫혀 있으면 버튼 비활성화 */
function mkRefresh(){const e=document.getElementById('mkst'),b=document.getElementById('go');if(!e||!b||typeof detail==='undefined'||!A(detail))return;
 const a=A(detail),s=mktStatus(a);e.innerHTML=mktBadge(a);b.disabled=!s.open;b.style.opacity=s.open?'':'.45';
 b.textContent=s.open?(side==='buy'?'매수하기':'매도하기'):(s.label==='휴장'?'휴장일 · 거래 불가':'장 마감 · 거래 불가')}
const _mkCalc=calc;calc=function(id){_mkCalc(id);mkRefresh()};
setInterval(mkRefresh,15000);
/* 종목 상세 · 종목 목록 */
const _mkDhead=dhead;dhead=function(a){return _mkDhead(a)+`<div class="sub" style="margin-top:6px">${mktBadge(a)}</div>`};
const _mkRow=mrow;mrow=function(a){const h=_mkRow(a),s=mktStatus(a);if(s.open)return h;const t=(KIND[a.k]||'기타')+' · '+a.id+'</div>';return h.replace(t,(KIND[a.k]||'기타')+' · '+a.id+' · '+s.label+'</div>')};
