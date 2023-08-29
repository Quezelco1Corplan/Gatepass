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

function updateDepartment(req, res) {
  const { id } = req.params;
  const { department } = req.body;

  const q = "UPDATE department SET `department` = ? WHERE `department_id` = ?";

  const values = [department, id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Department has been updated successfully");
  });
}

module.exports = {
  department,
  getDepartments,
  updateDepartment,
};
