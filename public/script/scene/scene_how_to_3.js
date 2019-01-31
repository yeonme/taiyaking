function loadHowTo3Scene() {
    visibleScene = 8;

    // Background
    TornadoUtil.fillRect(0xCA931C, 0, 0, 690, 550, app.stage, 1);
    TornadoUtil.fillRect(0xAA6A01, 40, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 140, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 240, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 340, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 440, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 540, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 640, 0, 15, 550, app.stage);

    // Image
    TornadoUtil.createObjUsingTexture('assets/how_to/howto_3.png', 1.0, app.stage, "Sprite", 0, 0);

    // Back btn
    TornadoUtil.createObjButton("assets/btns/btn_back.png", "assets/btns/btn_back_highlight.png", "assets/btns/btn_back_pressed.png", 0.12, app.stage, 460, 517, function () {
        sceneNumber = 6;
    });    
    // Play btn
    TornadoUtil.createObjButton("assets/btns/btn_play.png", "assets/btns/btn_play_highlight.png", "assets/btns/btn_play_pressed.png", 0.12, app.stage, 572, 517, function () {
        sceneNumber = 1;
    });
}

function tickScoreScene() {

}