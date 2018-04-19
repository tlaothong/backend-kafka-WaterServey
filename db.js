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

var Area = new Schema({
    REG : { Type : String},
    REG_NAME : { Type : String},
    CWT : { Type : String},
    CWT_NAME : { Type : String},
    AMP : { Type : String},
    AMP_NAME : { Type : String},
    TAM : { Type : String},
    TAM_NAME : { Type : String},
    DISTRICT : { Type : String},
    MUN : { Type : String},
    MUN_NAME : { Type : String},
    TAO : { Type : String},
    TAO_NAME : { Type : String},
    EA : { Type : String},
    VIL : { Type : String},
    VIL_NAME : { Type : String},
    MAP_STATUS : { Type : String},
    Building : { Type : Number},
    Household : { Type : Number},
    Agricultural_HH : { Type : Number},
    ES_BUSI : { Type : Number},
    ES_INDUS : { Type : Number},
    ES_HOTEL : { Type : Number},
    ES_PV_HOS : { Type : Number},
    REMARK : { Type : String},
    FI : [{ Type : String}],
    FS : { Type : String},
});
module.exports = mongoose.model('Area', Area);

var Tablet = new Schema({
    tablet_sn : { type : String },
    powerbank_sn : { type : String },
    sim_sn : { type : String },
    user_id : { type : String },

});
module.exports = mongoose.model('Tablet', Tablet);

var Progress = new Schema({
    ea : { type: Schema.Types.ObjectId,ref : 'Area' },
    max_Building : {type : Number} ,
    max_Household : {type : Number} ,
    max_Agricultural_HH : {type : Number} ,
    value_Building : {type : Number} ,
    value_Household : {type : Number} ,
    value_Agricultural_HH : {type : Number} ,
    progresses : { type: Schema.Types.ObjectId , ref : 'Progress'}
});
module.exports = mongoose.model('Progress', Progress);

var SN1 = new Schema({
    SN1P1 : { type: Schema.Types.ObjectId,ref: 'SN1P1' },
    SN1P2 : [{ type: Schema.Types.ObjectId,ref: 'SN1P2' }],
    status_approve : Number ,
    status_data : Number ,
    messeges : [{
        date: {type: Date},
        massage: {type: String}
    }]
});
module.exports = mongoose.model('SN1', SN1);
