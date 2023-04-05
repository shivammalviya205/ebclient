import React, { useState } from 'react';

import './AddExpert.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import moment from 'moment';
import {TimePicker} from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AddExpert = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [image, setImage] = useState(null);
  const [domain, setdomain] = useState('');
  const [fees, setfees] = useState('');
  const [timing, settiming] = useState({});
  const [contact, setcontact] = useState('');
  const navigate=useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDomainChange = (e) => {
    setdomain(e.target.value);
  };

  const handleFeesChange=(e)=>{
    setfees(e.target.value);
  } 

  const handleContactChange=(e)=>{
    setcontact(e.target.value);
  }

  const handleTimeRangeChange = (timeRange) => {
    // timeRange is an array of two moment objects
    //we can put it without moment also but if we have to play with time we need moment
    //console.log(timeRange[0].format('HH:mm'));
    const startTime = (timeRange[0]).format('HH:mm');
    const endTime = (timeRange[1]).format('HH:mm');
    console.log(startTime)
   
    settiming([startTime,endTime]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
         

    const formData = new FormData();
    formData.append('userName',name);
    formData.append('email',email);
    formData.append('domain',domain);
    formData.append('fees',fees);
    formData.append('contact',contact);
    formData.append('timing',timing);
    formData.append('image', image);
     console.log(timing)
     console.log(name)
     console.log(formData);
    try {
        const response = await fetch("http://localhost:3002/admin/addexpert", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
      console.log(data);
      if(data){
        alert('expert added')
        navigate('/adminhome')
      }
    } catch (error) {
      console.error(error);
    } 
   
  };

  return ( 
    <>
    <Navbar/>
    <div className="main">
      <div className="right">
        <h1>Add expert</h1>
      <form onSubmit={handleSubmit}>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="UserName" 
      type="text" value={name} onChange={handleNameChange}
       />
      </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Email" 
        input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Domain" 
         type="text"  value={domain} onChange={handleDomainChange} />
       </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Fees" 
         type="text"  value={fees} onChange={handleFeesChange} />
       </div>
       <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Contact No" 
         type="text"  value={contact} onChange={handleContactChange} />
       </div>
       <div>
        <TimePicker.RangePicker
      format="HH:mm"
      label="Timing"
      name="timing"
      required
      onChange={handleTimeRangeChange}
    />
       </div>
      <div>
        <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" 
          type="file" onChange={handleImageChange} />
      </div>
      <Button style={{marginTop:'10px'}} variant='contained' type="submit">Save expert</Button>
      
    </form>
      </div>
    </div>
    </>
  );
};

export default AddExpert;