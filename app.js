const express=require('express');
const path = require("path");
const https = require('https');  //linking up with other srrver to get the information adn can acess the datbase of that server
const bodyParser=require("body-parser");
const ejs = require("ejs");
const myFunctions = require("./date.js");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname+'/public')));

let date = new Date();
// console.log(date);

let City="None";
let temp = "0.00";
let type ="None";
let imageUrl = "";
let wSpeed = "0.00"
let humidity = "0.00";
let pressure = "0.00";
let Sunrise = "";
let Sunset = "";
let para = "";

console.log(temp);
app.get("/",function(req,res){
  console.log(City);
  res.render('index',{
      kindOfday:myFunctions.getDate(),
      City:City,
      Temp:temp,
      Weather:type,
      icon: imageUrl,
      windSpeed: wSpeed,
      humidity : humidity,
      pressure: pressure,
      sunrise: Sunrise,
      sunset : Sunset,
      Para:para
});
})


app.post("/",function(req,res){
    City=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+City+"&appid=89006b1bf6694ec4bc16fb20cebc1ab7";
    // console.log(City);
    https.get(url,function(response){
        response.on("data",function(data){
          const Weather = JSON.parse(data);
          console.log(Weather);
          if(Weather.cod==='404'){
            // City=req.body.city;
            humidity="0.00";
            pressure="0.00";
            temp="0.00";
            wSpeed="0.00";
            type="0.00";
            // City="";
            Sunrise="";
            Sunset="";
            para="Check the Name of the City";
            console.log(City);
            // res.redirect("/")
          }
          else{
            const TEMP = Weather.main.temp;
            const Celsius = Math.round((TEMP - 32)*(5/9));
            temp=Celsius.toString();
            wSpeed=Weather.wind.speed;
            humidity = Weather.main.humidity;
            pressure = Weather.main.pressure;
            Sunrise = Weather.sys.sunrise;
            Sunset = Weather.sys.sunset;
            type = Weather.weather[0].main;
            const icon = Weather.weather[0].icon;
            para="";
            imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
          }
        res.redirect("/")
    })
    })
})


app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
