const express = require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express ()


app.use(bodyParser.json());
app.use(cors());

const commentsByPostsId = {}

// structure of comments y post id
//  { postid : 
//      [
//        {commentID: "", content: "" },
//         {commentID: "", content: "" }
//        ]}
app.get("/posts/:id/comments",  (req,res)=>{
    res.send(commentsByPostsId[req.params.id] || []) // send all the comment back based on the post id, if we cant find the id, we send back an empty array
})

app.post("/posts/:id/comments", async (req,res) => {
    const commentdID = randomBytes(4).toString('hex'); // generate a comment id 4 bytes, string hex

    const {content} = req.body; // get the content from user send the data

    const comments =  commentsByPostsId[req.params.id] || []; 
    // find the list of comments that was existed in a post, if the postId is not present, return an empty arrat 

    comments.push({id: commentdID, content}); // push the new generated commentID and the comments of the user


    commentsByPostsId[req.params.id] = comments  // this realate to the one with global scope, we make teh new ovject equal to the one we generated

    // send post request to the event bus that carry all the conent along with
     await axios.post("http://localhost:4005/events", {
        type: "Comment Created",
        data: {
            id: commentdID,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);

})

app.post("/events", (req,res)=> {
    console.log("Event received:", req.body.type);
    res.send({})
})

app.listen(4001, () => {
    console.log("Server is running on port 4001")
})