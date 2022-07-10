listaUsuario=JSON.parse(localStorage.getItem("lista"));

var textoId = listaUsuario[0].nombre+ " " + listaUsuario[0].apellidop+ " " + listaUsuario[0].apellidom;
document.getElementById('Nombre').innerHTML=textoId;
console.log(listaUsuario[0]);
var id=listaUsuario[0].id;

$query = 'Select *from medicos;';
$query = `Select cedulaP, especialidad from medicos where id_M='${id}'`;
conexion.query($query, function (err, rows){
    
if (err){
    console.log ("error en el query");
    console.log (err);
return;
} 

else{  
    console.log("ejecutado correctamente", rows);
    var long = rows.length;
    if(long>0){
       
        var cedulaP = rows[0].cedulaP;
        var especialidad = rows[0].especialidad;
        
    
        document.getElementById('cedulap').innerHTML=cedulaP;
        document.getElementById('especialidad').innerHTML=especialidad;
        
    } 
}
})
