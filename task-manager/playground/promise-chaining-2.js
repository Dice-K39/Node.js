/*
    Goal: Mess around with promise chaining

    1. Create promise-chaining-2.js
    2. Load in mongoose and task model
    3. Remove a given task by id
    4. Get and print the total number of incomplete tasks
    5. Test your work!
*/
require("../src/db/mongoose");

const Task = require("../src/models/task");

Task.findByIdAndDelete("60830e9f12d68f1bb8618111").then((task) =>
{
    console.log(task);

    return Task.countDocuments({ completed: false });
}).then((result) =>
{
    console.log(result);
}).catch((error) =>
{
    console.log(error);
});