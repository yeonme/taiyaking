//NOT IMPLEMENTEDß
class AnimManager {
    constructor() {
        this.clear();
    }
    /**
     * 
     * @param {AnimItem} item Task animation
     */
    add(item) {
        this.timelines.push(item);
    }
    clear() {
        /** @type {Array<AnimItem>} Tasks to be fired by AnimManager */
        this.timelines = [];
    }
    /**
     * Animate tick
     */
    tick() {
        let idx = 0;
        while(idx < this.timelines.length) {
            const item = this.timelines[idx];
            if(item.isDismissed()) {
                this.timelines.shift();
            } else {
                if(item.isActive()){
                    let x = item.getCurrent1();
                    let y = item.getCurrent2();
                    console.log("anim: "+x+", "+y);
                    if(item.animationType == AnimationType.TRANSITION) {
                        item.target.position.set(x, y);
                    } else if(item.animationType == AnimationType.ALPHA) {
                        item.target.alpha = x;
                    }
                }
                idx++;
            }
        }
    }
}