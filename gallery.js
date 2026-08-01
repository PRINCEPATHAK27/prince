/* ===========================
   GALLERY.JS
=========================== */

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const closeViewer = document.getElementById("closeViewer");

const photos = document.querySelectorAll(".photo img");

let current = 0;

// Open Image
photos.forEach((photo,index)=>{

photo.addEventListener("click",()=>{

current=index;

viewer.style.display="flex";

viewerImg.src=photo.src;

});

});

// Close
closeViewer.addEventListener("click",()=>{

viewer.style.display="none";

});

// Close Background
viewer.addEventListener("click",(e)=>{

if(e.target===viewer){

viewer.style.display="none";

}

});

// Keyboard Navigation

document.addEventListener("keydown",(e)=>{

if(viewer.style.display!="flex") return;

if(e.key==="ArrowRight"){

current++;

if(current>=photos.length){

current=0;

}

viewerImg.src=photos[current].src;

}

if(e.key==="ArrowLeft"){

current--;

if(current<0){

current=photos.length-1;

}

viewerImg.src=photos[current].src;

}

if(e.key==="Escape"){

viewer.style.display="none";

}

});

// Swipe Support

let startX=0;

viewer.addEventListener("touchstart",(e)=>{

startX=e.touches[0].clientX;

});

viewer.addEventListener("touchend",(e)=>{

let endX=e.changedTouches[0].clientX;

if(endX-startX>60){

current--;

if(current<0){

current=photos.length-1;

}

viewerImg.src=photos[current].src;

}

if(startX-endX>60){

current++;

if(current>=photos.length){

current=0;

}

viewerImg.src=photos[current].src;

}

});