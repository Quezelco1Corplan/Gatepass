const { db } = require("../sql/Connection.jsx");

const addGatepasss = (req, res) => {
  const { purpose, destination, dot, departments, names } = req.body;

  const q =
    "INSERT INTO gatepass (purpose, destination, dot, departments, names) VALUES (?, ?, ?, ?, ?)";
  const values = [purpose, destination, dot, departments, names];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Internal Server Error");
    }
    return res.json("Gatepass has been added in your database." + data);
  });
};

const deleteGatepass = (req, res) => {
  const gatepassId = req.params.gatepass_id;
  const q = "DELETE FROM gatepass WHERE gatepass_id = ?";

  db.query(q, [gatepassId], (err, data) => {
    if (err) return res.json(err);

    return res.json("Gatepass has been deleted in your database." + data);
  });
};

module.exports = {
  addGatepasss,
  deleteGatepass,
};
