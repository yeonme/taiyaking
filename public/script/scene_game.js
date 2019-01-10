function loadGameScene() {
    visibleScene = 1;
    gameTimer = 0;
    //Scene 배치
    gameInfo = new GameInfo();

    gameInfo.lifes[0] = createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 530, 110);
    gameInfo.lifes[1] = createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 555, 110);
    gameInfo.lifes[2] = createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 580, 110);
    gameInfo.lifes[3] = createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 605, 110);
    gameInfo.lifes[4] = createObjUsingTexture('assets/life.gif', 1.7, app.stage, "Sprite", 630, 110);
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


}