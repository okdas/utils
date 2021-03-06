var statsUrl= '/json/stats.json';
var refreshInterval= 15000;

var total= {
    title: 'Общий онлайн',
    numplayers: 0,
    maxplayers: 0
};

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
        return $('<div class="stat stat-server stat-server-error"/>').append(
            $('<div class="stat-title"/>').html(server.title)
        ).append(
            $('<div class="progress progress-danger"/>').append(
                $('<div class="bar"/>').css({
                    width: '100%'
                }).html(
                    'offline'
                )
            )
        );
    }

    var renderTotal= function (total) {
        var width= calcWidth(total.numplayers, total.maxplayers);
        return $('<div class="stat stat-total"/>').append(
            $('<div class="stat-title"/>').html(total.title)
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

            total.numplayers= 0;
            total.maxplayers= 0;

            for (var i in servers) {
                if (!servers.hasOwnProperty(i)) return;

                var server= servers[i];
                if (server.title) {
                    try {
                        if (server.stat) {
                            var stat= server.stat;
                            total.numplayers= total.numplayers + stat.numplayers;
                            total.maxplayers= total.maxplayers + stat.maxplayers;
                            $stats.append(
                                renderAlive(server)
                            );
                        }
                        if (server.error) {
                            $stats.append(
                                renderError(server)
                            );
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            try {
                $stats.prepend(
                    renderTotal(total)
                );
            } catch (e) {
                console.error(e);
            }
        });
    }

    refresh();
    setInterval(function () {
        refresh();
    }, refreshInterval)
})