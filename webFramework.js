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

const handlePost = function (req, res) {
  let content = "";
  res.statusCode = 200;
  req.on("data", (chunk) => content += chunk);
  req.on("end", () => {
    const message = "data given is -> " + content;
    res.write(message);
    res.end();
  });
};

const logRequest = function (req, res) {
  console.log("requested method ->", req.method);
  console.log("requested url -> ", req.url);
  console.log("headers =>", JSON.stringify(req.headers, null, 2));
  //console.log("body ->", req.body);
  console.log("\n ------ END ------- \n");
};

const hasOnlyHandler = function (req, route) {
  return !(route.hasOwnProperty("method") && route.hasOwnProperty("url"));
};

const isMatching = function (req, route) {
  if (hasOnlyHandler(req, route)) return true; //for middlewares like logRequest
  return req.url === route.url && req.method === route.method;
};

class WebFramework {
  constructor() {
    this.routes = [];
    this.middlewareCount = 0;
  }

  use(handler) {
    this.routes.push({ handler });
    this.middlewareCount++;
  }

  get(url, handler) {
    this.routes.push({ method: "GET", url, handler });
  }

  post(url, handler) {
    this.routes.push({ method: "POST", url, handler });
  }

  handleRequest(req, res) {
    const matchingRoutes = this.routes.filter(isMatching.bind(null, req));
    matchingRoutes.forEach(route => route.handler(req, res));
    if (matchingRoutes.length === this.middlewareCount) {
      handleError(req, res);
    }
    return;
  }
}

const app = function (req, res) {
  const webFramework = new WebFramework();

  webFramework.use(logRequest);
  webFramework.get("/", handleHome);
  webFramework.get("/blue", handleBlue);
  webFramework.get("/red", handleRed);
  webFramework.post("/data", handlePost);
  webFramework.handleRequest(req, res);
};


module.exports = { app };