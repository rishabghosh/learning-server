const http = require("http");
const { app } = require("./webFramework.js");

const PORT = 8001;

const server = http.createServer(app);
server.listen(PORT);

console.log("server is listening to port :", PORT);
