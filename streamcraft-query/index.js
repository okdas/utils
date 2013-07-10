var fs= require('fs')
var async= require('async')
var Query= require('mcquery')

var statsFilename= './result/stats.json'
var logErrors= false

var servers= {

    'SandBox 1': {
        host:'srv1.streamcraft.net', port:11114
    },
    'SandBox 2': {
        host:'srv1.streamcraft.net', port:22224
    },

    'NanoTech PvE 1': {
        host:'srv2.streamcraft.net', port:11114
    },
    'NanoTech PvP 1': {
        host:'srv2.streamcraft.net', port:22224
    },

    'NanoTech PvE 2': {
        host:'srv3.streamcraft.net', port:11114
    },
    'NanoTech PvP 2': {
        host:'srv3.streamcraft.net', port:22224
    },

    'NanoTech PvE 3': {
        host:'srv4.streamcraft.net', port:11114
    },
    'NanoTech PvP 3': {
        host:'srv4.streamcraft.net', port:22224
    },

    'NanoTech PvE 4': {
        host:'srv9.streamcraft.net', port:33334
    },
    'NanoTech PvP 4': {
        host:'srv8.streamcraft.net', port:33334
    },

    'MagicRPG 1': {
        host:'srv5.streamcraft.net', port:11114
    },
    'MagicRPG 2': {
        host:'srv5.streamcraft.net', port:22224
    },
    'MagicRPG 3': {
        host:'srv6.streamcraft.net', port:11114
    },
    'MagicRPG 4': {
        host:'srv6.streamcraft.net', port:22224
    },
    'MagicRPG 5': {
        host:'srv7.streamcraft.net', port:11114
    },
    'MagicRPG 6': {
        host:'srv7.streamcraft.net', port:22224
    },
    'MagicRPG 7': {
        host:'srv8.streamcraft.net', port:11114
    },
    'MagicRPG 8': {
        host:'srv8.streamcraft.net', port:22224
    },

    'MagicRPG PvE 1': {
        host:'srv9.streamcraft.net', port:22225
    },
    'MagicRPG PvE 2': {
        host:'srv9.streamcraft.net', port:22224
    },

    'Spleef': {
        host:'srv8.streamcraft.net', port:34344
    },
}

var stats= {}
async.each(Object.keys(servers), function (name, done){

    var server= servers[name]
    var query= new Query(server.host, server.port)

    query.connect(function (err) {
        if (err) { if (logErrors) { console.error(name, err) }
            query.close()
            stats[name]= err
            done(null)
        } else {
            query.basic_stat(function (err, stat) {
                query.close()
                if (err) { if (logErrors) { console.error(name, err) }
                    stats[name]= err
                }
                stats[name]= stat
                done(null)
            })
        }
    })

}, function (err) {
    fs.writeFile(statsFilename, JSON.stringify(stats, null, 4), function (err) {
        if (err) { if (logErrors) { console.error(err) }}
    })
})