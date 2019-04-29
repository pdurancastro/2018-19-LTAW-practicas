var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usuario = 0;
const reqServer = "<p style = color:DodgerBlue > Server:  ";

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicituado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  saludo = reqServer + "Bienvenido!!!! (づ｡◕‿‿◕｡)づ" + "</p>"

  //Dar la Bienvenida al nuevo usuario
  socket.emit('new_message',saludo);

  usuario = usuario + 1;

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    usuario = usuario - 1 ;
  });

  //-- Detectar si se ha recibido un mensaje del cliente
   socket.on('new_message', msg => {
     if (msg == "/help"){
       console.log("Devolviendo lista de comandos")
       var lista_comandos = reqServer + "Lista de comandos" + "<br>" + "/help" + "<br>" + "/list" + "<br>" + "/hello" + "<br>" +"/date"
       socket.emit('new_message',lista_comandos);
     }
     else if (msg == "/list") {
       console.log("Entrando en list")
       socket.emit('new_message',"<br>"+ reqServer +"Numero de usuarios conectados: " + usuario + "</p>");
     }
     else if (msg == "/hello") {
       console.log("Entrando en hola")
        socket.emit('new_message',reqServer + "<br>" +"Holaaaaa " + "~\(≧▽≦)/~");

     }else if (msg == "/date"){
       console.log("Devolviendo el Recurso Date")
       var f = new Date();
       fecha = reqServer + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + "</p>";
       socket.emit('new_message',fecha);


     }else{
       //-- Notificarlo en la consola del servidor
       console.log("Mensaje recibido: " + msg)

       //-- Emitir un mensaje a todos los clientes conectados
       io.emit('new_message',"<br>" + msg);

     }


  });

});
