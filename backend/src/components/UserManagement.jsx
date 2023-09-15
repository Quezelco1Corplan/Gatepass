const { db } = require("../sql/Connection.jsx");

function updateUser(req, res) {
  const userid = req.params.id;
  const q =
    "UPDATE users SET `firstname` = ?, `lastname` = ?, `contact` = ?, `email` = ? WHERE id = ?";

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

function deleteUser(req, res) {
  const userid = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been deleted successfully");
  });
}

function getUser(req, res) {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}

function getUserWithId(req, res) {
  const userid = req.params.id;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]); // return the first object from the data array
  });
}

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUserWithId,
};
