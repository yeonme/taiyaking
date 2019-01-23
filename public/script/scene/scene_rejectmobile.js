/** @type {PIXI.Sprite} */
var heart;
function loadRejectMobileScene() {
    visibleScene = 7;
    TornadoUtil.clearStage(app.stage);

    heart = TornadoUtil.createObjUsingTexture("assets/heart.png", 1.0, app.stage, "Sprite", 300, 100);
    heart.anchor.set(0.5,0.5);

    var txtAlert = TornadoUtil.textOut("Sorry.\n\nThis is for Desktop PC only\nwhich is connected mouse.", 50, 170, app.stage,
    new PIXI.TextStyle({
        fill: 'white',
        fontSize: 30
    }));
}

/**
 * tickRejectMobileScene
 * @param {Number?} delta 
 */
function tickRejectMobileScene(delta) {
    if(typeof heart !== "undefined") {
        heart.rotation -= 0.1 * delta;
    }
}