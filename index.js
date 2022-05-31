const http = require('http');
require('dotenv').config();

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, Tahar!');
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080, () => {
  console.log("Connect to the API")
});