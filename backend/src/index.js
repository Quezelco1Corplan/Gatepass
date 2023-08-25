const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "registration",
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

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

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

app.listen(3001, () => {
  console.log("running server");
});
