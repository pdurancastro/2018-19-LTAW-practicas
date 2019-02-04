var http = require('http');

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log("--> Cabecera de la solicitud: ")
  //-- Es un objeto. Esto imprimirá todas sus propiedades
  //-- Imprime la solicitud solo req
  console.log(req.headers)
  //--req.headers.host -->accedo al valor.host de la cabecera
}).listen(8080);
