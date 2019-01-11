
class TaiyakiCollection extends Array {
    constructor() {

    }
    add(item) {
        if(item instanceof Taiyaki) {
            this.push(item);
        }
    }
    similar(collection) {
        if(!(collection instanceof TaiyakiCollection)){
            console.log('ERROR: TaiyakiCollection.similar() does not fit type');
            return false;
        }
        report(this)
        report(collection);
    }

/**
 * report() returns counts of each types of edible Taiyaki.
 * @returns types of collection {0: 3, 1: 2, 2: 1} (Anko, Cream, Choco)
 */
    report(){
        let keyvalue = {0: 0, 1: 0, 2: 0};
        array.forEach(element => {
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