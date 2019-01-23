function loadHowTo2Scene() {
    visibleScene = 6;

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
    TornadoUtil.createObjUsingTexture('assets/how_to/howto_2.png', 1.0, app.stage, "Sprite", 0, 0);

    // Play btn
    TornadoUtil.createObjButton("assets/btn_play.png", "assets/btn_play_highlight.png", "assets/btn_play_pressed.png", 0.12, app.stage, 560, 460, function () {
        sceneNumber = 1;
    });
}

function tickScoreScene() {

}