var mongoose = require('mongoose');

// define the schema for our user model
var Schema = mongoose.Schema({
    stockId: String
});
Schema.index({stockId: 1}, {unique: true,required:true});
// create the model for users and expose it to our app
module.exports = mongoose.model('Stock', Schema);