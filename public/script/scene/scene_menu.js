//@ts-nocheck
function loadMenuScene(){
    visibleScene = 0;
    console.log(sceneNumber);

    TornadoUtil.stopSE();

    // Background
    TornadoUtil.fillRect(0xCA931C, 0, 0, 690, 550, app.stage, 1);
    TornadoUtil.fillRect(0xAA6A01, 40, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 140, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 240, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 340, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 440, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 540, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 640, 0, 15, 550, app.stage);

    //Roof part background
    let roof = TornadoUtil.createObjUsingTexture('assets/shopbackground.png', 1.0, app.stage, "Sprite", 0, 0);
    roof.width = 690;
    roof.height = 250;

    // Girl
    let girl = TornadoUtil.createObjUsingTexture('assets/girl_taiyaki.png', 1.1, app.stage, "Sprite", 40, 190);

    // Boy
    let boy = TornadoUtil.createObjUsingTexture('assets/boy_taiyaki.png', 0.9, app.stage, "Sprite", 380, 260);

    // Heart1
    let heart1 = TornadoUtil.createObjUsingTexture('assets/heart.png', 0.4, app.stage, "Sprite", 30, 230);

    // TornadoUtil.createObjUsingTexture("assets/title.png", 0.60, app.stage, "Sprite", 20, 30);
    var btnHowto = TornadoUtil.createObjButton("assets/btns/btn_howto.png","assets/btns/btn_howto_highlight.png","assets/btns/btn_howto_pressed.png",0.20,app.stage,110,170,function(){
        sceneNumber = 5;
    });
    var btnPlay = TornadoUtil.createObjButton("assets/btns/btn_play.png","assets/btns/btn_play_highlight.png","assets/btns/btn_play_pressed.png",0.20,app.stage,345,170,function(){
        sceneNumber = 1;
    });
    var btnScore = TornadoUtil.createObjButton("assets/btns/btn_score.png","assets/btns/btn_score_highlight.png","assets/btns/btn_score_pressed.png",0.20,app.stage,580,170,function(){
        sceneNumber = 2;
    });

    if(dismissedClick) {
        TornadoUtil.playSE('bgmMain',false);
    } else {
        btnHowto.interactive = false;
        btnPlay.interactive = false;
        btnScore.interactive = false;

        var overlayGraphic = new PIXI.Graphics();
        overlayGraphic.beginFill(0x000000, 0.5);
        overlayGraphic.drawRect(0,0,app.view.width,app.view.height)
        var txt = TornadoUtil.textOut("Click here to prepare game!",0,0,overlayGraphic,new PIXI.TextStyle({
            fontSize: 20,
            fill: 0xFFFFFF,
            letterSpacing: 3,
            fontWeight: 'lighter',
            fontFamily: "Tahoma, Geneva, sans-serif",
        }));

        txt.visible = false;
        txt.anchor.set(0.5,0.5);
        txt.position.set(app.view.width/2, app.view.height/2);
        txt.visible = true;
        overlayGraphic.interactive = true;
        overlayGraphic.removeAllListeners();

        let onclick = function(){
            overlayGraphic.visible = false;

            btnHowto.interactive = true;
            btnPlay.interactive = true;
            btnScore.interactive = true;

            dismissedClick = true;

            TornadoUtil.playSE('bgmMain', false);
        };

        overlayGraphic.on("tap",onclick);
        overlayGraphic.on("click",onclick);
        overlayGraphic.endFill();
        app.stage.addChild(overlayGraphic);
    }
}

/**
 * tickMenu
 * @param {Number?} delta 
 */
function tickMenuScene(delta){
    //doNothing
}