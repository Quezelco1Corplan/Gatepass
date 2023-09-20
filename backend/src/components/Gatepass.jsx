const { db } = require("../sql/Connection.jsx");

const addGatepasss = (req, res) => {
  const {
    ref_number,
    duration_day,
    purpose,
    destination,
    dot,
    departments,
    service_vehicle,
    names,
    area_office,
    start_time,
    return_time,
  } = req.body;

  // if (!ref_number || !purpose || !destination || !dot || !departments || !service_vehicle || !names) {
  //   alert("Values are empty");
  //   return;
  // }

  console.log(req.body);

  const q =
    "INSERT INTO gatepass (ref_number, duration_day, purpose, destination, dot, departments, service_vehicle ,names, area_office, start_time, return_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    ref_number,
    duration_day,
    purpose,
    destination,
    dot,
    departments,
    service_vehicle,
    names,
    area_office,
    start_time,
    return_time,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    return res.json("Gatepass has been added in your database.");
  });
};

const getGatepass = (req, res) => {
  const query = "SELECT * FROM gatepass";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
};

const deleteGatepass = (req, res) => {
  const gatepassId = req.params.gatepass_id;
  const q = "DELETE FROM gatepass WHERE gatepass_id = ?";

  db.query(q, [gatepassId], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No gatepass found with this ID" });
    }

    return res.json({
      message: "Gatepass has been deleted from your database.",
    });
  });
};

module.exports = {
  addGatepasss,
  getGatepass,
  deleteGatepass,
};
