const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

//Connection URL
const url = "mongodb://localhosy:27017";

//Database Name
const dbName = "fruitDB";

//Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true
});

//Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("connected successfully y server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });

});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([{
    name: "Apple",
    score: 8,
    review: "Great fruits"
  }, {
    name: "Apple",
    score: 8,
    review: "Great fruits"
  }, {
    name: "Apple",
    score: 8,
    review: "Great fruits"
  }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
