//app.get - method: GET, url, handler
const handleBlue = function (req, res) {
  res.statusCode = 200;
  res.write("sky");
  res.end();
};

const handleRed = function (req, res) {
  res.statusCode = 200;
  res.write("blood");
  res.end();
};

const handleHome = function (req, res) {
  res.statusCode = 200;
  res.write("welcome to home");
  res.end();
};

const handleError = function (req, res) {
  res.statusCode = 404;
  res.write("not found");
  res.end();
};
//make route of possible given url
//extract matching url
//
const webFrame = function (req, res) {
  const routes = [];
  routes.push("/");
  routes.push("/blue");
  routes.push("/red");

  const handlers = {
    "/": handleHome,
    "/blue": handleBlue,
    "/red": handleRed
  };

  const matchingRoutes = routes.filter(route => req.url === route);

  if (matchingRoutes.length > 0) {
    const handler = handlers[matchingRoutes[0]];
    handler(req, res);
    return;
  }
  handleError(req, res);
};

module.exports = { webFrame };