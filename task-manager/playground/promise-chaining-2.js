require("../src/db/mongoose");

const Task = require("../src/models/task");

// Task.findByIdAndDelete("60830e9f12d68f1bb8618111").then((task) =>
// {
//     console.log(task);

//     return Task.countDocuments({ completed: false });
// }).then((result) =>
// {
//     console.log(result);
// }).catch((error) =>
// {
//     console.log(error);
// });

/*
    Goal: Use async/await

    1. Create deleteTaskAndCount as an async function
        - Accept id of task to remove
    2. Use await to delete task and count up incomplete tasks
    3. Return the count
    4. Call the function and attach then/catch to log results
    5. Test your work!
*/
const deleteTaskAndCount = async (id) =>
{
    const deleteTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
};

deleteTaskAndCount(`608320025deb3e22fb37531c`).then((count) =>
{
    console.log(count);
}).catch((error) =>
{
    console.log(error);
});