const axios = require('axios');

const login=()=>{
    var user=document.getElementById("password").value;
    var check=user.substring(0,2);
    console.log(check);
        if(check=="PC"){


            let data = JSON.stringify({
                "key_init": user
              });
            
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:1234/login/patient',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios.request(config).then((response) => {
                
                if (response.data.status){
                    var token=response.data.message.token;
                    console.log(token);
                    var currentToken=[{token:token}];
                    localStorage.setItem("token",JSON.stringify(currentToken));
                    
                    window.location.href="patient.html";
                }
                
            })
            .catch((error) => {
                console.log(error);
            });

        }
        if(check=="MD"){
            let data = JSON.stringify({
                "key_init": user
            });
            
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:1234/login/doctor',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios.request(config).then((response) => {
                
                if (response.data.status){
                    var token=response.data.message.token;
                    console.log(token);
                    var currentToken=[{token:token}];
                    localStorage.setItem("token",JSON.stringify(currentToken));
                    
                    window.location.href="doctor.html";
                }
                
            })
            .catch((error) => {
                console.log(error);
            });
            
            
        }
        if(check=="LB"){
            let data = JSON.stringify({
                "key_init": user
              });
            
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:1234/login/laboratory',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios.request(config).then((response) => {
                
                if (response.data.status){
                    var token=response.data.message.token;
                    console.log(token);
                    var currentToken=[{token:token}];
                    localStorage.setItem("token",JSON.stringify(currentToken));
                    
                    window.location.href="laboratory.html";
                }
                
            })
            .catch((error) => {
                console.log(error);
            });
            
            
    }
    if(check!="PC" && check!= "MD" && check!="LB"){
        alert("Identificacion incorrecta");
    }
};


