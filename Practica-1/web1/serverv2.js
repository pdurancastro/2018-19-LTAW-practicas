var http = require('http');
var fs = require('fs');
var url = require('url');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
 console.log("---> Peticion recibida")
 console.log("--> Cabecera de la solicitud: ")
 console.log("URL solicitada" + req.url)
 var q = url.parse(req.url, true);
 //console.log(q)
 var filename = "." + q.pathname;
 console.log(filename)

 if (filename == "./"){
   console.log("-->Estoy en el INDEX")
   fs.readFile("CV.html", function(err, data) {
     //console.log("-->estoy leyendo")
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(data);
     return res.end();
   });

 }else{
    fs.readFile(filename, function(err, data) {
      if (err){
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
  //necesito gestionar ficheros que no existan por ejemplo hola.html
  //viendo
    });
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write("La fecha y hora es: " + dt.myDateTime() +"\n\n");
  //res.end();
  //console.log("Peticion atendida")
  }
}).listen(8080);
