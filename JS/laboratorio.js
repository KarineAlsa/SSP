class node {
    constructor (code) {   
      this.code=code
      this.derecha = null
      this.izquierda = null
    }
  }

  class Arbol {
    
    constructor () {
      this.raiz = null
    }
    
    Vacio () {
      return this.raiz === null
    }
  
    add (code) {
      
      if (this.Vacio()) {
        this.raiz = new node(code)
        return
      }
    
      var aux = this.raiz
        
      while (aux) {
        
        if (code < aux.code) {
          if (aux.izquierda) {
            aux = aux.izquierda
            
          } else {
            aux.izquierda = new node(code)
            return
          }
        } else { 
          if (aux.derecha) {
            aux = aux.derecha
          } else {
            aux.derecha = new node(code)
            return
          }
        }
      }
    }
  
     
    buscar (lastName) {
      if (this.Vacio()) {
        return null
      }
  
      var aux = this.raiz
      if (aux.apellido === lastName) {
        return aux
      }
  
      while(aux) {
       
        if (aux.apellido === lastName) {
          break
        }
        
        if (aux.apellido < lastName) {
          aux = aux.derecha
        } else if (aux.apellido> lastName) {
         
          aux = aux.izquierda
        }
      }
      
      return aux
    }

    
    buscarcode (code) {
      if (this.Vacio()) {
        return null
      }
  
      var aux = this.raiz
      if (aux.code === code) {
        return aux
      }
  
      while(aux) {
       
        if (aux.code === code) {
          
          break

        }
        
        if (aux.code < code) {
          aux = aux.derecha
        } else if (aux.code> code) {
         
          aux = aux.izquierda
        }
      }
      
      return aux
    }
    remove(code)
{
    this.raiz = this.removeNode(this.raiz, code);
}
  
removeNode(node, code)
{
          
   
    if(node === null)
        return null;
  
   
    else if(code < node.code)
    {
        node.izquierda = this.removeNode(node.izquierda, code);
        return node;
    }
  
    else if(node > node.code)
    {
        node.derecha = this.removeNode(node.derecha, code);
        return node;
    }
    else
    {

        if(node.izquierda === null && node.derecha === null)
        {
            node = null;
            return node;
        }
  
        
        if(node.izquierda === null)
        {
            node = node.derecha;
            return node;
        }
          
        else if(node.derecha === null)
        {
            node = node.izquierda;
            return node;
        }

        var aux = this.findMinNode(node.derecha);
        node.code = aux.code;
  
        node.derecha = this.removeNode(node.derecha, aux.code);
        return node;
    }
  
}
findMinNode(node)
{
    if(node.izquierda === null)
        return node;
    else
        return this.findMinNode(node.izquierda);
}

    
  

    INORDEN (node = this.raiz) {
      if (!node) {
        return
      }

        let tablaR = document.getElementById('secondLaboratoryTable');
        this.INORDEN(node.izquierda)

        var newRow = tablaR.insertRow(-1);

        
        var identificador = newRow.insertCell(0);
        
        identificador.append(node.code);

      this.INORDEN(node.derecha)

    }
    INORDEN2 (node = this.raiz) {
      if (!node) {
        return
      }
      
      
      
        let tablap = document.getElementById('forthLaboratoryTable');
        this.INORDEN2(node.izquierda)

        var newRow = tablap.insertRow(-1);

        
        var identificador = newRow.insertCell(0);
        
        identificador.append(node.code);

      this.INORDEN2(node.derecha)
      
        
      
      
    }
    
    preOrder (node = this.raiz) {
      if (!node) {
        return
      }
      
      console.log(node.apellido)
      this.preOrder(node.izquierda)
      this.preOrder(node.derecha)
    }
    
    postOrder (node = this.raiz) {
      if (!node) {
        return
      }
      this.postOrder(node.izquierda)
      this.postOrder(node.derecha)
      console.log(node.apellido)
    }

  }
$query = `SELECT key_init,name, firstLastName,secondLastName,code
FROM loginPatient INNER JOIN patients on loginPatient.key_init=patients.id_Patient`;

connect.query($query, function (err, rows) {
  if (err) {
    console.log("error en el query");
    console.log(err);
    return;
  }
  else {
    var long = rows.length;
    for (i = 0; i < long; i++) {               
      
        var codeTemp= document.createTextNode(rows[i].code);
        var code=codeTemp.nodeValue;
        
        add(code);
        
    }
    
    order();
  }
});

$query = `SELECT codeExternal FROM externalPatients`;

connect.query($query, function (err, rows) {
  if (err) {
    console.log("error en el query");
    console.log(err);
    return;
  }
  else {
    var long = rows.length;
    for (i = 0; i < long; i++) {               
            
            
      var codeTemp= document.createTextNode(rows[i].codeExternal);
      var code=codeTemp.nodeValue;
      console.log(code)
      add2(code);

    }
        
    order2()
  }
});

var t = new Arbol()
var u= new Arbol()

function add (code) {
  t.add(code);
}

function order () {  
  t.INORDEN();
}
function add2 (code) {
  u.add(code);
}

function order2 () {  
  u.INORDEN2();
}

var id;
var systemPatients;
function search(){
  var code=document.getElementById('searchPatient').value;
  let $updateInfo=document.getElementsByClassName('searchPatient');
    for (var i = 0; i < $updateInfo.length; i++) {
      console.log($updateInfo[i].id);
      $updateInfo[i].value = "";//second console output
    }
  $query = `SELECT key_init,name, firstLastName,secondLastName,code
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
        systemPatients=1;
        id=rows[0].id_inicio;
        var name = rows[0].name + " " + rows[0].firstLastName +" "+ rows[0].secondLastName;
        var code1 = rows[0].code;

        document.getElementById('namePatient').innerHTML=name;
        document.getElementById('codePatient').innerHTML=code1;
        var encontrado=t.buscarcode(code1)   
        if(encontrado===null){
          
          document.getElementById('statusPatient').innerHTML="No espera ningun resultado";
          const $button = document.querySelector("#add");
          $button.style.display="none";
          const $box=document.querySelector('#box');
          $box.style.display="none";
              
        }
        else{
          
          document.getElementById('status').innerHTML="En espera";
          const $button = document.querySelector("#add");
          $button.style.display="block";
          const $box=document.querySelector('#box');
          $box.style.display="block";
        }
            
      }

      if(long==0) {
        console.log(code);
        $query = `SELECT codeExternal, name, firstLastName, secondLastName, typeStudy
        FROM externalPatients WHERE codeExternal='${code}'`;
        connect.query($query, function (err, rows){
      
          if (err){
            console.log ("error en el query");
            console.log (err);
          return;
          }
          else{   
            console.log("ejecutado correctamenteexterno", rows);
            long = rows.length;
            if(long>0){
              systemPatients=2;
              id=rows[0].codeExternal;
              var name = rows[0].name + " " + rows[0].firstLastName +" "+ rows[0].secondLastName;
              var typeStudy = rows[0].typeStudy;
            
              //idpaciente=id;
              document.getElementById('namePatient').innerHTML=name;
              document.getElementById('codePatient').innerHTML=id;
              document.getElementById('statusPatient').innerHTML=typeStudy;
              const $button = document.querySelector("#add");
              $button.style.display="block";
              const $box=document.querySelector('#box');
              $box.style.display="block";
              
            }
            else{
              alert("Paciente no encontrado");  
              systemPatients=3;                
            }
          }
        });
      }  
    }
  });
}

function addStudy(){
  var box = document.getElementById("box2");
  var $selected = box.options[box.selectedIndex].text;

  $query = `INSERT INTO laboratory (id_Patient,description) VALUES ('${id}','${$selected}')`;
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
}
function deleteExternalPatient(){

  $query = `DELETE FROM externalPatients WHERE codeExternal='${id}'`;
  connect.query($query, function (err) {
    if (err) {
        console.log("error en el query");
        console.log(err);
        return;
    }
  });
}

function add(){
  
  if(systemPatients==1){
      addStudy();
      var code=document.getElementById('codePatient').innerHTML;
      console.log(code);
      t.remove(code);
      document.getElementById('status').innerHTML="No espera ningun resultado";
  }
  if(systemPatients==2){
    var code=document.getElementById('codePatient').innerHTML;
    u.remove(code);
    deleteExternalPatient();
    alert("archivo enviado paciente externo")
    let info= document.getElementsByClassName('infoPat');
    console.log(info);
    
        for (var i = 0; i < info.length; i++) {
            
            info[i].innerHTML = "";
        }
    
  }
  if(systemPatients==3){
    alert("Paciente no encontrado en lista de espera");
  }
 

  

  const $button = document.querySelector("#add");
  $button.style.display="none";

  const $box=document.querySelector('#box');
  $box.style.display="none";

  

  const $element = document.querySelector("#secondLaboratoryTable");
  $element.innerHTML = "";

  const $element2 = document.querySelector("#forthLaboratoryTable");
  $element2.innerHTML = "";

  t.INORDEN();
  u.INORDEN2();
  if($element.innerHTML===""){
    document.getElementById('therePatient').innerHTML="No hay pacientes en espera de resultados";
  }
  if($element2.innerHTML===""){
    document.getElementById('therePatient2').innerHTML="No hay pacientes en espera de resultados";
  }

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
    if(name && code && study!=""){

    
      $query = `INSERT INTO externalPatients (name,firstLastName,secondLastName,codeExternal,typeStudy) VALUES ('${nameNew}','${firstLastName}','${secondLastName}','${code}','${study}')`;
      connect.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        }
        else { 
            alert("Guardado en lista de espera");
            let $newPatient=document.getElementsByClassName('addInfo');
                for (var i = 0; i < $newPatient.length; i++) {
                    
                    $newPatient[i].value = "";//second console output
                }
            var block=document.getElementById('addPatient').style.display;
            if(block=="block"){
            document.getElementById('addPatient').style.display="none";
            }
            const $element2 = document.querySelector("#forthLaboratoryTable");
            $element2.innerHTML = "";
            u.INORDEN2();
        }
      });
    
    }else{
      alert("No puede dejar en blanco uno de los campos");
    }
    
}

