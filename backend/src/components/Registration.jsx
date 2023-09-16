const { db } = require("../sql/Connection.jsx");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userRegister = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const contact = req.body.contact;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (firstname, lastname, contact, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, contact, email, hash],
      (err, result) => {
        if (result) {
          res.send(result);
        } else {
          req.send({ message: "ENTER CORRECT ASKED DETAILS!" });
        }
      }
    );
  });
};

module.exports = {
  userRegister,
};
