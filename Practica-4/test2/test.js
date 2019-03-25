var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usuario = 0;

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

  //Dar la Bienvenida al nuevo usuario
  socket.emit('new_message','Bienvenido!!!! (づ｡◕‿‿◕｡)づ');

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
       //-- Meter div
       var lista_comandos = "<br>" + "/help" + "<br>" + "/list" + "<br>" + "/hello" + "<br>" +"/date"
       socket.emit('new_message',lista_comandos);
     }
     else if (msg == "/list") {
       console.log("Entrando en list")
       socket.emit('new_message',"<br>" +"Numero de usuarios conectados: " + usuario);
     }
     else if (msg == "/hello") {
       console.log("Entrando en hola")
        socket.emit('new_message',"<br>" +"Holaaaaa " + "~\(≧▽≦)/~");

     }else if (msg == "/date"){
       console.log("Devolviendo el Recurso Date")
       var f = new Date();
       var fecha = "<br>" + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
       socket.emit('new_message',fecha);


     }else{
       //-- Notificarlo en la consola del servidor
       console.log("Mensaje recibido: " + msg)

       //-- Emitir un mensaje a todos los clientes conectados
       io.emit('new_message',"<br>" + msg);

     }

  });

});
