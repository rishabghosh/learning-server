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

const isMatching = function (req, route) {
  console.log(route.method, req.method);
  return req.url === route.url && req.method === route.method;
};

const webFrame = function (req, res) {
  const routes = [];
  routes.push({ method: "GET", url: "/" , handler: handleHome});
  routes.push({ method: "GET", url: "/blue", handler: handleBlue });
  routes.push({ method: "GET", url: "/red", handler: handleRed });

  const matchingRoutes = routes.filter(isMatching.bind(null, req));
  console.log(matchingRoutes);

  if (matchingRoutes.length > 0) {
    matchingRoutes[0].handler(req, res);
    return;
  }
  handleError(req, res);
};

module.exports = { webFrame };