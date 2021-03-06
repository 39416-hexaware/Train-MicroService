//imports
var express = require('express');
var bodyParser = require('body-parser');
var requestAPI = require('request');
var async = require('async');
const commonFiles = require('./util/commonfiles');

app = express();
//Create express object

var port = process.env.PORT || 7001;
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

  if (req.body.IntentName == 'TrainIntent.BookTicket') {
    let prefix = 'RAILWAY';
    let boardingPoint = req.body.BoardingPoint;
    let destination = req.body.Destination;
    let travelDate = req.body.DateOfTravel;
    let noOfTickets = req.body.Tickets;
    let ticketno = commonFiles.generateTicket(prefix);

    console.log('Train Book Ticket');

    res.json(ticketno);
  }
  else {
    console.log('Inside Railway API');
    async.parallel([
      function (firstfn) {
        let intentFrom = req.body.IntentName;
        var url = '';

        if (intentFrom === 'TrainIntent.CancelIntent') {
          let cancelledDate = req.body.CancelledDate;
          url = commonFiles.APIList[intentFrom](cancelledDate);
          console.log(url);
        }
        else if (intentFrom === 'TrainIntent.PNRStatus') {
          let pnrNumber = req.body.PNRNumber;
          url = commonFiles.APIList[intentFrom](pnrNumber);
          console.log(url);
        }
        else if (intentFrom === 'TrainIntent.TrainRoute') {
          let trainNumber = req.body.TrainNumber;
          url = commonFiles.APIList[intentFrom](trainNumber);
          console.log(url);
        }
        else if (intentFrom === 'TrainIntent.GetStationCode') {
          let stationName = req.body.StationName;
          url = commonFiles.APIList[intentFrom](stationName);
          console.log(url);
        }

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
            if (response.statusCode == '200') {
              firstfn(false, body);
            }
            else {
              res.json({ "error": response.statusCode });
            }
          }
        });
      }],
      function (err, result) {
        console.log('Inside Final Response Send of Railway API');
        res.json(result);
      });
  }
});
//POST Call Endpoint

console.log("Server Running at Port : " + port);

app.listen(port);