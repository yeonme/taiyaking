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
        this.objGuest = null;
        this.newOrder();
    }
    /**
     * @property {AngryStage}
     */
    get angryStage() {
        return AngryStage.A_NORMAL;
    }
    newOrder() {
        
    }
}