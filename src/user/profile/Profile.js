import { ButtonBase } from '@mui/material';
import { Button, DatePicker, Modal } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import './Profile.scss'


const Profile = () => {
    const navigate=useNavigate();
       const [slotinfo,setslotinfo]=useState([]);
      const [Date,setDate]=useState('');
      const [slotno,setslotno]=useState();
      const[expertName,setexpertName]=useState();
      const[expertId,setexpertId]=useState();
      const [domain, setdomain] = useState('');
      const [fees, setfees] = useState('');
      const [timing, settiming] = useState({});
      const [contact, setcontact] = useState('');
      const[bookedslot,setbookedslot]=useState([]);

    const token=JSON.parse(localStorage.getItem('token'));
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const {userName}=user;
    console.log(userName)
    const {id}=useParams();

     console.log(Date)
    
      const bookAppointment = async() => {
        // await newComment(comment);
        const response = await fetch(`http://localhost:3002/user/${id}/${expertId}/book`,{
         method:'POST',
         headers: {
              Authorization:token,
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
              date:Date,
              slotno:slotno,
              userName:userName,
              expertName:expertName,
        })
       });
       const data=await response.json();
        if(data){
            alert('Booked')
            navigate('/home')
        }

         
     }
      
     const getexpertslot=async()=>{
        const response=await fetch(`http://localhost:3002/admin/${id}/getslotsdata`,{});
        const data=await response.json();
        setslotinfo(data);
       
     }
    
    const findbookedslot=()=>{
        console.log(Date);
        
        const slotnodate = slotinfo.filter((e) => e.date === Date);
        let booked=slotnodate.map((e)=>(e.slotno))
        setbookedslot(booked);
        console.log(bookedslot);
       
    } 

    const handledate=(date,datestring)=>{
        //datestring=moment(datestring).format('DD-MM-YYYY');
        console.log(datestring);
        setDate(datestring)
        findbookedslot();
       
    }

     const getdata=async()=>{
        const response= await fetch(`http://localhost:3002/admin/${id}/getonedata`,{
        })
        const data= await response.json();
        console.log(data);
        setexpertName(data.userName);
        setcontact(data.contact);
        setdomain(data.domain);
        setfees(data.fees);
        settiming(data.timing);
        setexpertId(data._id);
      }

     useEffect(()=>{
       getdata();
       getexpertslot();
      
     },[])

     useEffect(()=>{
        findbookedslot();
     },[Date])
    
     console.log(slotinfo);
     console.log(bookedslot);
    
  return (
     <>
    <div className='profile-div'>
        <h4 style={{marginBottom:'40px'}}>Book your Slot with {expertName}<br/> for Guidance in {domain}<br/> in Only Rs. {fees}</h4>
        <div className='date'>
     <div className='label'><h5>Choose Date</h5></div>
     <DatePicker format='DD-MM-YYYY' onChange={handledate}/>
    </div>
    <div className='date'>
        <div className='label'><h5>Choose Your Slot</h5></div>
        <Dropdown slotno={slotno} setslotno={setslotno} bookedslot={bookedslot} />
    </div>
    <Button variant='contained' onClick={()=>bookAppointment()} style={{marginTop:'10px'}}>Book Slot</Button>
   
    </div>
   
  </> 
  )
}

export default Profile