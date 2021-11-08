const WebSocket = require('ws');

const wsServer = new WebSocket.Server( {port: 8001} );

wsServer.on('connection', ws => {
    ws.on('message', message => {
        console.log(message);
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// ! не удалять sudo killall -9 node