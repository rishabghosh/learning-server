//app.get - method: GET, url, handler
const handleBlue = function (req, res) {
  res.statusCode = 200;
  res.write("sky");
  res.end();
};

const handleRed = function(req, res){
  res.statusCode = 200;
  res.write("blood");
  res.end();
};

const handleHome = function( req, res) {
  res.statusCode = 200;
  res.write("welcome to home");
  res.end();
};

const handleError = function (req, res) {
  res.statusCode = 404;
  res.write("not found");
  res.end();
};

const webFrame = function (req, res) {
  if (req.url === "/") { handleHome(req, res); return; }
  if (req.url === "/blue") { handleBlue(req, res); return; }
  if (req.url === "/red") { handleRed(req, res); return; }
  handleError(req, res);
};

module.exports = { webFrame };