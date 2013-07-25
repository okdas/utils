fs= require 'fs'


Status= require 'streamcraft-status'

config= 'app/servers.json'
output= 'app/status.json'





exports.servers= (req, res, next) ->
    return res.send 400 if not fs.existsSync config

    servers= JSON.parse fs.readFileSync config
    res.send 200





exports.checkStatus= (req, res, next) ->
    Status.check config, output, (out) ->
        return res.json out if out
        res.send 400



exports.startStatus= (req, res, next) ->
    return res.send 400 if Status.isWorking()

    Status.start config, output, req.params.interval
    res.send 200



exports.stopStatus= (req, res, next) ->
    return res.send 400 if not Status.isWorking()

    Status.stop()
    res.send 200

