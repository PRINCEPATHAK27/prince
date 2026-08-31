const messages=["🎂 Happy Birthday meri pyari bauaaa!","💖 Tum meri life ki bahut special person ho.","🥰 Tumhari smile bahut pyari hai!","🌸 Hamesha aise hi khush rehna.","❤️ Tum meri bahut favourite ho.","✨ Tumhari har wish puri ho.","🫶 Tumhari khushi mere liye bahut important hai.","🎈 Aaj ka din sirf tumhare naam!","💕 Meri pyari bauaaa, hamesha smile karna!","🎉 I Love You meri palakiya"];
const colors=["#ff4d6d","#ff8fab","#ffb347","#ffd23f","#6bcb77","#4dd4ac","#4ea8de","#7c5cff","#c77dff","#ff5c9d"];
const particleEmojis=["❤️","💕","✨","💖"];
const field=document.getElementById('field');
const msgBox=document.getElementById('msgBox');
const msgText=document.getElementById('msgText');
const hint=document.getElementById('hint');
const finishNav=document.getElementById('finishNav');
let popped=0;
let busy=false;
let messageTimer=null;

function shuffle(array){
  const copy=[...array];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function randomSpots(count,width,height,itemWidth,itemHeight,minDistance){
  const positions=[];

  for(let i=0;i<count;i++){
    let best=null;
    let bestScore=-1;

    for(let attempt=0;attempt<80;attempt++){
      const x=Math.random()*Math.max(0,width-itemWidth);
      const y=Math.random()*Math.max(0,height-itemHeight-28);

      if(!positions.length){
        best={x,y};
        break;
      }

      let minD=Infinity;
      for(const position of positions){
        const dx=x-position.x;
        const dy=y-position.y;
        minD=Math.min(minD,Math.hypot(dx,dy));
      }

      if(minD>=minDistance){
        best={x,y};
        break;
      }

      if(minD>bestScore){
        bestScore=minD;
        best={x,y};
      }
    }

    positions.push(best || {x:0,y:0});
  }

  return positions;
}

function buildBalloons(){
  if(!field) return;

  clearTimeout(messageTimer);
  field.innerHTML='';
  popped=0;
  busy=false;
  msgBox.classList.remove('show');
  finishNav.style.display='none';
  hint.textContent='Ek balloon choose karo aur pop karo ❤️';

  const order=shuffle(messages);
  const fieldWidth=field.clientWidth||300;
  const fieldHeight=field.clientHeight||440;
  const balloonWidth=Math.min(58,Math.max(50,Math.floor(fieldWidth/5.8)));
  const balloonHeight=Math.round(balloonWidth*1.27);
  const spots=randomSpots(10,fieldWidth,fieldHeight,balloonWidth,balloonHeight,Math.max(58,balloonWidth*1.05));

  for(let i=0;i<10;i++){
    const balloon=document.createElement('button');
    balloon.type='button';
    balloon.className='balloon';
    balloon.style.width=balloonWidth+'px';
    balloon.style.height=balloonHeight+'px';
    balloon.style.background=`radial-gradient(circle at 30% 22%,#ffffffcc 0 5%,transparent 13%),radial-gradient(circle at 60% 78%,#00000022,transparent 38%),linear-gradient(145deg,${colors[i]},#ffffff22)`;
    balloon.style.left=spots[i].x+'px';
    balloon.style.top=spots[i].y+'px';
    balloon.dataset.msg=order[i];
    balloon.setAttribute('aria-label','Pop balloon '+(i+1));
    balloon.addEventListener('click',()=>pop(balloon));
    field.appendChild(balloon);
  }
}

function burst(balloon){
  const rect=balloon.getBoundingClientRect();
  const centerX=rect.left+rect.width/2;
  const centerY=rect.top+rect.height/2;

  for(let i=0;i<8;i++){
    const particle=document.createElement('span');
    particle.className='particle';
    particle.textContent=particleEmojis[Math.floor(Math.random()*particleEmojis.length)];
    const angle=Math.random()*Math.PI*2;
    const distance=40+Math.random()*40;
    particle.style.left=centerX+'px';
    particle.style.top=centerY+'px';
    particle.style.setProperty('--dx',(Math.cos(angle)*distance)+'px');
    particle.style.setProperty('--dy',(Math.sin(angle)*distance)+'px');
    document.body.appendChild(particle);
    setTimeout(()=>particle.remove(),850);
  }
}

function pop(balloon){
  if(busy || balloon.classList.contains('popped')) return;

  busy=true;
  balloon.classList.add('popped');
  burst(balloon);
  popped++;

  setTimeout(()=>{
    msgText.textContent=balloon.dataset.msg;
    msgBox.classList.add('show');

    messageTimer=setTimeout(()=>{
      msgBox.classList.remove('show');
      busy=false;

      if(popped>=10){
        hint.textContent='Saare balloons pop ho gaye! 🎉';
        finishNav.style.display='flex';
      }
    },2200);
  },200);
}

function resetGame(){ buildBalloons(); }

let resizeTimer=null;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
    if(popped===0) buildBalloons();
  },180);
});

buildBalloons();
