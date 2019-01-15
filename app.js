const sayHi = function (request, response) {
  response.statusCode = 200;
  response.write("hi");
  response.end();
};

module.exports = { sayHi };