// CRUD create read update delete
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017" // local host IP
const databaseName = "task-manager"

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
    //         age: 40
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

    /*
        Challenge: Insert 3 tasks into a new tasks collection

        1. Use insertMany to insert the documents
            - description (string), completed(boolean)
        2. Setup the callback to handle error or print ops
        3. Run the script
        4. Refresh the database in Robo 3t and view data in tasks collection
    */
   db.collection("tasks").insertMany(
       [
           {
               description: "Wake up",
               completed: true
           },
           {
               description: "Get COVID-19 vaccine",
               completed: false
           },
           {
               description: "Get lunch",
               completed: false
           },
           {
               description: "Go to work",
               completed: false
           }
       ], (error, result) =>
       {
           if (error)
           {
               console.log("Unable to insert documents!")
           }

           console.log(result.ops)
       }
   )
})