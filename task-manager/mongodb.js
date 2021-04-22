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

    // db.collection("users").deleteMany(
    //     {
    //         age: 20
    //     }
    // ).then(result =>
    // {
    //     console.log(result);  
    // }).catch(error =>
    // {
    //     console.log(error);
    // })

    /*
        Challenge: Use deleteOne to remove a task

        1. Grab the description for the task you want to remove
        2. Setup the call with the query
        3. Use promise methods to setup the success/error handlers
        4. Test your work!
    */
    db.collection("tasks").deleteOne(
        {
            description: "Go to work"
        }
    ).then(result =>
    {
        console.log(result);
    }).catch(error =>
    {
        console.log(error);
    });
})