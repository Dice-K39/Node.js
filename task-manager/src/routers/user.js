const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) =>
{
    const user = new User(req.body);
    
    try
    {        
        await user.save();

        const token = await user.generateAuthToken();
        
        res.status(201).send({ user, token });
    } 
    catch (error)
    {
        res.status(400).send(error);
    }
});

router.post("/users/login", async (req, res) =>
{
    try
    {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    }
    catch (error)
    {
        res.status(400).send();
    }
});

router.post("/users/logout", auth, async (req, res) =>
{
    try
    {
        req.user.tokens = req.user.tokens.filter((token) =>
        {
            return token.token !== req.token
        });

        await req.user.save();

        res.send();
    }
    catch (error)
    {
        res.status(500).send();
    }
});

router.post("/users/logoutAll", auth, async (req, res) =>
{
    try
    {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    }
    catch (error)
    {
        res.status(500).send();
    }
});

router.get("/users/me", auth, async (req, res) =>
{
    res.send(req.user);
});

/*
    Goal: Refactor the update profile route

    1. Update the URL to /users/me
    2. Add the authentication middleware into the mix
    3. Use the existing user document instead of fetching via param id
    4. test your work in Postman!
*/

router.patch("/users/me", auth, async (req, res) =>
{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation)
    {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try
    {
        const user = req.user;

        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();

        res.send(user);
    } 
    catch (error)
    {
        res.status(400).send(error);
    }
});

router.delete("/users/me", auth, async (req, res) =>
{
    try
    {
        await req.user.remove();

        res.send(req.user);
    }
    catch (error)
    {
        res.status(500).send();
    }
});

module.exports = router;