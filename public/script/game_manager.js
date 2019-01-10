var sceneNumber = 0, visibleScene = -1;
var gameTimer = 0, lastFrameTime;
//gameTimer: Used for only scene 1. Time after started the game.
//lastFrameTime: Used for lazyTick()
//alert('I\'m alive!');

function goToProperScene(){
    var isNewScene = visibleScene != sceneNumber;

    if(sceneNumber == 0){ // Main menu
        isNewScene ? loadMenuScene() : 
            tickMenuScene();
    } else if(sceneNumber == 1){ // Game screen
        isNewScene ? loadGameScene() : 
            tickGameScene();
    } else if(sceneNumber == 2){ // High Score screen
        isNewScene ? loadScoreScene() :
            tickScoreScene();
    }
}

//fires each frame
function fireEachFrame(delta){
    if(sceneNumber == 1){
        gameTimer += app.ticker.elapsedMS;
    }
    //console.log(app.ticker.FPS);
    goToProperScene();
}