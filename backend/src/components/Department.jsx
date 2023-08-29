const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "registration",
});

const department = (req, res) => {
  const { id } = req.params;
  const { department } = req.body;

  const query = "INSERT INTO department (department) VALUES (?)";
  const values = [department];

  db.query(query, values, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Department has been added successfully");
  });
};

const getDepartments = (req, res) => {
    const query = "SELECT * FROM department";
  
    db.query(query, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  };
  

module.exports = {
  department,
  getDepartments,
};