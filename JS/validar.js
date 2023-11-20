const connect= require('../js/connection');

const login=()=>{

    var user=document.getElementById("password").value;
    var check=user.substring(0,2);
    console.log(check);
        if(check=="PC"){
            $query = 'Select *from loginPatient;';
            $query = `Select key_init,name,firstLastName,secondLastName from loginPatient where key_init='${user}'`;
            connect.query($query, function (err, rows){
                
            if (err){
                console.log ("error en el query");
                console.log (err);
            return;1
            } 

            else{  
                console.log("ejecutado correctamente", rows);
                var long = rows.length;
                if(long>0){
                    var id=rows[0].key_init;
                    var name = rows[0].name;
                    var firstLastName = rows[0].firstLastName;
                    var secondLastName = rows[0].secondLastName;
            
                    var usersList=[{id:id,name:name,firstLastName:firstLastName,secondLastName:secondLastName}];
                    localStorage.setItem("list",JSON.stringify(usersList));
                    window.location.href="patient.html";
                    
                }

                else {
                    
                    alert("Identificacion incorrecta");}
            }
            });
            
            
        }
        if(check=="MD"){
            $query = 'Select *from loginDoctor;';
            $query = `Select key_init,name,firstLastName,secondLastName from loginDoctor where key_init='${user}'`;
            connect.query($query, function (err, rows){
                
            if (err){
                console.log ("error en el query");
                console.log (err);
            return;
            } 

            else{  
                console.log("ejecutado correctamente", rows);
                var long = rows.length;
                if(long>0){
                    var id=rows[0].key_init;
                    var name = rows[0].name;
                    var firstLastName = rows[0].firstLastName;
                    var secondLastName = rows[0].secondLastName;
              
                    var usersList=[{id:id,name:name,firstLastName:firstLastName,secondLastName:secondLastName}];
                    localStorage.setItem("list",JSON.stringify(usersList));
                    window.location.href="doctor.html";
                    
                }

                else {
                    alert("Identificacion incorrecta");}
            }
            });
            
            
        }
        if(check=="LB"){
            $query = 'Select *from loginLaboratory;';
            $query = `Select name from loginLaboratory where key_init='${user}'`;
            connect.query($query, function (err, rows){
                
            if (err){
                console.log ("error en el query");
                console.log (err);
            return;
            } 

            else{  
                console.log("ejecutado correctamente", rows);
                var long = rows.length;
                if(long>0){
                    window.location.href="laboratory.html";
                    
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

    const exit=()=>{
        window.location.href="index.html";
    }
