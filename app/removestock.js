var Stock = require('./models/stock');
module.exports=function(socket,stockId){
	var dbdata={
		stockId:stockId
	}

	Stock.remove(dbdata,function(err){

		if(err){
		  	socket.emit('exception','Some Error Occured')
			return;
		}
		socket.emit('remove',stockId);
		socket.broadcast.emit('remove',stockId);

	});
}
