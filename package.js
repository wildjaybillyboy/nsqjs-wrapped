Package.describe({
  name: 'nwdev:nsqjs-wrapped',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Wrapper for Node Module "NSQJS"',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/wildjaybillyboy/nsqjs-wrapped.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends ({
    nsqjs:"0.7.6"
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('mongo', ['client', 'server']);
  api.addFiles('lib/nsqjs-common.js', ['server', 'client']);
  api.addFiles('server/nsqjs-server.js', 'server');
  api.addFiles('client/nsqjs-client.js', 'client');
  api.export(['initReader', 'writeMessage'], 'server');
  api.export('Messages', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('lib/nsqjs-common.js', ['server', 'client']);
  api.addFiles('server/nsqjs-server.js', 'server');
  api.addFiles('client/nsqjs-client.js', 'client');
  api.addFiles('nsqjs-wrapped-tests.js');
});
