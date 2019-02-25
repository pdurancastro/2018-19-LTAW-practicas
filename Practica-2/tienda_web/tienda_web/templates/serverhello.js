var http = require('http');
var dt = require('./serverhello');
var fs = require('fs')

console.log("Arrancando servidor...")

exports.myDateTime = function () {
  return Date();
};

http.createServer(function (req, res) {
  fs.readFile('demo.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  //necesito gestionar ficheros que no existan por ejemplo hola.html
  });
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write("La fecha y hora es: " + dt.myDateTime() +"\n\n");
  //res.end();
  //console.log("Peticion atendida")
}).listen(8080);
