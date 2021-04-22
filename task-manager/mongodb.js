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

    // db.collection("users").updateOne(
    //     {
    //         _id: new ObjectID("607d8851ff20d0344fed11c0")
    //     },
    //     {
    //         $inc:
    //         {
    //             age: 1
    //         }
    //     }
    // ).then((result) =>
    // {
    //     console.log(result);
    // }).catch((error) =>
    // {
    //     console.log(error);
    // })

    /*
        Challenge: Use updateMany to complete all tasks

        1. Check the documentation for updateMany
        2. Setup the call with the query and the updates
        3. Use promise methods to setup the success/error handlers
        4. Test your work!
    */
    db.collection("tasks").updateMany(
        {
            completed: false
        },
        {
            $set:
            {
                completed: true
            }
        }
    ).then((result) =>
    {
        console.log(result);
    }).catch((error) => 
    {
        console.log(error);
    })
})