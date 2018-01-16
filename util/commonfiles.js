const RailAPIKEY = 'sl5zmz3g1w';
var api = '';

module.exports.headerTemplate = function () {
    var header = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    return header;
}

var APIList = {
    'TrainIntent.CancelIntent': (date) => {
        console.log('Inside CancelIntent');
        api = 'https://api.railwayapi.com/v2/cancelled/date/'+ dateFormatter(date) +'/apikey/' + RailAPIKEY; //Date Format: <dd-mm-yyyy>
        return api;
    },
    'TrainIntent.PNRStatus': (pnrnumber) => {
        console.log('Inside PNRStatus');
        api = 'https://api.railwayapi.com/v2/pnr-status/pnr/'+ pnrnumber +'/apikey/' + RailAPIKEY;
        return api;
    },
    'TrainIntent.TrainRoute': (trainnumber) => {
        console.log('Inside TrainRoute');
        api = 'https://api.railwayapi.com/v2/route/train/'+ trainnumber +'/apikey/' + RailAPIKEY;
        return api;
    },
    'TrainIntent.GetStationCode': (stationname) => {
        console.log('Inside TrainRoute');
        api = 'https://api.railwayapi.com/v2/name-to-code/station/'+ stationname +'/apikey/' + RailAPIKEY;
        return api;
    }
};

var dateFormatter = function (strdate) {
    let objDate = strdate.split('-');

    console.log(objDate);
    let finalDate = objDate[2].toString() + '-' + objDate[1].toString() + '-' + objDate[0].toString();
    return finalDate;
}

var generateTicket = function (prefix) {
    var rn = Math.floor(Math.random()*90000) + 10000;
    var result = prefix.toUpperCase().substring(0,3) + rn;
    console.log(result);
    return result;
}

module.exports.APIList = APIList;
module.exports.generateTicket = generateTicket;