function loadGameOverScene() {
    visibleScene = 3;
    TornadoUtil.clearStage(app.stage);

    // Background
    TornadoUtil.fillRect(0xCA931C, 0, 0, 690, 550, app.stage, 1);
    TornadoUtil.fillRect(0xAA6A01, 40, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 140, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 240, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 340, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 440, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 540, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 640, 0, 15, 550, app.stage);

    // Blue background
    TornadoUtil.fillRoundedRect(0x00BFFF, 90, 80, 510, 420, 20, app.stage, 3, 0x282828, 1);

    // Light blue background
    TornadoUtil.fillRoundedRect(0xE1F6FA, 110, 150, 470, 250, 20, app.stage, null, null, null);

    // Game Over!
    let logo = TornadoUtil.createObjUsingTexture('assets/gameover.png', 0.45, app.stage, "Sprite", 340, 70);
    logo.anchor.set(0.5, 0.5);

    // Character_boy
    let boy = TornadoUtil.createObjUsingTexture('assets/boy_taiyaki.png', 0.5, app.stage, "Sprite", 510, 318);
    boy.anchor.set(0.5, 0.5);

    // Text and style
    var style = new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 34,
        fill: '0x464646'
    });
    TornadoUtil.textOut("Do you want to\nplay again?", 180, 230, app.stage, style);

    // Yes btn
    TornadoUtil.createObjButton("assets/btns/yes.png","assets/btns/yes_highlight.png","assets/btns/yes_pressed.png",1.0,app.stage,270,430,function(){
        sceneNumber = 1;
    });

    // No btn
    TornadoUtil.createObjButton("assets/btns/no.png","assets/btns/no_highlight.png","assets/btns/no_pressed.png",1.0,app.stage,420,430,function(){
        sceneNumber = 0;
    });


}

function tickScoreScene() {

}