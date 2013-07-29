module.exports= (app) ->

    Status= require './Status'

    app.get '/', (req, res, next) ->
        res.redirect '/status'

    app.get '/status', Status.status


    app.post '/api/v1/status/servers', Status.addServer
    app.delete '/api/v1/status/servers/:serverId', Status.deleteServer

    app.get '/api/v1/status/stats', Status.checkStats

    app.get '/api/v1/status/start/interval/:interval', Status.startStatus
    app.get '/api/v1/status/stop', Status.stopStatus

