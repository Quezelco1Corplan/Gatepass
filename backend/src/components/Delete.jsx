const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "registration",
});

function deleteUser(req, res) {
  const userid = req.params.id;
  const q = "DELETE FROM user WHERE id = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been deleted successfully");
  });
}

module.exports = {
  deleteUser
};