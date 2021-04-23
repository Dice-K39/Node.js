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