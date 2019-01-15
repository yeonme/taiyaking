//@ts-nocheck
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
            var newPosition = this.data.getLocalPosition(this.parent);
            this.rotation = -0.8;

            gameInfo.pointer.visible = true;

            gameInfo.pointer.x = newPosition.x - 80;
            gameInfo.pointer.y = newPosition.y + 20;

            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    static kijiOnDragEnd() {
        this.alpha = 1;
        this.rotation = 0.0;

        if (TornadoLogic.hitTestRectangle(gameInfo.pointer, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.pointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            console.log(kvIdxSprite);
            gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.KIJI;
            gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
        }

        gameInfo.pointer.visible = false;

        this.x = 640;
        this.y = 300;
        this.dragging = false;
        this.data = null;
    }

    /**
     * Anko event
     *
     */
    static ankoOnDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);

            gameInfo.ankoSpoon.visible = true;
            gameInfo.pointer.visible = true;

            gameInfo.pointer.x = newPosition.x - 10;
            gameInfo.pointer.y = newPosition.y + 60;

            gameInfo.ankoSpoon.x = newPosition.x;
            gameInfo.ankoSpoon.y = newPosition.y;
        }
    }

    static ankoOnDragEnd() {
        this.alpha = 1;

        if (TornadoLogic.hitTestRectangle(gameInfo.ankoSpoon, gameInfo.objBack)) {
            let kvIdxSprite = [];
            for (let idx = 0; idx < gameInfo.taiyakis.length; idx++) {
                var newitem = {};
                newitem.key = idx;
                newitem.val = TornadoLogic.checkNearestPoint(gameInfo.pointer, gameInfo.taiyakis[idx].objKiji);
                kvIdxSprite.push(newitem);
            }
            console.log(kvIdxSprite);
            kvIdxSprite.sort(function (a, b) {
                var dflt = Number.MAX_VALUE;

                var aVal = (a == null ? dflt : a.val);
                var bVal = (b == null ? dflt : b.val);
                return aVal - bVal;
            });
            console.log(kvIdxSprite);

            if (gameInfo.taiyakis[kvIdxSprite[0].key].cookStage == CookStage.KIJI) {
                gameInfo.taiyakis[kvIdxSprite[0].key].cookStage = CookStage.INSIDE;
                gameInfo.taiyakis[kvIdxSprite[0].key].updateVisual();
            }
        }

        this.dragging = false;
        gameInfo.pointer.visible = false;
        gameInfo.ankoSpoon.visible = false;
        this.data = null;
    }

    static handOnDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        gameInfo.handClick = true;
    }

    static handOnDragMove() {
        if (gameInfo.handClick) {
            var mousePosition = app.renderer.plugins.interaction.mouse.global;

            gameInfo.pointer.visible = true;

            gameInfo.pointer.x = mousePosition.x;
            gameInfo.pointer.y = mousePosition.y + 50;

            this.x = mousePosition.x;
            this.y = mousePosition.y;
        }
    }


}