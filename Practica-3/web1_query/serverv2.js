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
   'css':'text/css',
   'mp4' : 'video/mp4',
   'js' : 'text/javascript',
   '/' : 'text/html',
 }

 //-- Leer las cookies
 var cookie = req.headers.cookie;
 console.log("Cookie: " + cookie)


 if (filename == "./"){
   console.log("-->Estoy en el INDEX")
   fs.readFile("index.html", function(err, data) {
     //console.log("-->estoy leyendo")
     res.writeHead(200, {'Content-Type': mime});
     res.write(data);
     return res.end();
   });

 }else if (filename == "./login.html") {
   console.log("Bienvenido al login")
   content = "Registrado! Cookie enviada al navegador!"

   //-- Establecer la coookie
   //res.setHeader('Content-Type', 'text/plain')
   //res.write(content);
   //res.end();
   res.setHeader('Set-Cookie', 'user=patriciaduran')
   //res.end();
   console.log("---->Creo Cookie")

     fs.readFile("login.html", function(err, data) {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.write(data);
       return res.end();
     });


   //fs.readFile("login.html", function(err, data) {
     //res.writeHead(200, {'Content-Type': mime});
     //res.write(data);

     //return res.end();

   //});
}else if (filename == "./myform"){
  console.log("Se mando bien el formulario!!")

   if (req.method == "POST") {
     console.log("HOliii")

     //Comienzo de tratar los datos de la cookies
     cookie_splitted = cookie.split(" ");
     cookie_splitted_items = cookie.split(/[item]+/);
     console.log("Items: " + cookie_splitted);



   }















 }else if (filename == "./myquery") {

   //-- Peticion paralela al servidor
   console.log("Estas en query")
   content = ` {
     "productos": ["FPGA", "RISC-V", "74ls00"]
   }
   `
   var params = q.query;

   console.log("Parametros: " + params.param1 + ' y ' + params.param2)

   //-- Generar el mensaje de respuesta
   //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
   //-- en la cabecera Content-Type
   res.setHeader('Content-Type', 'application/json')
   res.write(content);
   res.end();


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
