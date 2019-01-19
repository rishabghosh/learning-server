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

//if the route contains only handler - which is for logRequest
//so if object doesnot have own property method and url
//then the handler is logRequest

const hasOnlyHandler = function (req, route) {
  return !(route.hasOwnProperty("method") && route.hasOwnProperty("url"));
};

const isMatching = function (req, route) {
  if (hasOnlyHandler(req, route)) return true; //logRequest
  return req.url === route.url && req.method === route.method;
};

class WebFramework {
  constructor() {
    this.routes = [];
    this.validUrls = [];
  }

  use(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ method: "GET", url, handler });
    this.validUrls.push(url);
  }

  post(url, handler) {
    this.routes.push({ method: "POST", url, handler });
    this.validUrls.push(url);
  }

  handleRequest(req, res) {
    const matchingRoutes = this.routes.filter(isMatching.bind(null, req));

    //pull if condition in a function
    if (!this.validUrls.includes(req.url)) {
      handleError(req, res);
    }

    if (matchingRoutes.length > 0) {
      matchingRoutes[0].handler(req, res);
      return;
    }
  }

}

const app = function (req, res) {
  const webFramework = new WebFramework();

  webFramework.get("/", handleHome);
  webFramework.get("/blue", handleBlue);
  webFramework.get("/red", handleRed);
  webFramework.post("/data", handlePost);
  webFramework.use(logRequest);
  webFramework.handleRequest(req, res);
};


module.exports = { app };