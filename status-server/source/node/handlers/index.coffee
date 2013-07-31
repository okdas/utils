module.exports= (app) ->

    StatusDaemon= require './StatusDaemon'
    Server= require './Server'





    app.get '/', (req, res, next) ->
        res.redirect '/status'





    ###

    Интерфейс статистики

    ###
    app.get '/status', Server.renderStatus

    app.get '/status/servers', Server.renderServer





    # Добавить сервер в конфиг
    app.post '/api/v1/status/servers', Server.addServer

    # Удалить сервер из конфига
    app.delete '/api/v1/status/servers/:serverId', Server.deleteServer

    # Получить сервер
    app.get '/api/v1/status/servers/:serverId', Server.getServer





    ###

    Управление статус-сервером

    ###
    app.get '/api/v1/status/stats', StatusDaemon.checkStats

    app.get '/api/v1/status/start/interval/:interval', StatusDaemon.startStatus

    app.get '/api/v1/status/stop', StatusDaemon.stopStatus

