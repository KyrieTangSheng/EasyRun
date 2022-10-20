import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import App from '../App';
//import Home from "../pages/Home"
import Profile from '../pages/Profile';

function BaseRouter() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<App/>}>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        
      </Routes>
    </Router>
  );
}

export default BaseRouter;
