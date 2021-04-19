// CRUD create read update delete
// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017" // local host IP
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => // useUnifiedTopology to get rid of deprecation warning
{
    if (error)
    {
        return console.log("Unable to connect to database.")
    }

    const db = client.db(databaseName)

    // db.collection("users").findOne({ _id: new ObjectID("607d8851ff20d0344fed11c1") }, (error, user) =>
    // {
    //     if (error)
    //     {
    //         console.log("Unable to fetch.")
    //     }

    //     console.log(user)
    // })

    // db.collection("users").find({ age: 20 }).toArray((error, users) =>
    // {
    //     console.log(users)
    // })

    /* 
        Challenge: Use find and findOne with tasks

        1. Use findOne to fetch the last task by its id (print doc to console)
        2. Use find to fetch all tasks that are not completed (print docs to console)
        3. Test your work!
    */

    db.collection("tasks").findOne({ _id: new ObjectID("607d8a540c89cd3612b5a44c") }, (error, task) =>
    {
        if (error)
        {
            return console.log("Unable to fetch.")
        }

        console.log(task)
    })

    db.collection("tasks").find({ completed: false }).toArray((error, tasks) =>
    {
        if (error)
        {
            return console.log("Unable to fetch.")
        }

        console.log(tasks)
    })
})