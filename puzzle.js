const puzzle=document.getElementById("puzzle");
let order=[0,1,2,3,4,5,6,7,8];
let first=null;
let solved=false;
const image="images/photo1.jpg";

function draw(){
  puzzle.innerHTML="";
  order.forEach(num=>{
    const piece=document.createElement("div");
    piece.className="piece";
    piece.dataset.value=num;
    const col=num%3, row=Math.floor(num/3);
    piece.style.backgroundImage=`url("${image}")`;
    piece.style.backgroundSize="300% 300%";
    piece.style.backgroundPosition=`${col*50}% ${row*50}%`;
    piece.onclick=()=>select(piece);
    puzzle.appendChild(piece);
  });
}
function select(piece){
  if(solved)return;
  if(first===null){first=piece;piece.classList.add("selected");return;}
  if(first===piece){piece.classList.remove("selected");first=null;return;}
  swap(first,piece);
  first.classList.remove("selected");
  first=null;
  check();
}
function swap(a,b){
  const pos=a.style.backgroundPosition, val=a.dataset.value;
  a.style.backgroundPosition=b.style.backgroundPosition;
  a.dataset.value=b.dataset.value;
  b.style.backgroundPosition=pos;
  b.dataset.value=val;
}
function check(){
  const pieces=document.querySelectorAll(".piece");
  const win=[...pieces].every((p,i)=>Number(p.dataset.value)===i);
  if(win){solved=true;document.getElementById("message").innerHTML="🎉 Congratulations ❤️<br><br>Memory Complete! ❤️";}
}
function shufflePuzzle(){
  do{order=[...Array(9).keys()].sort(()=>Math.random()-0.5);}while(order.every((v,i)=>v===i));
  first=null;
  solved=false;
  document.getElementById("message").innerHTML="";
  draw();
}

const testImage=new Image();
testImage.src=image;
testImage.onerror=()=>{document.getElementById("message").innerHTML="📸 Photo nahi mil rahi. <br>images folder me photo1.jpg rakho ❤️";};
shufflePuzzle();
