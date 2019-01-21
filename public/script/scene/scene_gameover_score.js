function loadGameOverScoreScene() {
    visibleScene = 4;

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
    TornadoUtil.fillRoundedRect(0xE1F6FA, 110, 120, 470, 330, 20, app.stage, null, null, null);

    // Game Over!
    let logo = TornadoUtil.createObjUsingTexture('assets/gameover.png', 0.45, app.stage, "Sprite", 340, 70);
    logo.anchor.set(0.5, 0.5);

    // Text and style
    var style1 = new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        fill: '0xFFFFFF',
        stroke: '0x0064CD',
        strokeThickness: 5,
    });

    var style = new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        fill: '0x464646'
    });

    TornadoUtil.textOut("Congratulation!!", 220, 150, app.stage, style1);
    TornadoUtil.textOut("You made Top 10", 220, 190, app.stage, style1);
    TornadoUtil.textOut("Please insert your name", 240, 237, app.stage, style);

    // Insert bar and text
    TornadoUtil.fillRoundedRect(0xFFFFFF, 125, 280, 280, 45, 20, app.stage, null, null, null);
    gameInfo.objNickName = TornadoUtil.textOut("", 140, 287, app.stage, null);

    // <-
    TornadoUtil.fillRoundedRect(0x0064CD, 410, 280, 45, 45, 10, app.stage, 2, 0x282828, 1);
    TornadoUtil.textOut("<-", 229, 135, app.stage, new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        fill: '0xFFFFFF'
    }));

    // VIP
    TornadoUtil.createObjUsingTexture('assets/vip_waiting.png', 0.42, app.stage, "Sprite", 470, 130);

    let alphapet = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");

    // Alphabet Btns - first row
    for (let i = 1; i < 14; i++) {
        TornadoUtil.createObjButton('assets/alphabets/alphabet' + i + '.png', 'assets/alphabets/alphabet' + i + '_pressed.png'
            , 'assets/alphabets/alphabet' + i + '_pressed.png', 1.0, app.stage, 100 + (35 * i), 370, function () {
                if(!gameInfo.nickName || gameInfo.nickName.length < 15) {
                    gameInfo.nickName += alphapet[i - 1];
                    gameInfo.objNickName.text = gameInfo.nickName;
                }
            });
    };

    // Alphabet Btns - second row
    var idx = 0;
    for (let i = 14; i < 27; i++) {
        TornadoUtil.createObjButton('assets/alphabets/alphabet' + i + '.png', 'assets/alphabets/alphabet' + i + '_pressed.png'
            , 'assets/alphabets/alphabet' + i + '_pressed.png', 1.0, app.stage, 135 + (35 * idx), 410, function () {
                if(!gameInfo.nickName || gameInfo.nickName.length < 15) {
                    gameInfo.nickName += alphapet[i - 1];
                    gameInfo.objNickName.text = gameInfo.nickName;
                }
            });
        idx++;
    };

    // btnClose
    let btnClose = TornadoUtil.createObjButton("assets/btnclose.png", "assets/btnclose1.png", "assets/btnclose1.png", 0.6, app.stage, 345, 475, function () {
        sceneNumber = 0;
    });








}

function tickScoreScene() {

}