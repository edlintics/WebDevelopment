const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.post("/events", (req,res) => {
    const event = req.body;

    // sending post request to all these following sever to communicate with other info, events in event bus
    
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);

    res.send({status: "OK"})
})

app.listen(4005, () =>{
    console.log("Listen in port 4005")
})