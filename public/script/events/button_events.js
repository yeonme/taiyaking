/**
 * ButtonEvnets used on PixiUtil.createObjButton
 */
class ButtonEvents {
    static onButtonDown() {
        this.isdown = true;
        this.texture = this["textureButtonDown"];
        this.alpha = 1;
    }

    static onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.texture = this["textureButtonOver"];
        }
        else {
            this.texture = this["textureButton"];
        }
    }

    static onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this["textureButtonOver"];
    }

    static onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this["textureButton"];
    }
}