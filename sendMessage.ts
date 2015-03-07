/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/kafka-node.d.ts" />

import kafka = require('kafka-node');

var client = new kafka.Client('localhost:2181/', 'sendMessage');
var producer = new kafka.HighLevelProducer(client);

producer.on('ready', function() {
  console.log('i am ready to go');
  producer.send([{
    topic: 'my-replicated-topic',
    messages: ['omg here is a message from javascript', 'some other message from js']
  }], function(error, data){
    console.log('done sending');
    console.log(error);
    console.log(data);
  });
  producer.send([{
    topic: 'my-replicated-topic',
    messages: 'omg here is a message from javascript'
  }], function(error, data){
    console.log('done sending');
    console.log(error);
    console.log(data);
  });
});
