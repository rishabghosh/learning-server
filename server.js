const http = require("http");
const {
  sayHi,
  requestHandler
} = require("./app.js");

const PORT = 8080;



const server = http.createServer(requestHandler);
server.listen(PORT);

console.log("server is listening to port :", PORT);
