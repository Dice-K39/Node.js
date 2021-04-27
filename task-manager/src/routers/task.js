/*
    Goal: Create task router

    1. Create new file that create/exports new router
    2. Move all the task routes over
    3. Load in and use the router with the express app
    4. Test your work
*/
const express = require('express');
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) =>
{
    const task = new Task(req.body);

    try
    {
        await task.save();

        res.status(201).send(task);
    } 
    catch (error)
    {
        res.status(400).send(error);
    }

    // task.save().then(() =>
    // {
    //     res.status(201).send(task);
    // }).catch((error) =>
    // {
    //     res.status(400).send(error);
    // });
});

router.get("/tasks", async (req, res) =>
{
    try
    {
        const tasks = await Task.find({});

        res.send(tasks);
    } 
    catch (error)
    {
        res.status(500).send();
    }

    // Task.find({}).then((tasks) =>
    // {
    //     res.send(tasks);
    // }).catch((error) =>
    // {
    //     res.status(500).send();
    // });
});

router.get("/tasks/:id", async (req, res) =>
{
    const _id = req.params.id;

    try
    {
        const task = await Task.findById(_id);

        if (!task)
        {
            return res.status(404).send();
        }

        res.send(task);
    } 
    catch (error)
    {
        res.status(500).send();
    }

    // Task.findById(_id).then((task) =>
    // {
    //     if (!task)
    //     {
    //         return res.status(404).send();
    //     }

    //     res.send(task);
    // }).catch((error) =>
    // {
    //     res.status(500).send();
    // })
});

router.patch("/tasks/:id", async (req, res) => 
{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation)
    {
        return res.status(400).send({ error: "Invalid update!"})
    }

    try
    {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task)
        {
            return res.status(404).send();
        }

        res.send(task);
    }
    catch (error)
    {
        res.status(400).send();
    }
});

router.delete("/tasks/:id", async (req, res) =>
{
    try
    {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task)
        {
            return res.status(404).send({ error: "Task not found."});
        }

        res.send(task);
    }
    catch (error)
    {
        res.status(500).send();
    }
});

module.exports = router;