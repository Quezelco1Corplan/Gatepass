const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "registration",
});

const employee = (req, res) => {
  const { empName, dob, doe, pos, dept, id_num } = req.body;

  const query =
    "INSERT INTO `employee` (empName, dob, doe, pos, dept, id_num) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [empName, dob, doe, pos, dept, id_num];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Employee has been added successfully");
  });
};

const getEmployee = (req, res) => {
  const query = "SELECT * FROM employee";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { empName, dob, doe, pos, dept, id_num } = req.body;

  const q =
    "UPDATE employee SET `empName` = ?, `dob` = ?, `doe` = ?, `pos` = ?, `dept` = ?, `id_num` = ? WHERE `employee_id` = ?";

  const values = [empName, dob, doe, pos, dept, id_num, id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Employee has been updated successfully");
  });
};

const deleteEmployee = (req, res) => {
  const employee_id = req.params.id;
  const q = "DELETE FROM employee WHERE employee_id = ?";

  db.query(q, [employee_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Employee has been deleted successfully");
  });
};

module.exports = {
  employee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
