var mongoose = require('mongoose');

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
module.exports = {
  url: process.env.MONGOLAB_URI, // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
  connect: function (conf) {
    mongoose.connect(conf.db || this.url);
  },
  drop: function (conf) {
    mongoose.connect(conf.db || this.url, function () {
      mongoose.connection.db.dropDatabase();
    });
  }
};
