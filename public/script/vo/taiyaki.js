//@ts-check
/**
 * Taiyaki: 
 * @property 
 */
class Taiyaki {
    //Taiyaki doc
    /*
    - type: 0-2 / Anko, Cream, Choco
    - cookStage: Cooked Stage
    - timeStarted: When started
    - objKiji: Sprite
    - objInside: Sprite
    - objSingleFlip: Sprite
    - objDoubleFlip: Sprite
    - objBurned: Sprite
    */
   /**
    * Constructor
    * @param {PIXI.Sprite} kiji 
    * @param {PIXI.Sprite} inside 
    * @param {PIXI.Sprite} single 
    * @param {PIXI.Sprite} double 
    * @param {PIXI.Sprite} burned 
    */
    constructor(kiji = null, inside = null, single = null, double = null, burned = null) {
        this.cookStage = CookStage.EMPTY;
        this.type = TaiyakiType.ANKO;
        this.timeStarted = 0;
        /** @type {PIXI.Sprite} */
        this.objKiji = null;
        /** @type {PIXI.Sprite} */
        this.objInside = null;
        /** @type {PIXI.Sprite} */
        this.objSingleFlip = null;
        /** @type {PIXI.Sprite} */
        this.objDoubleFlip = null;
        /** @type {PIXI.Sprite} */
        this.objBurned = null;
        /** @type {PIXI.Sprite} */
        this.objGrab = null;
        /** @type {PIXI.extras.AnimatedSprite} */
        this.objSmoke = null;

        this.x = 0;
        this.y = 0;

        this.objKiji = kiji;
        this.objInside = inside;
        this.objSingleFlip = single;
        this.objDoubleFlip = double;
        this.objBurned = burned;
        if(kiji != null) {
            this.objGrab = TornadoUtil.createObjUsingTexture("assets/graphand.png", 1.0, app.stage, "Sprite", kiji.position.x, kiji.position.y);
            this.objGrab.visible = false;
            // @ts-ignore
            this.objSmoke = TornadoUtil.createObjUsingTexture([
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke1.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke2.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke3.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke4.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke5.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke6.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke7.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke8.png", undefined, 0.5),time:90},
                {texture:PIXI.Texture.fromImage("assets/smoke/smoke9.png", undefined, 0.5),time:90}
            ], 0.25, app.stage, "AnimatedSprite", kiji.position.x, kiji.position.y);
        }

        this._minCookStep = [0, 0, 5000, 4500, 5000, 0]; // 2->3, 3->4
        /** 
         * @readonly
         * @type {Array<Number>} smokeTime
         */
        this._warnCookStep = [0, 8500, 8500, 7000, 7500, 0];
        this._maxCookStep = [0, 13000, 13000, 9500, 10000, 0];

        this.updateVisual();
    }

    cookTime() {
        return gameTimer - this.timeStarted;
    }

    resetCookTime() {
        this.timeStarted = gameTimer;
    }

    flipOverIfCan() {
        /*
            EMPTY: 0,
            KIJI: 1,
            INSIDE: 2, V
            SINGLEFLIP: 3, V
            DOUBLEFLIP: 4, V
            BURNED: -1 V
        */

        console.log("flipOverIfCan: " + this.cookStage + ", " + this.cookTime());

        switch (this.cookStage) {
            case CookStage.INSIDE:
                if (this.cookTime() > this._minCookStep[CookStage.INSIDE] && this.cookTime() < this._maxCookStep[CookStage.INSIDE]) {
                    this.cookStage++;
                    this.resetCookTime();
                    TornadoUtil.playSE('flip');
                } else if (this.cookTime() > this._maxCookStep[CookStage.INSIDE]) {
                    // Too late
                    this.cookStage = CookStage.BURNED;
                }
                break;
            case CookStage.SINGLEFLIP:
                if (this.cookTime() > this._minCookStep[CookStage.SINGLEFLIP] && this.cookTime() < this._maxCookStep[CookStage.SINGLEFLIP]) {
                    this.cookStage++;
                    this.resetCookTime();
                    TornadoUtil.playSE('flip');
                } else if (this.cookTime() > this._maxCookStep[CookStage.SINGLEFLIP]) {
                    // Too late
                    this.cookStage = CookStage.BURNED;
                }
                break;
            case CookStage.DOUBLEFLIP:
                if (this.cookTime() > this._minCookStep[CookStage.DOUBLEFLIP] && this.cookTime() < this._maxCookStep[CookStage.DOUBLEFLIP]) {
                    // Put into basket
                    this.cookStage = CookStage.EMPTY;
                    gameInfo.basket.add(new Taiyaki());
                    gameInfo.objBasket.texture = gameInfo.textureBaseket[Math.min(gameInfo.textureBaseket.length - 1, gameInfo.basket.count())];
                    gameInfo.taiyakiCountBoard.visible = true;
                    gameInfo.taiyakiCountText.visible = true;
                    gameInfo.taiyakiCountText.text = gameInfo.basket.count();
                    this.resetCookTime();
                    TornadoUtil.playSE('paperbag');
                } else if (this.cookTime() > this._maxCookStep[CookStage.DOUBLEFLIP]) {
                    // Too late
                    this.cookStage = CookStage.BURNED;
                }
                break;
            case CookStage.BURNED:
                // Waste
                this.cookStage = CookStage.EMPTY;
                break;
        }
        this.updateVisual();
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    updateVisual() {
        if(this.objBurned == null) {
            return;
        }
        this.objBurned.visible = false;
        this.objDoubleFlip.visible = false;
        this.objInside.visible = false;
        this.objKiji.visible = false;
        this.objSingleFlip.visible = false;

        switch (this.cookStage) {
            case CookStage.KIJI: this.objKiji.visible = true; break;
            case CookStage.INSIDE: this.objInside.visible = true; break;
            case CookStage.SINGLEFLIP: this.objSingleFlip.visible = true; break;
            case CookStage.DOUBLEFLIP: this.objDoubleFlip.visible = true; break;
            case CookStage.BURNED: this.objBurned.visible = true; break;
        }
    }

    /**
     * Change sprite of Taiyaki by mouse manipulating
     * @param {Boolean} mousedown Mouse down on/off
     */
    grab(mousedown) {
        if (mousedown) {
            this.objBurned.visible = false;
            this.objDoubleFlip.visible = false;
            this.objInside.visible = false;
            this.objKiji.visible = false;
            this.objSingleFlip.visible = false;
            this.objGrab.visible = true;
        } else {
            this.objGrab.visible = false;
            this.flipOverIfCan();
            this.updateVisual();
        }
    }

    /**
     * Update Appearance without interacting such as smoking.
     */
    tickTaiyaki() {
        if(this._warnCookStep.length > this.cookStage && this._warnCookStep[this.cookStage] > 0 && this._warnCookStep[this.cookStage] < this.cookTime()) {
            this.objSmoke.visible = true;
            this.objSmoke.gotoAndPlay(0);
        } else {
            this.objSmoke.visible = false;
            this.objSmoke.stop();
        }
    }
}