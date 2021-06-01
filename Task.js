//Alexandra Chin

//The Task class makes a Task object
class Task {
    constructor(dict) {
        this.id = 0;
        this.description = dict["text"];
        this.priority = dict["priority"];
        //this.duedate = JSON.parse(JSON.stringify(new Date(dict["duedate"])));
        this.duedate = new Date(dict["duedate"]);
        this.tag = dict["tag"];
        this.done = false;
        this.DOMelement;
        this.id ++; //check when to update id
    }

    //string representation of a task; makes debugging nicer
    toString() {
        var str = "Task #" + this.id + " " + this.description + " due " + this.duedate + " for " + this.tag + " " + this.priority + " priority";
        return str;
    }

    //returns a nice string representation of the due date.
    getFormattedDate() {
        return this.duedate.toDateString();
    }

    //creates a DOM element for this task and adds it to the page at the specified location.
    addtoDom(destination) { 
        
        let $li = $("<li>");
        $($li).attr({'class': 'task', 'data-taskid':this.id});
        $($li).css({'background-color': tagColors[this.tag]});

        let $idSpan = $('<span>' + this.id + ' </span>');
        $($idSpan).attr({'class': 'id'});
        let $dueSpan = $("<span>" + this.getFormattedDate() + " </span>");
        $($dueSpan).attr({'class': 'due'});
        let $prioritySpan = $("<span>" + this.priority + " </span>");
        $($prioritySpan).attr({'class': 'priority'});
        let $tagSpan = $("<span>" + this.tag + " </span>");
        $($tagSpan).attr({'class': 'tag'});
        let $p = $("<p>" + this.description + "</p>");
        $($p).attr({'class': 'text'});
        let $doneButton = $("<button>" + '&#x2714;' + " </button>");
        $($doneButton).attr({'class': 'markDone', 'type': 'button'});
        let $delButton = $("<button>" + '&#x2716;' + "</button>");
        $($delButton).attr({'class': 'delete', 'type': 'button'});

        $li.append($idSpan);
        $li.append($dueSpan);
        $li.append($prioritySpan);
        $li.append($tagSpan);
        $li.append($p);
        $li.append($doneButton);
        $li.append($delButton);

        $(destination).append($li); 
        this.DOMelement = $li;
        

        //if the task is already done it should be marked as such 
        if (this.done == true) {
            this.done = false;//toggling the task to be shown as done
            console.log("before toggle done? ", this.done);
            
            this.toggleDone(); 
            console.log("after toggle done? ", this.done);
            console.log("this task is being toggled",this);
        }
    }

    //returns the unique ID for this task
    getId() {
        return this.id;
    }

    //sets the ID for this task
    setId(id) {
        this.id = id;
    }

    //toggles whether the task is done or not. This method updates the associated DOM element, adding or removing the done class.
    toggleDone() {
        if (this.done == false) {
            console.log("toggling done to true and adding done class");
            $(this.DOMelement).removeClass( "task" ).addClass( "task done" );
            this.done = true;
        }
        else {
            console.log("toggling done to false and removing done class");
            $(this.DOMelement).removeClass( "task done" ).addClass( "task" );
            this.done = false;
        }
        
    }
    //deletes the associated DOM element from the page
    delete() {
        $(this.DOMelement).remove();
    }

    //returns the due date as a Date object.
    getDueDate() {
        return this.duedate;
    }

    //returns the tag for this task
    getTag() {
        return this.tag;
    }

    //returns the priority of this task
    getPriority() {
        return this.priority;
    }
    
}

//process a list of descriptions by creating a new task object for each one, printing it to the console, and adding it to the page
function processDescriptions(descriptions) {
        descriptions.forEach(function(elt) {
            var task = new Task(elt);
            task.addtoDom();
            console.log(task);
        });
    }

