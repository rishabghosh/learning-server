const http = require("http");
const { sayHi } = require("./app.js");

const PORT = 8080;



const server = http.createServer(sayHi);
server.listen(PORT);

console.log("server is listening to port :", PORT);
