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
    constructor(kiji, inside, single, double, burned) {
        this.cookStage = CookStage.EMPTY;
        this.type = TaiyakiType.ANKO;
        this.timeStarted = new Date().getTime();
        this.objKiji = null;
        this.objInside = null;
        this.objSingleFlip = null;
        this.objDoubleFlip = null;
        this.objBurned = null;

        kiji.visible = false;
        this.objKiji = kiji;
        inside.visible = false;
        this.objInside = inside;
        single.visible = false;
        this.objSingleFlip = single;
        double.visible = false;
        this.objDoubleFlip = double;
        burned.visible = false;
        this.objBurned = burned;
    }
}