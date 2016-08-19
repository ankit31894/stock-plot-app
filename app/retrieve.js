var csvparser=require("csv");
var request = require('request');

module.exports=function(stockId,cb){
	var today = new Date();
	var dTo = today.getDate();
	var mTo = today.getMonth(); //January is 0!
	var yTo = today.getFullYear();
	var x = new Date();
	x.setMonth(x.getMonth()-1);
	var dFr = x.getDate();
	var mFr = x.getMonth(); //January is 0!
	var yFr = x.getFullYear();
	request.get("http://ichart.finance.yahoo.com/table.csv?s="+stockId+"&d="+mTo+"&e="+dTo+"&f="+yTo+"&g=d&a="+mFr+"&b="+dFr+"&c="+yFr+"&ignore=.csv", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var csv = body;
			var rows= csv.split('\n');
			var x=[];
			var y=[];
			for(var i=1;i<rows.length;i++){
				var v=rows[i].split(',');
				x.push(v[0]);
				y.push(v[1]);
			}
			cb({id:stockId,data:[x,y]});
			return;
		}
		cb(null,error,response.statusCode);
	});
}