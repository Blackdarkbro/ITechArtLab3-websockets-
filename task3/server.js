const WebSocket = require("ws");


const wsserver = new WebSocket.Server({ port: 5000, host: "localhost", path: "/broadcast" });

let clients = new Map();
let clientId = 0;

wsserver.on('connection', ws => {
    clients.set(ws, ++clientId);
    console.log(`Client ${clientId} is connected`);

    ws.on('message', message => {

        clients.forEach((id, client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`user ${clients.get(ws)}: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log(`client ${clients.get(ws)} left us`);
        clients.delete(ws);

    })

    setInterval(() => {
        let message = '';
        clients.forEach((id, client) => {
            message += `client ${id} is keep alive\n`;
        })

        ws.ping(message);
    }, 5000);

});