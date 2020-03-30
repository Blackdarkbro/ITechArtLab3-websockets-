const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:5000/broadcast");

ws.on("open", () => {
    const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf-8" });
    let readFile = fs.createReadStream(`./clientFile.txt`);
    readFile.pipe(duplex);
});