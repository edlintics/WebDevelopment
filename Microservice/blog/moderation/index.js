const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json())

//reveive the event from the event bus
app.post('/events', async (req,res) => {
    const {type, data} = req.body;

    if(type === "CommentCreated") {

        // create a status and check whether the comment content contain the word orange
        const status = data.content.includes("orange") ? "rejected" : "approved"

        //make a post request to the event bus abd pass in the new status of the comment
        await axios.post("http://event-bus-srv:4005//events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    console.log()

    // send to the event bus
    res.send({})
})


app.listen(4003, () => {
    console.log("Running on port 4003")
})