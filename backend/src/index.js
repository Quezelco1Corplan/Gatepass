const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { deleteUser } = require("./components/Delete.jsx");
const { updateUser } = require("./components/Update.jsx");
const {
  department,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("./components/Department.jsx");

const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "registration",
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/users/:id", (req, res) => {
  const userid = req.params.id;
  const q = "SELECT * FROM user WHERE id = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]); // return the first object from the data array
  });
});

app.post("/register", (req, res) => {
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
      "INSERT INTO user (firstname, lastname, contact, email, password) VALUES (?, ?, ?, ?, ?)",
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
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM user WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          // req.session.email = result;
          // console.log(req.session.email);
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.delete("/users/:id", deleteUser);

app.put("/users/:id", updateUser);

app.post("/departments", department);

app.get("/departments", getDepartments);

app.put("/departments/:id", updateDepartment);

app.delete("/departments/:id", deleteDepartment);

app.listen(3001, () => {
  console.log("running server");
});
