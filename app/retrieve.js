var csvparser = require("csv");
var request = require('request');

module.exports = function (stockId, cb) {
  var today = new Date();
  var end = today.toISOString();
  today.setMonth(today.getMonth() - 1);
  var start = today.toISOString();
  console.log("http://www.google.com/finance/historical?q=" + stockId + "&startdate=" + start + "&enddate=" + end + "&output=csv")
  request.get("http://www.google.com/finance/historical?q=" + stockId + "&startdate=" + start + "&enddate=" + end + "&output=csv", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var csv = body;
      var rows = csv.split('\n');
      var x = [];
      var y = [];
      for (var i = 1; i < rows.length; i++) {
        var v = rows[i].split(',');
        x.push(v[0]);
        y.push(v[1]);
      }
      var obj = {
        id: stockId,
        data: [x, y]        
      }
      cb(obj);
      return;
    }
    cb(null, error, response.statusCode);
  });
}
