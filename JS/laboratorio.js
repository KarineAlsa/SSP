class Nodo {
    constructor (codigo) {
      
      this.codigo=codigo
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
  
    anadir (codigo) {
      
      if (this.Vacio()) {
        this.raiz = new Nodo(codigo)
        return
      }
    
      var aux = this.raiz
        
      while (aux) {
        
        if (codigo < aux.codigo) {
          if (aux.izquierda) {
            aux = aux.izquierda
            
          } else {
            aux.izquierda = new Nodo(codigo)
            return
          }
        } else { 
          if (aux.derecha) {
            aux = aux.derecha
          } else {
            aux.derecha = new Nodo(codigo)
            return
          }
        }
      }
    }
  
     
    buscar (apellido) {
      if (this.Vacio()) {
        return null
      }
  
      var aux = this.raiz
      if (aux.apellido === apellido) {
        return aux
      }
  
      while(aux) {
       
        if (aux.apellido === apellido) {
          break
        }
        
        if (aux.apellido < apellido) {
          aux = aux.derecha
        } else if (aux.apellido> apellido) {
         
          aux = aux.izquierda
        }
      }
      
      return aux
    }

    
    buscarcodigo (codigo) {
      if (this.Vacio()) {
        return null
      }
  
      var aux = this.raiz
      if (aux.codigo === codigo) {
        return aux
      }
  
      while(aux) {
       
        if (aux.codigo === codigo) {
          
          break

        }
        
        if (aux.codigo < codigo) {
          aux = aux.derecha
        } else if (aux.codigo> codigo) {
         
          aux = aux.izquierda
        }
      }
      
      return aux
    }
    remove(codigo)
{
    // root is re-initialized with
    // root of a modified tree.
    this.raiz = this.removeNode(this.raiz, codigo);
}
  
// Method to remove node with a 
// given data
// it recur over the tree to find the
// data and removes it
removeNode(nodo, codigo)
{
          
    // if the root is null then tree is 
    // empty
    if(nodo === null)
        return null;
  
    // if data to be delete is less than 
    // roots data then move to left subtree
    else if(codigo < nodo.codigo)
    {
        nodo.izquierda = this.removeNode(nodo.izquierda, codigo);
        return nodo;
    }
  
    // if data to be delete is greater than 
    // roots data then move to right subtree
    else if(codigo > nodo.codigo)
    {
        nodo.derecha = this.removeNode(nodo.derecha, codigo);
        return nodo;
    }
  
    // if data is similar to the root's data 
    // then delete this node
    else
    {
         // deleting node with no children
        if(nodo.izquierda === null && nodo.derecha === null)
        {
            nodo = null;
            return nodo;
        }
  
        // deleting node with one children
        if(nodo.izquierda === null)
        {
            nodo = nodo.derecha;
            return nodo;
        }
          
        else if(nodo.derecha === null)
        {
            nodo = nodo.izquierda;
            return nodo;
        }
  
        // Deleting node with two children
        // minumum node of the rigt subtree
        // is stored in aux
        var aux = this.findMinNode(nodo.derecha);
        nodo.codigo = aux.codigo;
  
        nodo.derecha = this.removeNode(nodo.derecha, aux.codigo);
        return nodo;
    }
  
}
findMinNode(nodo)
{
    // if left of a node is null
    // then it must be minimum node
    if(nodo.izquierda === null)
        return nodo;
    else
        return this.findMinNode(nodo.izquierda);
}

    
  

    INORDEN (nodo = this.raiz) {
      if (!nodo) {
        return
      }
      let tablaR = document.getElementById('tablalab');
        this.INORDEN(nodo.izquierda)

        var newRow = tablaR.insertRow(-1);

        
        var identificador = newRow.insertCell(0);
        
        identificador.append(nodo.codigo);
        
      
      
      this.INORDEN(nodo.derecha)
    }
    
    preOrder (nodo = this.raiz) {
      if (!nodo) {
        return
      }
      
      console.log(nodo.apellido)
      this.preOrder(nodo.izquierda)
      this.preOrder(nodo.derecha)
    }
    
    postOrder (nodo = this.raiz) {
      if (!nodo) {
        return
      }
      this.postOrder(nodo.izquierda)
      this.postOrder(nodo.derecha)
      console.log(nodo.apellido)
    }
  }

$query = `SELECT id_inicio,nombre, apellidoP,apellidoM,codigo
FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P`;


    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        }
        else {
            var long = rows.length;
            for (i = 0; i < long; i++) {               
                
                var nombri = document.createTextNode(rows[i].nombre);
                var nombre=nombri.nodeValue;
                var apelli = document.createTextNode(rows[i].apellidoP + " " + rows[i].apellidoM);
                var apellido=apelli.nodeValue;
                var codig= document.createTextNode(rows[i].codigo);
                var codigo=codig.nodeValue;
                altita(codigo);
                /*var newRow = tablaR.insertRow(-1);
                var celdaNombre = newRow.insertCell(0);
                var celdaApellido = newRow.insertCell(1);
                var identificador = newRow.insertCell(2);
                var celdaBoton = newRow.insertCell(3);
                const button = document.createElement('button'); 

                button.type = 'button'; 
                button.innerText = 'Enviar'; 
                
                celdaNombre.appendChild(textoNombre);
                celdaApellido.appendChild(textoApellido);
                identificador.appendChild(textoidentificador);
                celdaBoton.appendChild(button); */
            }
            orden();
        }
    });

var t = new Arbol()

  function altita (apellido,nombre,codigo) {
    t.anadir(apellido,nombre,codigo);
  }

  function orden () {  
    t.INORDEN();
}

function orden2 () {  
  const $elemento = document.querySelector("#tablalab");
  $elemento.innerHTML = "";
  t.INORDEN();
}

function busqueda(){
  var codigo=document.getElementById('buscarP').value;
  $query = `SELECT id_inicio,nombre, apellidoP,apellidoM,codigo
    FROM inicioSesionPaciente INNER JOIN pacientes on inicioSesionPaciente.id_inicio=pacientes.id_P WHERE codigo='${codigo}'`;
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
            var codigo1 = rows[0].codigo;
            
            //idpaciente=id;
            
            document.getElementById('nombrepaciente').innerHTML=nombre;
            document.getElementById('codigopaciente').innerHTML=codigo1;
            var encontrado=t.buscarcodigo(codigo1)   
            if(encontrado===null){
              //alert("Este paciente no espera ningún resultado")
              document.getElementById('estado').innerHTML="No espera ningun resultado";
              const $button = document.querySelector("#agregar");
              $button.style.display="none";
              
            }
            else{
              //alert("Paciente en lista de espera")
              document.getElementById('estado').innerHTML="En espera";
              const $button = document.querySelector("#agregar");
              $button.style.display="block";
            }
            
        }

        else {
            
            alert("Paciente no encontrado");}
    }
    });


}

function agregar(){
  var codigo=document.getElementById('codigopaciente').innerHTML;
  console.log(codigo);
  t.remove(codigo);
  const $button = document.querySelector("#agregar");
  $button.style.display="none";
  document.getElementById('estado').innerHTML="No espera ningun resultado";
  const $elemento = document.querySelector("#tablalab");
  $elemento.innerHTML = "";
  t.INORDEN();
  if($elemento.innerHTML===""){
    document.getElementById('haypacientes').innerHTML="No hay pacientes en espera de resultados";
  }
}
