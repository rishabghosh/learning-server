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

const createCountListener = function (initialCount) {
  return function (request, response) {
    if (request.url === "/up") { initialCount++; }
    if (request.url === "/down") { initialCount--; }
    response.write(initialCount.toString());
    response.end();
    return;
  };
};


module.exports = {
  sayHi,
  requestHandler,
  createCountListener,
};