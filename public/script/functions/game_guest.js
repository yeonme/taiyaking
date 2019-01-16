class GuestManager {
    constructor(){
        /** @type {Array<Guest>} */
        this.guests = [];
    }
    createGuest() {
        if(this.guests.length >= 2) {
            return;
        }
        let guest = new Guest();
        guest.newOrder();
        guest.display(this.guests.length, Math.floor((Math.random()*2)+1));
        this.guests.push(new Guest());
    }
    updateGuest() {
        
    }
    clearGuest() {
        while(this.guests.length > 0){
            let guest = this.guests.pop();
            guest.away();
        }
    }
    count() {
        return this.guests.length;
    }
}