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
app.renderer.plugins.interaction.cursorStyles["none"] = "none";
app.ticker.add(function(delta){
    fireEachFrame(delta);
    //located on game_manager.js
});