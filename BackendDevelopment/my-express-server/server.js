const express = require("express");

const app = express();


app.get("/" ,  function(req, res) {
  res.send("<h1> Hello, world </h1>");
});

app.get("/contact", function(req, res){
  res.send("contact me at: hoang@gmail.com");
});

app.get("/about", function(req, res){
  res.send("My name is Hoang");
});

app.listen(3000, function(){
    console.log("Server is running")
});
