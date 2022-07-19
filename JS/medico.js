listaUsuario=JSON.parse(localStorage.getItem("lista"));
var idpaciente;
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

function buscar(){
    var busqueda=document.getElementById('buscarP').value;
    
    $query = `SELECT id_inicio,nombre, apellidoP,apellidoM,edad,peso,sexo,estatura,tipoSangre
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
            var id=rows[0].id_inicio;
            var nombre = rows[0].nombre + " " + rows[0].apellidoP +" "+ rows[0].apellidoM;
            var edad = rows[0].edad;
            var peso = rows[0].peso;
            var sexo = rows[0].sexo;
            var estatura = rows[0].estatura;
            var sangre = rows[0].tipoSangre;
            idpaciente=id;
            
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

function cargarDatos() {
    var diagnostico = document.getElementById('diagnostico').value;
    var tratamiento= document.getElementById('tratamiento').value;
    if(diagnostico && tratamiento!=""){

    
    $query = `INSERT INTO expediente (id_P,diagnostico,tratamiento) VALUES ('${idpaciente}','${diagnostico}','${tratamiento}')`;
    conexion.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        }
        else { 
            alert("Guardado en el expediente del paciente") 
        }
    });
    
}else{
    alert("No puede dejar en blanco uno de los campos");
}
    
    
} 
function aparecerActualizar(){
    var bloque=document.getElementById('actualizar').style.display;
    if(bloque=="block"){
        let $datosactualizar=document.getElementsByClassName('ActDatos');
        for (var i = 0; i < $datosactualizar.length; i++) {
            console.log($datosactualizar[i].id);
            $datosactualizar[i].value = "";
        }
        console.log($datosactualizar);
        
        document.getElementById('actualizar').style.display="none";
        
    }
    else{
        document.getElementById('actualizar').style.display="block";
    }
    console.log(bloque);
    
    
    
}

function actualizarDatos(){
    var edad=document.getElementById('edadActualizar').value;
    var peso=document.getElementById('pesoActualizar').value;
    var estatura=document.getElementById('estaturaActualizar').value;
    if(edad && peso && estatura!=""){
        $query = `UPDATE pacientes SET edad='${edad}',peso='${peso}',estatura ='${estatura}'
        WHERE id_P='${idpaciente}'`;
        conexion.query($query, function (err) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            }
            else { 
                alert("Guardado en el expediente del paciente") 
                let $datosdelpaciente = document.getElementsByClassName('datosdelpaciente');
                $datosdelpaciente.innerHTML = "";
                actualizarvista();
                let $datosactualizar=document.getElementsByClassName('ActDatos');
                for (var i = 0; i < $datosactualizar.length; i++) {
                    console.log($datosactualizar[i].id);
                    $datosactualizar[i].value = "";//second console output
                }
                var bloque=document.getElementById('actualizar').style.display;
                if(bloque=="block"){
                document.getElementById('actualizar').style.display="none";
                }
            }
        });

    } else {
        alert("No puede dejar en blanco ninguno de los campos");
    } 
}

function actualizarvista(){
    $query = `SELECT id_inicio,nombre, apellidoP,apellidoM,edad,peso,sexo,estatura,tipoSangre
    FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P WHERE id_inicio='${idpaciente}'`;
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
            var id=rows[0].id_inicio;
            var nombre = rows[0].nombre + " " + rows[0].apellidoP +" "+ rows[0].apellidoM;
            var edad = rows[0].edad;
            var peso = rows[0].peso;
            var sexo = rows[0].sexo;
            var estatura = rows[0].estatura;
            var sangre = rows[0].tipoSangre;
            idpaciente=id;
            
            document.getElementById('nombrepaciente').innerHTML=nombre;
            document.getElementById('edadpaciente').innerHTML=edad;
            document.getElementById('pesopaciente').innerHTML=peso;
            document.getElementById('sexopaciente').innerHTML=sexo;
            document.getElementById('estaturapaciente').innerHTML=estatura;
            document.getElementById('sangrepaciente').innerHTML=sangre;     
            
        }
}
    });
}
