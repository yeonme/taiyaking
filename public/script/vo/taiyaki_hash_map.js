class TaiyakiHashMap {
    constructor() {
        this.clear();
    }
    /**
     * Update the key value with specified Taiyaki added.
     * @param {Taiyaki} item Item to be added Taiyaki
     */
    add(item) {
        if(item instanceof Taiyaki) {
            if(this._taiyakis.hasOwnProperty(item.type)){
                this._taiyakis[item.type]++;
                return true;
            }
        }
        return false;
    }
    /**
     * Update the key value with specified Taiyaki deleted.
     * @param {Taiyaki} item Item to be deleted Taiyaki
     */
    remove(item) {
        if(item instanceof Taiyaki) {
            if(this._taiyakis.hasOwnProperty(item.type)) {
                this._taiyakis[item.type]--;
                return true;
            }
        }
        return false;
    }
    /**
     * Get the count of specified taiyaki.
     * @param {Number} type Taiyaki type to get
     */
    get(type) {
        if(typeof type === "number" && this._taiyakis.hasOwnProperty(type)) {
            return this._taiyakis[type];
        }
        return -1;
    }
    /**
     * Clear Taiyaki numbers.
     */
    clear() {
        this._taiyakis = {0:0, 1:0, 2:0};
    }
    /**
     * Get all Taiyaki counts registered here.
     */
    get count() {
        let sum = 0;
        for(var property in this._taiyakis) {
            if(typeof property === 'number') {
                sum += this._taiyakis[property];
            }
        }
        return sum;
    }
    /**
     * Compare other object if it has same value.
     * @param {TaiyakiHashMap} otherHashMap Other object to be compared.
     */
    similar(otherHashMap) {
        if(!(otherHashMap instanceof TaiyakiHashMap)){
            console.log('ERROR: TaiyakiHashMap.similar() does not fit type');
            return false;
        }
        for(var property in this._taiyakis) {
            if(typeof property === 'number') {
                if(!otherHashMap._taiyakis.hasOwnProperty(property) || otherHashMap._taiyakis[property] !== this._taiyakis[property]){
                    return false;
                }
            }
        }
    }

/**
 * report() returns counts of each types of edible Taiyaki.
 * @returns types of collection {0: 3, 1: 2, 2: 1} (Anko, Cream, Choco)
 */
    report(){
        let keyvalue = {0: 0, 1: 0, 2: 0};
        keyvalue.forEach(element => {
            if(element.cookStage < CookStage.KIJI){
                continue;
            }
            if(element.type in keyvalue) {
                keyvalue[element.type]++;
            }else{
                keyvalue[element.type] = 1;
            }
        });
        return keyvalue;
    }
}