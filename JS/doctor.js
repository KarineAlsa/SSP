const axios = require('axios');
token=JSON.parse(localStorage.getItem("token"))[0].token;


var nameUser;
var specialty;
var license;
var patient_id ="";
var code="";

let configDoctorPersonal = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/doctor/personal',
    headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

axios.request(configDoctorPersonal).then((response) => {
    
    if (response.data.status){
        
        nameUser = response.data.message.name + ' ' + response.data.message.firstLastName + ' ' + response.data.message.secondLastName;
        specialty = response.data.message.specialty
        license = response.data.message.license
        setPersonalDataMedic()
    }
    
})
.catch((error) => {
    console.log(error);
});

function setPersonalDataMedic() {
    document.getElementById('license').innerHTML=license;
    document.getElementById('specialty').innerHTML=specialty;   
    document.getElementById('name').innerHTML=nameUser;

}

function search() {
    
    code=document.getElementById('searchPatient').value;
    
    let configSearch = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:1234/doctor/search',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        params: { "code": code }
    };
    
    axios.request(configSearch).then((response) => {
        console.log(response);
        if (response.data.status){
            
            patient_id=response.data.message.id_Patient;
            setPatientData(response.data.message)
            document.getElementById('btnUpdate').style.display="block";
        }
    
        else {
            document.getElementById('btnUpdate').style.display="none";
            alert("Paciente no encontrado");
            clear()
        }
            
    }).catch((error) => {
        console.log(error);
    });

}
function setPatientData(data){

    document.getElementById('namePatient').innerHTML=data.name + " " + data.firstLastName +" "+ data.secondLastName;
    document.getElementById('agePatient').innerHTML=data.age;
    document.getElementById('weightPatient').innerHTML=data.weight;
    document.getElementById('sexPatient').innerHTML=data.sex;
    document.getElementById('heightPatient').innerHTML=data.height;
    document.getElementById('bloodPatient').innerHTML=data.blood;
}
function clear(){
    document.getElementById('searchPatient').value="";
    document.getElementById('diagnostic').value="";
    document.getElementById('treatment').value="";
    patient_id =""
    document.getElementById('namePatient').innerHTML="";
    document.getElementById('agePatient').innerHTML="";
    document.getElementById('weightPatient').innerHTML="";
    document.getElementById('sexPatient').innerHTML="";
    document.getElementById('heightPatient').innerHTML="";
    document.getElementById('bloodPatient').innerHTML="";  
}

////////////////////////////////////////////////////////////////

function chargePrescription() {

    const diagnostic = document.getElementById('diagnostic').value;
    const treatment= document.getElementById('treatment').value;
    console.log(diagnostic,treatment)
    if(diagnostic!="" && treatment!="" && patient_id !=""){
        let configDiagnostic = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:1234/doctor/prescription',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: { 
                "id_Patient":patient_id,
                "diagnostic": diagnostic,
                    "treatment":treatment }
        };
        
        axios.request(configDiagnostic).then((response) => {
            console.log(response);
            if (response.data.status){
            
                alert("Guardado en el expediente del paciente") 
                clear()
            }
        
            else {
                alert("Error al guardar");
                clear()
            }
                
        }).catch((error) => {
            console.log(error);
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
    if(age !=""&& weight!="" && height!=""){
        if(age>0 && age<120 && weight>1 && weight<700 && height>30 &&height<250){
            let configUpdate = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://localhost:1234/doctor/update',
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: { 
                    "code":code,
                    "age": age,
                    "weight":weight,
                    "height":height }
            };
            
            axios.request(configUpdate).then((response) => {
                console.log(response);
                if (response.data.status){
                
                    alert("Guardado en el expediente del paciente") 
                    updateView();
                    clearUpdate()
                    clear()
                    document.getElementById('searchPatient').value=code
                }
            
                else {
                    alert("Error al guardar");
                    clear()
                }
                    
            }).catch((error) => {
                console.log(error);
            });
            
        }           
        else{
            alert("Uno de los campos no es válido");
        }
        
    }
    else{
        alert("Uno de los campos está vacío. Intente de nuevo");
    } 
}

function clearUpdate(){
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

function updateView(){
    let configSearch = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:1234/doctor/search',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        params: { "code": code }
    };
    
    axios.request(configSearch).then((response) => {
        console.log(response);
        if (response.data.status){
            
            patient_id=response.data.message.id_Patient;
            setPatientData(response.data.message)
            document.getElementById('btnUpdate').style.display="block";
        }
    
        else {
            document.getElementById('btnUpdate').style.display="none";
            alert("Paciente no encontrado");
            clear()
        }
            
    }).catch((error) => {
        console.log(error);
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

const exit=()=>{
    window.location.href="index.html";
}