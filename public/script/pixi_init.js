let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

//PIXI.utils.skipHello(type); //Skips log out PIXI version

//Create a Pixi Application
let app = new PIXI.Application({
    width: 690,
    height: 550
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
document.body.addEventListener('touchmove', function(e){ e.preventDefault(); }, { passive: false });
document.addEventListener('DOMContentLoaded', function(event){    
    let btnSound = document.getElementById('btnSound');
    console.log(btnSound);
    btnSound.className = getMuteStatus() ? "btnSoundOff" : "btnSoundOn";
    btnSound.addEventListener("click", function(event) {
        toggleMute();
        btnSound.className = lastMuteStatus ? "btnSoundOff" : "btnSoundOn";
    });
});
app.renderer.plugins.interaction.cursorStyles["none"] = "none";
app.ticker.add(function(delta){
    if(fireEachFrame){
        fireEachFrame(delta);
    }
    //located on game_manager.js
});

var lastMuteStatus = false;

function getMuteStatus() {
    let audios = document.getElementsByTagName("audio");
    if(typeof audios !== "undefined" && audios !== null && audios.length > 0) {
        let player = audios.item(0);
        lastMuteStatus = player.muted;
    }
    return lastMuteStatus;
}

function toggleMute() {
    lastMuteStatus = !lastMuteStatus;
    let audios = document.getElementsByTagName("audio");
    if(typeof audios !== "undefined" && audios !== null && audios.length > 0) {
        for (let idx = 0; idx < audios.length; idx++) {
            const player = audios[idx];
            player.muted = lastMuteStatus;
        }
    }
}