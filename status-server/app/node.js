var Log, cfg, cluster, d, domain, fs, log, os;

cluster = require('cluster');

os = require('os');

fs = require('fs');

Log = require('log');

cfg = require('./package.json').config;

log = new Log('main', fs.createWriteStream(cfg.logfile));

/*

Инициализация кластера

Запускает воркеры по количеству процессоров.
*/


/*
if cluster.isMaster
    require('pid')(cfg.pidfile)

    nWorkers= (do os.cpus).length
    for i in [1..nWorkers]
        worker= do cluster.fork
*/


/*

Инициализация воркера
*/


/*
if cluster.isWorker
*/


domain = require('domain');

d = domain.create();

d.run(function() {
  var App, app;
  App = require('./node/index');
  app = App(cfg, log);
  return app.listen(cfg["default"].port, function() {
    return log.info("apiserver listening on " + cfg["default"].port);
  });
});
