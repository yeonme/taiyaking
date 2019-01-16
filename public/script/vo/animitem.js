class AnimItem {
    /**
     * Create a animation timeline being fired by tick events.
     * Should be added into AnimManager.
     * @param {Number} begin When the animation begins (now: gameTimer)
     * @param {Number} duration How long the animation works
     * @param {Number} animationType Kind of animation type
     * @param {PIXI.DisplayObject} target Which object will be affected
     * @param {Number} fromParam1 Smoothly changes value starts from (X)
     * @param {Number} fromParam2 Smoothly changes value starts from (Y)
     * @param {Number} toParam1 Smoothly changes value starts from (X)
     * @param {Number} toParam2 Smoothly changes value starts from (Y)
     */
    constructor(begin, duration, animationType, target, easingType = 0, fromParam1 = 0, fromParam2 = 0, toParam1 = 0, toParam2 = 0) {
        /** @type {Number} */
        this.beginTime = begin;
        /** @type {Number} */
        this.duration = duration;
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
        this.easingType = easingType;
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
        if(gameTimer > this.beginTime + this.duration) {
            this._dismissed = true;
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {Number} from start value
     * @param {Number} to end value
     * @param {Number} duration how long lasts
     * @param {Number} pos current time (less than or same as duration)
     */
    _xyCurrent(from, to, duration, pos){
        return from + (to - from) * Math.max(0,Math.min(1,(pos / duration)));
    }

    getCurrent1(){
        return this._xyCurrent(this.fromParam1, this.toParam1, this.duration, gameTimer - this.beginTime);
    }

    getCurrent2(){
        return this._xyCurrent(this.fromParam2, this.fromParam2, this.duration, gameTimer - this.beginTime);
    }
}