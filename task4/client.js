const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:5000/broadcast");

ws.on("open", () => {

    ws.on("message", message => {
        console.log(message);
    })

    let timer = setInterval(() => {
        let x = Math.floor(Math.random() * (100 - 1) + 1);
        let y = Math.floor(Math.random() * (100 - 1) + 1);

        let jsonObj = JSON.stringify({ "x": x, "y": y });
        ws.send(jsonObj);
    }, 500);

    setTimeout(() => {
        clearInterval(timer);
    }, 10000);

    setTimeout(() => {
        ws.close();
    }, 20000)
});


// const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf-8" });


// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);