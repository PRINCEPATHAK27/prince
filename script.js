function openStory() {

    let story = document.getElementById("story");

    story.style.display = "block";

    story.scrollIntoView({
        behavior: "smooth"
    });

}



// Background Music

window.addEventListener("load", function(){

    let music = document.getElementById("bgMusic");

    music.volume = 0.5;


    let playPromise = music.play();


    if(playPromise !== undefined){

        playPromise.catch(()=>{

            document.body.addEventListener("click", function(){

                music.play();

            }, {once:true});

        });

    }

});
function openGallery(){

    window.location.href = "gallery.html";

}



function openProposal(){

    window.location.href = "proposal.html";

}