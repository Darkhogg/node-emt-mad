var moment = require('moment');

module.exports.DIR_ATOB = 'A-to-B';
module.exports.DIR_BTOA = 'B-to-A';

function parseLineAndDirection (line) {
    var split = line.split('/');

    var lineInt = parseInt(split[0]);
    var dirInt = parseInt(split[1]);

    var dirStr = dirInt == 1 ? module.exports.DIR_BTOA
               : dirInt == 2 ? module.exports.DIR_ATOB
               : null;

    return {
        'id': lineInt,
        'direction': dirStr
    };
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
};

module.exports.parseGroupItem = function (obj) {
    var item = {};

    item.id          = parseInt(obj.groupId);
    item.description = obj.groupDescription.trim();

    return item;
};

module.exports.parseLineItem = function (obj) {
    var item = {};

    item.id    = parseInt(obj.line);
    item.label = obj.label;
    item.group = parseInt(obj.groupNumber);

    item.nameA = obj.nameA.trim();
    item.nameB = obj.nameB.trim();

    item.dateFirst = moment(obj.dateFirst.trim(), "DD/MM/YYYY");
    item.dateLast  = moment(obj.dateEnd.trim(), "DD/MM/YYYY");

    return item;
};

module.exports.parseRouteNodeItem = function (obj) {
    var item = {};

    
    
    return item;
};

module.exports.parseLinesNodeItem = function (obj) {
    var item = {};

    item.id = parseInt(obj.node);
    item.name = obj.name.trim();

    item.lines = obj.lines.map(parseLineAndDirection);

    item.location = {
        'lat': obj.latitude,
        'lng': obj.longitude
    }

    return item;
}