import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UserManagement from "./pages/UserManagement";
import Update from "./component/Update";
import Position from "./pages/Position";
import Department from "./pages/Department";
import Employee from "./pages/Employee";
import './App.css'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/Home' element={<Home />}/> 
          <Route path='/Dashboard' element={<Dashboard />}/> 
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/Position" element={<Position />} />
          <Route path="/Department" element={<Department />} />
          <Route path='/Employee' element={<Employee />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
