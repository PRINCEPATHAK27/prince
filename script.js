/* ==================================
      FOREVER WITH YOU ❤️
          main.js
==================================*/

// Loader
window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";
loader.style.visibility = "hidden";

},1800);

});

// Music

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click",()=>{

if(playing){

music.pause();

musicBtn.innerHTML="🎵";

}else{

music.play();

musicBtn.innerHTML="⏸️";

}

playing=!playing;

});

// Start Journey

const startBtn=document.getElementById("startJourney");

if(startBtn){

startBtn.onclick=()=>{

document.body.style.opacity="0";

setTimeout(()=>{

window.location.href="story.html";

},700);

}

}

// Fade Animation

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.glass").forEach(el=>{

observer.observe(el);

});

// Floating Hearts Generator

function createHeart(){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.className="floatingHeart";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(20+Math.random()*30)+"px";

heart.style.animationDuration=(4+Math.random()*4)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},8000);

}

setInterval(createHeart,900);

// Shooting Stars

function shootingStar(){

const star=document.createElement("div");

star.className="shootingStar";

star.style.top=Math.random()*40+"%";

star.style.left="-100px";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},2500);

}

setInterval(shootingStar,5000);

// Button Hover Sound (optional)

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// Scroll To Top

const topBtn=document.createElement("button");

topBtn.id="topBtn";

topBtn.innerHTML="⬆";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// Welcome Console

console.log("❤️ Forever With You - Prince ❤️");

// Hidden Secret (7 taps)

let taps=0;

document.querySelector(".hero").addEventListener("click",()=>{

taps++;

if(taps===7){

alert("❤️ Secret Unlocked ❤️");

window.location.href="secret.html";

}

});

// Prevent Right Click

document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});

// Fade In

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};