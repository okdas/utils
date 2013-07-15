var statsUrl= '/json/stats.json';
var refreshInterval= 15000;

$(function () {
    var $stats= $('#right .bloc1 > .bloc12');

    var fullWidth= 80;
    var calcWidth= function (num, max) {
        var percent= num / (max / 100);
        if (percent > 100) { percent= 100 }
        return Math.round((fullWidth / 100) * percent);
    }

    var renderAlive= function (server) {
        var width= calcWidth(server.stat.numplayers, server.stat.maxplayers);
        return $('<div class="bloc8"/>').append(
            $('<b/>').html(server.title)
        ).append(
            $('<span>').html(server.stat.numplayers +' / '+ server.stat.maxplayers)
        ).append(
            $('<div class="bloc9"/>').append(
                $('<div class="bloc10"/>').append(
                    $('<div class="bloc11"/>').css({
                        width: width
                    })
                )
            )
        );
    }

    var renderError= function (server) {
        return $('<div class="bloc8"/>').append(
            $('<b class="nameb"/>').html(server.title)
        ).append(
            $('<b class="statusb"/>').html('offline')
        );
    }

    var renderTotal= function (total) {
        var width= calcWidth(total.numplayers, total.maxplayers);
        return $('<div class="bloc121"/>').append(
            $('<div class="bloc81"/>').append(
                $('<b>Общий онлайн</b>')
            ).append(
                $('<span>').html(total.numplayers +' / '+ total.maxplayers)
            ).append(
                $('<div class="bloc9"/>').append(
                    $('<div class="bloc10"/>').append(
                        $('<div class="bloc11"/>').css({
                            width: width
                        })
                    )
                )
            )
        );
    }

    var refresh= function () {
        $.get(statsUrl, function(servers) {
            $stats.empty();

            var total= {
                numplayers: 0,
                maxplayers: 0
            };

            for (var i in servers) {
                if (!servers.hasOwnProperty(i)) return;

                var server= servers[i];
                if (server.title) {
                    if (server.stat) {
                        var stat= server.stat;
                        total.numplayers= total.numplayers + stat.numplayers;
                        total.maxplayers= total.maxplayers + stat.maxplayers;
                        $stats.append(
                            renderAlive(server)
                        )
                    }
                    if (server.error) {
                        $stats.append(
                            renderError(server)
                        )
                    }
                }
            }

            $stats.prepend(
                renderTotal(total)
            );
        });
    }

    refresh();
    setInterval(function () {
        refresh();
    }, refreshInterval)
})