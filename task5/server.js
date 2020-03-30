const WebSocket = require("ws");
const fs = require("fs");

let k = 0;

const wsserver = new WebSocket.Server({ port: 5000, host: "localhost", path: "/broadcast" });

wsserver.on('connection', ws => {

    const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf-8" });
    let writeFile = fs.createWriteStream(`./files/file${++k}.txt`);
    duplex.pipe(writeFile);

    ws.on('close', () => {
        console.log(`client left us`);
    })
});
console.log(`ws server: host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path} `);