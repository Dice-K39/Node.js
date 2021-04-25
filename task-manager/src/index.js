require("./db/mongoose");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) =>
{
    const user = new User(req.body);

    user.save().then(() =>
    {
        res.status(201).send(user);
    }).catch((error) =>
    {
        res.status(400).send(error);
    });
});

/*
    Goal: Setup the task creation endpoint

    1. Create a separate file for the task model (load it into index.js)
    2. Create the task creation endpoint (handle success and error)
    3. Test the endpoint from postman with good and bad data
*/
app.post("/tasks", (req, res) =>
{
    const task = new Task(req.body);

    task.save().then(() =>
    {
        res.status(201).send(task);
    }).catch((error) =>
    {
        res.status(400).send(error);
    });
});

app.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});