function loadGameScene() {
    visibleScene = 1;
    gameTimer = 0;

    //GameInfo contains all informations of the game
    gameInfo = new GameInfo();
    //Arranging Scene here
    TornadoUtil.clearStage(app.stage);

    // fish cook (Background)
    let container = new PIXI.Container();
    app.stage.addChild(container);
    TornadoUtil.createObjUsingTexture('assets/fishcook_background.png', 1.0, container, "Sprite", 0, 230);
 
    //Guest part wall (Background)
    TornadoUtil.fillRect(0xEAC067,0,0,690,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,40,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,140,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,240,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,340,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,440,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,540,0,15,220,app.stage);
    TornadoUtil.fillRect(0xAA6A01,640,0,15,220,app.stage);

    //Roof part background
    let roof = TornadoUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",0,0);
    roof.width = 345;
    roof.height = 80;
    roof = TornadoUtil.createObjUsingTexture('assets/shopbackground.png',1.0,app.stage,"Sprite",345,0);
    roof.width = 345;
    roof.height = 80;

    // Ingredient space (Green zone);
    let greenSpace = TornadoUtil.fillRect(0x7ED824,0,0,140,280,app.stage);
    greenSpace.x = 550;
    greenSpace.y = 245;

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

    // Fish_empty
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 20, 240);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 20, 340);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 20, 440);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 190, 240);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 190, 340);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 190, 440);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 360, 240);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 360, 340);
    TornadoUtil.createObjUsingTexture('assets/fish_empty1.png', 0.25, app.stage, "Sprite", 360, 440);

    // Fish_kiji
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 20, 240).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 20, 340).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 20, 440).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 190, 240).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 190, 340).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 190, 440).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 360, 240).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 360, 340).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_01.png', 0.25, app.stage, "Sprite", 360, 440).visible = false;

    // Fish_inside
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 75, 275).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 75, 375).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 75, 475).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 245, 275).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 245, 375).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 245, 475).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 415, 275).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 415, 375).visible = false;
    TornadoUtil.createObjUsingTexture('assets/fish_anko.png', 0.8, app.stage, "Sprite", 415, 475).visible = false;

    // Fish_singleFlip

    // Fish_doubleFlip

    // Fish_bunred

    // paperbag
    let paperbag = TornadoUtil.createObjUsingTexture('assets/paperbag.png', 1.0, app.stage, "Sprite", 530, 465);
    paperbag.width = 200;

    // Cooking tools
    let kiji = TornadoUtil.createObjUsingTexture('assets/ingredients1.png', 0.22, app.stage, "Sprite", 640, 303);
    kiji.anchor.set(0.7);
    TornadoUtil.createObjUsingTexture('assets/ingredients2.png', 0.2, app.stage, "Sprite", 580, 325);
    TornadoUtil.createObjUsingTexture('assets/hand.png', 1.2, app.stage, "Sprite", 580, 410);
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