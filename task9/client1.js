const rpcWSS = require("rpc-websockets").Client;

const ws = new rpcWSS('ws://localhost:5000');

ws.on("open", () => {
    ws.subscribe("AAA");
    ws.subscribe("BBB");

    ws.on("AAA", (p) => console.log(p));
    ws.on("BBB", (p) => console.log(p));

});