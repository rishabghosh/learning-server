const reader = require("fs").readFileSync;

const send = function (request, response) {
  const homePage = reader("./home_page.html", "utf8");
  const html = { home: homePage };
  response.write(html.home);
};

const app = function (request, response) {
  send(request, response);
  response.end();
  return;
};

module.exports = { app };