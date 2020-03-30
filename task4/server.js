const WebSocket = require("ws");


const wsserver = new WebSocket.Server({ port: 5000, host: "localhost", path: "/broadcast" });

wsserver.on('connection', ws => {
    console.log(`Client is connected`);

    ws.on('message', message => {
        let obj = JSON.parse(message);
        let result = JSON.stringify({ "x": obj.x, "y": obj.y, "z": obj.x + obj.y });

        ws.send(result);
    });

    ws.on('close', () => {
        console.log(`client left us`);
    })
});
console.log(`ws server: host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path} `);