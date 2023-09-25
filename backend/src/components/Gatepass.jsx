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
    end_date,
    officer_in_charge,
    officer_position,
  } = req.body;

  console.log(req.body);

  const q =
    "INSERT INTO gatepass (ref_number, duration_day, purpose, destination, dot, departments, service_vehicle ,names, area_office, start_time, return_time, end_date, officer_in_charge, officer_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    end_date,
    officer_in_charge,
    officer_position,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
    return res.json("Gatepass has been created.");
  });
};

const getGatepass = (req, res, next) => {
  const query = "SELECT * FROM gatepass";

  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    res.json(data);
  });
};

const deleteGatepass = (req, res) => {
  const gatepassId = req.params.id;
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
