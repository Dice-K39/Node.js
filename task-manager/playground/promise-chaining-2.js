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