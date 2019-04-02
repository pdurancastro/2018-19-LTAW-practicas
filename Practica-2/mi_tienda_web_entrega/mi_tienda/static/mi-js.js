function main()
{
  console.log("Holaaa")
  var search_box = document.getElementById('search_box');
  search_box.onkeyup = ()=>{
    console.log(search_box.value)
  }
}
