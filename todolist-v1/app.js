const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"]; // array of items
let workItems = []; // array of work items

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  let day = date.getDay();

  res.render("list", { // passing in the list.ejs file
    listTitle: day,
    newListItems: items
  });

});


app.get("/work", function(req,res){
  res.render("list",{
    listTitle: "Work list",
    newListItems: workItems
  })
});

app.get("/about", function(req,res){
  res.render("about")
})

app.post("/", function(req,res) {
  console.log(req.body); // return all post value from the server in order to distinguish unique value

  let item  = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/")
  }

})

app.listen(3000, function() {
  console.log("The app is running on port 3000");
  "en"
})
