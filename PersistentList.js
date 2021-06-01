//Alexandra Chin

//The PersistentList class is an object that holds a list of items 
class PersistentList {
    constructor(key) {
        this.key = key;
        this.itemArray =[];
        this.counter = 0;
        console.log("ITEM ARRY" ,this.itemArray)
    }

    //returns the value of the counter
    getCounter() {
        return this.counter;
    }

    // returns the list of grocery dictionaries
    getElements() {
        return this.itemArray;
    }

    //returns the list of items (just the strings)
    getItems() {
        var items = []
        this.itemArray.forEach(function(elt) {items.push(elt)});
        return items;
    }

    //takes a string as its argument (e.g. "milk") and the method creates a dictionary, assigning the item a gid, and adding it to the list
    addItem(newItem) {
        var dict = {};
        dict["gid"] = this.counter;
        dict["item"] = newItem;
        this.itemArray.push(dict);
        this.counter ++;
        console.log("count ", this.counter);
        return dict["gid"];
    }

    //looks up and returns the dictionary for the item with the given gid
    getElement(gid) {
        var correctItem;
        this.itemArray.forEach(function(elt) {
            if (elt["gid"] == gid) {
                correctItem = elt;
            }
        });
        return correctItem;
    }

    //deletes the dictionary for the item with the given gid from the list.
    removeItem(gid) {
        let index = this.itemArray.findIndex(function (elt) { return elt["gid"] == gid });
        console.log("index ", index);
        this.itemArray.splice(index, 1);
    }

    //saves the list to localStorage under the given key.
    save() {
        var collection = {};
        collection["items"] = this.itemArray;
        collection["counter"] = this.counter;
        localStorage.setItem(this.key, JSON.stringify(collection));
        console.log("saving collection ", collection);
        console.log("saving this count", this.counter);
    }

    //loads the list contents from localStorage, reading it from the given key. The method returns a boolean: true iff there was a saved value
    load() {
        var saved_collection = localStorage.getItem(this.key);
        if(saved_collection === null) {
            return false;
        } else {
            saved_collection = JSON.parse(saved_collection);
            this.itemArray = saved_collection["items"];
            this.counter = saved_collection["counter"];
            return true;
        }
    }

    //prints every dictionary to the console
    print() {
        this.itemArray.forEach(function(elt) {console.log(elt);})
    }

}