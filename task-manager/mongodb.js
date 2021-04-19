// CRUD create read update delete
// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017" // local host IP
const databaseName = "task-manager"

const id = new ObjectID()

console.log(id.id.length)
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => // useUnifiedTopology to get rid of deprecation warning
{
    if (error)
    {
        return console.log("Unable to connect to database.")
    }

    const db = client.db(databaseName)

    // db.collection("users").insertOne(
    //     {
    //         name: "Dice",
    //         age: 20
    //     }
    // , (error, result) =>
    // {
    //     if (error)
    //     {
    //         return console.log("Unable to insert user")
    //     }

    //     console.log(result.ops)
    // })

    // db.collection("users").insertMany(
    //     [
    //         {
    //             name: "John",
    //             age: 100
    //         },
    //         {
    //             name: "Jen",
    //             age: 26
    //         }
    //     ]
    // , (error, result) =>
    // {
    //     if (error)
    //     {
    //         console.log("Unable to insert documents!")
    //     }

    //     console.log(result.ops)
    // })

//    db.collection("tasks").insertMany(
//        [
//            {
//                description: "Wake up",
//                completed: true
//            },
//            {
//                description: "Get COVID-19 vaccine",
//                completed: false
//            },
//            {
//                description: "Get lunch",
//                completed: false
//            },
//            {
//                description: "Go to work",
//                completed: false
//            }
//        ], (error, result) =>
//        {
//            if (error)
//            {
//                console.log("Unable to insert documents!")
//            }

//            console.log(result.ops)
//        }
//    )
})