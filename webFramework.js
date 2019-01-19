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
    const message = "data given is -> " + content;
    res.write(message);
    res.end();
  });
};

const isMatching = function (req, route) {
  return req.url === route.url && req.method === route.method;
};

const logRequest = function (req, res) {
  console.log("requested method ->", req.method);
  console.log("requested url -> ", req.url);
  console.log("headers =>", JSON.stringify(req.headers, null, 2));
  //console.log("body ->", req.body);
  console.log("\n ------ END ------- \n");
};

const getRoutes = function () {
  const routes = [];
  routes.push({ method: "GET", url: "/", handler: handleHome });
  routes.push({ method: "GET", url: "/blue", handler: handleBlue });
  routes.push({ method: "GET", url: "/red", handler: handleRed });
  routes.push({ method: "POST", url: "/data", handler: handleData });
  return routes;
};

class WebFramework {
  constructor() {
    this.routes = [];
  }
  get(url, handler) {
    this.routes.push({ method: "GET", url, handler });
  }
  post(url, handler) {
    this.routes.push({ method: "POST", url, handler });
  }
  handleRequest(req, res) {
    const matchingRoutes = this.routes.filter(isMatching.bind(null, req));
    if (matchingRoutes.length > 0) {
      matchingRoutes[0].handler(req, res);
      logRequest(req, res);
      return;
    }
    logRequest(req, res);
    handleError(req, res);
  }
}

const app = function (req, res) {
  const webframe = new WebFramework();
  webframe.get("/", handleHome);
  webframe.get("/blue", handleBlue);
  webframe.get("/red", handleRed);
  webframe.post("/data", handleData)
  webframe.handleRequest(req, res);

};


module.exports = { app };