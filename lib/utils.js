var moment = require('moment');

module.exports.dateToStr = function (date) {
    var day   = date.getDate();
    var month = date.getMonth();
    var year  = 1900+date.getYear();

    return day + '/' + month + '/' + year;
};

module.exports.listToPipedString = function (list) {
    return (list || []).join('|');
}

module.exports.parseCalendarItem = function (obj) {
    var item = {};

    item.date    = moment(obj.date, "DD/MM/YYYY H:mm:ss");
    item.dayType = obj.dayType;
    item.strike  = obj.strike != 'N';
    item.weather = obj.weather;

    item.minTemp = obj.minTemperatureCelsius;
    item.maxTemp = obj.maxTemperatureCelsius;

    // Other fields directly copied
    var fields = [
        'seasonTg', 'seasonTU', 'dayTypeLT', 'dayTypePF', 'dayTypeCO', 'week',
        'month', 'trimester', 'quarter', 'semester', 'year', 'dayOfWeek'];
    for (i in fields) {
        var field = fields[i];
        item[field] = obj[field];
    }

    return item;
}