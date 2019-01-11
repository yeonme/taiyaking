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