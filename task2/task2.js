const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

const httpPort = 3000;
const webSocketPort = 4000;

let http404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let sendHTML = (req, res) => {
    res.writeHead(400, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync("./index.html"));
}
let getHandler = (req, res) => {
    switch (req.url) {
        case "/":
            sendHTML(req, res);
            break;
        default:
            http404(req, res);
            break;
    }
}

let httpHandler = (req, res) => {
    switch (req.method) {
        case "GET":
            getHandler(req, res);
            break;
        default:
            http404(req, res);
            break;
    }
}

const server = http.createServer();
server.listen(httpPort, () => console.log("http server on port: ", httpPort))
    .on("error", error => { console.error("error: ", error) })
    .on("request", httpHandler);


const wsserver = new WebSocket.Server({ port: webSocketPort, host: "localhost", path: "/" });

let clients = new Map();
let clientId = 0;

wsserver.on('connection', ws => {

    clients.set(ws, ++clientId);
    console.log(`Client ${clientId} is connected`);


    ws.on('pong', data => {
        ws.send(data.toLocaleString());
        console.log(data.toLocaleString())
    });

    ws.on('message', message => {


        clients.forEach((id, client) => {
            if (client.readyState === WebSocket.OPEN) {
                let info = `user ${clients.get(ws)}: ${message}`;
                client.send(info);

            }
        });
    });

    ws.on('close', () => {
        console.log(`client ${clients.get(ws)} left us`);
        ws.send(`client ${clients.get(ws)} left us`);
        clients.delete(ws);

    })

    setInterval(() => {
        let activeUsers = "ACTIVE USERS: ";

        clients.forEach((id, client) => {
            activeUsers += `user ${id}, `;
        });

        ws.ping(activeUsers);
    }, 5000);

});


wsserver.on('error', e => console.log("error", e));
console.log(`ws server: host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path} `);