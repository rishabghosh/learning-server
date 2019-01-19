const reader = require("fs").readFileSync;

const app = function (request, response) {
  let content = "";
  request.on("data", (chunk) => { content += chunk; });
  request.on("end", () => { console.log(content); response.end(); });
  if (request.url === "/") {
    const homePage = reader("./home_page.html", "utf8");
    const html = { home: homePage };
    response.write(html.home);//could use try catch
    response.end();
  }
  if (request.url === "/afterLogin") {
    response.write("hello");
    response.end();
  }
};

module.exports = { app };