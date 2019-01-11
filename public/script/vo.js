/**
 * vo.js
 * - Guest (Instance)
 * - GameInfo (Instance)
 * - Taiyaki (Instance)
 * 
 * jinbaek.lee
 * 2019-01-10
 */
/**
 * GameInfo
 * ---
 * @description Singleton game information
 * @property {Number} life Life
 */
class GameInfo {
    constructor(){
        this.life = 5;
        this.objLifes = new Array(5);
        this.guests = []; //Array of Guest
        this.score = 0;
        this.objScore = null;
    }
}

/**
 * Guest: Each guest
 */
class Guest {
    //Guest doc
    /*
    - order: Array of Taiyaki
    - timeAppeared
    - angryStage
    - 
    */
    constructor() {  }
    appear() {

    }
}

/**
 * Taiyaki: 
 * @property 
 */
class Taiyaki {
    //Taiyaki doc
    /*
    - type: 0-2 / Anko, Cream, Choco
    - cookStage: 
    - 
    */
    constructor() { 
        var CookStage = {
            EMPTY: 0,
            KIJI: 1,
            INSIDE: 2,
            SINGLEFLIP: 3,
            DOUBLEFLIP: 4,
            TRIPLEFLIP: 5
        };
        this.cookStage = CookStage.EMPTY;
    }
    
}

