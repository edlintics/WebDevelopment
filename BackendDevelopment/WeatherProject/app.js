const express = require("express");
const https = require("https");


const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metrics&appid=d42a6620f83bfc0f734ea33f1e877358";

    https.get(url, function(response) {
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

        res.write("<p> The weather is cloudy </p>");
        res.write("<h1>The weather ther in Hanoi is " + temp + " degrees Celcius</h1>");
        res.write("<img src='"+imageURL+"'>")
        res.send()
      })
    });

});



app.listen(3000, function() {
  console.log("This server is running on port 3000");
});
