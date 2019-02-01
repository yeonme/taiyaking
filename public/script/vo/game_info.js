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
        this.guestman = new GuestManager();
        /** @type {Array<Taiyaki>} **/
        this.taiyakis = new Array(9);
        this.basket = new TaiyakiHashMap();
        this.score = 0;
        this.objScore = null;
        /** @type {Array<PIXI.Sprite>} **/
        this.objLifes = new Array(5);
        /** @type {PIXI.Sprite} */
        this.objBack = null;
        /** @type {PIXI.Container} */
        this.objGuestContainer = null;
        /** @type {PIXI.Graphics} */
        this.objPointer = null;
        /** @type {PIXI.Sprite} */
        this.objAnkoSpoon = null;
        this.kijiClick = false;
        this.kijiClickCount = 0;
        this.ankoClick = false;
        this.ankoClickCount = 0;
        this.handClick = false;
        this.handClickCount = 0;
        /** @type {Array<PIXI.Texture>} **/
        this.textureBaseket = new Array(6);
        /** @type {PIXI.Sprite} **/
        this.objBasket = null;
         /** @type {PIXI.Graphics} */
        this.taiyakiCountBoard = null;
        this.taiyakiCountText = null;
         /** @type {PIXI.Sprite} **/
         this.objRequestBasket = null;
         /** @type {Array<PIXI.Texture>} **/
        this.textureRequestBaseket = new Array(6);
        /** @type {PIXI.Text} */
        this.objNickName = null;
        this.nickName = new String("").toString();
       /** @type {Array<PIXI.Sprite>} **/
        this.objredFlags = new Array(2);
        /** save HandMouseDown target and use on HandMouseUp
         * @type {Taiyaki} */
        this.targetTaiyaki = undefined;

        this.accumulateTaiyaki = 0;
        
        this.animman = new AnimManager();
    }
}