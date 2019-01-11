/**
 * static_routine.js
 * - TornadoUtil
 * - ButtonEvents
 * - DragEvents
 * - TornadoLogic
 * 
 * jinbaek.lee, miri.yoo
 * 2019-01-10
 */

/**
 * TornadoUtil: Own class to pack Pixi.js useful functions
 */
class TornadoUtil {
    /**
     * clear the stage by removing all children.
     * @param {PIXI.Container} stage the base of stage changed
     */
    static clearStage(stage) {
        while(stage.children[0])
        { stage.removeChild(stage.children[0]); }
    }

    /**
     * Create PIXI Object on the stage with specified texture.
     * @param {String} fileName Sprite texture fileName
     * @param {Number} scale Float to zoom in or out (Default: 1.0)
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {String} spriteType Reserved. (Default: "Sprite")
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @returns {PIXI.Sprite} Sprite Object
     */
    static createObjUsingTexture(fileName, scale, targetObj, spriteType, x, y){
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

    /**
     * Create PIXI Object interactive button
     * @param {String} fileNameDef Texture fileName on standard state
     * @param {String} fileNameHover Texture fileName on hover state
     * @param {String} fileNamePressed Texture fileName on pressed state
     * @param {Number} scale Float to zoom in or out (Default: 1.0)
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number} x Left x
     * @param {Number} y Top y
     * @param {Event} onClick EventHandler to fire on click (or tap)
     */
    static createObjButton(fileNameDef, fileNameHover, fileNamePressed, scale, targetObj, x, y, onClick){
        // let textureButtonDown = PIXI.Texture.fromImage(fileNamePressed);
        // let textureButtonOver = PIXI.Texture.fromImage(fileNameHover);
        let sprite = this.createObjUsingTexture(fileNameDef, scale, targetObj, "Sprite", x, y);
        sprite.anchor.set(0.5,0.5);
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.textureButton = PIXI.Texture.fromImage(fileNameDef);
        sprite.textureButtonDown = PIXI.Texture.fromImage(fileNamePressed);
        sprite.textureButtonOver = PIXI.Texture.fromImage(fileNameHover);
        sprite.tap = onClick;
        sprite.click = onClick;
        sprite.on('pointerdown', ButtonEvents.onButtonDown)
        .on('pointerup', ButtonEvents.onButtonUp)
        .on('pointerupoutside', ButtonEvents.onButtonUp)
        .on('pointerover', ButtonEvents.onButtonOver)
        .on('pointerout', ButtonEvents.onButtonOut);
    }

    /**
     * Fill the rect by specified color.
     * @param {Number} color Color to fill
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {Number} width Width
     * @param {Number} height Height
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {Number?} alpha Optional. Alpha value
     * @returns {PIXI.Graphics} Graphics object
     */
    static fillRect(color, x, y, width, height, targetObj, alpha) {
        let graphic = new PIXI.Graphics();
        typeof alpha == "undefined" ? graphic.beginFill(color) : graphic.beginFill(color,alpha);
        graphic.drawRect(0,0,width,height);
        graphic.endFill();
        graphic.x = x;
        graphic.y = y;
        targetObj.addChild(graphic);
        return graphic;
    }

    /**
     * Print Pixi.js Text
     * @param {String} text Text to output
     * @param {Number} x Left X
     * @param {Number} y Top Y
     * @param {PIXI.Container} targetObj Target stage to be changed
     * @param {PIXI.TextStyle?} textStyle Default: 'center'
     * @returns {PIXI.Text} Text Object
     */
    static textOut(text, x, y, targetObj, textStyle) {
        /*if(typeof textStyle == "undefined") {
            textStyle = new PIXI.TextStyle({
                //Set default text style here
            });
        }*/
        let txtObj = new PIXI.Text(text, textStyle);
        txtObj.position.set(x, y);
        targetObj.addChild(txtObj);
        return txtObj;
    }
}

/**
 * ButtonEvnets used on PixiUtil.createObjButton
 */
class ButtonEvents {
    static onButtonDown() {
        this.isdown = true;
        this.texture = this.textureButtonDown;
        this.alpha = 1;
    }

    static onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.texture = this.textureButtonOver;
        }
        else {
            this.texture = this.textureButton;
        }
    }

    static onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.textureButtonOver;
    }

    static onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.textureButton;
    }
}

class DragEvents {
    static onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    static onDragEnd() {
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

    static onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.rotation = -0.8;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }
}

/**
 * TornadoLogic : Pixi.js useful logics
 * 
 * miri.yoo
 */
class TornadoLogic {
    static hitTestRectangle(r1, r2) {

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
    }

    static checkNearestPoint(r1, r2) {
        //Define the variables we'll need to calculate
        let vx, vy;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //`hit` will be either `true` or `false`
        return Math.pow(Math.abs(vx), 2) + Math.pow(Math.abs(vy), 2);
    }
}