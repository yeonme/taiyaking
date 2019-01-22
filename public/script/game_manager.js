//@ts-check
/**
 * @type {Number} sceneNumber sceneNumber want to show from now.
*/
var sceneNumber = 1;

/**
 * @type {Number} visibleScene current sceneNumber showing actually.
 */
var visibleScene = -1;

/**
 * @type {Number} gameTimer starts from zero on scene_game.
 */
var gameTimer = 0;

/**
 * @type {Number} lastFrameTime remember the last time fired scene_game.lazyTick()
 */
var lastFrameTime;
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
    } else if(sceneNumber == 3){ // Game Over
        isNewScene ? loadGameOverScene() :
            tickScoreScene();
    } else if(sceneNumber == 4){ // Game Over High Score Recorded
        isNewScene ? loadGameOverScoreScene() :
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