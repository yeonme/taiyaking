/**
 * GameInfo
 * ---
 * @description Singleton game information
 * @property {Number} life Life
 */
class GameInfo {
    constructor(){
        this.life = 5;
        /** @type {GuestManager} **/
        this.guests = new GuestManager();
        /** @type {Array<Taiyaki>} **/
        this.taiyakis = new Array(9);
        this.basket = new TaiyakiHashMap();
        this.score = 0;
        this.objScore = null;
        /** @type {Array<PIXI.Sprite>} **/
        this.objLifes = new Array(5);
        /** @type {PIXI.Sprite} */
        this.objBack = null;
        /** @type {PIXI.Graphics} */
        this.objPointer = null;
        /** @type {PIXI.Sprite} */
        this.objAnkoSpoon = null;
        this.handClick = false;
        this.handClickCount = 0;
        /** @type {Array<PIXI.Texture>} **/
        this.textureBaseket = new Array(6);
        /** @type {PIXI.Sprite} **/
        this.objBasket = null;
        this.takiyakiCount = 0;
         /** @type {PIXI.Graphics} */
        this.taiyakiCountBoard = null;
        this.taiyakiCountText = null;
         /** @type {PIXI.Sprite} **/
         this.objRequestBasket = null;
         /** @type {Array<PIXI.Texture>} **/
        this.textureRequestBaseket = new Array(6);
    }
}