const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// db to store all the events
const events  =  [];



app.post("/events", (req,res) => {
    const event = req.body;

    //push into the database all the new events that come to the web
    events.push(event)

    // sending all the event that received to all the services
    
    axios.post("http://posts-clusterip-srv:4000/events", event); // post service
    axios.post("http://comments-srv:4001/events", event);  // comment service
    axios.post("http://query-srv:4002/events", event);  //  query service
    axios.post("http://moderation-srv:4003/events", event); // moderation service

    res.send({status: "OK"})
})

// if any thing want to get all the events
app.get("/events", (req,res) => {
    // send all the events from dbs
    res.send(events)
})
 

app.listen(4005, () =>{
    console.log("Listen in port 4005")

    
})