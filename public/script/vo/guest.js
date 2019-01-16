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
    /** @type {Array<PIXI.Texture>} */
    static texturesBoy;
    /** @type {Array<PIXI.Texture>} */
    static texturesGirl;
    /** @type {Array<PIXI.Texture>} */
    static texturesVIP;
    /** @type {PIXI.TextStyle} */
    static textStyleDefault = new PIXI.TextStyle({
        align: 'center',
        fontWeight: 'bold',
        fontSize: 15
    });
    constructor() {
        this.timeAppeared = new Date().getTime();
        /** @type {PIXI.Sprite} **/
        this.objGuest = null;
        /** @type {PIXI.Sprite} */
        this.objBubble = null;
        /** @type {PIXI.Text} */
        this.objText = null;
        this.builtText = "";
        this.slotNumber = -1;
        /** @type {Number} 0..2 BOY, GIRL, VIP */
        this.guestType = GuestType.BOY;
        this.angryStage = AngryStage.A_NORMAL;
        /** @type {TaiyakiHashMap} The order of taiyakis */
        this.order = new TaiyakiHashMap();
    }
    get slotPos() {
        return 20 + 240 * this.slotNumber;
    }
    /**
     * Show the 
     * @param {Number} slotNum Where to be created from the left side.
     */
    display(slotNum = 0, guestType = GuestType.BOY) {
        if(this.objGuest != null) {
            console.log("Guest object is not initialized.");
            return;
        }
        this.slotNumber = slotNum;
        this.objGuest.scale.set(0.5);
        this.objGuest.position.set(20+240*slotNum,57);
        //Skip animation this time as not implemented.

        if(this.objBubble == null) {
            this.objBubble = TornadoUtil.createObjUsingTexture("assets/character/speech_bubble_left.png", 0.3,
            app.stage, "Sprite", 145 + 235*slotNum, 15);
            this.objText = TornadoUtil.textOut(this.builtText, 168 + 237*slotNum, 50, app.stage, Guest.textStyleDefault);
        }
    }
    /**
     * Set the order randomly.
     */
    newOrder() {
        this.order = new TaiyakiHashMap();
        let quantity = Math.floor((Math.random() * 6) + 1);
        for (let i = 0; i < quantity; i++) {
            let taiyaki = new Taiyaki();
            taiyaki.type = TaiyakiType.ANKO;
            this.order.add(new Taiyaki());
        };
        this.builtText = "I want\n\r"+quantity+" Taiyakis!";
    }
    /**
     * Leave from the store.
     */
    away() {
        // TODO: Push animation to AnimManager

        if(this.objText !== null) { this.objText.destroy(); }
        if(this.objBubble !== null) { this.objBubble.destroy(); }
        if(this.objGuest !== null) { this.objGuest.destroy(); }
    }
    /**
     * Update the texture using current status.
     */
    update() {
        if(this.objGuest == null) {
            return;
        }
        /** @type {Array<PIXI.Texture>} */
        let textures = null;
        switch(this.guestType) {
            case GuestType.BOY: 
                textures = Guest.texturesBoy;
            break;
            case GuestType.GIRL: 
                textures = Guest.texturesGirl;
            break;
            case GuestType.VIP: 
                textures = Guest.texturesVIP;
            break;
        }
        this.objGuest.texture = textures[Math.min(textures.length-1,this.angryStage)];
    }
}