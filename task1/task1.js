const ws = require("ws");
const http = require("http");
const fs = require("fs");

const httpPort = 3000;
const webSocketPort = 4000;

let http404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
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


const wsserver = new ws.Server({ port: webSocketPort, host: "localhost", path: "/" });

wsserver.on('connection', ws => {
    let k = 0;
    console.log("connection is open");

    ws.on('message', message => {
        process.stdout.write(`message from client: ${message}\n`);
    });

    ws.on('close', () => {
        console.log("Connection is closed");
    });

    setInterval(() => {
        ws.send(`message №${++k}`);
    }, 3000);
});


wsserver.on('error', e => console.log("error", e));
console.log(`ws server: host: ${wsserver.options.host}, port: ${wsserver.options.port}, path: ${wsserver.options.path} `);