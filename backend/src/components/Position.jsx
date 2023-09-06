const { db } = require("../sql/Connection.jsx");

const position = (req, res) => {
  const { position_name, department_name } = req.body;

  if (!position_name || !department_name) {
    return res.json("Both position_name and department_name must be provided");
  }

  const query =
    "INSERT INTO `position` (position_name, department_name) VALUES (?, ?)";

  const values = [position_name, department_name];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Position has been added successfully");
  });
};

const getPosition = (req, res) => {
  const query = "SELECT * FROM position";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

function updatePosition(req, res) {
  const { id } = req.params;
  const { position_name, department_name } = req.body;

  const q =
    "UPDATE position SET `position_name` = ?, `department_name` = ? WHERE `position_id` = ?";

  const values = [position_name, department_name, id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Position has been updated successfully");
  });
}

function deletePosition(req, res) {
  const position_id = req.params.id;
  const q = "DELETE FROM position WHERE position_id = ?";

  db.query(q, [position_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Position has been deleted successfully");
  });
}

module.exports = {
  position,
  getPosition,
  updatePosition,
  deletePosition,
};
