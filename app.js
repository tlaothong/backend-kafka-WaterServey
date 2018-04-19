var express = require('express'),
  app = express()

var bodyParser = require('body-parser')
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
var mongoose = require('mongoose'),
    db = require('./db'),
    urls = '35.196.18.119'
    url = '35.227.94.29'
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://'+url+':27017/Demo'); 

var kafka = require('kafka-node');
var ConsumerGroup = kafka.ConsumerGroup;
var options = {
	kafkaHost:"kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092",
	groupId: 'ExampleTestGroup',
  	autoCommit:false,
	sessionTimeout: 15000,
  	protocol: ['roundrobin'],
  	asyncPush: false,
  	id: 'consumer1',
 	fromOffset: 'latest'
}

var consumerGroup = new ConsumerGroup(options, 'post-topic');

consumerGroup.on('message', function (message) {
    obj = JSON.parse(message.value)
    console.log(obj.method)
    if(obj.method == 'post') {
        var model = mongoose.model(obj.model);
        var mydata = new model(obj.data);
        mydata.save(function(err,data){
        if(err)
           console.log(err)
        console.log(data)
        });
    }else if(obj.method == 'put'){
        var model = mongoose.model(obj.model);
	var q = obj.query;
        model.findOneAndUpdate(q,obj.data,{new:true}, function(err,data){
        if(err)
            console.log(err)
        console.log(data)
        });
    }else if(obj.method == 'del') {
        var model = mongoose.model(obj.model);
	var q = obj.query;
        model.deleteOne(q,function(err, data) {
        if (err)
            console.log(err)
        console.log(data)
        });
    }
});
app.listen(5000,function(){
    console.log('Kafka consumer running at  5000')
});
