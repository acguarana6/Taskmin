//Alexandra Chin

//gather the inputs from the form into a single description dictionary and add it to theTaskList as a task
function addTaskFromForm() {
    var data = {};
    var serialized = {};
    $("#addTask").serializeArray().forEach(function (item) {
        serialized[item.name] = item.value;
        });

    data["text"] = serialized["taskText"];
    data["priority"] = serialized["taskPriority"];
    data["tag"] = serialized["tag"];

    //when the date from the date picker is used to initialize a Date object, it is one day behind and using the UTC dates fixes this
    var date = new Date(serialized["taskDueDate"]);
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1; //indexed at 0
    var year = date.getUTCFullYear();
    
    data["duedate"] = month+"/"+day+"/"+year;
    theTaskList.addNewTask(data);
    return data;
}


//event handler to the "add" button in the add task form to invoke addTaskFromForm and close the form.
$("#addTaskButton").on('click',function() {
    addTaskFromForm();
    closeAllDropDowns();
    document.getElementById("addTask").reset();
})

//event handler to cancel adding a task
$("#cancelAddTask").on('click',function() {
    closeAllDropDowns();
});

//event handler to mark a task as done
$(document.body).on('click', ".markDone", function() {
    var parentid = $(this).parent().attr("data-taskid");
    console.log("parentid ",parentid);
    var task = theTaskList.getTask(parentid);
    console.log("the task to be toggled done", task);
    task.toggleDone();
})

//event handler to delete a task
$(document.body).on('click', '#the_tasks .delete', function() {
    var parentid = $(this).parent().attr("data-taskid");
    console.log("parentid ",parentid);
    var task = theTaskList.getTask(parentid);
    console.log("the task to be deleted", task);
    theTaskList.deleteTask(parentid);
})

//event handler to save progress to localstorage
$("#saveButton").on('click', function() {
    theTaskList.save();
})

//event handler to load previous progress from localstorage
$("#loadButton").on('click', function() {
    theTaskList.load();
})

//event handler to reset entire application
$("#resetButton").on('click', function() {
    localStorage.removeItem(theTaskList.key);
    theTaskList.load();
    window.location.reload();
})

//event handler to sort tasks by id
$("#sortIdButton").on('click', function() {
    console.log("sorting by id");
    theTaskList.sortById();
    console.log("sorted", theTaskList.tasklist)
    theTaskList.refreshPage();
})

//event handler to sort tasks by tag
$("#sortTagButton").on('click', function() {
    console.log("sorting by tag");
    theTaskList.sortByTag();
    theTaskList.refreshPage();
})

//event handler to sort tasks by due date
$("#sortDueDateButton").on('click', function() {
    console.log("sorting by date");
    theTaskList.sortByDueDate();
    theTaskList.refreshPage();
})

//event handler to sort tasks by priority
$("#sortPriorityButton").on('click', function() {
    console.log("sorting by priority");
    theTaskList.sortByPriority();
    theTaskList.refreshPage();
})

