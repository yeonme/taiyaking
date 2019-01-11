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

const AngryStage = Object.freeze({
    A_NORMAL: 0,
    B_NERVOUS: 1,
    C_RAGED: 2
});

const CookStage = Object.freeze({
    EMPTY: 0,
    KIJI: 1,
    INSIDE: 2,
    SINGLEFLIP: 3,
    DOUBLEFLIP: 4,
    BURNED: -1
});

/**
 * Guest: Each guest
 */
/**
 * Guest
 * @property {Array} order : What taiyaki guest wants
 * @property {Number} timeAppeared : When guest appeared
 * @property {AngryStage} angryStage : Get current face
 * 
 */
class Guest {
    constructor() {
        this.timeAppeared = new Date().getTime();
        this.newOrder();
    }
    /**
     * @property {AngryStage}
     */
    get angryStage() {
        return AngryStage.A_NORMAL;
    }
    newOrder() {
        
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
    - cookStage: Cooked Stage
    - 
    */
    constructor() { 
        this.cookStage = CookStage.EMPTY;
    }

}

class TaiyakiCollection extends Array {
    constructor() {

    }
    add(item) {
        this.push(item);
    }
    similar(collection) {
        if(!(collection instanceof TaiyakiCollection)){
            console.log('ERROR: TaiyakiCollection.similar() does not fit type');
            return false;
        }
        array.forEach(element => {
            Taiyaki tai = new Taiyaki();
            tai.
        });
    }
}

function voTest(){
    let guest = new Guest();
    console.log(guest.angryStage);
}