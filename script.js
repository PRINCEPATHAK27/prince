const music = document.getElementById("bgMusic");

window.addEventListener("load", () => {
    if (music) {
        music.volume = 0.5;
    }

    startCountdown();
});

function startJourney(){
    const story = document.getElementById("story");
    if(story){
        story.style.display = "block";
        story.scrollIntoView({behavior:"smooth"});
    }
}

/* Birthday countdown: ONLY the countdown is visible until 01 September 2026 */
function startCountdown(){
    const lockScreen = document.getElementById("countdownLockScreen");
    const birthdayContent = document.getElementById("birthdayContent");
    if(!lockScreen) return;

    const target = new Date("2026-08-01T00:00:00+05:30").getTime();

    function update(){
        const diff = target - Date.now();

        if(diff <= 0){
            // Birthday has arrived: hide countdown and reveal the website.
            lockScreen.style.display = "none";
            if(birthdayContent){
                birthdayContent.classList.remove("birthday-content-hidden");
            }
            document.body.classList.remove("countdown-lock");

            // Countdown khatam hote hi music automatically start ho jaye
            if(music){
                const play = music.play();
                if(play !== undefined){
                    play.catch(() => {
                        document.body.addEventListener("click", () => music.play(), {once:true});
                    });
                }
            }
            return;
        }

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff / 3600000) % 24);
        const minutes = Math.floor((diff / 60000) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = String(days).padStart(2,"0");
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
    }

    update();
    setInterval(update, 1000);
}

/* Photo popup */
document.querySelectorAll(".photo-card img").forEach(img => {
    img.onclick = function(){
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `<div class="popup-inner"><img src="${this.src}" alt="Memory"><span>✖</span></div>`;
        document.body.appendChild(popup);
        popup.onclick = () => popup.remove();
    };
});

/* Floating hearts */
setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.className = "floating-heart";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (18 + Math.random()*25) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(),6000);
},900);

function toggleMusic(){
    if(!music) return;
    music.paused ? music.play() : music.pause();
}

console.log("Birthday Surprise ❤️");
