var Stock = require('./models/stock');
module.exports = function (socket, stockId) {
  require("./retrieve.js")(stockId, function (data, error, statusCode) {
    if (error != null) {
      return socket.emit("exception", "Some Error Occured! Please Try Later");
    }
    if (statusCode !== 200) {
      if (statusCode === 404)
        return socket.emit("exception", "Stock Symbol Does not Exist!");
      else 
        return socket.emit("exception", "Some error occured! (" + statusCode + ')');
    }
    var dbdata = {
      stockId: stockId
    }

    var nStock = new Stock(dbdata);
    nStock.save(function (err) {

      if (err) {
        if (err.code == 11000)
          socket.emit('exception', 'Stock already exists!')
        else socket.emit('exception', 'Some Error Occured')
        return;
      }
      socket.emit('add', data);
      socket.broadcast.emit('add', data);

    });
  });
}
