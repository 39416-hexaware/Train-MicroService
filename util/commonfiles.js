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

var dateFormatter = function (strdate) {
    let objDate = strdate.split('-');

    console.log(objDate);
    let finalDate = objDate[2].toString() + '-' + objDate[1].toString() + '-' + objDate[0].toString();
    return finalDate;
}

module.exports.APIList = APIList;