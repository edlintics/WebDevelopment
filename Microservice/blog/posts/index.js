const express = require("express");
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const cors = require('cors'); // this the package that enable react app to communcate with external servers
const axios = require("axios");

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {};

app.get("/posts", (req, res) =>{
    res.send(posts)
})


app.post("/posts/create", async (req,res) => {
    const id = randomBytes(4).toString('hex'); // generate a random id that have size of 4 bte and convert to a hex string
    const {title} = req.body; // take in the data he user just send to us in form of json object from PostCreate.js in React 

    posts[id] = {
        id, title // store with a certain id, and title that passed from the object above
    }

    // emit an event to the event bus when a post created
    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id])
    // status confirmed 201
    // send back the posts id that was created, this post is specified by the id above

})

// event handler from the event bus
app.post("/events",(req, res) =>{
    console.log("Received Event", req.body.type)

    res.send({})
} )

app.listen(4000, ()=> {
    console.log("v1000")
    console.log("Listen on port 4000")
})