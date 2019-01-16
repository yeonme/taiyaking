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

        this.x = 0;
        this.y = 0;

        this.objKiji = kiji;
        this.objInside = inside;
        this.objSingleFlip = single;
        this.objDoubleFlip = double;
        this.objBurned = burned;

        this.updateVisual();
    }

    setXY(x, y){
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

        switch(this.cookStage) {
            case CookStage.KIJI: this.objKiji.visible = true; break;
            case CookStage.INSIDE: this.objInside.visible = true; break;
            case CookStage.SINGLEFLIP: this.objSingleFlip.visible = true; break;
            case CookStage.DOUBLEFLIP: this.objDoubleFlip.visible = true; break;
            case CookStage.BURNED: this.objDoubleFlip.visible = true; break;
        }
    }
}