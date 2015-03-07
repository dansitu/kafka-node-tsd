/// <reference path="typings/kafka-node.d.ts" />

import kafka = require('kafka-node');

var basicClient = new kafka.Client('localhost:2181/', 'sendMessage');

var optionsClient = new kafka.Client('localhost:2181/', 'sendMessage', {
    sessionTimeout: 30000,
    spinDelay: 1000,
    retries: 0
});
optionsClient.close();
optionsClient.close(function(){});

var producer = new kafka.Producer(basicClient);
producer.on('error', function(error: Error){});
producer.on('ready', function(){

    var messages = [{
        topic: 'topicName',
        messages: ['message body'],
        partition: 0,
        attributes: 2
    }, {
        topic: 'topicName',
        messages: ['message body'],
        partition: 0
    }, {
        topic: 'topicName',
        messags: ['message body'],
        attributes: 0
    }, {
        topic: 'topicName',
        messages: ['message body']
    }, {
        topic: 'topicName',
        messages: [new kafka.KeyedMessage('key', 'message')]
    }];

    producer.send(messages, function(err: Error){});
    producer.send(messages, function(err: Error, data: Object){});

    producer.createTopics(['t'], true, function (err: Error, data: Object) {});
    producer.createTopics(['t'], false, function (err, data) {});
    // producer.createTopics(['t'], function (err: Error, data: Object) {}); // Omitting middle argument is not possible in TS

});

var highLevelProducer = new kafka.HighLevelProducer(basicClient);
highLevelProducer.on('error', function(error: Error){});
highLevelProducer.on('ready', function(){

    var messages = [{
        topic: 'topicName',
        messages: ['message body'],
        attributes: 2
    }, {
        topic: 'topicName',
        messages: ['message body'],
        partition: 0
    }, {
        topic: 'topicName',
        messags: ['message body'],
        attributes: 0
    }, {
        topic: 'topicName',
        messages: ['message body']
    }, {
        topic: 'topicName',
        messages: [new kafka.KeyedMessage('key', 'message')]
    }];

    producer.send(messages, function(err: Error){});
    producer.send(messages, function(err: Error, data: Object){});

    producer.createTopics(['t'], true, function (err: Error, data: Object) {});
    producer.createTopics(['t'], false, function (err, data) {});
    // producer.createTopics(['t'], function (err: Error, data: Object) {}); // Omitting middle argument is not possible in TS

});

var fetchRequests = [{ topic: 'awesome' }];
var consumer = new kafka.Consumer(basicClient, fetchRequests, {
    groupId: 'abcde',
    autoCommit: true
});
consumer.on('error', function(error: Error){});
consumer.on('message', function(message){});