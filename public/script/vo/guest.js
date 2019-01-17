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
        /** @type {PIXI.Text} */
        this.objText = null;
        this.builtText = "";
        this.slotNumber = -1;
        /** @type {Number} 0..2 BOY, GIRL, VIP */
        this.guestType = GuestType.BOY;
        this.angryStage = AngryStage.A_NORMAL;
        /** @type {TaiyakiHashMap} The order of taiyakis */
        this.order = new TaiyakiHashMap();

        this._requiredTime = 0;
        this.enduranceTime = 0;

        this.active = true;

        /** @type {Array<PIXI.Texture>} */
        this.texturesBoy = [PIXI.Texture.fromImage("assets/character/boy_waiting.png", undefined, 0.5)];
        /** @type {Array<PIXI.Texture>} */
        this.texturesGirl = [PIXI.Texture.fromImage("assets/character/girl_waiting.png", undefined, 0.5)];
        /** @type {Array<PIXI.Texture>} */
        this.texturesVIP = [PIXI.Texture.fromImage("assets/character/vip_waiting.png", undefined, 0.5)];
        this.textStyleDefault = new PIXI.TextStyle({
            align: 'center',
            fontWeight: 'bold',
            fontSize: 15
        });
    }
    get slotPos() {
        return 20 + 240 * this.slotNumber;
    }
    /**
     * Show the 
     * @param {Number} slotNum Where to be created from the left side.
     */
    display(slotNum = 0, guestType = GuestType.BOY) {
        let zorder = 11; // Upper than background stage of Guests
        if(this.objGuest != null) {
            console.log("Guest object is not initialized.");
            return;
        }
        this.guestType = guestType;
        this.slotNumber = slotNum;
        this.objGuest = TornadoUtil.createObjUsingTexture("assets/character/boy_waiting.png", 0.5, app.stage, "Sprite", 30000, 30000, zorder);
        this.objGuest.anchor.set(0.5, 0.5);
        this.objGuest.scale.set(0.5);
        //this.objGuest.position.set(20+240*slotNum,57);
        gameInfo.animman.add(new AnimItem(gameTimer, 300+(slotNum*300), AnimationType.TRANSITION, this.objGuest, EasingType.EASING, slotNum % 2 == 0 ? -100 : 690, 140, 80+240*slotNum, 140));
        this.update();
        //Skip animation this time as not implemented.

        if(this.objBubble == null) {
            this.objBubble = TornadoUtil.createObjUsingTexture("assets/speech_bubble_left.png", 0.3,
            app.stage, "Sprite", 145 + 235*slotNum, 15, zorder);
            this.objBubble.alpha = 0;
            this.objBubble.height = 100;
            this.objText = TornadoUtil.textOut(this.builtText, 168 + 237*slotNum, 50, app.stage, this.textStyleDefault);
            this.objText.alpha = 0;
            gameInfo.animman.add(new AnimItem(gameTimer+450, 600, AnimationType.ALPHA, this.objBubble, EasingType.DEFAULT, 0.0, 0.0, 1.0, 0.0));
            gameInfo.animman.add(new AnimItem(gameTimer+450, 600, AnimationType.ALPHA, this.objText, EasingType.DEFAULT, 0.0, 0.0, 1.0, 0.0));
        }
    }
    /**
     * Set the order randomly.
     */
    newOrder() {
        this.order = new TaiyakiHashMap();
        let quantity = Math.floor((Math.random() * 6) + 1);
        this.order.setQuantity(TaiyakiType.ANKO, quantity);
        this._requiredTime = 20000 + 3000*quantity;
        this.enduranceTime = this._requiredTime + Math.random()*10000;
        this.builtText = "I want\n"+quantity+" Taiyaki"+(quantity>1?"s":"")+"!";
    }
    /**
     * Leave from the store.
     */
    away() {
        if(this.objGuest !== null) {
            gameInfo.animman.add(new AnimItem(gameTimer, 300+(this.slotNumber*300), AnimationType.TRANSITION, this.objGuest, EasingType.EASING, 80+240*this.slotNumber, 140,
            this.slotNumber % 2 == 0 ? -900 : 1090, 140, true));
        }
        if(this.objBubble !== null) {
            gameInfo.animman.add(new AnimItem(gameTimer, 100, AnimationType.ALPHA, this.objBubble, EasingType.DEFAULT, 1, undefined,
                0, undefined, true));
        }
        if(this.objText !== null) {
            gameInfo.animman.add(new AnimItem(gameTimer, 100, AnimationType.ALPHA, this.objText, EasingType.DEFAULT, 1, undefined,
                0, undefined, true));
        }
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
                textures = this.texturesBoy;
            break;
            case GuestType.GIRL: 
                textures = this.texturesGirl;
            break;
            case GuestType.VIP: 
                textures = this.texturesVIP;
            break;
        }
        this.objGuest.texture = textures[Math.min(textures.length-1,this.angryStage)];
    }
    lifecycle() {
        // 0 - 10000 Normal
        // 10000 - 20000 Angry
        // 20000 - 25000 Angry2
        let waitingTime = new Date().getTime() - this.timeAppeared;
        if(waitingTime < this.enduranceTime * 0.6) {
            console.log("normal: "+waitingTime);
            this.angryStage = AngryStage.A_NORMAL;
        } else if(waitingTime < this.enduranceTime * 0.8) {
            console.log("nervous: "+waitingTime);
            this.angryStage = AngryStage.B_NERVOUS;
        } else if(waitingTime < this.enduranceTime) {
            console.log("raged: "+waitingTime);
            this.angryStage = AngryStage.C_RAGED;
        } else {
            this.active = false;
        }
    }
}