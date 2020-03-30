const rpcWSS = require("rpc-websockets").Client;

const ws = new rpcWSS('ws://localhost:5000');

ws.on("open", () => {

    let timer = setInterval(() => ws.notify('notify2'), 500);

    setTimeout(() => clearInterval(timer), 10000);

});