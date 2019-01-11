function loadGameScene() {
    visibleScene = 1;
    gameTimer = 0;

    //GameInfo contains all informations of the game
    gameInfo = new GameInfo();
    //Arranging Scene here
    TornadoUtil.clearStage(app.stage);

    //Guest part wall (Background)
    TornadoUtil.fillRect(0xEAC067,0,0,690,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,40,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,140,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,240,0,15,220,app.stage);

    //Roof part background
    let roof = TornadoUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",0,0);
    roof.width = 345;
    roof.height = 80;
    roof = TornadoUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",345,0);
    roof.width = 345;
    roof.height = 80;

    //Serve counter background
    TornadoUtil.fillRect(0xE84C09,0,220,690,25,app.stage);

    //Score monitor
    TornadoUtil.createObjUsingTexture('assets/panel.png', 1.0, app.stage, "Sprite", 505, 65);

    gameInfo.objLifes[0] = TornadoUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 530, 110);
    gameInfo.objLifes[1] = TornadoUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 555, 110);
    gameInfo.objLifes[2] = TornadoUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 580, 110);
    gameInfo.objLifes[3] = TornadoUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 605, 110);
    gameInfo.objLifes[4] = TornadoUtil.createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 630, 110);

    gameInfo.objScore = TornadoUtil.textOut("0", 550, 160, app.stage, new PIXI.TextStyle({align: 'center', fontWeight: 'bold'}));
}

var gameInfo = new GameInfo();

function tickGameScene() {
    /* if (typeof lastFrameTime == "undefined" || (new Date().getTime() - lastFrameTime) > 500) { */
        //fires every 500ms or first time entered
        lazyTick();
    /* } */
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
    for (let lifeIndex = 0; lifeIndex < 5; lifeIndex++) {
        gameInfo.objLifes[lifeIndex].visible = false;
    }
    for (let lifeIndex = 0; lifeIndex < gameInfo.life; lifeIndex++) {
        gameInfo.objLifes[lifeIndex].visible = true;
    }

    //Score (TEST BY GAMETIMER)
    if(typeof gameInfo.objScore != "undefined" && gameInfo.objScore != null){
        app.stage.removeChild(gameInfo.objScore);
    }
    gameInfo.objScore = TornadoUtil.textOut(Math.round(gameTimer / 1000.0 * 100) / 100, 550, 160, app.stage, new PIXI.TextStyle({align: 'center', fontWeight: 'bold'}));
}