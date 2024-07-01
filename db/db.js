const mysql = require('mysql2');

const connection = mysql.createConnection({
   host: 'mysql-ivanve.alwaysdata.net', 
   user: 'ivanve', 
   password: 'codoacodo', 
   database: "ivanve_cac",
 });

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Conectado');
})

module.exports = connection;