const guestTypePercentage = [0.1,0.55];
class GuestManager {
    constructor(){
        /** @type {Array<Guest>} */
        this.guests = [];
        this.nextPos = 0;
        /** @type {Number} When the last guest entered. */
        this.lastGenerated = new Date().getTime();
    }
    createGuest() {
        if(this.guests.length >= 2 || (gameTimer < 30000 && this.guests.length >= 1) ) {
            return;
        }
        this.lastGenerated = new Date().getTime();
        let guest = new Guest();
        guest.newOrder();
        let randomValue = Math.random();
        let guestType = (randomValue < guestTypePercentage[0])?GuestType.VIP:(randomValue < guestTypePercentage[1]?GuestType.GIRL:GuestType.BOY);
        guest.display(this.nextPos, guestType);
        this.nextPos = (this.nextPos+1)%2;
        this.guests.push(guest);
        //console.log(guest);
    }
    getGuestFrequency() {
        //gameTimer
        //0-30000 : length 1
        //30001-60000 : 10000
        //60001-90000 : 5000
        if(gameTimer < 30000) {
            return 3000; //it will be blocked on createGuest() length 1
        } else if(gameTimer < 60000) {
            return 10000;
        } else if(gameTimer < 90000) {
            return 5000;
        } else {
            return 3000;
        }
    }
    tickGuest() {
        let elapsed = new Date().getTime() - this.lastGenerated;
        if(elapsed > Math.max(this.getGuestFrequency(),3000)) {
            this.createGuest();
        }

        let idx = 0;
        while(idx < this.count()) {
            this.guests[idx].lifecycle();
            if(this.guests[idx] instanceof Guest && this.guests[idx].active === false && this.guests[idx].releasing === false) {
                let guest = idx == 0 ? this.guests.shift() : this.guests.pop();
                this.nextPos = guest.slotNumber;
                guest.away();
            } else {
                idx++;
            }
        }
    }
    clearGuest() {
        while(this.guests.length > 0){
            let guest = this.guests.shift();
            guest.away();
        }
    }
    count() {
        return this.guests.length;
    }
}