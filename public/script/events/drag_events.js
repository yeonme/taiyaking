//@ts-check
class DragEvents {

    /**
     * onDragStart 
     * @param {PIXI.interaction.InteractionEvent} event Event variable
     */
    static onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    /**
     * Kiji Drag Move
     *
     */
    static kijiOnDragMove() {
        if (this.dragging) {
            // @ts-ignore
            var newPosition = this.data.getLocalPosition(this.parent);
            this.rotation = -0.8;

            gameInfo.objPointer.visible = true;

            // @ts-ignore
            this.anchor.set(0.5);
            gameInfo.objPointer.x = newPosition.x - 60;
            gameInfo.objPointer.y = newPosition.y + 20;

            this.x = newPosition.x;
            this.y = newPosition.y;

            this.cursor = "none";
        }
    }

    static kijiOnDragEnd() {
        this.alpha = 1;
        this.rotation = 0.0;

        if (TornadoLogic.hitTestRectangle(gameInfo.objPointer, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            // console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            // console.log(kvIdxSprite);
            if (gameInfo.taiyakis[kvIdxSprite[0].key].cookStage === CookStage.EMPTY) {
                gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.KIJI;
                gameInfo.taiyakis[kvIdxSprite[0].key].resetCookTime();
                gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
                TornadoUtil.playSE('kiji');
            }
        }
        // @ts-ignore
        this.anchor.set(0.7);
        gameInfo.objPointer.visible = false;

        this.x = 640;
        this.y = 303;
        this.dragging = false;
        this.data = null;

        this.cursor = "pointer";
    }

    /**
     * Anko event
     *
     */
    static ankoOnDragMove() {
        if (this.dragging) {
            // @ts-ignore
            var newPosition = this.data.getLocalPosition(this.parent);

            gameInfo.objAnkoSpoon.visible = true;
            gameInfo.objPointer.visible = true;

            gameInfo.objAnkoSpoon.anchor.set(0.6);
            gameInfo.objPointer.x = newPosition.x - 30;
            gameInfo.objPointer.y = newPosition.y + 50;

            gameInfo.objAnkoSpoon.x = newPosition.x;
            gameInfo.objAnkoSpoon.y = newPosition.y;

            gameInfo.objAnkoSpoon.cursor = "none";
        }
    }

    static ankoOnDragEnd() {
        this.alpha = 1;

        if (TornadoLogic.hitTestRectangle(gameInfo.objAnkoSpoon, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            // console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            // console.log(kvIdxSprite);

            if (gameInfo.taiyakis[kvIdxSprite[0].key].cookStage == CookStage.KIJI) {
                if (gameInfo.taiyakis[kvIdxSprite[0].key].cookTime() > gameInfo.taiyakis[kvIdxSprite[0].key]._maxCookStep[CookStage.KIJI]) {
                    gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.BURNED;
                } else {
                    gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.INSIDE;
                }
                // gameInfo.taiyakis[kvIdxSprite[0].key].resetCookTime(); // Not reset becasue we don't flip it!
                gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
            }
        }

        gameInfo.objPointer.visible = false;
        gameInfo.objAnkoSpoon.visible = false;

        this.dragging = false;
        this.data = null;

        gameInfo.objAnkoSpoon.cursor = "pointer";
    }

    /**
     * handOnMouseDown
     * @param {PIXI.interaction.InteractionEvent} event 
     */
    static handOnMouseDown(event) {
        gameInfo.handClickCount++;

        if (gameInfo.handClickCount == 1) {
            this.data = event.data;
            this.alpha = 0.5;
            gameInfo.handClick = true;
            //app.stage.cursor = "none";
            this.cursor = "none";

            // console.log(this);
        }

        let taiyaki = DragEvents.findNearTaiyaki();
        //@ts-ignore
        let xy = event.data.getLocalPosition(this.parent);
        if (gameInfo.handClickCount > 1 && !(typeof taiyaki === 'undefined')) {
            // Taiyaki clicked
            if (!(taiyaki.cookStage == CookStage.EMPTY || taiyaki.cookStage == CookStage.BURNED || taiyaki.cookStage == CookStage.KIJI)) {
                this.alpha = 0.0;
                gameInfo.objPointer.visible = false;
                gameInfo.targetTaiyaki = taiyaki;
                taiyaki.grab(true);
                //app.stage.cursor = "none";
                this.cursor = "none";
            } else if (!(taiyaki.cookStage == CookStage.EMPTY)) {
                gameInfo.targetTaiyaki = taiyaki;
            }
        } else if (gameInfo.handClickCount > 1 && TornadoLogic.checkPointHitsRectangle(xy, gameInfo.objBasket)) {
            // Basket clicked
            DragEvents.basketOnDragStart(event);
        } else if (gameInfo.handClickCount > 1 && typeof taiyaki === 'undefined') {
            // Outside of taiyaki clicked
            this.alpha = 1;
            // @ts-ignore
            this.anchor.set(0, 0);
            this.x = 580;
            this.y = 403;
            gameInfo.handClick = false;
            gameInfo.objPointer.visible = false;
            gameInfo.targetTaiyaki = undefined;
            gameInfo.handClickCount = 0; // reset handClickCount
            //app.stage.cursor = "inherit";
            this.cursor = "pointer";
        }
    }

    /**
     * handOnMouseMove
     * @param {PIXI.interaction.InteractionEvent} event 
     */
    static handOnMouseMove(event) {
        if (gameInfo.handClick) {
            var mousePosition = app.renderer.plugins.interaction.mouse.global;
            this.alpha = 1.0;

            gameInfo.objPointer.visible = true;
            // @ts-ignore
            this.anchor.set(0.5, 0.5);
            gameInfo.objPointer.x = mousePosition.x - 25;
            gameInfo.objPointer.y = mousePosition.y + 25;
            this.x = mousePosition.x;
            this.y = mousePosition.y;
            //app.stage.cursor = "none";
            this.cursor = "none";

            DragEvents.basketOnDragMove(event);
        }
    }

    /**
     * handOnMouseUp
     * @param {PIXI.interaction.InteractionEvent} event 
     */
    static handOnMouseUp(event) {
        //@ts-ignore
        let xy = event.data.getLocalPosition(app.stage);
        if (gameInfo.objBasket["dragging"] === true) {
            // Basket clicked
            DragEvents.basketOnDragEnd();
            return;
        }
        //let taiyaki = DragEvents.findNearTaiyaki();
        let taiyaki = gameInfo.targetTaiyaki;
        if (gameInfo.handClick && gameInfo.handClickCount > 1 && !(typeof taiyaki === 'undefined')) {
            if (taiyaki instanceof Taiyaki) {
                taiyaki.grab(false);
                //app.stage.cursor = "none";
                this.cursor = "none";
            }
        } else if (gameInfo.handClick && gameInfo.handClick) {
            //
        }
    }

    /**
     * Basket event
     *
     */

    /**
     * onDragStart 
     * @param {PIXI.interaction.InteractionEvent} event Event variable
     */
    static basketOnDragStart(event) {
        this.data = event.data;
        gameInfo.objBasket["dragging"] = true;
    }
    static basketOnDragMove(event) {
        if (gameInfo.objBasket["dragging"]) {
            // @ts-ignore
            var newPosition = event.data.getLocalPosition(app.stage);

            gameInfo.objRequestBasket.visible = true;
            gameInfo.objRequestBasket.texture = gameInfo.textureRequestBaseket[Math.min(gameInfo.textureBaseket.length - 1, gameInfo.basket.count())];

            gameInfo.objRequestBasket.anchor.set(0.5, 0.5);

            gameInfo.objRequestBasket.x = newPosition.x;
            gameInfo.objRequestBasket.y = newPosition.y;
        }
    }

    static basketOnDragEnd() {
        let guest = DragEvents.findNearGuest();
        if (guest) {
            console.log(guest);
            if (!guest.got && gameInfo.basket.similar(guest.order)) {
                console.log("Correct!");
                gameInfo.accumulateTaiyaki += 1;
                let sumScore = (guest.guestType == GuestType.VIP) ? 300 : 100;
                switch (guest.angryStage) {
                    case AngryStage.B_NERVOUS:
                        sumScore = Math.round(sumScore * 0.8 / 10) * 10;
                        break;
                    case AngryStage.C_RAGED:
                        sumScore = Math.round(sumScore * 0.6 / 10) * 10;
                        break;
                }
                sumScore *= guest.order.count();
                gameInfo.score += sumScore;

                TornadoUtil.playSE('score');

                gameInfo.basket.clear();
                gameInfo.objBasket.texture = gameInfo.textureBaseket[Math.min(gameInfo.textureBaseket.length - 1, gameInfo.basket.count())];
                gameInfo.taiyakiCountText.text = gameInfo.basket.count();
                gameInfo.taiyakiCountBoard.visible = false;
                gameInfo.taiyakiCountText.visible = false;
                console.log("score +" + sumScore + " from " + gameInfo.score);
                let lastScore = gameInfo.objScore;
                if (typeof lastScore !== "undefined" || lastScore != null) {
                    let boundScore = lastScore.getBounds();
                    // @ts-ignore
                    let scoreEffect = TornadoUtil.textOut("+" + sumScore, boundScore.left + 50, boundScore.top, app.stage, new PIXI.TextStyle({
                        fill: [
                            "#6c6acb",
                            "#97dd5d"
                        ],
                        fontFamily: "Courier New",
                        fontWeight: "900",
                        letterSpacing: 0,
                        lineJoin: "round",
                        miterLimit: 40,
                        strokeThickness: 6
                    }));
                    gameInfo.animman.add(new AnimItem(gameTimer, 3000, AnimationType.ALPHA, scoreEffect, EasingType.EASING, 1.0, undefined, 0.0, undefined, true));
                }
                guest.got = true;
            } else if (!guest.got) {
                // gameInfo.life--;
                gameInfo.basket.clear();
                gameInfo.objBasket.texture = gameInfo.textureBaseket[Math.min(gameInfo.textureBaseket.length - 1, gameInfo.basket.count())];
                gameInfo.taiyakiCountText.text = gameInfo.basket.count();
                gameInfo.taiyakiCountBoard.visible = false;
                gameInfo.taiyakiCountText.visible = false;
                guest.active = false;
            }
        }

        gameInfo.objRequestBasket.visible = false;

        gameInfo.objBasket["dragging"] = false;
        gameInfo.objBasket["data"] = null;
    }

    /**
     * @returns {Taiyaki} Nearest Taiyaki
     */
    static findNearTaiyaki() {
        if (TornadoLogic.hitTestRectangle(gameInfo.objPointer, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objPointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;
                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            return gameInfo.taiyakis[kvIdxSprite[0].key];
        }
    }

    /**
     * @returns {Guest} Nearest Guest
     */
    static findNearGuest() {
        let isGuest = false;
        // @ts-ignore
        gameInfo.guestman.guests.every(function (guest, index) {
            if (TornadoLogic.hitTestRectangle(gameInfo.objRequestBasket, guest.objGuest)) {
                isGuest = true;
                return false; //Stop the loop!
            }
            return true; //Continue the loop!
        });

        if (isGuest) {
            console.log("Collison!");

            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.guestman.guests.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.objRequestBasket, gameInfo.guestman.guests[idx].objGuest);
                // console.log(newitem.val);
                kvIdxSprite.push(newitem);
            }
            // console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;
                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            // console.log(kvIdxSprite);
            return gameInfo.guestman.guests[kvIdxSprite[0].key];
        }
        return undefined;
    }
}