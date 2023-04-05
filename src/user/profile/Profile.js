import { ButtonBase } from '@mui/material';
import { Button, DatePicker, Modal } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import './Profile.scss'


const Profile = () => {
    const navigate=useNavigate();
    //for select plan

     const[plan,setplan]=useState('Gold');
       const [slotinfo,setslotinfo]=useState([]);
      const [Date,setDate]=useState('');
      const [slotno,setslotno]=useState();
      const[expertName,setexpertName]=useState();
      //const[expertId,setexpertId]=useState();
      const [domain, setdomain] = useState('');
      const [fees, setfees] = useState('');
      const [timing, settiming] = useState({});
      const [contact, setcontact] = useState('');
      const[bookedslot,setbookedslot]=useState([]);

    const token=JSON.parse(localStorage.getItem('token'));
    const user=JSON.parse(localStorage.getItem('user'));
    //const givenDate = moment('03-01-2023'); // Example given date
    console.log(user);
    const {userName,validity}=user;
    console.log(userName)
    const {expertId}=useParams();
    const id=user._id;
     console.log(Date)

     

        const handleslots=async()=>{
            const response = await fetch(`http://localhost:3002/user/${id}/updateslot`,{
                method:'POST',
                headers: {
                     Authorization:token,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     plan:plan
               })
              });
              const data=await response.json();
              if(data){
                console.log(data);
                localStorage.setItem('user',JSON.stringify(data));
              }
        }
          
        const getuserdata=async()=>{
         
            const res=await fetch(`http://localhost:3002/user/${id}/getuserdata`,{});
             const data=await res.json()
             if(data){
              console.log(data);
              localStorage.setItem('user',JSON.stringify(data));
            }
        }
    
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
            handleslots();
            alert('Booked') 
            await getuserdata();
            navigate('/home')
        }   
     }
      
     const getexpertslot=async()=>{
        const response=await fetch(`http://localhost:3002/admin/${expertId}/getslotsdata`,{});
        const data=await response.json();
        setslotinfo(data);
        console.log(data);
       
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
      
    

const paymentDateStr = user.paymentdate;
  console.log(paymentDateStr)

  // Convert paymentDateStr to a moment object
  const paymentDate = moment(paymentDateStr, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
   // Add 30 days to the given date
  const newDate = paymentDate.clone().add(validity, 'days');



  // Define the disabledDate function
  const disabledDate = (current) => {
    // Disable dates before today
    if (current && current < moment().endOf('day')) {
      return true;
    }
    // Disable dates after the given date
    if (current && current > newDate.endOf('day')) {
      return true;
    }
    return false;
  };





     const getdata=async()=>{
        const response= await fetch(`http://localhost:3002/admin/${expertId}/getonedata`,{
        })
        const data= await response.json();
        console.log(data);
        setexpertName(data.userName);
        setcontact(data.contact);
        setdomain(data.domain);
        setfees(data.fees);
        settiming(data.timing);
        //setexpertId(data._id);
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
     <Navbar/>
     
    <div className='profile-div'>
        <h4 style={{marginBottom:'40px'}}>Book your Slot with {expertName}<br/> for Guidance in {domain}</h4>
        <div className='date'>
     <div className='label'><h5>Choose Date</h5></div>
     <DatePicker format='DD-MM-YYYY' onChange={handledate} disabledDate={disabledDate} sx={{marginTop:'100px'}}/>
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