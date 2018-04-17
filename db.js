var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var users = new Schema({
    USERID: {type: String ,unique: true},
    FIRSTNAME: {type: String},
    LASTNAME: {type: String},
    EMAIL: {type: String},
    PHONE: {type: String},
    PID : {type: String},
    PNAME : {type: String},
    PASSWORD: {type: String},
    USERNAME: {type: String },
    STATUS: { type: Boolean },
    TITLE: {type: String },
    SSN: {type: String },
    LEVID: {type: String },
    TID: {type: String },
    LEVEL: {type: String },
    TYPE_NAME: {type: String },
    CWT: {type: String },
    CWT_NAME: {type: String },
});
module.exports = mongoose.model('User', users);
