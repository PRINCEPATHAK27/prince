(function(){
 const items=['🌸','🌺','🌷','💐','🎂','🍅','❤️','💕','💖','💗','💝','💓','💞','🩷','🧡'];
 const field=document.getElementById('floaties');
 if(!field)return;
 for(let i=0;i<15;i++){
  const s=document.createElement('span');
  s.textContent=items[Math.floor(Math.random()*items.length)];
  const dur=(11+Math.random()*14);
  s.style.left=(Math.random()*92)+'%';
  s.style.fontSize=(14+Math.random()*16).toFixed(0)+'px';
  s.style.animationDuration=dur.toFixed(1)+'s';
  s.style.animationDelay=(-Math.random()*dur).toFixed(1)+'s';
  s.style.setProperty('--drift',(Math.random()*70-35).toFixed(0)+'px');
  field.appendChild(s);
 }
})();
