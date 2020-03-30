const rpcWSS = require("rpc-websockets").Client;

const ws = new rpcWSS('ws://localhost:5000');

ws.on("open", () => {

    setInterval(() => ws.notify('notify1', { "message": "N1" }), 1000);

    // setTimeout(() => clearInterval(timer), 10000);

});