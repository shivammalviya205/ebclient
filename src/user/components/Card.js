import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Navigate, useNavigate } from 'react-router-dom';

function SingleCard({info}) {
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user.paymentStatus)
    const {validity,goldslots}=user
    const {userName,picturePath,fees,domain,_id}=info;
    let validityremaining=true;


    const getuserdata=async()=>{
         
      const res=await fetch(`http://localhost:3002/user/${user._id}/getuserdata`,{});
       const data=await res.json()
       if(data){
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data));
      }
  }


    function check(){
      getuserdata()
      if(validity===30 && goldslots>=5)validityremaining=false
      else if(validity===90 && goldslots>=15)validityremaining=false
      else if(validity===180 && goldslots>=30)validityremaining=false
      else if(validity===365 && goldslots>=60)validityremaining=false
      console.log(goldslots>=5)
    }
   check();
   console.log(validityremaining)

   useEffect(()=>{

   },[user]);
   
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  style={{width:287,height:180}} src={`http://localhost:3002/assets/${picturePath}`}/>
      <Card.Body>
        <Card.Title>Expert in {domain} </Card.Title>
        <Card.Text>
          Hello myself {userName} . I am expert in {domain}. My consultancy fees is Rs. {fees} . Limited slots avialable.
        </Card.Text>
        <Button variant="primary" onClick={()=>{if(user.paymentStatus!=='Done' || validityremaining===false){navigate(`/membership`)} else navigate(`/expert/${_id}`)}} >Book an slot</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleCard;