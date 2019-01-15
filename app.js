const sayHi = function (request, response) {
  response.statusCode = 200;
  response.write("hi");
  response.end();
};

const requestHandler = function (request, response) {
  if (request.url === "/hi") {
    response.write("hello");
    response.end();
    return;
  }
  response.write("would u like to say hi?");
  response.end();
};


module.exports = {
  sayHi,
  requestHandler,
};