const music = document.getElementById("bgMusic");

window.addEventListener("load", () => {
    if (music) {
        music.volume = 0.5;
        const play = music.play();
        if (play !== undefined) {
            play.catch(() => {
                document.body.addEventListener("click", () => music.play(), {once:true});
            });
        }
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

            // Countdown ends -> first visible page is the cake-cutting surprise.
            startBirthdayMusic();
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

/* Birthday music: add your own authorized song as music/happy-birthday-to-you.mp3 */
const birthdaySong=document.getElementById("birthdaySong"),musicFallback=document.getElementById("musicFallback");
function showMusicFallback(show){if(musicFallback)musicFallback.style.display=show?"block":"none";}
function startBirthdayMusic(){if(!birthdaySong)return;birthdaySong.volume=.65;const t=Number(localStorage.getItem("birthdaySongTime")||0);if(t>0)try{birthdaySong.currentTime=t}catch(e){}const p=birthdaySong.play();if(p!==undefined)p.then(()=>{localStorage.setItem("birthdayMusicStarted","1");showMusicFallback(false)}).catch(()=>showMusicFallback(true));}
if(birthdaySong){birthdaySong.addEventListener("timeupdate",()=>{if(!birthdaySong.paused)localStorage.setItem("birthdaySongTime",String(birthdaySong.currentTime))});window.addEventListener("beforeunload",()=>{if(!birthdaySong.paused)localStorage.setItem("birthdaySongTime",String(birthdaySong.currentTime))});if(localStorage.getItem("birthdayMusicStarted")==="1")startBirthdayMusic();}


function blowCandles(){
    const candles = document.getElementById("candles");
    const blow = document.getElementById("blowButton");
    const cut = document.getElementById("cutButton");
    const message = document.getElementById("cakeMessage");

    if(candles) candles.classList.add("candles-out");
    if(blow) blow.disabled = true;
    if(cut) cut.disabled = false;
    if(message) message.innerHTML = "✨ Candles blown! Ab cake cut karo ❤️";
}

function cutCake(){
    const cake = document.getElementById("cakeEmoji");
    const cut = document.getElementById("cutButton");
    const message = document.getElementById("cakeMessage");
    const reward = document.getElementById("cakeReward");

    if(cake) cake.classList.add("cake-cut");
    if(cut) cut.disabled = true;
    if(message) message.innerHTML = "🔪 Slice! Slice! 🎉";
    if(reward) reward.classList.add("show-reward");

    for(let i=0;i<30;i++){
        setTimeout(()=>{
            const h=document.createElement("div");
            h.className="confetti-heart";
            h.textContent=["❤️","💖","💕","✨","🎉"][Math.floor(Math.random()*5)];
            h.style.left=Math.random()*100+"vw";
            document.body.appendChild(h);
            setTimeout(()=>h.remove(),5000);
        },i*60);
    }
}
