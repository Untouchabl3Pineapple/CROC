const WebSocket = require('ws');

const wsServer = new WebSocket.Server( {port: 8080} );

wsServer.on('connection', ws => {
    ws.on('message', message => {
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// ! не удалять sudo killall -9 node