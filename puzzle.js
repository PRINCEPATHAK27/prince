const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

let order = [0,1,2,3,4,5,6,7,8];
let first = null;
let solved = false;
let image = "images/photo1.jpg";

function draw(){
  puzzle.innerHTML = "";

  order.forEach(num => {
    const piece = document.createElement("button");
    piece.type = "button";
    piece.className = "piece";
    piece.dataset.value = String(num);
    piece.setAttribute("aria-label", "Puzzle piece " + (num + 1));

    const col = num % 3;
    const row = Math.floor(num / 3);
    piece.style.backgroundImage = `url("${image}")`;
    piece.style.backgroundSize = "300% 300%";
    piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
    piece.addEventListener("click", () => select(piece));

    puzzle.appendChild(piece);
  });
}

function select(piece){
  if(solved) return;

  if(first === null){
    first = piece;
    piece.classList.add("selected");
    return;
  }

  if(first === piece){
    piece.classList.remove("selected");
    first = null;
    return;
  }

  swap(first, piece);
  first.classList.remove("selected");
  first = null;
  check();
}

function swap(a, b){
  const pos = a.style.backgroundPosition;
  const value = a.dataset.value;

  a.style.backgroundPosition = b.style.backgroundPosition;
  a.dataset.value = b.dataset.value;

  b.style.backgroundPosition = pos;
  b.dataset.value = value;
}

function check(){
  const pieces = document.querySelectorAll(".piece");
  const win = [...pieces].every((piece, index) => Number(piece.dataset.value) === index);

  if(win){
    solved = true;
    message.innerHTML = "🎉 Congratulations ❤️<br><br>Memory Complete! ❤️";
  }
}

function makeShuffledOrder(){
  const next = [0,1,2,3,4,5,6,7,8];

  for(let i = next.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

function shufflePuzzle(){
  do{
    order = makeShuffledOrder();
  }while(order.every((value, index) => value === index));

  first = null;
  solved = false;
  message.textContent = "";
  draw();
}

function setPuzzleImage(nextImage){
  if(!nextImage) return false;

  const testImage = new Image();
  testImage.onload = () => {
    image = nextImage;
    shufflePuzzle();
  };
  testImage.onerror = () => {
    message.textContent = "📸 Photo nahi mil rahi. Images folder me file ka naam check karo ❤️";
  };
  testImage.src = nextImage;
  return true;
}

function swapPuzzlePhoto(choice){
  const nextImage = choice.dataset.image;
  if(!nextImage || nextImage === image) return;

  const oldPuzzleImage = image;
  const img = choice.querySelector("img");
  if(!img) return;

  const testImage = new Image();
  testImage.onload = () => {
    image = nextImage;
    choice.dataset.image = oldPuzzleImage;
    img.src = oldPuzzleImage;
    img.alt = "Current puzzle photo";
    shufflePuzzle();
  };
  testImage.onerror = () => {
    message.textContent = "📸 Selected photo nahi mil rahi. File ka naam check karo ❤️";
  };
  testImage.src = nextImage;
}

document.querySelectorAll(".photo-choice").forEach(choice => {
  choice.addEventListener("click", () => swapPuzzlePhoto(choice));
});

setPuzzleImage(image);
