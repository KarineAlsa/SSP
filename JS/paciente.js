//const { connect } = require("./connection");

usersList=JSON.parse(localStorage.getItem("list"));
console.log(usersList);
var nameUser = usersList[0].name+ " " + usersList[0].firstLastName+ " " + usersList[0].secondLastName;
document.getElementById('name').innerHTML=nameUser;

//query del apartado de datos personales
var id=usersList[0].id;

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

console.log(usersList[0].id);
$query = 'Select *from patients;';
$query = `Select age, weight, sex, height,blood from patients where id_Patient='${id}'`;
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
        
            var age = rows[0].age;
            var weight = rows[0].weight;
            var sex = rows[0].sex;
            var height = rows[0].height;
            var blood = rows[0].blood;
        
            document.getElementById('age').innerHTML=age;
            document.getElementById('weight').innerHTML=weight;
            document.getElementById('sex').innerHTML=sex;
            document.getElementById('height').innerHTML=height;
            document.getElementById('blood').innerHTML=blood;        
        } 
    }
});

//query del apartado laboratorio
$query = 'Select *from laboratory';
$query = `Select description from laboratory where id_Patient='${id}'`;
var table=document.getElementById('laboratory');
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
        
            for(i=0 ; i<long ; i++){
                var newRow = table.insertRow(-1);
                var cell = newRow.insertCell(0);        
                var text = document.createTextNode(rows[i].description);
                cell.appendChild(text);
            }        
        } 
    }
});

//query del apartado expedientes medicos
$query = 'Select *from expedient';
$query = `Select diagnostic, treatment from expedientS where id_Patient='${id}'`;
var expedientsTable=document.getElementById('medicalExpedient');
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
        
            for(i=0 ; i<long ; i++){
                var newRow = expedientsTable.insertRow(-1);
                var diagnosticCell = newRow.insertCell(0);
                var treatmentCell = newRow.insertCell(1);
                var diagnosticText = document.createTextNode(rows[i].diagnostic);
                var treatmentText = document.createTextNode(rows[i].treatment);
                diagnosticCell.appendChild(diagnosticText);
                treatmentCell.appendChild(treatmentText);
            }    
        } 
    }
});

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
