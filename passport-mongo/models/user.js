var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String,
    firstName: String,
    lastName: String,
    ehrId: String
});