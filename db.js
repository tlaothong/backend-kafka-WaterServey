var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var users = new Schema({
'USERID' : {type : String , unique : true, required : true, dropDups: true  }
}, { strict: false });
module.exports = mongoose.model('User', users);

var Area = new Schema({

}, { strict: false });
module.exports = mongoose.model('Area', Area);

var Tablet = new Schema({
}, { strict: false });
module.exports = mongoose.model('Tablet', Tablet);

var sn1 = new Schema({
}, { strict: false });
module.exports = mongoose.model('SN1', sn1);

var sn2_2 = new Schema({

}, { strict: false });

module.exports = mongoose.model('SN2_2', sn2_2);
