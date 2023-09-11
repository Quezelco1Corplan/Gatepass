const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registration",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL server');
  }
});

module.exports = {
  db,
};