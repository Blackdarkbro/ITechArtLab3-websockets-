const rpcWSS = require("rpc-websockets").Server;

let server = new rpcWSS({ port: 5000, host: "localhost" });

server.event("AAA");
server.event("BBB");
server.event("CCC");


process.stdin.on('readable', () => {
    let chunk;
    // Use a loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null) {
        server.emit("AAA", "event AAA");
        server.emit("BBB", "event BBB");
        server.emit("CCC", "event CCC");
    }
});

process.stdin.on('end', () => {
    process.stdout.write('end');
});