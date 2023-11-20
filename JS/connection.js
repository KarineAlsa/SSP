const mysql=require("mysql2")

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Kataraydione02',
    database: 'ssp',
    port: '3306'
});

connection.connect(function(err){
    if(err){
    console.log("Connection error");
    console.log(err.code);
    return
    }
    else
    console.log("Exito");
});


    module.exports=connection;
