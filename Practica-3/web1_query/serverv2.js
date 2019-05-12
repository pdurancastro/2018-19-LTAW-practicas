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
     //console.log("En Post")

     //Comienzo de tratar los datos de la cookies
     cookie_splitted = cookie.split(":");

     Items = cookie_splitted[1];
     User = cookie.split("=");

     //console.log("User is " + User[1])
     console.log("Items:" + Items);

     compra = "You bougth: " + Items;



     //Respuesta del server
     var content = `
         <!DOCTYPE html>
         <html lang="es">
         <link href="styles.css" rel="stylesheet" type="text/css" />
           <head>
             <meta charset="utf-8">
             <title>FORM 1</title>
           </head>
           <body>
             <h4>Order: `
      req.on('data', chunk => {
      //-- Leer los datos (convertir el buffer a cadena)
      data = chunk.toString();
      console.log("Data---->: " + data);

      //Vamos a desglosar el resultado del formulario.
             data_splitted = data.split(/[=&+]+/);
             console.log("data_splitted:________" + data_splitted);

             var email_crash = data_splitted[5].includes("%40");


             if (email_crash) {
               email = data_splitted[5].replace("%40","@");
             } else {
               email = data_splitted[5];
             }

             pay_method = data_splitted[7].replace("_"," ");

             msg = data_splitted[1] + " " + data_splitted[3] +
                    " you choose " +
                    pay_method + " to pay the order." +
                    "We are going to send u a e-mail to " + email
                    + " with your bill."

             //-- Añadir los datos a la respuesta
             content += msg;
             content += compra;


            //-- Fin del mensaje. Enlace al formulario
            content += `
                </h4>
                <a href="/accounts.html">[Accounts]</a>
              </body>
            </html>
            `
             //-- Mostrar los datos en la consola del servidor
             console.log("Datos recibidos: " + msg)
             res.statusCode = 200;
           });

           req.on('end', ()=> {
            //-- Generar el mensaje de respuesta
            res.setHeader('Content-Type', 'text/html')
            res.write(content);
            res.end();
          })
          return

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
