require("./db/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) =>
// {
//     if (req.method === "GET")
//     {
//         res.send("GET requests are disabled");
//     }
//     else
//     {
//         next();
//     }
// });

/*
    Goal: Setup middleware for maintenance mode

    1. Register a new middleware function
    2. Send back a maintenance message with a 503 status code
    3. Try your requests from the server and confirm status/message shows
*/
app.use((req, res, next) =>
{
    res.status(503).send("The site is under maintenance");
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () =>
{
    console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () =>
{
    const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", { expiresIn: "1 seconds"});

    console.log(token);

    const data = jwt.verify(token, "thisismynewcourse");

    console.log(data);
};

myFunction();