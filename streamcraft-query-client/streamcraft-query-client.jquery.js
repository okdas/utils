var statsUrl= '/json/stats.json';

$(function () {
    var $stats= $('#right .bloc1 > .bloc12').html('');

    var renderAlive= function (server) {
        var percent= (server.stat.maxplayers / 100) * server.stat.numplayers;
        var width= Math.round((80 / 100) * percent);
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
        var percent= (total.maxplayers / 100) * total.numplayers;
        var width= Math.round((80 / 100) * percent);
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

    $.get(statsUrl, function(servers) {

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
        )
    });
})