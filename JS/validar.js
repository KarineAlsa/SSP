const conexion= require('../JS/connection');

const iniciarsesion=()=>{
   
    
    
    var usuario1=document.getElementById("password").value;
    var check=usuario1.substring(0,2);
    console.log(check);
        if(check=="PC"){
            $query = 'Select *from inicioSesionPaciente;';
            $query = `Select id_inicio,nombre,apellidoP,apellidoM from inicioSesionPaciente where id_inicio='${usuario1}'`;
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
                    var nombre = rows[0].nombre;
                    var apellidop = rows[0].apellidoP;
                    var apellidom = rows[0].apellidoM;
              
                    var listaUsuarios=[{id:id,nombre:nombre,apellidop:apellidop,apellidom:apellidom}];
                    localStorage.setItem("lista",JSON.stringify(listaUsuarios));
                    window.location.href="paciente.html";
                    
                }

                else {
                    
                    alert("Identificacion incorrecta");}
            }
            });
            
            
        }
        if(check=="MD"){
            $query = 'Select *from inicioSesionMedico;';
            $query = `Select id_inicio,nombre,apellidoP,apellidoM from inicioSesionMedico where id_inicio='${usuario1}'`;
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
                    var nombre = rows[0].nombre;
                    var apellidop = rows[0].apellidoP;
                    var apellidom = rows[0].apellidoM;
              
                    var listaUsuarios=[{id:id,nombre:nombre,apellidop:apellidop,apellidom:apellidom}];
                    localStorage.setItem("lista",JSON.stringify(listaUsuarios));
                    window.location.href="vistamedico.html";
                    
                }

                else {
                    alert("Identificacion incorrecta");}
            }
            });
            
            
        }
        if(check=="LB"){
            $query = 'Select *from inicioSesionLaboratorio;';
            $query = `Select nombre from inicioSesionLaboratorio where id_inicio='${usuario1}'`;
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
                    window.location.href="laboratorio.html";
                    
                }

                else {
                    alert("Identificacion incorrecta");}
            }
            });
            
            
    }
    if(check!="PC" && check!= "MD" && check!="LB"){
        alert("Identificacion incorrecta");
    }
};

    const salir=()=>{
        window.location.href="inicio.html";
    }
