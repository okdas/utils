module.exports = function(app) {
  var Status;
  Status = require('./Status');
  app.get('/', function(req, res, next) {
    return res.redirect('/status');
  });
  return app.get('/status', Status.servers);
};
