const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/*
    Challenge 1: Add a password field to User

    1. Setup the field as a required string
    2. Ensure the length is greater than 6
    3. Trim the password
    4. Ensure that password doesn't contain "password"
    5. Test your work!
*/

const User = mongoose.model("User",
{
    name:
    {
        type: String,
        required: true,
        trim: true
    },
    email:
    {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value)
        {
            if (!validator.isEmail(value))
            {
                throw new Error("Email is invalid");
            }
        }
    },
    password:
    {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value)
        {
            if (value.toLowerCase().includes("password"))
            {
                throw new Error("Password is invalid");
            }
        }
    },
    age:
    {
        type: Number,
        default: 0,
        validate(value)
        {
            if (value < 0)
            {
                throw new Error("Age must be a positive number");
            }
        }
    }
});

// const me = new User(
//    {
//        name: "  Dice   ",
//        password: "helloworld123",
//        email: "Dice@email.com"
//    }
// );

// me.save().then(() =>
// {
//     console.log(me);
// }).catch(error =>
// {
//     console.log("Error!", error);
// });

/*
    Challenge 2: Add validation and sanitization to task

    1. Trim the description and make it required
    2. Make completed optional and default it to false
    3. Test your work with and without errors
*/
const Task = mongoose.model("Task",
{
    description:
    {
        type: String,
        required: true,
        trim: true
    },
    completed:
    {
        type: Boolean,
        default: false
    }
});

const task = new Task(
    {
        description: "    Study JavaScript    "
    }
);

task.save().then(() =>
{
    console.log(task);
}).catch((error) =>
{
    console.log("Error!", error);
});