NSQJS package for Meteor

Wrapper for node "NSQJS" module.  Package includes simple 'reader' and 'writer' functionality.  Reader is started by 'Meteor.call('initReader', topic, channel, options)', where topic, channel and options are per NSQJS docs.  Writer is called by 'Meteor.call('writeMessage', nsqdHost, nsqdPort, topic, message)', where nsqdHost, nsqdPort, topic and message are per NSQJS docs.

See NSQJS documentation for usage.  Note that non-async calls (ie: reader, writer streams) will need to be wrapped in a futures fiber (see Meteor.bindEnvironment in meteor docs).
