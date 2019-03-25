const express = require('express')
const app = express()
const http = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 3000

//-- Punto de entrada pricipal
app.get('/', (req, res) => {
  res.send('Probando express... ¡¡¡qué fácil!!!')
})

app.get('/woala', (req,res) =>{
  res.send('Funciona!!!!');
  console.log("Punto de entrada /woala!")
})

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});
