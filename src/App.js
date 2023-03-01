import React from "react";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import AddExpert from "./admin/pages/AddExpert";
import AdminEdit from "./admin/pages/AdminEdit/AdminEdit";
import AdminHome from "./admin/pages/AdminHome/AdminHome";
import AdminSignIn from "./admin/pages/authentication/AdminSignIn";
import Slots from "./admin/pages/slots/Slots";
import Home from "./user/Home/Home";
import Profile from "./user/profile/Profile";
import SignIn from "./user/signin/SignIn";
import SignUp from "./user/signup/SignUp";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/adminlogin" element={<AdminSignIn/>} />
    <Route path="/adminhome" element={<AdminHome/>} />
    <Route path="/slots" element={<Slots/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/add" element={<AddExpert/>} />
    
    <Route path="/expert/:expertId" element={<Profile/>} />
    <Route path="/editexpert/:id" element={<AdminEdit/>} />
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
