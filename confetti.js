function launchConfetti(){

for(let i=0;i<150;i++){

const conf=document.createElement("div");

conf.innerHTML="🎉";

conf.style.position="fixed";

conf.style.left=Math.random()*100+"vw";

conf.style.top="-50px";

conf.style.fontSize=(15+Math.random()*20)+"px";

conf.style.transition="4s linear";

document.body.appendChild(conf);

setTimeout(()=>{

conf.style.top="110vh";

conf.style.transform=`rotate(${Math.random()*720}deg)`;

},50);

setTimeout(()=>{

conf.remove();

},4500);

}

}