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
     * @param {Boolean} removeOnFinish To remove or not after animation
     */
    constructor(begin, duration, animationType, target, easingType = 0, fromParam1 = 0, fromParam2 = 0, toParam1 = 0, toParam2 = 0, removeOnFinish = false) {
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
        this.animationType = animationType;
        /** @type {PIXI.DisplayObject} */
        this.target = target;
        this._dismissed = false;
        this.removeOnFinish = removeOnFinish;
    }

    isActive() {
        return !this.isDismissed() && gameTimer > this.beginTime;
    }

    isDismissed() {
        if (this._dismissed) {
            return true;
        }
        if (this.removeOnFinish && gameTimer > this.beginTime + this.duration + 1000) {
            this.target.visible = false;
        }
        if (gameTimer > this.beginTime + this.duration + 3000) {
            if(this.removeOnFinish){
                this.target.visible = false;
                this.target.removeAllListeners();
                let papa = this.target.parent;
                let lastchild = papa.children.length;
                this.target.parent.removeChild(this.target);
                this.target.destroy();
                if(lastchild <= papa.children.length) {
                    console.log("failed delete child");
                }
            }
            this._dismissed = true;
            return true;
        }
        return false;
    }
    /**
     * 
     * @param {number} from start value
     * @param {number} to end value
     * @param {number} duration how long lasts
     * @param {number} pos current time (less than or same as duration)
     * @returns {number}
     */
    _xyCurrent(from, to, duration, pos) {
        if (this.easingType == EasingType.DEFAULT) {
            // return from + (to - from) * Math.max(0, Math.min(1, (pos / duration)));
            return from + (to - from) * EasingFunctions.linear(Math.max(0,Math.min(1,pos / duration)));
        } else if (this.easingType == EasingType.EASING) {
            return from + (to - from) * EasingFunctions.easeInOutQuad(Math.max(0,Math.min(1,pos / duration)));
        }
    }

    getCurrent1() {
        return this._xyCurrent(this.fromParam1, this.toParam1, this.duration, gameTimer - this.beginTime);
    }

    getCurrent2() {
        return this._xyCurrent(this.fromParam2, this.toParam2, this.duration, gameTimer - this.beginTime);
    }
}