const express = require('express');
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) =>
{
    const task = new Task(
        {
            ...req.body,
            owner: req.user._id
        }
    );

    try
    {
        await task.save();

        res.status(201).send(task);
    } 
    catch (error)
    {
        res.status(400).send(error);
    }
});

/*
    Goal: Refactor GET /tasks

    1. Add authentication
    2. Return tasks only for the authenticated user
    3. Test your work!
*/

router.get("/tasks", auth, async (req, res) =>
{
    try
    {
        const tasks = await Task.find({ owner: req.user._id });

        res.send(tasks);
    } 
    catch (error)
    {
        res.status(500).send();
    }
});

router.get("/tasks/:id", auth, async (req, res) =>
{
    const _id = req.params.id;

    try
    {
        const task = await Task.findOne({ _id, owner: req.user._id });

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
});

router.patch("/tasks/:id", auth, async (req, res) => 
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
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        
        if (!task)
        {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();
        
        res.send(task);
    }
    catch (error)
    {
        res.status(400).send();
    }
});

/*
    Goal: Refactor DELETE /tasks/:id

    1. Add authentication
    2. Find the task by _id/owner (findOneAndDelete)
    3. Test your work!
*/

router.delete("/tasks/:id", auth, async (req, res) =>
{
    try
    {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

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