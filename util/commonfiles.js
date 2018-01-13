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
        console.log('Inside APIList');
        api = 'https://api.railwayapi.com/v2/cancelled/date/'+ dateFormatter(date) +'/apikey/' + RailAPIKEY ; //Date Format: <dd-mm-yyyy>
        return api;
    }    
};

module.exports.APIList = APIList;