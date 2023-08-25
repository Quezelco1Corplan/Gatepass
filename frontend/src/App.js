import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
// AuthProvider
import Home from './pages/Home';



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/Home' element={<Home />}/> 
          <Route path='/Dashboard' element={<Dashboard />}/> 

        </Routes>
      </Router>
    </div>
  )
}

export default App;