const reader = require("fs").readFileSync;


const app = function(request, response){
  const homePage = reader("./home_page.html", "utf8");
  const html = { home: homePage };
  response.write(html.home);
  response.end();
  return;
};

module.exports = { app };