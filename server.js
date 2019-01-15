const http = require("http");
const { createCountListener } = require("./counter.js");
const { app } = require("./app.js");

const PORT = 8001;

const server = http.createServer(createCountListener(0));
server.listen(PORT);

console.log("server is listening to port :", PORT);
