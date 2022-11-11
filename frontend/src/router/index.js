import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../basic pages/Login';
import Register from '../basic pages/Register';
import App from '../App';
//import Home from "../pages/Home"
import Profile from '../profile page/Profile';
import Home from '../basic pages/Home';
import School from '../basic pages/School';
import Institution from '../basic pages/Institution';
import Program from '../basic pages/Program';
import Application from '../basic pages/Application';
import Default from '../basic pages/Default';
import SpacingGrid from '../basic pages/Test';

function BaseRouter() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<App/>}/>
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
        <Route path="/test" element={<SpacingGrid/>}></Route>
      </Routes>
    </Router>
  );
}

export default BaseRouter;

// Hi
