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

function buildBalloons(){
 field.innerHTML='';
 popped=0;busy=false;
 finishNav.style.display='none';
 hint.textContent='Ek balloon choose karo aur pop karo ❤️';
 const order=shuffle([...messages]);
 for(let i=0;i<10;i++){
  const b=document.createElement('div');
  b.className='balloon';
  b.style.background=`radial-gradient(circle at 32% 26%,#ffffff95,${colors[i]} 62%)`;
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
  const angle=(Math.PI*2*i)/8+Math.random()*0.3;
  const dist=45+Math.random()*35;
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

buildBalloons();
