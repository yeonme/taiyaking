function createObjUsingTexture(fileName, scale, targetObj, spriteType, x, y){
    let texture = PIXI.Texture.fromImage(fileName);
    let sprite = new PIXI.Sprite(texture); 
    sprite.scale.set(scale,scale);
    if(x >= 0) {
        sprite.x = x;
    }
    if(y >= 0){
        sprite.y = y;
    }
    targetObj.addChild(sprite);
    return sprite;
}

function createObjButton(fileNameDef, fileNameHover, fileNamePressed, scale, targetObj, x, y, onClick){
    // let textureButtonDown = PIXI.Texture.fromImage(fileNamePressed);
    // let textureButtonOver = PIXI.Texture.fromImage(fileNameHover);
    let sprite = createObjUsingTexture(fileNameDef, scale, targetObj, "Sprite", x, y);
    sprite.anchor.set(0.5,0.5);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.textureButton = PIXI.Texture.fromImage(fileNameDef);
    sprite.textureButtonDown = PIXI.Texture.fromImage(fileNamePressed);
    sprite.textureButtonOver = PIXI.Texture.fromImage(fileNameHover);
    sprite.tap = onClick;
    sprite.click = onClick;
    sprite.on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);
}

/* Button Events start */
function onButtonDown() {
    this.isdown = true;
    this.texture = this.textureButtonDown;
    this.alpha = 1;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = this.textureButtonOver;
    }
    else {
        this.texture = this.textureButton;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = this.textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = this.textureButton;
}
/* Button Events end */

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    // 기울기 되돌리기
    this.rotation = 0.0;
    // Collision Detection
    if (hitTestRectangle(this, background)) {

        //if there's a collision
        console.log("Collsion");

        // change images
        var texture = PIXI.Texture.fromImage('images/taiyaki1.png');
        var taiyaki1 = new PIXI.Sprite(texture);
        taiyaki1.scale.set(1);
        taiyaki1.x = 100;
        taiyaki1.y = 300;

        // add it to the stage
        app.stage.addChild(taiyaki1);
    }

    // 나중에 this(해당 붕어빵)으로 수정
    if (hitTestRectangle(this, trash)) {
        console.log("Collsion");

        // remove image -> 안 보이게 처리
        this.visible = false;
    }

    // 원래 위치로
    this.x = 640;
    this.y = 300;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.rotation = -0.8;
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

// Collision Detection
function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};