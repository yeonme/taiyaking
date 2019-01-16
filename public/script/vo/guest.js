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
        /** @type {PIXI.Sprite} **/
        this.objGuest = null;
        /** @type {PIXI.Sprite} */
        this.objBubble = null;
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
    }
    /**
     * Leave from the store.
     */
    away() {
        // TODO: Push animation to AnimManager
    }
    /**
     * Update the texture using current status.
     */
    update() {
        // TODO: Change texture by angry status
    }
}