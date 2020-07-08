const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")

let app = express();


app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikidb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};


let Article = mongoose.model("Article", articleSchema)

///////Request targeting all articles ////////////////

//Chaining method
app.route("/articles")
  .get(function(req, res) {

    //get all articles
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(console.log(err));
      }
    });
  })

  .post(function(req, res) {

    // display and data send to the server
    console.log(req.body.title);
    console.log(req.body.content);

    //-- Create onew article
    //save this to the database
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("sucessfully added a new article")
      } else {
        res.send(err);
      }
    });
    // the sending data is queried through postman
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Sucessfylly delted all the data")
      } else {
        res.send(err)
      }
    });
  })

///////Request targeting a certain article ////////////////


app.route("/articles/:articleTitle")


  .get(function(req, res) { // get a single article

    //Database query to find matched article based on the article Title query
    Article.findOne({
        title: req.params.articleTitle
      },
      function(err, foundArticle) {
        if (foundArticle) {
          res.send(foundArticle)
        } else {
          res.send("No artices matching that title was found");
        }
      });
  })

    // A put request mean to replace all resource, if you dont fill out one field, when you update, it will lose all the data
  .put(function(req, res) {


    Article.update({
        title: req.params.articleTitle
      }, //{condition}
      {
        title: req.body.title,
        content: req.body.content
      }, //{update data in the post request}
      {
        overwrite: true
      }, // allow overwrite in datavase
      function(err) {
        if (!err) {
          res.send("Sucessfully updated the data") // respond back to the server
        }
      }
    );
  })


//Update a certain field in the doucument
  .patch(function(req,res){
    Article.update(
      {title: req.params.articleTitle},
      {$set: req.body}, // when send by the client of patch request, it send a an object. Thus, we can set teh $set to the upadated object
      function(err){
        if(!err){
          res.send("Sucessfully updated article");
        }
      }


      }}
    )
  })

//Delete a document
  .delete(function(req, res){


    Article.deleteOne(
    {title: req.params.articleTitle}, // {condition}
    function(err){
      if(!err) {
        res.send("Sucessfully deleted the article");
      } else {
        res.send(err)
      }

    });

  });

app.listen(3000, function() {
  console.log("App is running on port 3000")
})
