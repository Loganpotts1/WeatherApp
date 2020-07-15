const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log("Blasting off to planet 3000!");
});


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const city = req.body.cityName;
  const degree = req.body.degree;
  const weatherapi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8e7a2af0be661d4e390fe4f1fa63b93e&units=" + degree;

  https.get(weatherapi, function(response){
  console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png";
      res.write("<h1>The temperature in " + city + " is " + temp + "</h1>");
      res.write("<h1>The weather is currently " + weatherDesc + "</h1><br />");
      res.write("<img src=" + iconUrl + "></img>");
      res.send();
    });

  });

});
