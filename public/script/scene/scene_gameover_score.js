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

    TornadoUtil.textOut("Congratulation!!", 225, 150, app.stage, style1);
    TornadoUtil.textOut("You made Top 10", 225, 190, app.stage, style1);
    TornadoUtil.textOut("Please insert your name", 245, 237, app.stage, style);

    // Insert bar and text
    TornadoUtil.fillRoundedRect(0xFFFFFF, 125, 280, 280, 45, 20, app.stage, null, null, null);
    gameInfo.objNickName = TornadoUtil.textOut("", 140, 287, app.stage, null);

    // bksp
    TornadoUtil.createObjButton("assets/btns/bksp.png", "assets/btns/bksp_highlight.png", "assets/btns/bksp_pressed.png", 0.9, app.stage, 430, 300, function () {
        gameInfo.nickName =  gameInfo.nickName.slice(0, gameInfo.nickName.length-1);
        gameInfo.objNickName.text = gameInfo.nickName;
    });

    // Submit
    let submit = TornadoUtil.createObjButton("assets/btns/submit.png", "assets/btns/submit_highlight.png", "assets/btns/submit_pressed.png", 0.9, app.stage, 510, 300, function () {
        if(!gameInfo.nickName){
            alert("Please insert your name!");
            return;
        }

        // Add a new document in collection "cities"
        db.collection("highscores").add({
            user: gameInfo.nickName,
            score: gameInfo.score,
            // @ts-ignore
            posted: new Date()
        })
        .then(function() {
            console.log("New world record!");
        })
        .catch(function(error) {
            console.error("Error writing rank: ", error);
        });
        alert('Completed! Go to ranking page');
        sceneNumber = 2;
    });

    // VIP
    TornadoUtil.createObjUsingTexture('assets/vip_waiting.png', 0.42, app.stage, "Sprite", 470, 130);

    let alphapet = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

    // Alphabet Btns - first row
    for (let i = 1; i < 14; i++) {
        TornadoUtil.createObjButton('assets/alphabets/alphabet' + i + '.png', 'assets/alphabets/alphabet' + i + '_pressed.png'
            , 'assets/alphabets/alphabet' + i + '_pressed.png', 1.0, app.stage, 100 + (35 * i), 370, function () {
                if (!gameInfo.nickName || gameInfo.nickName.length < 11) {
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
                if (!gameInfo.nickName || gameInfo.nickName.length < 11) {
                    gameInfo.nickName += alphapet[i - 1];
                    gameInfo.objNickName.text = gameInfo.nickName;
                }
            });
        idx++;
    };

    // btnClose
    let btnClose = TornadoUtil.createObjButton("assets/btns/exit.png", "assets/btns/exit_highlight.png", "assets/btns/exit_pressed.png", 0.8, app.stage, 345, 475, function () {
        sceneNumber = 0;
    });








}

function tickScoreScene() {

}