var statsUrl= '/json/stats.json';
var refreshInterval= 15000;

$(function () {
    var $stats= $('#stats');

    var fullWidth= 100;
    var calcWidth= function (num, max) {
        var percent= num / (max / 100);
        if (percent > 100) { percent= 100 }
        return Math.round((fullWidth / 100) * percent);
    }

    var renderAlive= function (server) {
        var width= calcWidth(server.stat.numplayers, server.stat.maxplayers);
        return $('<div class="stat stat-server"/>').append(
            $('<div class="stat-title"/>').html(server.title)
        ).append(
            $('<div class="progress progress-warning progress-striped active"/>').append(
                $('<div class="bar"/>').css({
                    width: width+'%'
                }).html(
                    server.stat.numplayers +' / '+ server.stat.maxplayers
                )
            )
        );
    }

    var renderError= function (server) {
        return $('<div class="stat stat-server"/>').append(
            $('<div class="stat-title"/>').html(server.title)
        ).append(
            $('<div class="progress progress-warning progress-striped active"/>').append(
                $('<div class="bar"/>').css({
                    width: 0
                }).html(
                    'offline'
                )
            )
        );
    }

    var renderTotal= function (total) {
        var width= calcWidth(total.numplayers, total.maxplayers);
        return $('<div class="stat stat-total"/>').append(
            $('<div class="stat-title"/>').html(server.title)
        ).append(
            $('<div class="progress progress-warning progress-striped active"/>').append(
                $('<div class="bar"/>').css({
                    width: width+'%'
                }).html(
                    total.numplayers +' / '+ total.maxplayers
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