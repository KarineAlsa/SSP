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

const buscar=()=>{
    var busqueda=document.getElementById('buscarP').value;
    
    $query = `SELECT id_P, nombre, apellidoP,apellidoM,edad,peso,sexo,estatura,tipoSangre
    FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P WHERE codigo='${busqueda}'`;
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
            var id=rows[0].id_P;
            var nombre = rows[0].nombre + " " + rows[0].apellidoP +" "+ rows[0].apellidoM;
            var edad = rows[0].edad;
            var peso = rows[0].peso;
            var sexo = rows[0].sexo;
            var estatura = rows[0].estatura;
            var sangre = rows[0].tipoSangre;

            document.getElementById('nombrepaciente').innerHTML=nombre;
            document.getElementById('edadpaciente').innerHTML=edad;
            document.getElementById('pesopaciente').innerHTML=peso;
            document.getElementById('sexopaciente').innerHTML=sexo;
            document.getElementById('estaturapaciente').innerHTML=estatura;
            document.getElementById('sangrepaciente').innerHTML=sangre;     
            
        }

        else {
            
            alert("Paciente no encontrado");}
    }
    });
}
