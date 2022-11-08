import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import App from '../App';
//import Home from "../pages/Home"
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import School from '../pages/School';
import Institution from '../pages/Institution';
import Program from '../pages/Program';
import Application from '../pages/Application';
import Default from '../pages/Default';

function BaseRouter() {
  return (
    <Router>
      <Routes> 
        <Route path="/App" element={<App/>}/>
        <Route path="/home" element={<Home/>}>
          <Route path="/home" element={<Default/>}></Route>
          <Route path="/home/profile" element={<Profile/>}></Route>

        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/schools" element={<School/>}></Route>
        <Route path="/Institutions" element={<Institution/>}></Route>
        <Route path="/programs" element={<Program/>}></Route>
        <Route path="/applicationUpload" element={<Application/>}></Route>
      </Routes>
    </Router>
  );
}

export default BaseRouter;

// Hi
