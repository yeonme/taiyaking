function loadScoreScene() {
    visibleScene = 2;

    // Background
    TornadoUtil.fillRect(0xCA931C, 0, 0, 690, 550, app.stage, 1);
    TornadoUtil.fillRect(0xAA6A01, 40, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 140, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 240, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 340, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 440, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 540, 0, 15, 550, app.stage);
    TornadoUtil.fillRect(0xAA6A01, 640, 0, 15, 550, app.stage);

    // Character_boy
    let boy = TornadoUtil.createObjUsingTexture('assets/character/boy_waiting.png', 0.3, app.stage, "Sprite", 490, 48);
    boy.anchor.set(0.5, 0.5);

    // Character_girl
    let girl = TornadoUtil.createObjUsingTexture('assets/character/girl_waiting.png', 0.3, app.stage, "Sprite", 565, 48);
    girl.anchor.set(0.5, 0.5);

    // Ranking board background
    TornadoUtil.fillRoundedRect(0x00BFFF, 90, 80, 510, 420, 20, app.stage, 3, 0x282828, 1);

    // Ranking board
    TornadoUtil.fillRoundedRect(0xE1F6FA, 110, 120, 470, 330, 20, app.stage, null, null, null);

    // Ranking logo
    let logo = TornadoUtil.createObjUsingTexture('assets/ranking.png', 0.5, app.stage, "Sprite", 345, 80);
    logo.anchor.set(0.5, 0.5);

    // btnClose
    let btnClose = TornadoUtil.createObjButton("assets/btnclose.png", "assets/btnclose1.png", "assets/btnclose1.png", 0.6, app.stage, 345, 475, function() {
        sceneNumber = 0;
    });

    // Rank text background
    TornadoUtil.fillRoundedRect(0x0064CD, 120, 130, 65, 30, 10, app.stage, 2, 0x282828, 1);

    // Rank text and style
    var style = new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        fill: '0xFFFFFF'
    });
    let rankHeaderItem = TornadoUtil.textOut("RANK", 129, 135, app.stage, style);

    // Name text  & background
    TornadoUtil.fillRoundedRect(0x0064CD, 220, 130, 65, 30, 10, app.stage, 2, 0x282828, 1);
    TornadoUtil.textOut("NAME", 229, 135, app.stage, style);

    // Score text & background
    TornadoUtil.fillRoundedRect(0x0064CD, 340, 130, 75, 30, 10, app.stage, 2, 0x282828, 1);
    TornadoUtil.textOut("SCORE", 348, 135, app.stage, style);

    // Date text  & background
    TornadoUtil.fillRoundedRect(0x0064CD, 480, 130, 65, 30, 10, app.stage, 2, 0x282828, 1);
    TornadoUtil.textOut("DATE", 489, 135, app.stage, style);

    var innerStyle = new PIXI.TextStyle({
        align: 'center',
        fontWeight: '900',
        fontSize: 18
    });
    var rankData = [];
    let lineHeight = rankHeaderItem.getBounds().height + 15;
    let number = 0;
    db.collection("highscores").orderBy("score","desc").limit(10).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            rankData.push(doc.data());
            if(doc.data()) {
                number++;
                TornadoUtil.textOut(number.toString(), 129, 135 + lineHeight, app.stage, innerStyle);
                let rankItem = TornadoUtil.textOut(doc.data().user, 220, 135 + lineHeight, app.stage, innerStyle);
                TornadoUtil.textOut(doc.data().score, 340, 135 + lineHeight, app.stage, innerStyle);
                if(typeof doc.data().posted !== "undefined") {
                    /** @type {Date} */
                    let dateTime = doc.data().posted.toDate();
                    TornadoUtil.textOut(TornadoUtil.formatDate(dateTime), 480, 135 + lineHeight, app.stage, innerStyle);
                }
                lineHeight += rankItem.getBounds().height + 7;
            }
        });
    });

    // rankData.forEach(function(item){
    //             //rankData.push(doc.data());
    //             if(typeof item !== "undefined") {
    //                 number++;
    //                 TornadoUtil.textOut(number.toString(), 129, 135 + lineHeight, app.stage, innerStyle);
    //                 let rankItem = TornadoUtil.textOut(item.user, 220, 135 + lineHeight, app.stage, innerStyle);
    //                 TornadoUtil.textOut(item.score, 340, 135 + lineHeight, app.stage, innerStyle);
    //                 if(typeof item.posted !== "undefined") {
    //                     /** @type {Date} */
    //                     let dateTime = item.posted;
    //                     TornadoUtil.textOut(TornadoUtil.formatDate(dateTime), 480, 135 + lineHeight, app.stage, innerStyle);
    //                 }
    //                 lineHeight += rankItem.getBounds().height + 7;
    //             }
    //         });














}

function tickScoreScene() {

}