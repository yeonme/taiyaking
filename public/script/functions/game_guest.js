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
        if(this.guests.length >= 2) {
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
    tickGuest() {
        let elapsed = new Date().getTime() - this.lastGenerated;
        if(elapsed > 3000) {
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