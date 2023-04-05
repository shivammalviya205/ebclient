
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import FilterComponent from './Filter';
import Navbar from '../Navbar';

const Slots = () => {
  const [info,setinfo]=useState([]);
  const[filteredinfo,setfilteredinfo]=useState([]);
    const [expertlist,setexpertlist]=useState([]);
    const[filterterm,setfilterterm]=useState('All');
   const getbookeddata=async()=>{
     const response=await fetch('http://localhost:3002/admin/getallslotsdata',{});
     const data= await response.json();
     setinfo(data);
   } 
    
   const getuniquelist=()=>{
     const l=info.map((i)=>i.expertName);
     const u=[...new Set(l)]
     setexpertlist(u);
   }

   const getfilteredslots=()=>{
    if(filterterm==='All') { setfilteredinfo(info); return; }
     const f=info.filter((e)=>e.expertName===filterterm);
     setfilteredinfo(f);
   }
  
  useEffect(()=>{
     getbookeddata();
     getfilteredslots()
  },[])

  useEffect(()=>{
    getuniquelist();
    getfilteredslots();
  },[info,filterterm])

   if(info.length===0) return;
  return ( 
    <>
    <Navbar/>
    <FilterComponent expertlist={expertlist} filterterm={filterterm} setfilterterm={setfilterterm}/>
    <div className='container pt-3 mt-3'>
            <h1 style={{ textAlign: 'center' }}>Booked Slots </h1>
            <br />
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Expert's Name</th>
                            <th>User's Name</th>
                            <th>Date</th>
                            <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                         filteredinfo.map((e) => {
                                return <tr key={e._id}>
                                    <td>{e.expertName}</td>
                                    <td>{e.userName}</td>
                                    <td>{e.date}</td>
                                    <td>{e.slotno}</td>   
                                </tr>
                            })

                        }
                    </tbody>
                </Table>
            </div>

        </div>
        </>
  )
}

export default Slots