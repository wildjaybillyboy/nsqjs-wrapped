/*
nsqjs node.js NSQ client library

https://github.com/dudleycarr/nsqjs

using meteorhacks:npm package:

https://meteorhacks.com/complete-npm-integration-for-meteor
https://github.com/meteorhacks/npm
*/

//global reader/writer nsqjs objects
reader = {};
writer = {};

nsq = Npm.require('nsqjs');

//publish collection to client
try {
    Meteor.publish('messages', function () {
        return Messages.find();
    });
} catch (e) {
    console.error(e);
}

Meteor.methods({
    'initReader' : function (topic, channel, options) {
        reader = new nsq.Reader(topic, channel, options);
        reader.connect();
        reader.on('message', Meteor.bindEnvironment(function (msg) {
            //edit to reader example: attempt to pull json data
            try {
                msgJson = msg.json();
            } catch (e) {
                console.error('msg.json() error: ',e);
            }
            //save all provided message object information
            var message = {
                timestamp : msg.timestamp,
                id : msg.id,
                body : msg.body.toString(),
                attempts : msg.attempts,
                hasResponded : msg.hasResponded,
                json : msgJson ? msgJson : false
            };
            Messages.insert(message);
            console.log('received message '+msg.id+': '+msg.body.toString());
            msg.finish();
        }));
    },
    //node.js simple writer example
    'writeMessage' : function (nsqdHost, nsqdPort, topic, message) {
        writer = new nsq.Writer(nsqdHost, nsqdPort);
        writer.connect();
        writer.on('ready', Meteor.bindEnvironment(function () {
            writer.publish(topic, message, Meteor.bindEnvironment(function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('writer published to nsq topic ',topic,' message ',message);
                }
            }));
        }));
        return true;
    }
});
