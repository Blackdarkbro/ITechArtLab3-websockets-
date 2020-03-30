const rpcWSS = require("rpc-websockets").Client;

const ws = new rpcWSS('ws://localhost:5000');

ws.on("open", () => {
    ws.subscribe("CCC");
    ws.on("CCC", (p) => console.log(p));
});