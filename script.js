/* ===========================
      PREMIUM SCRIPT
=========================== */

const music = document.getElementById("bgMusic");

/* Background Music */

window.addEventListener("load", () => {

    if (music) {

        music.volume = 0.5;

        let play = music.play();

        if (play !== undefined) {

            play.catch(() => {

                document.body.addEventListener("click", () => {

                    music.play();

                }, { once: true });

            });

        }

    }

});


/* Start Journey */

function startJourney() {

    const story = document.getElementById("story");

    story.style.display = "block";

    story.scrollIntoView({

        behavior: "smooth"

    });

}


/* Fade Animation */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".story p,.photo-card,.proposal p").forEach(el => {

    observer.observe(el);

});


/* Image Click */

document.querySelectorAll(".photo-card img").forEach(img => {

    img.onclick = function () {

        const popup = document.createElement("div");

        popup.className = "popup";

        popup.innerHTML =

        `<img src="${this.src}">
        <span class="close">✖</span>`;

        document.body.appendChild(popup);

        popup.onclick = function () {

            popup.remove();

        }

    };

});


/* Floating Hearts */

setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.className = "floating-heart";

    heart.style.left = Math.random()*100+"vw";

    heart.style.fontSize =

    (20+Math.random()*25)+"px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },6000);

},900);


/* Proposal Effect */

function surprise(){

alert("❤️ I Love You Forever Tamatar ❤️");

}


/* Puzzle Winner */

function puzzleWin(){

document.getElementById("message").innerHTML=

"❤️ Congratulations ❤️<br>You completed our beautiful memory!";

}


/* Music Button */

function toggleMusic(){

if(music.paused){

music.play();

}else{

music.pause();

}

}


/* Console Message */

console.log("Made With Love ❤️");