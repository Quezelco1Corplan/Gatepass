const express = require("express");
const cors = require("cors");
const {
  department,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("./components/Department.jsx");
const {
  position,
  getPosition,
  updatePosition,
  deletePosition,
} = require("./components/Position.jsx");
const {
  employee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./components/Employee.jsx");
const {
  deleteUser,
  updateUser,
  getUser,
  getUserWithId,
} = require("./components/UserManagement.jsx");
const { userRegister } = require("./components/Registration.jsx");
const { userLogin } = require("./components/SignIn.jsx");
const {
  addGatepasss,
  deleteGatepass,
  getGatepass,
} = require("./components/Gatepass.jsx");
const GatepassSource = require("./components/GatepassSource.jsx");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", userRegister),
  app.post("/login", userLogin),
  app.delete("/users/:id", deleteUser);

app.put("/users/:id", updateUser);

app.get("/users", getUser), app.get("/users/:id", getUserWithId);

app.post("/departments", department);

app.get("/departments", getDepartments);

app.put("/departments/:id", updateDepartment);

app.delete("/departments/:id", deleteDepartment);

app.post("/position", position);

app.get("/position", getPosition),
  app.put("/position/:id", updatePosition),
  app.delete("/position/:id", deletePosition),
  app.post("/employee", employee);

app.get("/employee", getEmployee),
  app.put("/employee/:id", updateEmployee),
  app.delete("/employee/:id", deleteEmployee);

app.post("/gatepass", addGatepasss);
app.delete("/gatepass/:id", deleteGatepass);
app.get("/gatepass", getGatepass);

app.use(GatepassSource);

app.listen(3001, () => {
  console.log("running server");
});
