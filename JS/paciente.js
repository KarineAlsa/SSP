listaUsuario=JSON.parse(localStorage.getItem("lista"));
console.log(listaUsuario);
var textoId = listaUsuario[0].nombre+ " " + listaUsuario[0].apellidop+ " " + listaUsuario[0].apellidom;
document.getElementById('Nombre').innerHTML=textoId;
//query del apartado de datos personales
var id=listaUsuario[0].id;
console.log(listaUsuario[0].id);
$query = 'Select *from pacientes;';
$query = `Select edad, peso, sexo, estatura,tipoSangre from pacientes where id_P='${id}'`;
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
       
        var edad = rows[0].edad;
        var peso = rows[0].peso;
        var sexo = rows[0].sexo;
        var estatura = rows[0].estatura;
        var sangre = rows[0].tipoSangre;
    
        document.getElementById('edad').innerHTML=edad;
        document.getElementById('peso').innerHTML=peso;
        document.getElementById('sexo').innerHTML=sexo;
        document.getElementById('estatura').innerHTML=estatura;
        document.getElementById('sangre').innerHTML=sangre;        
    } 
}
});

//query del apartado laboratorio
$query = 'Select *from laboratorio';
$query = `Select descrpcion from laboratorio where id_P='${id}'`;
var tabla=document.getElementById('laboraa');
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
       
        for(i=0 ; i<long ; i++){
            var newRow = tabla.insertRow(-1);
            var celdades = newRow.insertCell(0);        
            var textodes = document.createTextNode(rows[i].descrpcion);
            celdades.appendChild(textodes);
            
        }        
    } 
}
});

//query del apartado expedientes medicos
$query = 'Select *from expediente';
$query = `Select diagnostico, tratamiento from expediente where id_P='${id}'`;
var tablaexp=document.getElementById('expmed');
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
       
        for(i=0 ; i<long ; i++){
            var newRow = tablaexp.insertRow(-1);
            var celdadiag = newRow.insertCell(0);
            var celdatrat = newRow.insertCell(1);
            var textodiag = document.createTextNode(rows[i].diagnostico);
            var textrat = document.createTextNode(rows[i].tratamiento);
            celdadiag.appendChild(textodiag);
            celdatrat.appendChild(textrat);
        }    
    } 
}
});

const personales=()=>{
    document.getElementById('personales').style.display="block";
    document.getElementById('laboratorios').style.display="none";
    document.getElementById('expediente').style.display="none";
}
const laboratorios=()=>{
    document.getElementById('laboratorios').style.display="block";
    document.getElementById('personales').style.display="none";
    document.getElementById('expediente').style.display="none";

}
const expediente=()=>{
    document.getElementById('expediente').style.display="block";
    document.getElementById('personales').style.display="none";
    document.getElementById('laboratorios').style.display="none";
}
