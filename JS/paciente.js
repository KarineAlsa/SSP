listaUsuario=JSON.parse(localStorage.getItem("lista"));
console.log(listaUsuario);
var textoId = listaUsuario[0].nombre+ " " + listaUsuario[0].apellidop+ " " + listaUsuario[0].apellidom;
document.getElementById('Nombre').innerHTML=textoId;
                    
