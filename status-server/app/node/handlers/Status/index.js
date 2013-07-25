var Status, stat;

Status = require('streamcraft-status');

stat = {};

exports.servers = function(req, res, next) {
  stat = new Status({
    config: 'app/servers.json',
    output: 'app/status.json'
  });
  stat.start(2);
  setTimeout(function() {
    return stat.stop();
  }, 7500);
  return res.send(200);
};
