const messages=["🎂 Happy Birthday meri pyari bauaaa!","💖 Tum meri life ki bahut special person ho.","🥰 Tumhari smile bahut pyari hai!","🌸 Hamesha aise hi khush rehna.","❤️ Tum meri bahut favourite ho.","✨ Tumhari har wish puri ho.","🫶 Tumhari khushi mere liye bahut important hai.","🎈 Aaj ka din sirf tumhare naam!","💕 Meri pyari bauaaa, hamesha smile karna!","🎉 I Love You meri palakiya"];
const colors=["#ff4d6d","#ff8fab","#ffb347","#ffd23f","#6bcb77","#4dd4ac","#4ea8de","#7c5cff","#c77dff","#ff5c9d"];
const particleEmojis=["❤️","💕","✨","💖"];
const field=document.getElementById('field');
const msgBox=document.getElementById('msgBox');
const msgText=document.getElementById('msgText');
const hint=document.getElementById('hint');
const finishNav=document.getElementById('finishNav');
let popped=0,busy=false;

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function randomSpots(n,w,h,iw,ih,minDist){
 const pos=[];
 for(let i=0;i<n;i++){
  let best=null,bestScore=-1;
  for(let t=0;t<30;t++){
   const x=Math.random()*Math.max(1,w-iw);
   const y=Math.random()*Math.max(1,h-ih);
   if(pos.length===0){best={x,y};break;}
   let minD=Infinity;
   for(const p of pos){const dx=x-p.x,dy=y-p.y;const d=Math.sqrt(dx*dx+dy*dy);if(d<minD)minD=d;}
   if(minD>=minDist){best={x,y};break;}
   if(minD>bestScore){bestScore=minD;best={x,y};}
  }
  pos.push(best);
 }
 return pos;
}

function buildBalloons(){
 field.innerHTML='';
 popped=0;busy=false;
 finishNav.style.display='none';
 hint.textContent='Ek balloon choose karo aur pop karo ❤️';
 const order=shuffle([...messages]);
 const fw=field.clientWidth||300, fh=field.clientHeight||320;
 const bw=54, bh=66;
 const spots=randomSpots(10,fw,fh,bw,bh,60);
 for(let i=0;i<10;i++){
  const b=document.createElement('div');
  b.className='balloon';
  b.style.width=bw+'px'; b.style.height=bh+'px';
   b.style.background=`radial-gradient(circle at 30% 22%,#ffffffcc 0 5%,transparent 13%),radial-gradient(circle at 60% 78%,#00000022,transparent 38%),linear-gradient(145deg,${colors[i]},#ffffff22)`;
  b.style.left=spots[i].x+'px';
  b.style.top=spots[i].y+'px';
  b.dataset.msg=order[i];
  b.onclick=()=>pop(b);
  field.appendChild(b);
 }
}

function burst(b){
 const r=b.getBoundingClientRect();
 const cx=r.left+r.width/2, cy=r.top+r.height/2;
 for(let i=0;i<8;i++){
  const p=document.createElement('span');
  p.className='particle';
  p.textContent=particleEmojis[Math.floor(Math.random()*particleEmojis.length)];
  const angle=Math.random()*Math.PI*2;
  const dist=40+Math.random()*40;
  p.style.left=cx+'px';
  p.style.top=cy+'px';
  p.style.setProperty('--dx',(Math.cos(angle)*dist)+'px');
  p.style.setProperty('--dy',(Math.sin(angle)*dist)+'px');
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),850);
 }
}

function pop(b){
 if(busy||b.classList.contains('popped'))return;
 busy=true;
 b.classList.add('popped');
 burst(b);
 popped++;
 setTimeout(()=>{
  msgText.textContent=b.dataset.msg;
  msgBox.classList.add('show');
  setTimeout(()=>{
   msgBox.classList.remove('show');
   busy=false;
   if(popped>=10){
    hint.textContent='Saare balloons pop ho gaye! 🎉';
    finishNav.style.display='flex';
   }
  },2200);
 },200);
}

function resetGame(){buildBalloons();}

window.addEventListener('resize',()=>{if(popped===0)buildBalloons();});

buildBalloons();
