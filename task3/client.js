const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:5000/broadcast");

const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf-8" });

duplex.pipe(process.stdout);
process.stdin.pipe(duplex);

ws.on("ping", data => {
    console.log(data.toLocaleString());
})