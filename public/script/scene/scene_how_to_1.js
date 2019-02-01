function loadHowTo1Scene() {
    visibleScene = 5;

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

    // Red background
    TornadoUtil.fillRect(0x800000, 65, 48, 565, 450, app.stage, 1);

    // Image
    TornadoUtil.createObjUsingTexture('assets/how_to/howto_1_edited.png', 1.0, app.stage, "Sprite", 0, 0);

    // Back btn
    TornadoUtil.createObjButton("assets/btns/btn_back.png", "assets/btns/btn_back_highlight.png", "assets/btns/btn_back_pressed.png", 0.12, app.stage, 460, 517, function () {
        sceneNumber = 0;
    });    
    // Next btn
    TornadoUtil.createObjButton("assets/btns/btn_next.png", "assets/btns/btn_next_highlight.png", "assets/btns/btn_next_pressed.png", 0.12, app.stage, 572, 517, function () {
        sceneNumber = 6;
    });
}

function tickScoreScene() {

}