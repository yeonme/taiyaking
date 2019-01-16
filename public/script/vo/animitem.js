class AnimItem {
    /**
     * Create a animation timeline being fired by tick events.
     * Should be added into AnimManager.
     * @param {Number} begin When the animation begins
     * @param {Number} end When the animation ends
     * @param {Number} animationType Kind of animation type
     * @param {PIXI.DisplayObject} target Which object will be affected
     * @param {Number} fromParam1 Smoothly changes value starts from (X)
     * @param {Number} fromParam2 Smoothly changes value starts from (Y)
     * @param {Number} toParam1 Smoothly changes value starts from (X)
     * @param {Number} toParam2 Smoothly changes value starts from (Y)
     */
    constructor(begin, end, animationType, target, fromParam1 = 0, fromParam2 = 0, toParam1 = 0, toParam2 = 0) {
        /** @type {Number} */
        this.beginTime = begin;
        /** @type {Number} */
        this.endTime = end;
        /** @type {Number} */
        this.animationType = ((typeof animationType === 'number') && animationType >= 0 && animationType < 1) ? animationType : AnimationType.TRANSITION;
        /** @type {Number} */
        this.fromParam1 = fromParam1;
        /** @type {Number} */
        this.fromParam2 = fromParam2;
        /** @type {Number} */
        this.toParam1 = toParam1;
        /** @type {Number} */
        this.toParam2 = toParam2;
        /** @type {PIXI.DisplayObject} */
        this.target = target;
        this._dismissed = false;
    }

    isActive() {
        return !this.isDismissed() && gameTimer > this.beginTime;
    }

    isDismissed() {
        if(this._dismissed) {
            return true;
        }
        if(gameTimer > this.endTime) {
            this._dismissed = true;
            return true;
        }
        return false;
    }
}