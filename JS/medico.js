

usersList=JSON.parse(localStorage.getItem("list"));
var patient_id;
var username = usersList[0].name+ " " + usersList[0].firstLastName+ " " + usersList[0].secondLastName;
document.getElementById('name').innerHTML=username;
console.log(usersList[0]);
var id=usersList[0].id;
////////////////////////////////////////////////////////////////
$query = 'Select *from doctors;';
$query = `Select license, specialty from doctors where id_Doctor='${id}'`;
connect.query($query, function (err, rows){
////////////////////////////////////////////////////////////////   

if (err){
    console.log ("error en el query");
    console.log (err);
return;
} 

else{  
    console.log("ejecutado correctamente", rows);
    var long = rows.length;
    if(long>0){
       
        var license = rows[0].license;
        var specialty = rows[0].specialty;
        document.getElementById('license').innerHTML=license;
        document.getElementById('specialty').innerHTML=specialty;   
    } 
}
})

function buscar(){
    var code=document.getElementById('searchPatient').value;
    
    $query = `SELECT key_init,name, firstLastName,secondLastName,age,weight,sex,height,blood
    FROM loginPatient INNER JOIN patients on loginPatient.key_init=patients.id_Patient WHERE code='${code}'`;
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
            var name = rows[0].name + " " + rows[0].firstLastName +" "+ rows[0].secondLastName;
            var age = rows[0].age;
            var weight = rows[0].weight;
            var sex = rows[0].sex;
            var height = rows[0].height;
            var blood = rows[0].blood;
            patient_id=id;
            
            document.getElementById('namePatient').innerHTML=name
            document.getElementById('agePatient').innerHTML=age;
            document.getElementById('weightPatient').innerHTML=weight;
            document.getElementById('sexPatient').innerHTML=sex;
            document.getElementById('heightPatient').innerHTML=height;
            document.getElementById('bloodPatient').innerHTML=blood;     
            document.getElementById('btnUpdate').style.display="block";
        }

        else {
            document.getElementById('btnUpdate').style.display="none";
            alert("Paciente no encontrado");
            document.getElementById('namePatient').innerHTML="";
            document.getElementById('agePatient').innerHTML="";
            document.getElementById('weightPatient').innerHTML="";
            document.getElementById('sexPatient').innerHTML="";
            document.getElementById('heightPatient').innerHTML="";
            document.getElementById('bloodPatient').innerHTML="";  
        }
    }
    });
}

function chargePrescription() {
    var diagnostic = document.getElementById('diagnostic').value;
    var treatment= document.getElementById('treatment').value;
    if(diagnostic && treatment!=""){

    
    $query = `INSERT INTO expedients (id_Patient,diagnostic,treatment) VALUES ('${patient_id}','${diagnostic}','${treatment}')`;
    connect.query($query, function (err) {
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
function appearUpdate(){
    document.getElementById('checkAge').checked = false;
    document.getElementById('checkWeight').checked = false;
    document.getElementById('checkHeight').checked = false;
    var update=document.getElementById('update').style.display;
    if(update=="block"){
        let $infoUpdate=document.getElementsByClassName('updInfo');
        for (var i = 0; i < $infoUpdate.length; i++) {
            console.log($infoUpdate[i].id);
            $infoUpdate[i].value = "";
        }
        console.log($infoUpdate);
        
        document.getElementById('update').style.display="none";
        
    }
    else{
        document.getElementById('update').style.display="block";
        var age=document.getElementById('agePatient').innerHTML;
        document.getElementById('ageUpdate').value=age;
        var weight=document.getElementById('weightPatient').innerHTML;
        document.getElementById('weightUpdate').value=weight; 
        var height=document.getElementById('heightPatient').innerHTML;  
        document.getElementById('heightUpdate').value=height;
    }
    
}

function updateInfo(){
    var age=document.getElementById('ageUpdate').value;
    var weight=document.getElementById('weightUpdate').value;
    var height=document.getElementById('heightUpdate').value;
    if(age && weight && height!=""){
        if(age>0 && age<120 && weight>1 && weight<700 && height>30 &&height<250){
            $query = `UPDATE patients SET age='${age}',weight='${weight}',height ='${height}'
        WHERE id_Patient='${patient_id}'`;
        connect.query($query, function (err) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            }
            else { 
                alert("Guardado en el expediente del paciente") 
                
                updateView();
                let $updateInfo=document.getElementsByClassName('updInfo');
                for (var i = 0; i < $updateInfo.length; i++) {
                    console.log($updateInfo[i].id);
                    $updateInfo[i].value = "";//second console output
                }
                var update=document.getElementById('update').style.display;
                if(update=="block"){
                document.getElementById('update').style.display="none";
                }
            }
        });
        }else{
            alert("Uno de los campos no es válido");
        }
        
    }
    else{
        alert("Uno de los campos está vacío. Intente de nuevo");
    } 
}

function updateView(){
    $query = `SELECT key_init,name, firstLastName,secondLastName,age,weight,sex,height,blood
    FROM loginPatient INNER JOIN patients on loginPatient.key_init=patients.id_Patient WHERE key_init='${patient_id}'`;
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
            var name = rows[0].name + " " + rows[0].firstLastName +" "+ rows[0].secondLastName;
            var age = rows[0].age;
            var weight = rows[0].weight;
            var sex = rows[0].sex;
            var height = rows[0].height;
            var blood = rows[0].blood;
            patient_id=id;
            
            document.getElementById('namePatient').innerHTML=name;
            document.getElementById('agePatient').innerHTML=age;
            document.getElementById('weightPatient').innerHTML=weight;
            document.getElementById('sexPatient').innerHTML=sex;
            document.getElementById('heightPatient').innerHTML=height;
            document.getElementById('bloodPatient').innerHTML=blood;     
            
        }
}
    });
}

function checkAge(obj){   
    if (obj.checked){
        document.getElementById('ageUpdate').readOnly = false;
        document.getElementById('ageUpdate').value="";
    }    
    else{
        document.getElementById('ageUpdate').readOnly = true;
        var age=document.getElementById('agePatient').innerHTML;
        document.getElementById('ageUpdate').value=age;
    }
 
}

function checkWeight(obj){   
    if (obj.checked){
        document.getElementById('weightUpdate').readOnly = false;
        document.getElementById('weightUpdate').value="";
    }
     
    else{
        document.getElementById('weightUpdate').readOnly = true;
        var weight=document.getElementById('weightPatient').innerHTML;
        document.getElementById('weightUpdate').value=weight; 
    }
      
}

function checkHeight(obj)
{   
    if (obj.checked){
        document.getElementById('heightUpdate').readOnly = false;
        document.getElementById('heightUpdate').value="";
    }
        
    else{
        document.getElementById('heightUpdate').readOnly = true;
        var height=document.getElementById('heightPatient').innerHTML;  
        document.getElementById('heightUpdate').value=height;
    }
      
}
