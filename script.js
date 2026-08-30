const target = new Date("2026-09-01T00:00:00+05:30").getTime();
function updateCountdown(){
 const now=Date.now(), diff=target-now;
 const count=document.getElementById("count"), love=document.getElementById("love");
 if(diff<=0){count.classList.add("hidden");love.classList.remove("hidden");return;}
 document.getElementById("d").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");
 document.getElementById("h").textContent=String(Math.floor(diff/3600000%24)).padStart(2,"0");
 document.getElementById("m").textContent=String(Math.floor(diff/60000%60)).padStart(2,"0");
 document.getElementById("s").textContent=String(Math.floor(diff/1000%60)).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);
const noBtn=document.getElementById("no");
function moveNo(){const pad=12; const x=pad+Math.random()*Math.max(1,innerWidth-noBtn.offsetWidth-pad*2); const y=pad+Math.random()*Math.max(1,innerHeight-noBtn.offsetHeight-pad*2); noBtn.style.position="fixed";noBtn.style.left=x+"px";noBtn.style.top=y+"px";}
if(noBtn){noBtn.addEventListener("pointerdown",e=>{e.preventDefault();moveNo()});noBtn.addEventListener("pointerenter",moveNo);}
function yes(){document.getElementById("btns").style.display="none";document.getElementById("res").classList.add("show");}
