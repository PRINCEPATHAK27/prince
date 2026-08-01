// js/main.js
(function(){
  const canvas = document.getElementById('ambient-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h;
  let particles = [];
  let hearts = [];
  
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Star particles
  for(let i=0;i<80;i++){
    particles.push({
      x:Math.random()*w,
      y:Math.random()*h,
      r:Math.random()*1.5+0.5,
      speed:0.005+Math.random()*0.02,
      phase:Math.random()*Math.PI*2
    });
  }

  // Floating hearts
  for(let i=0;i<12;i++){
    hearts.push({
      x:Math.random()*w,
      y:Math.random()*h,
      size:8+Math.random()*14,
      speed:0.2+Math.random()*0.4,
      float:Math.random()*0.5+0.3,
      phase:Math.random()*Math.PI*2,
      opacity:0.15+Math.random()*0.25
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    
    // Stars
    particles.forEach(p => {
      const alpha = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(Date.now() * p.speed + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,240,${alpha})`;
      ctx.fill();
    });
    
    // Hearts
    hearts.forEach(h => {
      const x = h.x + Math.sin(Date.now() * 0.001 + h.phase) * 30;
      const y = h.y + Math.sin(Date.now() * 0.0015 + h.phase * 1.3) * 20;
      ctx.font = `${h.size}px sans-serif`;
      ctx.globalAlpha = h.opacity;
      ctx.fillStyle = '#ff7a94';
      ctx.fillText('♥', x, y);
      ctx.globalAlpha = 1;
    });
    
    requestAnimationFrame(draw);
  }
  draw();

  // Click burst effect
  document.addEventListener('click', (e) => {
    const el = document.createElement('span');
    el.className = 'heart-pop';
    el.textContent = '💗';
    el.style.left = (e.clientX - 10) + 'px';
    el.style.top = (e.clientY - 10) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  });
})();

// Journey navigation
function renderJourneyNav(current){
  const pages = ['index.html','story.html','chat.html','gallery.html','game.html','puzzle.html','letter.html','night.html','proposal.html'];
  const labels = ['🏠','📖','💬','📸','🎮','🧩','💌','🌙','💍'];
  const nav = document.createElement('nav');
  nav.className = 'journey-nav';
  pages.forEach((p,i) => {
    const a = document.createElement('a');
    a.href = p;
    a.title = labels[i];
    if(p === current) a.className = 'active';
    a.setAttribute('aria-label', `Go to ${p.replace('.html','')}`);
    nav.appendChild(a);
  });
  document.body.appendChild(nav);
}