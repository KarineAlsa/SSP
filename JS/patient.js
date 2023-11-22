const axios = require('axios');
token=JSON.parse(localStorage.getItem("token"))[0].token;

var id;
var nameUser;
var weight;
var height;
var blood;
var age;
var sex;
let configPersonal = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/patient/personal',
    headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

let configLaboratory = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/patient/laboratory',
    headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

let configExpedients = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/patient/expedients',
    headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

axios.request(configPersonal).then((response) => {
    
    if (response.data.status){
        id=response.data.message.id_Patient;
        nameUser = response.data.message.name + ' ' + response.data.message.firstLastName + ' ' + response.data.message.secondLastName;
        weight = response.data.message.weight
        height = response.data.message.height
        blood = response.data.message.blood
        age = response.data.message.age
        sex = response.data.message.sex

        setPhoto()
        setPersonalData()
    }
    
})
.catch((error) => {
    console.log(error);
});

axios.request(configLaboratory).then((response) => {
    
    if (response.data.status){
        setLaboratoryData(response.data.message)
    }
    
})
.catch((error) => {
    console.log(error);
});

axios.request(configExpedients).then((response) => {
    
    if (response.data.status){
        console.log(response.data.message)
        setExpedientsData(response.data.message)

    }
    
})
.catch((error) => {
    console.log(error);
});




function setPhoto(){
    
    if(id=="PC_2911"){
        const image = document.createElement('img')
        image.src  = '../IMG/Karine.jpeg'
        document.querySelector('.profile').appendChild(image)
    }
    if(id=="PC_0407"){
        const image = document.createElement('img')
        image.src  = '../IMG/Anel.jpeg'
        document.querySelector('.profile').appendChild(image)
    }
    if(id=="PC_2008"){
        const image = document.createElement('img')
        image.src  = '../IMG/Aylin.jpeg'
        document.querySelector('.profile').appendChild(image)
    }
}

function setPersonalData(){
    document.getElementById('name').innerHTML=nameUser;
    document.getElementById('age').innerHTML=age;
    document.getElementById('weight').innerHTML=weight;
    document.getElementById('sex').innerHTML=sex;
    document.getElementById('height').innerHTML=height;
    document.getElementById('blood').innerHTML=blood;        

}

function setLaboratoryData(data) {
    var table=document.getElementById('laboratory');
    console.log(data);
    for(i=0 ; i<data.length ; i++){
        var newRow = table.insertRow(-1);
        var cell = newRow.insertCell(0);        
        var text = document.createTextNode(data[i].description);
        cell.appendChild(text);
    }        
}
function setExpedientsData(data) {
    
    var expedientsTable=document.getElementById('medicalExpedient');
    for(i=0 ; i<data.length ; i++){
        var newRow = expedientsTable.insertRow(-1);
        var diagnosticCell = newRow.insertCell(0);
        var treatmentCell = newRow.insertCell(1);
        var diagnosticText = document.createTextNode(data[i].diagnostic);
        var treatmentText = document.createTextNode(data[i].treatment);
        diagnosticCell.appendChild(diagnosticText);
        treatmentCell.appendChild(treatmentText);
    }
}

const personal=()=>{
    document.getElementById('personal').style.display="block";
    document.getElementById('laboratories').style.display="none";
    document.getElementById('expedient').style.display="none";
}
const laboratories=()=>{
    document.getElementById('laboratories').style.display="block";
    document.getElementById('personal').style.display="none";
    document.getElementById('expedient').style.display="none";

}
const expedient=()=>{
    document.getElementById('expedient').style.display="block";
    document.getElementById('personal').style.display="none";
    document.getElementById('laboratories').style.display="none";
}

const exit=()=>{
    window.location.href="index.html";}