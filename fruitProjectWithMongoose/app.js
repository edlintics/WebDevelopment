const mongoose = require("mongoose")

//Connection URL and create database name
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//--CREATE ---

//insert data in collecruin

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check data entry, no name added"]
  },
  rating: {
    type: Number,
    min: 1, // vadlidation of range between 1 and 10, if data is not in the range, it wont be added to the database
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solod as a fruit"
});

//fruit.save();


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple =  new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });

//insert multiple documents
//
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Success");
//   }
// });


//-- Read ---

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    // mongoose.connection.close();

    // only display the name in each doucment of the collections by query through one by one
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
})


//--Update ---

// Fruit.updateOne({_id: "5ef72d807f795b09ab2974f8"}, {name: "Peach"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the documents");
//   }
// });


//--Delete ---

// Fruit.deleteOne({_id: "5ef72d807f795b09ab2974f8"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Sucessful deleted the object")
//   }
// });

// Person.deleteMany({name: "John"}, function(err) {
//   if (err){
//     console.log(err)
//   } else {
//     console.log("Successfully deleted")
//   }
// })

//Challenge

const orange = new Fruit ({
  name: "Orange",
  score: 10,
  review: "Amazing fruit."
});

orange.save()

Person.updateOne({_id: "5ef7af0c2f6b4d15b7bc346c"}, {favouriteFruit: orange}, function(err){
  if (err){
    console.log(err)
  } else {
    console.log("Updated John entry")
  }
});
