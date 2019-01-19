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

const handleData = function (req, res) {
  let content = "";
  res.statusCode = 200;
  req.on("data", (chunk) => content += chunk);
  req.on("end", () => {
    console.log(content);
    const message = "data given is -> " + content;
    res.write(message);
    res.end();
  });

};

const isMatching = function (req, route) {
  return req.url === route.url && req.method === route.method;
};

const logRequest = function(req, res){
  console.log("requested method ->", req.method);
  console.log("requested url -> ", req.url);
  console.log("headers =>", JSON.stringify(req.headers, null, 2));
  console.log("body =>", req.body);
};

const webFrame = function (req, res) {
  const routes = [];
  routes.push({ method: "GET", url: "/", handler: handleHome });
  routes.push({ method: "GET", url: "/blue", handler: handleBlue });
  routes.push({ method: "GET", url: "/red", handler: handleRed });
  routes.push({ method: "POST", url: "/data", handler: handleData });

  const matchingRoutes = routes.filter(isMatching.bind(null, req));

  logRequest(req, res);
  if (matchingRoutes.length > 0) {
    matchingRoutes[0].handler(req, res);
    return;
  }
  handleError(req, res);
};

module.exports = { webFrame };