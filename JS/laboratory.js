const axios = require('axios');
token=JSON.parse(localStorage.getItem("token"))[0].token;
class node {
    constructor (code) {   
      this.code=code
      this.right = null
      this.left = null
    }
  }

  class Tree {
    
    constructor () {
      this.root = null
    }
    
    Empy () {
      return this.root === null
    }
  
    add (code) {
      
      if (this.Empy()) {
        this.root = new node(code)
        return
      }
    
      var aux = this.root
        
      while (aux) {
        
        if (code < aux.code) {
          if (aux.left) {
            aux = aux.left
            
          } else {
            aux.left = new node(code)
            return
          }
        } else { 
          if (aux.right) {
            aux = aux.right
          } else {
            aux.right = new node(code)
            return
          }
        }
      }
    }
  
     
    buscar (lastName) {
      if (this.Empy()) {
        return null
      }
  
      var aux = this.root
      if (aux.lastname === lastName) {
        return aux
      }
  
      while(aux) {
       
        if (aux.lastname === lastName) {
          break
        }
        
        if (aux.lastname < lastName) {
          aux = aux.right
        } else if (aux.lastname> lastName) {
         
          aux = aux.left
        }
      }
      
      return aux
    }

    
    buscarcode (code) {
      if (this.Empy()) {
        return null
      }
  
      var aux = this.root
      if (aux.code === code) {
        return aux
      }
  
      while(aux) {
       
        if (aux.code === code) {
          
          break

        }
        
        if (aux.code < code) {
          aux = aux.right
        } else if (aux.code> code) {
         
          aux = aux.left
        }
      }
      
      return aux
    }
remove(code){
this.root = this.removeNode(this.root, code);
}
  
removeNode(node, code)
{
          
   
    if(node === null)
        return null;
  
   
    else if(code < node.code)
    {
        node.left = this.removeNode(node.left, code);
        return node;
    }
  
    else if(node > node.code)
    {
        node.right = this.removeNode(node.right, code);
        return node;
    }
    else
    {

        if(node.left === null && node.right === null)
        {
            node = null;
            return node;
        }
  
        
        if(node.left === null)
        {
            node = node.right;
            return node;
        }
          
        else if(node.right === null)
        {
            node = node.left;
            return node;
        }

        var aux = this.findMinNode(node.right);
        node.code = aux.code;
  
        node.right = this.removeNode(node.right, aux.code);
        return node;
    }
  
}
findMinNode(node)
{
    if(node.left === null)
        return node;
    else
        return this.findMinNode(node.left);
}

    
  

    INORDEN (node = this.root) {
      if (!node) {
        return
      }

        let tablaR = document.getElementById('secondLaboratoryTable');
        this.INORDEN(node.left)

        var newRow = tablaR.insertRow(-1);

        
        var identificador = newRow.insertCell(0);
        
        identificador.append(node.code);

      this.INORDEN(node.right)

    }
    INORDEN2 (node = this.root) {
      if (!node) {
        return
      }
      
      
      
        let tablap = document.getElementById('forthLaboratoryTable');
        this.INORDEN2(node.left)

        var newRow = tablap.insertRow(-1);

        
        var identificador = newRow.insertCell(0);
        console.log(node.code)
        identificador.append(node.code);

      this.INORDEN2(node.right)

    }
    
    preOrder (node = this.root) {
      if (!node) {
        return
      }
      
      console.log(node.lastname)
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
    
    postOrder (node = this.root) {
      if (!node) {
        return
      }
      this.postOrder(node.left)
      this.postOrder(node.right)
      console.log(node.lastname)
    }

  }

  let configDataTreeInterior = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/all/patient',
    headers: { 
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
};

axios.request(configDataTreeInterior).then((response) => {
  if (response.data.status){
    
    for (i = 0; i < response.data.message.length; i++) {               
      var codeTemp= document.createTextNode(response.data.message[i].code);
      var code=codeTemp.nodeValue;
     
      
      addTree(code);
      
    }
    order();
  }
})
.catch((error) => {
    console.log(error);
});

function addTree (code) {
  t.add(code);
}

function order () {  
  t.INORDEN();
}
function add2Tree (code) {
  u.add(code);
}

function order2 () {  
  u.INORDEN2();
}
var t = new Tree()
var u= new Tree()

let configDataTreeExterior = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:1234/laboratory/all',
  headers: { 
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
};

axios.request(configDataTreeExterior).then((response) => {
if (response.data.status){
  
  for (i = 0; i < response.data.message.length; i++) {               
    var codeTemp= document.createTextNode(response.data.message[i].codeExternal);
    var code=codeTemp.nodeValue;
   
    
    add2Tree(code);
    
  }
  order2();
  var $element2 = document.getElementById("forthLaboratoryTable");

  if ($element2.rows.length === 0) {
  document.getElementById('therePatient2').innerHTML="No hay pacientes en espera de resultados";
}
}
}).catch((error) => {
  console.log(error);
});

var currentCode;
var systemPatients;

function search(){
  var code=document.getElementById('searchPatient').value;
  let $updateInfo=document.getElementsByClassName('searchPatient');
    for (var i = 0; i < $updateInfo.length; i++) {
      $updateInfo[i].value = "";
    }

    let configDataSearch = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:1234/laboratory/search',
      headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      params: { "code": code }    
    };
    
    axios.request(configDataSearch).then((response) => {
    if (response.data.status){
      currentCode=response.data.message.code
      
      var foundInterior=t.buscarcode(response.data.message.code)   
      
      var foundExterior=u.buscarcode(response.data.message.code)   

      if (foundInterior!=null && foundExterior==null){
        systemPatients = 1
        setDataPatient(response.data.message)
      }
      if (foundInterior==null && foundExterior!=null){
        systemPatients = 2
        setDataPatient(response.data.message)
      }
      if (foundInterior==null && foundExterior==null){
        alert("Paciente no encontrado");  
        systemPatients = 3
      }
      
    }else{
      systemPatients = 3
      alert("Paciente no encontrado"); 
      setDataPatient("none") 
    }
    }).catch((error) => {
      console.log(error);
  });
}
function setDataPatient(data){
  if (systemPatients==3){
    document.getElementById('namePatient').innerHTML="";
    document.getElementById('codePatient').innerHTML="";
    document.getElementById('statusPatient').innerHTML="";
    const $button = document.querySelector("#add");
    $button.style.display="none";
    const $box=document.querySelector('#box');
    $box.style.display="none";
  }else{
    
    var name = data.name + " " + data.firstLastName +" "+ data.secondLastName;
    var study = data.typeStudy;
  
    document.getElementById('namePatient').innerHTML=name;
    document.getElementById('codePatient').innerHTML=currentCode;
    document.getElementById('statusPatient').innerHTML=study;
    if (systemPatients==1){
      const $button = document.querySelector("#add");
      $button.style.display="none";
      const $box=document.querySelector('#box');
      $box.style.display="none";
    }
    if (systemPatients==2){
      const $button = document.querySelector("#add");
      $button.style.display="block";
      const $box=document.querySelector('#box');
      $box.style.display="block";
    }
  }

}  

function add(){
  
  if(systemPatients==2){
    console.log(currentCode)
    u.remove("JAMM");
    //var $element2 = document.getElementById("forthLaboratoryTable");
    //$element2.innerHTML = "";
    
    deleteExternalPatient();
    alert("archivo enviado paciente externo")
    let info= document.getElementsByClassName('infoPat');
        for (var i = 0; i < info.length; i++) {
            
            info[i].innerHTML = "";
        }  
  }

  const $button = document.querySelector("#add");
  $button.style.display="none";

  const $box=document.querySelector('#box');
  $box.style.display="none";

  var $element = document.getElementById("secondLaboratoryTable");
  $element.innerHTML = "";
  
 location.reload()
  if($element.innerHTML===""){
    document.getElementById('therePatient').innerHTML="No hay pacientes en espera de resultados";
  }
  if($element2.innerHTML===""){
    document.getElementById('therePatient2').innerHTML="No hay pacientes en espera de resultados";
  }

}


function deleteExternalPatient(){
  console.log(currentCode);
  let configDeleteExternal = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'http://localhost:1234/laboratory/send',
    headers: { 
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    params: { "code": currentCode }    
  };
  
  axios.request(configDeleteExternal).then((response) => {
    console.log(response)
    
    }).catch((error) => {
      console.log(error);
});
}


function addPatient(){
  var block=document.getElementById('addPatient').style.display;
    if(block=="block"){
      let $updateInfo=document.getElementsByClassName('addInfo');
      for (var i = 0; i < $updateInfo.length; i++) {
          
          $updateInfo[i].value = "";
      }
      console.log($updateInfo);
      
      document.getElementById('addPatient').style.display="none";
        
    }
    else{
        document.getElementById('addPatient').style.display="block";
    }
}


function savePatient(){
  var name = document.getElementById('nameExternalPatient').value;
  var newName =name.split([" "]);
  
  console.log(newName);

  if(newName.length==1){
    alert("Especifique bien su nombre")
    return
  }
  if(newName.length==2){
    var nameNew=newName[0];
    var firstLastName=newName[1];
    var secondLastName="";
    console.log("tamaño 2 " + nameNew + firstLastName + secondLastName);
  }

  if(newName.length==3){
    var nameNew=newName[0];
    var firstLastName=newName[1];
    var secondLastName=newName[2];
    console.log("tamaño 3 " + nameNew + firstLastName + secondLastName);
  }
  if(newName.length==4){
    var nameNew=newName[0] + " " + newName[1];
    var firstLastName=newName[2];
    var secondLastName=newName[3];
    console.log("tamaño 4 " + nameNew + firstLastName + secondLastName);
  }

  var code= document.getElementById('codeExternalPatient').value;
  var box = document.getElementById('studyExternalPatient');
  u.add(code);
  console.log(code,nameNew);
  var study = box.options[box.selectedIndex].text;
    if(name !=""&& code!="" && study!=""){

      let configAdd = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:1234/laboratory/add',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        data: { 
          "code": code,
          "name":nameNew,
          "firstLastName":firstLastName,
          "secondLastName": secondLastName,
          "typeStudy":study
         }    
      };
      
      axios.request(configAdd).then((response) => {
        console.log(response)
        alert("Guardado en lista de espera");
        let $newPatient=document.getElementsByClassName('addInfo');
            for (var i = 0; i < $newPatient.length; i++) {
                
                $newPatient[i].value = "";//second console output
            }
        var block=document.getElementById('addPatient').style.display;
        if(block=="block"){
        document.getElementById('addPatient').style.display="none";
        }

        location.reload();
        //const $element2 = document.querySelector("#forthLaboratoryTable");
        //$element2.innerHTML = "";
        //u.INORDEN2();

        }).catch((error) => {
          console.log(error);
      });
    }else{
      alert("No puede dejar en blanco uno de los campos");
    }
  }
/*




    

*/
const exit=()=>{
  window.location.href="index.html";}

