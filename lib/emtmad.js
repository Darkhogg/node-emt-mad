var bluebird   = require('bluebird');
var underscore = require('underscore');
var request    = require('request-promise');

var logger  = require('./logger.js');
var utils   = require('./utils.js');
var parsers = require('./parsers.js');

var BASE_URL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/';

/* Constructor */
var EmtMad = function (idClient, passKey) {
    this.idClient = idClient;
    this.passKey = passKey;
};

/* Set this value to true to trigger debug mode */
EmtMad.DEBUG = false;

/* CuultureInfo constants */
EmtMad.CULTURE_ES = 'ES';
EmtMad.CULTURE_EN = 'EN';

/* Type of Day constants */
EmtMad.DAYTYPE_WORK = 'LA';
EmtMad.DAYTYPE_HOLIDAY_EVE = 'SA';
EmtMad.DAYTYPE_HOLIDAY = 'FE';

/* Direction constants */
EmtMad.DIR_ATOB = parsers.DIR_ATOB;
EmtMad.DIR_BTOA = parsers.DIR_BTOA;

/* Basic Request Method */
EmtMad.prototype.request = function(method, options) {
    var url  = BASE_URL + method + '.php';

    if (EmtMad.DEBUG) {
        logger.debug('EMT Request to "%s":', method, options);
    }

    var args = underscore.clone(options);
    args.idClient = this.idClient;
    args.passKey = this.passKey;

    return request({
        'method': 'POST',
        'uri':    url,
        'form':   args,
        'gzip':   true,

        // WARNING: In a perfect world, we would not need the following line. In
        // the real world, not a single government website uses SSL right in Spain,
        // so this is necessary probably forever.
        'strictSSL': false
    }).then(function (response) {
        return JSON.parse(response).resultValues;
    });
};


/* Bus Requests */
EmtMad.prototype.busGetCalendar = function(dateBegin, dateEnd) {
    var strBegin = utils.dateToStr(dateBegin || new Date());
    var strEnd = dateEnd ? utils.dateToStr(dateEnd) : strBegin;

    return this.request('bus/GetCalendar', {
        'SelectDateBegin': strBegin,
        'SelectDateEnd':   strEnd
    }).then(function (result) {
        return utils.array(result).map(parsers.parseCalendarItem);
    });
};

EmtMad.prototype.busGetGroups = function(culture) {
    var strCulture = culture || EmtMad.CULTURE_EN;

    return this.request('bus/GetGroups', {
        'cultureInfo': strCulture
    }).then(function (result) {
        return utils.array(result).map(parsers.parseGroupItem);
    });
}

EmtMad.prototype.busGetListLines = function (lines, date) {
    var strDate = utils.dateToStr(date || new Date());
    var strLines = utils.listToPipedString(utils.array(lines));

    return this.request('bus/GetListLines', {
        'SelectDate': strDate,
        'Lines':      strLines
    }).then(function (result) {
        return utils.array(result).map(parsers.parseLineItem);
    });
};

EmtMad.prototype.busGetNodesLines = function (nodes) {
    var strNodes = utils.listToPipedString(utils.array(nodes));

    return this.request('bus/GetNodesLines', {
        'Nodes': strNodes
    }).then(function (result) {
        return utils.array(result).map(parsers.parseLinesNodeItem);
    });
}

EmtMad.prototype.busGetRouteLines = function (lines, date) {
    var strDate = utils.dateToStr(date || new Date());
    var strLines = utils.listToPipedString(utils.array(lines));

    return this.request('bus/GetRouteLines', {
        'SelectDate': strDate,
        'Lines':      strLines
    });
}

EmtMad.prototype.busGetRouteLinesRoute = function (lines, date) {
    var strDate = utils.dateToStr(date || new Date());
    var strLines = utils.listToPipedString(utils.array(lines));

    return this.request('bus/GetRouteLinesRoute', {
        'SelectDate': strDate,
        'Lines':      strLines
    });
}

EmtMad.prototype.busGetTimesLines = function (lines, date) {
    var strDate = utils.dateToStr(date || new Date());
    var strLines = utils.listToPipedString(utils.array(lines));

    return this.request('bus/GetTimesLines', {
        'SelectDate': strDate,
        'Lines':      strLines
    });
}

EmtMad.prototype.busGetTimeTableLines = function (lines, date) {
    var strDate = utils.dateToStr(date || new Date());
    var strLines = utils.listToPipedString(utils.array(lines));

    return this.request('bus/GetTimeTableLines', {
        'SelectDate': strDate,
        'Lines':      strLines
    });
}

/* Geo Requests */

/* Media Requests */

module.exports = EmtMad;