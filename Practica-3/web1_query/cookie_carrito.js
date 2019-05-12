var productos = 0;
var log = " ";

function cookie_carrito(item){
  console.log("Estoy en el carrito!!!")
  document.getElementById(item.id).value = Number(document.getElementById(item.id).value) +1 ;

  var cookie = document.cookie;

  productos = productos + 1;
  log = log + item.id + " ";

  document.cookie = "The accounts added are:" + log + " :in total- " + productos+ ";";

  console.log(item);
  console.log(document.cookie);
}
