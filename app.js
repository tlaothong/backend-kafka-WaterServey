var express = require('express'),
  app = express()

var bodyParser = require('body-parser')
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
var kafka = require('kafka-node');

var Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost:"35.231.191.95:9092,35.231.131.0:9092,35.231.143.31:9092,35.231.255.229:9092",requestTimeout:2000}),
    producer = new Producer(client),
    Consumer = kafka.Consumer,
    consumer = new Consumer(client,[{topic: 'post-topic'}],{autoCommit:false});

app.post('/test',function(req,res){
        payloads = [
            { topic: req.body.topic, messages:req.body.message , partition: 0 }
        ];
        producer.send(payloads, function (err, data) {
        if(err)
            res.json(err)
        res.json(data);
        console.log(err)
        console.log(producer)
        });

consumer.on('message', function (message) {
    console.log(message);
    });
app.listen(5000,function(){
    console.log('Kafka producer running at  5000')
    
    });
    })