const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "registration",
});

function updateUser(req, res) {
  const userid = req.params.id;
  const q =
    "UPDATE user SET `firstname` = ?, `lastname` = ?, `contact` = ?, `email` = ? WHERE id = ?";

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.contact,
    req.body.email,
  ];

  db.query(q, [...values, userid], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been updated successfully");
  });
}

module.exports = {
  updateUser,
};
