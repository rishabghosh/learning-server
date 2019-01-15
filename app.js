const html = {
  home: `<html>
  <head><title>Your nickname</title></head>
  <body>
  <h1>home</h1>
  </body>
  </html>
  `,
};

const app = function(request, response){
  response.write(html.home);
  response.end();
  return;
};

module.exports = { app };