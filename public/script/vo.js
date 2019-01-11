class Guest {
    constructor() { }
    appear() {

    }
}

class GameInfo {
    constructor(){
        this.life = 5;
        this.lifes = new Array(5);
        this.guests = []; //Array of Guest
        this.score = 0;
    }
}