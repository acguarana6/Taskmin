// ================================================================
// initialized when the page loads
var produce;
var bakery;

function initGroceries() {
    produce = new PersistentList('produce');
    if(produce.load()) {
        console.log('Using saved values');
        produce.print();
    } else {
        console.log('Nothing saved; initializing');
        let init = ['apples', 'bananas', 'apples', 'carrots'];
        init.forEach(produce.addItem.bind(produce));
        
    }
    console.log('produce counter', produce.getCounter());
    console.log('produce items', produce.getItems());

    bakery = new PersistentList('bakery');
    if(bakery.load()) {
        console.log('Using saved values');
        bakery.print();
    } else {
        console.log('Nothing saved; initializing');
        let init = ['bagels', 'bread', 'bagels', 'cake', 'muffins'];
        init.forEach(bakery.addItem.bind(bakery));
    }
    console.log('bakery counter', bakery.getCounter());
    console.log('bakery items', bakery.getItems());
}
initGroceries();


// ================================================================
// Work with the page/DOM.

// There are two times when elements are added to the page: (1) when
// the page loads and there is saved stuff in local storage and (2)
// when the user adds an item. So, to keep everything consistent, I
// wrote this abstract function to add an element (a JS object with
// gid and item properties) to a given destination on the page.

function addElement(elt, destination) {
    $("<li>", {"data-gid": elt.gid})
        .text(elt.gid + ": " + elt.item)
        .appendTo(destination);
}

// Lots of pairs of things, but rather than factor them using an
// abstraction, I kept them concrete so it's easier to understand,
// though not as well coded. I did, however, use the addElement()
// function above.

function initDOM() {
    let elts = produce.getElements();
    elts.forEach(function (elt) { addElement(elt, '#produce') });
    // almost identical
    elts = bakery.getElements();
    elts.forEach(function (elt) { addElement(elt, '#bakery') });
    /*
    elts.forEach(function (elt) {
        $("<li>", {"data-gid": elt.gid})
            .text(elt.gid + ": " + elt.item)
            .appendTo('#bakery');
    });
    */

    // ================================================================
    // Add click handlers to add items.
    $("#add-produce").click(function () {
        let val = $("[name=produce-item]").val();
        let gid = produce.addItem(val);
        let elt = produce.getElement(gid);
        addElement(elt, '#produce');
        $("#add-produce").closest('form')[0].reset();
    });
    // almost identical again
    $("#add-bakery").click(function () {
        let val = $("[name=bakery-item]").val();
        let gid = bakery.addItem(val);
        let elt = bakery.getElement(gid);
        addElement(elt, '#bakery');
        $("#add-bakery").closest('form')[0].reset();
    });

    // ================================================================
    // add click handlers to remove items.
    $('#produce').on('click', '[data-gid]', function (li) {
        let gid = $(this).attr('data-gid');
        console.log(`remove ${gid}`);
        produce.removeItem(gid);
        $(this).remove();
    });
    // almost identical
    $('#bakery').on('click', '[data-gid]', function (li) {
        let gid = $(this).attr('data-gid');
        console.log(`remove ${gid}`);
        bakery.removeItem(gid);
        $(this).remove();
    });
    // ================================================================
    // buttons to save and clear
    $("#save").click(function () {
        produce.save();
        bakery.save();
    });
    $("#clear").click(function () {
        localStorage.removeItem('produce');
        localStorage.removeItem('bakery');
    });
        
}
initDOM();