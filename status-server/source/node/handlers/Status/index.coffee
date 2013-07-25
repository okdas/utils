fs= require 'fs'


Status= require 'streamcraft-status'

config= 'app/servers.json'
output= 'app/status.json'





exports.servers= (req, res, next) ->

    fs.readFile output, 'utf-8', (err, data) ->
        return res.send err if err
        res.locals.status= data

        res.render 'Status/servers.jade'



exports.checkStatus= (req, res, next) ->
    Status.check config, output, (out) ->
        return res.json out if out
        res.send 400



exports.startStatus= (req, res, next) ->
    if Status.isWorking()
        return res.send 'is working', 400

    Status.start config, output, req.params.interval
    res.send 200



exports.stopStatus= (req, res, next) ->
    if not Status.isWorking()
        return res.send 'is not working', 400

    Status.stop()
    res.send 200

