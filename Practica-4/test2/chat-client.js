function main()
{
  console.log("Probando...")

  var socket = io();

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  //-- Variable contador para borrar si hay muchos
  var contador = 0

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    display.innerHTML = display.innerHTML + msg + "<br>";
    contador = contador + 1;
    if (contador == 10){
      display.innerHTML = " " + msg + "<br>";
      contador = 0;
    }
  });

  //--Cuando se recibe un mensaje del admin
  


}
