const http = require("http");
const { webFrame } = require("./webFramework.js");

const PORT = 8001;

const server = http.createServer(webFrame);
server.listen(PORT);

console.log("server is listening to port :", PORT);
