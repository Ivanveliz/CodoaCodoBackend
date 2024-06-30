const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-emus181.alwaysdata.net', 
  user: 'emus181_store', 
  password: 'deadspace22', 
  database: "emus181_store",
});

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Conectado');
})

module.exports = connection;