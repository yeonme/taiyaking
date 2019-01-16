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
    * 
    * @param {PIXI.Sprite} kiji 
    * @param {PIXI.Sprite} inside 
    * @param {PIXI.Sprite} single 
    * @param {PIXI.Sprite} double 
    * @param {PIXI.Sprite} burned 
    */
    constructor(kiji, inside, single, double, burned) {
        this.cookStage = CookStage.EMPTY;
        this.type = TaiyakiType.ANKO;
        this.timeStarted = new Date().getTime();
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

        this.x = 0;
        this.y = 0;

        this.objKiji = kiji;
        this.objInside = inside;
        this.objSingleFlip = single;
        this.objDoubleFlip = double;
        this.objBurned = burned;
        this.objGrab = TornadoUtil.createObjUsingTexture("assets/graphand.png", 1.0, app.stage, "Sprite", kiji.position.x, kiji.position.y);
        this.objGrab.visible = false;

        this._minCookStep = [0, 0, 5000, 4500, 5000, 0]; // 2->3, 3->4
        this._maxCookStep = [0, 0, 0, 0, 7000, 0];

        this.updateVisual();
    }

    cookTime() {
        return new Date().getTime() - this.timeStarted;
    }

    resetCookTime() {
        this.timeStarted = new Date().getTime();
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

        console.log("flipOverIfCan: "+this.cookStage+", "+this.cookTime());

        switch (this.cookStage) {
            case CookStage.INSIDE:
                if(this.cookTime() > this._minCookStep[CookStage.INSIDE]){
                    this.cookStage++;
                    this.resetCookTime();
                }
                break;
            case CookStage.SINGLEFLIP:
                if(this.cookTime() > this._minCookStep[CookStage.SINGLEFLIP]){
                    this.cookStage++;
                    this.resetCookTime();
                }
                break;
            case CookStage.DOUBLEFLIP:
                if(this.cookTime() > this._minCookStep[CookStage.DOUBLEFLIP] && this.cookTime() < this._maxCookStep[CookStage.DOUBLEFLIP]){
                    // Put into basket
                    this.cookStage = CookStage.EMPTY;
                    this.resetCookTime();
                } else if(this.cookTime() > this._maxCookStep[CookStage.DOUBLEFLIP]) {
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
}