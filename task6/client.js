const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:5000/broadcast");

ws.on("open", () => {
    const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf-8" });
    let writeFile = fs.createWriteStream(`./files/file${++k}.txt`);
    duplex.pipe(writeFile);
});