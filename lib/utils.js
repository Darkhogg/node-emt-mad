module.exports.array = function (object) {
    if (object instanceof Array) {
        return object;
    } else {
        return [object];
    }
};

module.exports.dateToStr = function (date) {
    var day   = date.getDate();
    var month = date.getMonth();
    var year  = 1900+date.getYear();

    return day + '/' + month + '/' + year;
};

module.exports.listToPipedString = function (list) {
    // null/undefined
    if (!list) {
        return '';
    }

    // Actual list
    if (list instanceof Array) {
        return list.join('|');
    }

    // single item
    return '' + list;
}