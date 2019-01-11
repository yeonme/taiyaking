class DragEvents {
    static onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    static onDragEnd() {
        this.alpha = 1;
        // 기울기 되돌리기
        this.rotation = 0.0;
        // Collision Detection
        if (hitTestRectangle(this, background)) {

            //if there's a collision
            console.log("Collsion");

            // change images
            var texture = PIXI.Texture.fromImage('images/taiyaki1.png');
            var taiyaki1 = new PIXI.Sprite(texture);
            taiyaki1.scale.set(1);
            taiyaki1.x = 100;
            taiyaki1.y = 300;

            // add it to the stage
            app.stage.addChild(taiyaki1);
        }

        // 나중에 this(해당 붕어빵)으로 수정
        if (hitTestRectangle(this, trash)) {
            console.log("Collsion");

            // remove image -> 안 보이게 처리
            this.visible = false;
        }

        // 원래 위치로
        this.x = 640;
        this.y = 300;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    static onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.rotation = -0.8;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }
}