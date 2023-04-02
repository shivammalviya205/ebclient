import { textAlign } from '@mui/system';
import React, { useEffect, useState } from 'react'
import SingleCard from '../components/Card'
import Navbar from '../components/Navbar';
import './Home.scss'



const Home = () => {

    const[info,setinfo]=useState([]);

    async function getdata() {

        const  req = await fetch('http://localhost:3002/admin/getallexperts',{});
          
        let data = await req.json();

        console.log(data)
        if (data) {

            await setinfo(data)
            console.log(info)
            //setdata(info)
        }
        else {
            //console.log(data.error);
            console.log('data nhi aya');

        }
    }

    useEffect(() => {
      getdata();
       
    }, [])
    console.log(info)
    if(info.length===0) return;

  return (
    <>  
    <Navbar/>
    <div className='Homediv'>
        { info.map((e)=>{ return (<SingleCard info={e} />); })}
    </div>
    </>
   
  )
}

export default Home