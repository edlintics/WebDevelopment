// Startup Express App
var express = require('express');
var app = express();
 

var adminroute =  require("./admin/admin.js")(app);

// handle HTTP GET request to the "/" URL
app.get('/', function(req, res) {
    res.write("Hi I am the root")
    res.end();
 
})

app.listen(3000);