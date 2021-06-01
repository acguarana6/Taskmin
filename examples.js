// ================================================================
// Task description dictionaries. Task descriptions have these instance
// variables, as shown in these examples:

var exampleTaskDescriptions =
    [
        {
            text: 'Finish Taskmin Project',
            priority: 'high',
            duedate: '5/15/2021',
            tag: 'work',
        },
        {
            text: 'send card to mom',
            priority: 'medium',
            duedate: '5/10/2021',
            tag: 'personal',
        },
        {
            text: 'Do CS 432 exam',
            priority: 'low',
            duedate: '5/12/2021',
            tag: 'work',
        },
        {
            text: 'pack for home',
            priority: 'high',
            duedate: '5/16/2021',
            tag: 'personal',
        }
    ];

// Note that the following variable name is not good for production code,
// but this shorthand is convenient for testing your code in the JS
// console.

var etd = exampleTaskDescriptions;

// ================

// Tasks get background colors by looking up the tagin the tagColors
// dictionary. If you have to re-set the value, when implementing
// dynamic tags, you can use the JSON.parse() trick.

var initialTagColors = '{"work":"lightskyblue","personal":"lightgreen"}';

var tagColors = JSON.parse(initialTagColors);