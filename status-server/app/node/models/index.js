var async;

async = require('async');

module.exports = function(db, done) {
  async.series({
    User: function(done) {
      var User;
      User = require('./User');
      return User(db, done);
    },
    Store: function(done) {
      var Store;
      Store = require('./Store');
      return Store(db, done);
    },
    Storage: function(done) {
      var Storage;
      Storage = require('./Storage');
      return Storage(db, done);
    }
  });
  return done();
};
