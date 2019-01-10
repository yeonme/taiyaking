function loadMenuScene(){
    visibleScene = 0;
    console.log(sceneNumber);

    createObjUsingTexture("assets/bg/bg_goldfish.jpg", 1.1, app.stage, "Sprite", 0, 0);
    createObjUsingTexture("assets/title.png", 0.60, app.stage, "Sprite", 20, 30);
    createObjButton("assets/btn_play.png","assets/btn_play_highlight.png","assets/btn_play_pressed.png",0.20,app.stage,470,200,function(){
        sceneNumber = 1;
    });
    createObjButton("assets/btn_score.png","assets/btn_score_highlight.png","assets/btn_score_pressed.png",0.20,app.stage,470,280,function(){
        sceneNumber = 2;
    });
}

function tickMenuScene(){
    //doNothing
}