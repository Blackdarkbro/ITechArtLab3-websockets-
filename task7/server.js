const rpcWSS = require("rpc-websockets").Server;

let server = new rpcWSS({ port: 5000, host: "localhost" });

server.setAuth((acc) => { return acc.login === "ega" && acc.password === "777" });

server.register("sum", (params) => { return params[0] + params[1] }).public();
server.register("mul", (params) => { return params.reduce((a, b) => a * b) }).public();
server.register("conc", (params) => { return params[0].toString() + params[1].toString() + params[2].toString() }).protected();