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


 var mime = { //Tipos de mime o peticiones
   'html':'text/html',
   'png':'image/png',
   'jpg':'image/png',
   'css':'text/css'
 }

 if (filename == "./"){
   console.log("-->Estoy en el INDEX")
   fs.readFile("CV.html", function(err, data) {
     //console.log("-->estoy leyendo")
     res.writeHead(200, {'Content-Type': mime});
     res.write(data);
     return res.end();
   });

 }else{
    fs.readFile(filename, function(err, data) {
      if (err){
        res.writeHead(404, {'Content-Type': mime});
        return res.end("404 Not Found");
      }



      res.writeHead(200, {'Content-Type': mime});
      res.write(data);
      return res.end();

    });

  }
}).listen(8080);
