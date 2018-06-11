var express = require('express'),
  app = express()

var bodyParser = require('body-parser')
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
var mongoose = require('mongoose'),
    db = require('./db'),
    urls = 'nso-db'
    url = '10.142.0.2'
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://'+urls+':27017/Demo'); 

var kafka = require('kafka-node');
var ConsumerGroup = kafka.ConsumerGroup;
var options = {
	kafkaHost:"kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092",
	groupId: 'ExampleTestGroup',
  	autoCommit:false,
	sessionTimeout: 15000,
  	protocol: ['roundrobin'],
  	id: 'consumer1',
	asyncPush: false,
 	fromOffset: 'latest'
}

var consumerGroup = new ConsumerGroup(options, 'post-topic');

consumerGroup.on('message', function (message) {
    obj = JSON.parse(message.value)
    console.log(obj.method)
    if (obj.method == 'put') {
      if (obj.model == 'User') {
        var user = mongoose.model('User');
        user.find({ CWT: obj.data.CWT, TID: obj.data.TID }, { 'USERID': 1, '_id': 0 }, function (err, data) {
          if (err)
            console.log(err);
          ids = []
          for (i in data) {
            ids.push(Number(data[i].toObject()['USERID']));
          }
          body = obj.data;
          if (ids.length == 0)
            ids.push(Number(body.CWT + body.TID + '0000'))
          id = ids.sort().reverse()[0] + 1;
	  console.log(id)
          body.USERID = String(id);
      body.STATUS = true
          var mydata = new user(body);
          mydata.save(function (err, data) {
            if (err)
              console.log(err)
            console.log(data)
          });  
	});
      }
      else {
        var model = mongoose.model(obj.model);
        var mydata = new model(obj.data);
        mydata.save(function (err, data) {
          if (err)
            console.log(err)
          console.log(data)
        });
      }
    } else if (obj.method == 'post') {
      var model = mongoose.model(obj.model);
      var q = obj.query;
      delete obj.data.__v;
      model.findOneAndUpdate(q, obj.data, { upsert: true, new: true }, function (err, data) {
        if (err)
          console.log(err)
        console.log(data)
      });
    } else if (obj.method == 'del') {
      var model = mongoose.model(obj.model);
      var q = obj.query;
      model.deleteOne(q, function (err, data) {
        if (err)
          console.log(err)
        console.log(data)
      });
    }
  });

app.listen(5000,function(){
    console.log('Kafka consumer running at  5000')
});
