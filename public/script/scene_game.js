function loadGameScene() {
    visibleScene = 1;
    gameTimer = 0;

    //GameInfo contains all informations of the game
    gameInfo = new GameInfo();
    //Arranging Scene here
    PixiUtil.clearStage(app.stage);

    //Guest part wall (Background)
    PixiUtil.fillRect(0xEAC067,0,0,690,220,app.stage);
    PixiUtil.fillRect(0xAA6A01,40,0,15,220,app.stage);
    PixiUtil.fillRect(0xAA6A01,140,0,15,220,app.stage);
    PixiUtil.fillRect(0xAA6A01,240,0,15,220,app.stage);

    //Roof part background
    let roof = PixiUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",0,0);
    roof.width = 345;
    roof.height = 80;
    roof = PixiUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",345,0);
    roof.width = 345;
    roof.height = 80;

    //Serve counter background
    PixiUtil.fillRect(0xE84C09,0,220,690,25,app.stage);

    //Score monitor
    PixiUtil.createObjUsingTexture('assets/panel.png', 1.0, app.stage, "Sprite", 505, 65);


    gameInfo.lifes[0] = PixiUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 530, 110);
    gameInfo.lifes[1] = PixiUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 555, 110);
    gameInfo.lifes[2] = PixiUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 580, 110);
    gameInfo.lifes[3] = PixiUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 605, 110);
    gameInfo.lifes[4] = PixiUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 630, 110);
}

var gameInfo = new GameInfo();

function tickGameScene() {
    if (typeof lastFrameTime == "undefined" || (new Date().getTime() - lastFrameTime) > 500) {
        //fires every 500ms or first time entered
        lazyTick();
    }
}

function lazyTick() {
    lastFrameTime = new Date().getTime();
    console.log("lazyTick: " + gameTimer);
    lifeCheck();
}

/* Game Functions */
// 5 -> 30s -1
var lifeMinus = 0; //Test Val
let other;

function lifeCheck() {
    let newlifeMinus = parseInt(gameTimer / 5000);
    //console.log(newlifeMinus);
    if (newlifeMinus > lifeMinus) {
        lifeMinus = newlifeMinus;
        gameInfo.life--;
        console.log(gameInfo.life);
    }
    showMonitor();
}

function showMonitor() {
    //Life
    switch (gameInfo.life) {
        case 4:
            gameInfo.lifes[4].visible = false;
            break;
        case 3:
            gameInfo.lifes[4].visible = false;
            gameInfo.lifes[3].visible = false;
            break;
        case 2:
            gameInfo.lifes[4].visible = false;
            gameInfo.lifes[3].visible = false;
            gameInfo.lifes[2].visible = false;
            break;
        case 1:
            gameInfo.lifes[4].visible = false;
            gameInfo.lifes[3].visible = false;
            gameInfo.lifes[2].visible = false;
            gameInfo.lifes[1].visible = false;
            break;
        case 0:
            gameInfo.lifes[4].visible = false;
            gameInfo.lifes[3].visible = false;
            gameInfo.lifes[2].visible = false;
            gameInfo.lifes[1].visible = false;
            gameInfo.lifes[0].visible = false;
            break;
    }

    //Score

}