//NOT IMPLEMENTEDß
class AnimManager {
    constructor() {
        this.clear();
    }
    add(item) {
        this.timelines.push()
    }
    clear() {
        /** @type {Array<AnimItem>} Tasks to be fired by AnimManager */
        this.timelines = [];
    }
    /**
     * Pop the line for this time
     */
    pop() {
        this.timelines.forEach(item => {
            if(item.isDismissed()){
                if(item.isActive()){
                    
                }
            }
        });
    }
}