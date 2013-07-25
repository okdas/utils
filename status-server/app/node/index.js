var async, express, extend;

express = require('express');

extend = require('extend');

async = require('async');

/*
Возвращает настроенный экзмепляр приложения.
*/


module.exports = function(cfg, log, done) {
  /*
  Экземпляр приложения
  */

  var app, handlers;
  app = module.exports = express();
  /*
  Конфиг приложения
  */

  app.configure(function() {
    var config;
    config = cfg["default"] || {};
    return app.set('config', config);
  });
  /*
  Конфиг приложения для разработчиков
  */

  app.configure('development', function() {
    var config;
    config = app.get('config');
    return extend(true, config, cfg.development || {});
  });
  /*
  Конфиг приложения для производства
  */

  app.configure('production', function() {
    var config;
    config = app.get('config');
    return extend(true, config, cfg.production || {});
  });
  /*
  Логгер приложения
  */

  app.configure(function() {
    return app.set('log', log);
  });
  /*
  Логгер приложения для разработчиков
  */

  app.configure('development', function() {
    return app.use(express.logger('dev'));
  });
  /*
  Логгер приложения для производства
  */

  app.configure('production', function() {
    return app.use(function(req, res, next) {
      log.info("" + req.ip + " - - " + req.method + " " + req.url + " \"" + req.headers.referer + "\"  \"" + req.headers['user-agent'] + "\"");
      return next();
    });
  });
  /*
  Прослойки приложения
  */

  app.configure(function() {
    app.use(express.compress());
    app.use(express["static"](__dirname + '/views/assets'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/views/templates');
    return app.set('view engine', 'jade');
  });
  /*
  Redis= require 'redis'
  redis= do Redis.createClient
  
  app.use (req, res, next) ->
  
      req.redis= redis
      do next
  */

  /*
  База данных приложения
  */

  /*
  Db= require 'orm'
  
  app.configure ->
      config= app.get 'config'
  
      app.use (req, res, next) ->
  
          Db.connect config.db, (err, db) ->
              if err
                  # ошибка при подключении к базе данных
                  return next err
  
              req.db= db
              req.models= db.models
  
              # подключить модели
              db.load 'models', (err) ->
                  return do next
  
  
  
  passport= require 'passport'
  
  passport.serializeUser (user, done) ->
      done null, user.username
  
  passport.deserializeUser (username, done) ->
      done null,
          username: username
  */

  /*
  Сессии пользователей приложения
  */

  /*
  app.configure ->
      # Сессия
      app.use express.session
          secret: 'apiserver'
          store: new RedisStore
              prefix: 'sessions'
  
      app.use do passport.initialize
  
      app.use do passport.session
  */

  /*
  Обработчики маршрутов
  */

  handlers = require('./handlers');
  return handlers(app);
};
