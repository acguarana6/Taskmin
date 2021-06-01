//Alexandra Chin

//serializes data from the add tag form and returns the serialized data
function addTagFromForm() {
    var serialized = {};
    $("#addTagForm").serializeArray().forEach(function (item) {
        serialized[item.name] = item.value;
        });
    return serialized;
}

//makes a new tag based on the tag form data
function makeNewTag(formData) {
    //add tag to manage tags
    let $li = $("<li>");
    let $delButton = $("<button>" + '&#x2716;' + "</button>");
    $($delButton).attr({'class': 'delete', 'type': 'button'});
    let $tagSpan = $('<span> ' + formData["tagName"] + ' </span>');
    $($tagSpan).attr({'class': 'tagName'});
    $li.append($delButton);
    $li.append($tagSpan);
    $("#currentTags").append($li); 
    console.log($li)

    //add color to tagColors dictionary
    tagColors[formData["tagName"]] = formData["tagColor"];
    
    //add tag to add tags menu
    let $label = $("<label>");
    let $input = $("<input> " + formData["tagName"] + "</input>");
    $($input).attr({'type': 'radio', 'name': 'tag', 'value': formData["tagName"]});
    $label.append($input);
    $("#tags").append($label);
}

//loads saved tags from localstorage and remakes them and updates the areas where tags appear
function loadSavedTags() {
    $("#currentTags").empty();
    $("#tags").empty();
    
    Object.keys(tagColors).forEach(function(key) {
        //add tag to manage tags
        let $li = $("<li>");
        let $delButton = $("<button>" + '&#x2716;' + "</button>");
        $($delButton).attr({'class': 'delete', 'type': 'button'});
        let $tagSpan = $('<span> ' + key + ' </span>');
        $($tagSpan).attr({'class': 'tagName'});
        $li.append($delButton);
        $li.append($tagSpan);
        $("#currentTags").append($li); 
        console.log($li)

        //add tag to add tags menu
        let $label = $("<label>");
        let $input = $("<input> " + key + "</input>");
        $($input).attr({'type': 'radio', 'name': 'tag', 'value': key});
        $label.append($input);
        $("#tags").append($label);
    })

}

//event handler to add a tag button
$("#addTagButton").on('click',function() {
    var formData = addTagFromForm();
    makeNewTag(formData);
    document.getElementById("addTagForm").reset();
})

//event handler to delete a tag from the Manage Tags menu and the add tasks form
$(document.body).on('click', '#currentTags .delete', function() {
    var tname = $(this).siblings().text().trim();
    var k = tname;
    delete tagColors[k];
    console.log("tagColors after deletion" ,tagColors);
    $(this).parent().remove();
    $("input[value="+tname+"]").parent().remove();
})

