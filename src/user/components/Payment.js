import React from 'react';
import { Box,Stack } from '@mui/system';
//import Card from './Card';
import axios from 'axios';
import { Button } from 'antd';
import PricingPlan from './PricingPlan';

const Payment = () => {
 
    const user=JSON.parse(localStorage.getItem('user'));
    const {userName,email,_id}=user;
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get('http://www.localhost:3002/api/getkey');

    const {
      data: { order },
    } = await axios.post('http://localhost:3002/api/checkout', {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: 'Shivam Malviya',
      description: 'Expert booking sysytem',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: order.id,
      callback_url: `http://localhost:3002/api/${_id}/${order.amount}/paymentverification`,
      prefill: {
        name: `${userName}`,
        email:`${email}`,
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#121212',
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'100px'}}>
        
         <h1>Choose Your subscription </h1> 
          
        <PricingPlan checkoutHandler={checkoutHandler}/> 



    </div>
  );
};

export default Payment;


{/* <Button onClick={()=>checkoutHandler(5000)} style={{marginRight:'20px'}}>Buy30 days for Rs 5000</Button>
        <Button onClick={()=>checkoutHandler(10000)} >Buy60 days for Rs 10000</Button> */}