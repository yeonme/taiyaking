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
        /** @type {PIXI.extras.AnimatedSprite} **/
        this.objGuest = null;
        /** @type {PIXI.Sprite} */
        this.objBubble = null;
        /** @type {PIXI.Sprite} */
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
        /** @type {Boolean} The switch for checking Taiyaki get or not */
        this.got = false;
        this.releasing = false;

        /** @type {Array<Array<any>>} */
        this.texturesBoy = [[PIXI.Texture.fromImage("assets/character/boy_waiting.png", undefined, 0.5)
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_nervous_1.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_nervous_2.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_nervous_3.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_nervous_4.png", undefined, 0.5),time:400}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_raged_1.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/boy_waiting_raged_2.png", undefined, 0.5),time:700}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_01.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_02.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_03.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_04.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_05.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_06.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_07.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_08.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_09.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_10.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_11.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/boy_heart_12.png", undefined, 0.5),time:90}
        ]];

        /** @type {Array<Array<any>>} */
        this.texturesGirl = [[PIXI.Texture.fromImage("assets/character/girl_waiting.png", undefined, 0.5)
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_nervous_1.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_nervous_2.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_nervous_3.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_nervous_4.png", undefined, 0.5),time:400}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_raged_1.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/girl_waiting_raged_2.png", undefined, 0.5),time:700}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_01.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_02.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_03.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_04.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_05.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_06.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_07.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_08.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_09.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_10.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_11.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/girl_heart_12.png", undefined, 0.5),time:90}
        ]];

        /** @type {Array<Array<any>>} */
        this.texturesVIP = [[
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_1.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_2.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_3.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_4.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_5.png", undefined, 0.5),time:700}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_nervous_1.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_nervous_2.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_nervous_3.png", undefined, 0.5),time:400},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_nervous_4.png", undefined, 0.5),time:400}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_raged_1.png", undefined, 0.5),time:700},
        {texture:PIXI.Texture.fromImage("assets/character/vip_waiting_raged_2.png", undefined, 0.5),time:700}
        ],[
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_01.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_02.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_03.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_04.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_05.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_06.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_07.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_08.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_09.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_10.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_11.png", undefined, 0.5),time:90},
        {texture:PIXI.Texture.fromImage("assets/character/vip_heart_12.png", undefined, 0.5),time:90}
        ]];
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
        if(this.objGuest != null) {
            console.log("Guest object is not initialized.");
            return;
        }
        this.guestType = guestType;
        this.slotNumber = slotNum;
        // @ts-ignore
        this.objGuest = TornadoUtil.createObjUsingTexture("assets/character/boy_waiting.png", 0.5, gameInfo.objGuestContainer, "AnimatedSprite", 30000, 30000);
        this.objGuest.anchor.set(0.5, 0.5);
        this.objGuest.scale.set(0.5);
        //this.objGuest.position.set(20+240*slotNum,57);
        gameInfo.animman.add(new AnimItem(gameTimer, 300+(slotNum*300), AnimationType.TRANSITION, this.objGuest, EasingType.EASING, slotNum % 2 == 0 ? -100 : 690, 140, 80+240*slotNum, 140));
        this.update();
        //Skip animation this time as not implemented.

        if(this.objBubble == null) {
            this.objBubble = TornadoUtil.createObjUsingTexture("assets/speech_bubble_left.png", 0.3,
            gameInfo.objGuestContainer, "Sprite", 145 + 235*slotNum, 15);
            this.objBubble.alpha = 0;
            this.objBubble.height = 100;
            this.objText = TornadoUtil.textOut(this.builtText, 168 + 237*slotNum, 50, gameInfo.objGuestContainer, this.textStyleDefault);
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
        let quantity = Math.floor((Math.random() * 5) + 1);
        this.order.setQuantity(TaiyakiType.ANKO, quantity);
        this._requiredTime = 20000 + 4500*quantity;
        // this._requiredTime = 0;
        this.enduranceTime = this._requiredTime + Math.random()*10000 + 10000;
        // this.enduranceTime = 3000;
        this.builtText = "I want\n"+quantity+" Taiyaki"+(quantity>1?"s":"")+"!";
    }
    /**
     * Leave from the store.
     */
    away() {
        if(this.releasing) {
            return;
        }
        this.releasing = true;
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
        this.active = false;

        if(this.got === false) {
            console.log("life minus from "+gameInfo.life);
            let idx = gameInfo.objLifes.length-1;
            let lastLife = gameInfo.objLifes[idx];
            while(idx >= 0 && (typeof lastLife == "undefined" || lastLife == null || !lastLife.visible)){
                console.log(lastLife+", "+idx);
                idx--;
                lastLife = gameInfo.objLifes[idx];
            }
            let heartEffect = null;
            if(typeof lastLife !== "undefined" || lastLife != null) {
                // @ts-ignore
                heartEffect = TornadoUtil.textOut("-❤️",lastLife.getBounds().left, lastLife.getBounds().top, app.stage, new PIXI.TextStyle({
                    fill: [
                        "#cb6c6a",
                        "#97dd5d"
                    ],
                    fontFamily: "Courier New",
                    fontWeight: "900",
                    letterSpacing: 2,
                    lineJoin: "round",
                    miterLimit: 40,
                    strokeThickness: 6
                }));
                heartEffect.rotation = -0.45;
                let boundLife = lastLife.getBounds();
                gameInfo.animman.add(new AnimItem(gameTimer, 1000, AnimationType.TRANSITION, heartEffect, EasingType.EASING, boundLife.left, boundLife.top,
                    boundLife.left, boundLife.top-boundLife.height-30));
                gameInfo.animman.add(new AnimItem(gameTimer, 1200, AnimationType.ALPHA, heartEffect, EasingType.EASING, 1.0, undefined, 0.0, undefined, true));
            }
            gameInfo.life--;
        }
    }
    /**
     * Update the texture using current status.
     */
    update() {
        if(this.objGuest == null) {
            return;
        }
        /** @type {Array<Array<PIXI.Texture>>} */
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
        this.objGuest.textures = textures[Math.min(textures.length-1,this.angryStage)];
        if(this.angryStage == AngryStage.HEART) {
            this.objGuest.onLoop = () => {
                console.log("fired OnLoop");
                this.active = false;
                this.objGuest.onLoop = null;
            };
        }
        if(this.guestType == GuestType.VIP && this.angryStage == AngryStage.A_NORMAL) {
            this.objGuest.gotoAndPlay(Math.random()*this.objGuest.textures.length);
        } else {
            this.objGuest.play();
        }
    }
    lifecycle() {
        let waitingTime = new Date().getTime() - this.timeAppeared;
        let lastAngryStage = this.angryStage;
        if(this.got) {
            this.angryStage = AngryStage.HEART;
        } else if(waitingTime < this.enduranceTime * 0.5) {
            this.angryStage = AngryStage.A_NORMAL;
        } else if(waitingTime < this.enduranceTime * 0.8) {
            this.angryStage = AngryStage.B_NERVOUS;
        } else if(waitingTime < this.enduranceTime) {
            this.angryStage = AngryStage.C_RAGED;
        } else {
            this.active = false;
        }
        if(this.angryStage !== lastAngryStage) {
            this.update();
        }
    }
}