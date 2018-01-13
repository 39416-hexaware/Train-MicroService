//imports
var express = require('express');
var bodyParser = require('body-parser');
var requestAPI = require('request');
var async = require('async');
const commonFiles = require('./util/commonfiles');

app = express();
//Create express object

var port = process.env.PORT || 5000;
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

  console.log('Inside Railway API');
  async.parallel([
    function (firstfn) {

    }],
    function (err, result) {

    });
  var options = {
    url: url,
    method: 'GET',
    header: commonFiles.headerTemplate(),
    body: '',
    json: true
  };

  requestAPI(options, function (error, response, body) {
    if (error) {
      console.dir(error);
      return
    }
    else {
      console.log('status code:' + response.statusCode);

      console.log('Inside data process');
      firstfn(false, body);
    }
  });
});
//POST Call Endpoint

console.log("Server Running at Port : " + port);

app.listen(port);