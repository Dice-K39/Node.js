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
    Goal: Setup support for skip

    1. Setup "skip" option
        - Parse query value to integer
    2. Fire off some requests to test it's working
        - Fetch the 1st page of 2 and then the 3rd page of 2
        - Fetch the 1st page of 3 and then the 2nd page of 3
*/

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
router.get("/tasks", auth, async (req, res) =>
{
    const match = {};

    if (req.query.completed)
    {
        match.completed = req.query.completed === "true";
    }

    try
    {
        await req.user.populate(
        { 
            path: "tasks",
            match,
            options:
            {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();

        res.send(req.user.tasks);
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