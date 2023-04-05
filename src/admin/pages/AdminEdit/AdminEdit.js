import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import moment from 'moment';
import {TimePicker} from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const AdminEdit = () => {
  const [name, setName] = useState('');
  const [domain, setdomain] = useState('');
  const [fees, setfees] = useState('');
  const [timing, settiming] = useState({});
  const [contact, setcontact] = useState('');
  const [info,setinfo]=useState();
  const navigate=useNavigate();
  const {id}=useParams();
  console.log(id)
  const handleNameChange = (e) => {
    setName(e.target.value);
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
    
  const getdata=async()=>{
    const response= await fetch(`http://localhost:3002/admin/${id}/getonedata`,{
    })
    const data= await response.json();
    console.log(data);
    setName(data.userName);
    setcontact(data.contact);
    setdomain(data.domain);
    setfees(data.fees);
    settiming(data.timing)

  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
         
    try {
        const response = await fetch(`http://localhost:3002/admin/${id}/editexpert`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userName:name,
                domain:domain,
                fees:fees,
                contact:contact,
                timing:timing
            }),
        });
          const data = await response.json();
      console.log(data);
      if(data){
        alert('expert added')
        navigate('/')
      }
    } catch (error) {
      console.error(error);
    } 
   
  };

  console.log(name)
  useEffect(()=>{
   getdata();
  },[])


  return ( 
    <><Navbar/>
    <div className="main">
      <div className="right">
        <h1>Edit expert</h1>
      <form onSubmit={handleSubmit}>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="UserName" 
      type="text" value={name} onChange={handleNameChange}
       />
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
        <div>
        <TimePicker.RangePicker
      format="HH:mm"
      label="Timing"
      name="timing"
      required
      onChange={handleTimeRangeChange}
    />
       </div>
      </div>
      <Button style={{marginTop:'10px'}} className='btn' variant='contained' type="submit">Save expert</Button>
      
    </form>
      </div>
    </div>
    </>
  );
};

export default AdminEdit;