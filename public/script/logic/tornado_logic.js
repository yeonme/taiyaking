/**
 * TornadoLogic : Pixi.js useful logics
 * 
 * miri.yoo
 */
class TornadoLogic {
    /**
     * Check r1 (smaller) hits r2 (larger)
     * @param {PIXI.Sprite | PIXI.Graphics} r1 
     * @param {PIXI.Sprite | PIXI.Graphics} r2 
     * @returns {Boolean} True on hits
     */
    static hitTestRectangle(r1, r2) {
        if(r1 == null || r2 == null) {
            return false;
        }
        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1["centerX"] = r1.x + r1.width / 2;
        r1["centerY"] = r1.y + r1.height / 2;
        r2["centerX"] = r2.x + r2.width / 2;
        r2["centerY"] = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1["halfWidth"] = r1.width / 2;
        r1["halfHeight"] = r1.height / 2;
        r2["halfWidth"] = r2.width / 2;
        r2["halfHeight"] = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1["centerX"] - r2["centerX"];
        vy = r1["centerY"] - r2["centerY"];

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1["halfWidth"] + r2["halfWidth"];
        combinedHalfHeights = r1["halfHeight"] + r2["halfHeight"];

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occurring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {

                //There's no collision on the y axis
                hit = false;
            }
        } else {

            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    }

    /**
     * check distance between r1, r2
     * @param {PIXI.Sprite | PIXI.Graphics} r1 
     * @param {PIXI.Sprite | PIXI.Graphics} r2 
     * @returns {Number} (x distance)^2 + (y distance)^2
     */
    static checkNearestPoint(r1, r2) {
        if(r1 == null || r2 == null) {
            return Number.MAX_VALUE;
        }

        //Define the variables we'll need to calculate
        let vx, vy;

        //Find the center points of each sprite
        r1["centerX"] = r1.x + r1.width / 2;
        r1["centerY"] = r1.y + r1.height / 2;
        r2["centerX"] = r2.x + r2.width / 2;
        r2["centerY"] = r2.y + r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1["centerX"] - r2["centerX"];
        vy = r1["centerY"] - r2["centerY"];

        //`hit` will be either `true` or `false`
        return Math.pow(Math.abs(vx), 2) + Math.pow(Math.abs(vy), 2);
    }

    /**
     * check p1 hits r1
     * @param {PIXI.Point} p1 
     * @param {PIXI.Sprite | PIXI.Graphics} r1 
     * @returns {Boolean} True if hits
     */
    static checkPointHitsRectangle(p1, r1) {
        return (p1.x > r1.getBounds().left && p1.x < r1.getBounds().right && p1.y > r1.getBounds().top && p1.y < r1.getBounds().bottom);
    }
}

/*
* Easing Functions - inspired from http://gizma.com/easing/
* only considering the t value for the range [0, 1] => [0, 1]
*/
var EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) {
        return t
    },
    // accelerating from zero velocity
    easeInQuad: function (t) {
        return t * t
    },
    // decelerating to zero velocity
    easeOutQuad: function (t) {
        return t * (2 - t)
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    // accelerating from zero velocity 
    easeInCubic: function (t) {
        return t * t * t
    },
    // decelerating to zero velocity 
    easeOutCubic: function (t) {
        return (--t) * t * t + 1
    },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    // accelerating from zero velocity 
    easeInQuart: function (t) {
        return t * t * t * t
    },
    // decelerating to zero velocity 
    easeOutQuart: function (t) {
        return 1 - (--t) * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    // accelerating from zero velocity
    easeInQuint: function (t) {
        return t * t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuint: function (t) {
        return 1 + (--t) * t * t * t * t
    },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
}