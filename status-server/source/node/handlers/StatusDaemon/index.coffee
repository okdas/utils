fs= require 'fs'


Status= require 'streamcraft-status'

config= 'app/servers.json'
output= 'app/stats.json'




exports.checkStats= (req, res, next) ->
    if not fs.existsSync output

        serv= JSON.parse fs.readFileSync config


        Status.check serv, (out) ->
            return res.json out if out
            res.send 400

    else

        res.json JSON.parse fs.readFileSync output



exports.startStatus= (req, res, next) ->
    if do Status.isWorking
        return res.send 'is working', 400

    Status.start config, output, req.params.interval
    res.send 200



exports.stopStatus= (req, res, next) ->
    if not do Status.isWorking
        return res.send 'is not working', 400

    do Status.stop
    res.send 200

