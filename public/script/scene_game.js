function loadGameScene(){
    visibleScene = 1;
    gameTimer = 0;
    //Scene 배치

}

function tickGameScene(){
    if(typeof lastFrameTime == "undefined" || (new Date().getTime() - lastFrameTime) > 500) {
        //fires every 500ms or first time entered
        lazyTick();
    }
}

function lazyTick(){
    lastFrameTime = new Date().getTime();
    console.log("lazyTick: "+gameTimer);
}