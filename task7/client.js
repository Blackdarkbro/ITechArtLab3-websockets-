const rpcWSS = require("rpc-websockets").Client;

const ws = new rpcWSS('ws://localhost:5000');

ws.on("open", () => {
    ws.call("sum", [1, 9]).then((result) => { console.log("sum = ", result) });
    ws.call("mul", [1, 9, 18, 3, 1]).then((result) => { console.log("mul = ", result) });

    ws.login({ login: "ega", password: "777" })
        .then(() => {
            ws.call("conc", ["mne ", 33, " goda"]).catch((e) => console.log("error ", e))
                .then((result) => { console.log("conc = ", result) });
        });
});