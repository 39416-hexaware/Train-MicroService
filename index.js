//imports
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

app = express();
//Create express object

var port = env.process.port || 7001;
//Assign port
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

app.get("/PNRStatus", function (req, res) {
    res.send("PNRStatus MicroService works");
});
//GET Endpoint

app.post("/RailwayAPI", function (req, res) {
    console.log(JSON.stringify(req.body));

    var header = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
    
    var options = {
        url: 'https://api.railwayapi.com/v2/route/train/12671/apikey/sl5zmz3g1w', //,urlPath, //'https://api.railwayapi.com/v2/pnr-status/pnr/4338716830/apikey/sl5zmz3g1w'
        method: 'GET',
        header: header,
        body: '',
        json: true
      };
    
    request(options, function (error, response, body) {
        if (error) {
          console.dir(error);
          return
        }
        console.log('headers:' + response.headers);
        console.log('status code:' + response.statusCode);
          console.log(body);      
      });
});
//POST Call Endpoint

console.log("Server Running at Port : " + port);

app.listen(port);