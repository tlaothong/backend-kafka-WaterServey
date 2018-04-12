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
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://'+urls+':27017/Demo'); 

var kafka = require('kafka-node');
var Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost:"kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092",requestTimeout:2000}),
    consumer = new Consumer(
	client,
	[
		{ topic: 'post-topic',offset: -1 }
	],
	{
		autoCommit:false,
	}
    );
var ConsumerGroup = kafka.ConsumerGroup;
var options = {
	kafkaHost:"kafka-1:9092,kafka-2:9092,35.231.191.95:9092,kafka-4:9092",
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
    if(obj.method =='post') { 
        var model = mongoose.model(obj.model);
        var mydata = new model(obj.data);
	//console.log(model);
	console.log(mydata);
        mydata.save(function(err,data){
        if(err)
	   console.log(err)
        });
    };
    });
app.listen(5000,function(){
    console.log('Kafka producer running at  5000')
});
