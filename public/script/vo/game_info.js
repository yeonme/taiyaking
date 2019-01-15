/**
 * GameInfo
 * ---
 * @description Singleton game information
 * @property {Number} life Life
 */
class GameInfo {
    constructor(){
        this.life = 5;
        this.guests = new Array(2); //Array of Guest
        this.taiyakis = new Array(9);
        this.score = 0;
        this.objScore = null;
        this.objLifes = new Array(5);
        this.objBack = null;
        this.pointer = null;
        this.ankoSpoon = null;
    }
}