const mysql = require('mysql2');
// connect to database
const connect = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'mickey19',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

connect.connect(function (err) {
    if (err) throw err;
});

module.exports = connect;