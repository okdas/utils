var fs= require('fs')
var async= require('async')
var Query= require('mcquery')

//var resultPath= './result/stats.json'
var resultPath= '/home/www/proba.streamcraft.net/json/stats.json'

var logErrors= false

var servers= [
    { title:'SandBox 1', host:'srv1.streamcraft.net', port:11111 },
    { title:'SandBox 2', host:'srv1.streamcraft.net', port:22222 },
    { title:'NanoTech PvE 1', host:'srv2.streamcraft.net', port:11111 },
    { title:'NanoTech PvP 1', host:'srv2.streamcraft.net', port:22222 },
    { title:'NanoTech PvE 2', host:'srv3.streamcraft.net', port:11111 },
    { title:'NanoTech PvP 2', host:'srv3.streamcraft.net', port:22222 },
    { title:'NanoTech PvE 3', host:'srv4.streamcraft.net', port:11111 },
    { title:'NanoTech PvP 3', host:'srv4.streamcraft.net', port:22222 },
    { title:'NanoTech PvE 4', host:'srv9.streamcraft.net', port:33333 },
    { title:'NanoTech PvP 4', host:'srv8.streamcraft.net', port:33334 },
    { title:'MagicRPG 1', host:'srv5.streamcraft.net', port:11111 },
    { title:'MagicRPG 2', host:'srv5.streamcraft.net', port:22222 },
    { title:'MagicRPG 3', host:'srv6.streamcraft.net', port:11111 },
    { title:'MagicRPG 4', host:'srv6.streamcraft.net', port:22222 },
    { title:'MagicRPG 5', host:'srv7.streamcraft.net', port:11111 },
    { title:'MagicRPG 6', host:'srv7.streamcraft.net', port:22222 },
    { title:'MagicRPG 7', host:'srv8.streamcraft.net', port:11114 },
    { title:'MagicRPG 8', host:'srv8.streamcraft.net', port:22224 },
    { title:'MagicRPG PvE 1', host:'srv9.streamcraft.net', port:11111 },
    { title:'MagicRPG PvE 2', host:'srv9.streamcraft.net', port:22222 },
    { title:'Spleef', host:'srv8.streamcraft.net', port:34344 },
]

var stats= {}
async.each(servers, function (server, done) {
    var query= new Query(server.host, server.port)

    query.connect(function (err) {
        if (err) { if (logErrors) { console.error(server.title, err) }
            query.close()
            stats[server.title]= err
            process.nextTick(function () {
                done(null)
            })
        } else {
            query.basic_stat(function (err, stat) {
                query.close()
                if (err) { if (logErrors) { console.error(server.title, err) }
                    stats[server.title]= err
                }
                stats[server.title]= stat
                process.nextTick(function () {
                    done(null)
                })
            })
        }
    })

}, function (err) {
    var result= []
    servers.map(function (server) {
        var data= {}, title, stat
        data.title= (title= server.title)
        if (stat= stats[title]) {
            if (stat.error) {
                data.error= stat.error
            } else {
                data.stat= {
                    numplayers: stat.numplayers,
                    maxplayers: stat.maxplayers
                }
            }
            result.push(data)
        }
    })
    fs.writeFile(resultPath, JSON.stringify(result, null, 4), function (err) {
        if (err) { if (logErrors) { console.error(err) }}
    })
})