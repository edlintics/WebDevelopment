const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostsId = {};

// structure of comments y post id
//  { postid :
//      [
//        {commentID: "", content: "" },
//         {commentID: "", content: "" }
//        ]}
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostsId[req.params.id] || []); // send all the comment back based on the post id, if we cant find the id, we send back an empty array
});

//send the Comment Created Event
app.post("/posts/:id/comments", async (req, res) => {
  const commentdId = randomBytes(4).toString("hex"); // generate a comment id 4 bytes, string hex

  const { content } = req.body; // get the content from user send the data

  const comments = commentsByPostsId[req.params.id] || [];
  // find the list of comments that was existed in a post, if the postId is not present, return an empty array

  comments.push({ id: commentdId, content, status: "pending" }); // create and push the new generated commentID and the comments of the user
  //default pending alue for new comment, wiat for moderation service

  commentsByPostsId[req.params.id] = comments; // this realate to the one with global scope, we make teh new ovject equal to the one we generated

  // send post request to the event bus that carry all the cotnent along with
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentdId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

// event handler from the event bus
// In this case, receive the info from Comment moderate service and resend to the event bus
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    // searching for the comments array that realted to the post ID that was fetched to the server
    const comments = commentsByPostsId[postId];

    // searching for the comment inside that comments array
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    //now update the comment to the new status that is handled my the fetch form the moderation service
    comment.status = status;

    //send the post request to the event bus again after going through the service
    await axios.post("http://event-bus-srv:4005//events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
