var express = require('express'),
  app = express()

var bodyParser = require('body-parser')
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
var kafka = require('kafka-node');

<<<<<<< HEAD
var Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost:"kafka-1:9092,kafka-2:9092,kafka-3:9092,kafka-4:9092",requestTimeout:2000}),
    producer = new Producer(client),
    Consumer = kafka.Consumer,
    consumer = new Consumer(client,[{topic: 'post-topic', partition: 0, offset: -1 }],{autoCommit:false},{fromOffset:true});


consumer.on('message', function (message) {
    console.log(data);
    });
consumer.on('error', function (err) {
     console.log('error', err);
    });
app.listen(5000,function(){
    console.log('Kafka producer running at  5000')
    
});
=======
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
    console.log(message.value);
    });
app.listen(5000,function(){
    console.log('Kafka producer running at  5000')
});
>>>>>>> 4183bf15732486ac0bbec8ac340942f93fdcc01b
