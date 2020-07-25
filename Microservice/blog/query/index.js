const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const axios = require("axios")

const app = express()

app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Object look like
// posts === {
//     "j123sda": {
//         id: "j123sda",
//         comments: [
//             {id: "djakd", content: "commnets"}
//         ]
//     }

//     "j123sda": {
//         id: "j123sda",
//         comments: [
//             {id: "djakd", content: "commnets"}
//         ]
//     }
// }

const handleEvent = (type, data) => {
    //if we receive the PostCreated service from teh Event bus
    if (type === 'PostCreated'){
        const {id, title} = data

        posts[id] = {id, title, comments: []}
    }

    if (type === "CommentCreated") {
        // the structure of comment is different from post, check comments section 
        const {id, content,postId, status} = data

        // search for the posts withe the matched postId in the posts array 
        const post = posts[postId];
        post.comments.push({ id, content, status});


    }
        // Update the comment as Comment service reupdate the status
    if ( type === "CommentUpdated") {
        const { id, content, postId, status} = data;

        // find the post with the parsed id
        const post = posts[postId]

        const comment = post.comments.find(comment => {
            return comment.id === id;
        })
        
        // reupdate the old comment with the new parsed status and content
        comment.status = status;
        comment.content = content;

    }
}

app.get("/posts", function (req,res) {
    console.log(posts)
    res.send(posts)
})

//receive from the event bus, how the data will be handle

app.post("/events", (req,res) =>{

    // the data we receive from the event bus
    const {type, data} = req.body

    

    handleEvent(type, data)

    res.send({})


})

app.listen(4002, async () => {
    console.log("Listen on 4002")


    // reach out to the the event bus in orde to get access to all pass events
    // this use in case the query service go down, we rerun and add missing events

    const res = await axios.get("http://event-bus-srv:4005/events");

    // getting the data back in form of event
    for (let event of res.data){
        console.log("Processing event:", event.type);

        handleEvent(event.type, event.data)
    }
})