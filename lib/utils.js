module.exports.dateToStr = function (date) {
  var day   = date.getDate();
  var month = 1+date.getMonth(); // Months are 0-based (WHY??!!?!?!?!)
  var year  = 1900+date.getYear();

  return day + '/' + month + '/' + year;
};

module.exports.listToPipedString = function (list) {
  return (list || []).join('|');
}