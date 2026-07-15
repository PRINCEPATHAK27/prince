let pieces = [];

let correctOrder = [
    0,1,2,
    3,4,5,
    6,7,8
];


function createPuzzle(){


let puzzle = document.getElementById("puzzle");

puzzle.innerHTML="";


pieces = [...correctOrder];


pieces.sort(()=>Math.random()-0.5);



pieces.forEach((item)=>{


let box = document.createElement("div");


box.className="piece";


box.style.backgroundImage =
"url('images/puzzle-photo.jpg')";


box.style.backgroundPosition =
getPosition(item);



box.dataset.value=item;


box.onclick=function(){

movePiece(this);

};


puzzle.appendChild(box);


});


}



function getPosition(i){


let x = (i%3)*50;

let y = Math.floor(i/3)*50;


return `${x}% ${y}%`;

}



function movePiece(piece){


piece.classList.toggle("selected");


let selected =
document.querySelectorAll(".selected");


if(selected.length===2){


let first = selected[0];

let second = selected[1];


let temp = first.style.backgroundPosition;


first.style.backgroundPosition =
second.style.backgroundPosition;


second.style.backgroundPosition =
temp;


first.classList.remove("selected");

second.classList.remove("selected");


checkWin();


}


}



function checkWin(){


let all =
document.querySelectorAll(".piece");


let win=true;


all.forEach((p,i)=>{


if(Number(p.dataset.value)!==i){

win=false;

}


});



if(win){


document.getElementById("message").innerHTML =
"❤️ Wah! Tumne hamari memory complete kar di ❤️";


}


}



function shufflePuzzle(){

createPuzzle();

}



createPuzzle();