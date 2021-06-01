//Alexandra Chin

//The TaskList class allows us to manage a list of tasks objects
class TaskList {
    constructor(key, domElt) {
        this.key = key;
        this.domElt = domElt;
        this.tasklist = [];
        this.id = 0;
    }

    //creates a new Task object given the description (a dictionary), adds it to the tasklist, and adds it to the DOM element corresponding to this list
    addNewTask(description) {
        var task = new Task(description);
        this.tasklist.push(task);//search push vs append
        task.id = this.id +1;
        this.domElt.append(task.addtoDom("UL#the_tasks"));
        this.id ++;
    }

    //re-creates a Task object (from a dictionary saved to localStorage), adds it to the tasklist, and adds it to the DOM element corresponding with the list.
    addSavedTask(description) {
        var task = new Task(description);
        task.id = description["id"];
        task.done = description["done"];
        task.description = description["description"];
        this.tasklist.push(task);
        this.domElt.append(task.addtoDom("UL#the_tasks"));
        console.log("DONE? ", task.done);
    }

    //returns the Task object with the given id
    getTask(tid) {
        let index = this.tasklist.findIndex(function (elt) {console.log(elt["id"]); return elt["id"] == tid });
        console.log("index ", index);

        return this.tasklist[index];
    }

    //deletes the Task object with the given id
    deleteTask(tid) {
        let index = this.tasklist.findIndex(function (elt) { return elt["id"] == tid });
        console.log("index ", index);
        this.tasklist[index].delete();
        this.tasklist.splice(index, 1);
    }

    //saves the current list to localStorage.
    save() {
        localStorage.removeItem(this.key);
        var collection = {};
        collection["items"] = this.tasklist;
        collection["id"] = this.id;
        collection["tags"] = tagColors;
        localStorage.setItem(this.key, JSON.stringify(collection));
        console.log("saving collection ", collection);
        console.log("saving this count", this.id);
    }

    //loads a list of task descriptions from local storage and adds them to the tasklist (using addSavedTask), replacing any prior list
    load() {
        var saved_collection = localStorage.getItem(this.key);
        if(saved_collection === null) {
            console.log("No tasklist saved");
            return false;
        } else {
            this.tasklist = [];
            saved_collection = JSON.parse(saved_collection);
            //tags are remade and added from localstorage
            tagColors = {};
            tagColors = saved_collection["tags"];
            loadSavedTags();
            var items = saved_collection["items"];
            this.id = saved_collection["id"];
            console.log("previous tasklist ",this.tasklist);
            var that = this;
            items.forEach(function(elt) {that.addSavedTask(elt);})
            console.log("loaded tasklist ",this.tasklist);

            return true;
        }
    }

    //sorts the list by task id and updates the page.
    sortById() {
        this.tasklist.sort(function (a,b) {return a.id - b.id;});
        console.log("SORTED TASKLIST ", this.tasklist);

    }

    //sorts the list by tag and updates the page, personal precedes work tasks
    sortByTag() {
        this.tasklist = this.tasklist.sort(function cmp(a,b) {
            return a.tag.localeCompare(b.tag);
        });
    }

    //sorts the list by due date (earliest first) and updates the page.
    sortByDueDate() {
        this.tasklist = this.tasklist.sort(function (a,b) {return a.duedate - b.duedate;});
    }

    //sorts the list by priority (highest first, then medium and low last) and updates the page.
    sortByPriority() {
        
        this.tasklist = this.tasklist.sort(function cmp(a,b) {
            if(a.priority < b.priority) {
                return -1;
            } else if (b.priority == "high") {
                return 1;
            } else if (a.priority == b.priority) {
                return 0
            } else if (a.priority == "medium" && b.priority == "low") {
                return -1
            } else if (b.priority == "medium" && a.priority == "low") {
                return 1
            } 
        });
    }

    //prints all the tasks in order, converting each to a string.
    print() {
        this.tasklist.forEach(function(elt) {console.log(elt.toString())});
    }

    //refreshes the page and empties all of the tasks
    refreshPage() {
        $("#the_tasks").empty();
        this.save();
        this.load();
        console.log("remade tasklist", this.tasklist);
    }

}

let $ul = $("<ul>");

var theTaskList = new TaskList("alex", $ul);
