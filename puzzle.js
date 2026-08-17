const puzzle = document.getElementById("puzzle");
let order = [0,1,2,3,4,5,6,7,8];
let first = null;

function draw(){
    puzzle.innerHTML = "";
    order.forEach(num=>{
        const piece = document.createElement("div");
        piece.className = "piece";
        piece.dataset.value = num;
        const x = (num % 3) * 50;
        const y = Math.floor(num / 3) * 50;
        piece.style.backgroundPosition = `${x}% ${y}%`;
        piece.onclick = () => select(piece);
        puzzle.appendChild(piece);
    });
}

function select(piece){
    if(first === null){
        first = piece;
        piece.classList.add("selected");
        return;
    }

    if(first === piece) return;

    const second = piece;
    swap(first,second);
    first.classList.remove("selected");
    first = null;
    check();
}

function swap(a,b){
    const tempPos = a.style.backgroundPosition;
    a.style.backgroundPosition = b.style.backgroundPosition;
    b.style.backgroundPosition = tempPos;

    const tempValue = a.dataset.value;
    a.dataset.value = b.dataset.value;
    b.dataset.value = tempValue;
}

function check(){
    const pieces = document.querySelectorAll(".piece");
    let win = true;

    pieces.forEach((p,i)=>{
        if(Number(p.dataset.value) !== i) win = false;
    });

    if(win){
        document.getElementById("message").innerHTML =
            "🎉 Congratulations ❤️<br>Memory complete! Happy Birthday! 🎂";
    }
}

function shufflePuzzle(){
    order.sort(()=>Math.random()-0.5);
    draw();
}

shufflePuzzle();
