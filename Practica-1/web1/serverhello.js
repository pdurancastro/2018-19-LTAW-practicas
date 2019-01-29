var http = require('http');
var dt = require('./serverhello');

console.log("Arrancando servidor...")

exports.myDateTime = function () {
  return Date();
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("La fecha y hora es: " + dt.myDateTime() +"\n\n");
  res.end();
  console.log("Peticion atendida")
}).listen(8080);
