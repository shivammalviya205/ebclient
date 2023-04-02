import React from 'react'
import Payment from '../components/Payment'
import PricingPlan from '../components/PricingPlan'
import Navbar from '../components/Navbar'
import { Box,Stack } from '@mui/system';
//import Card from './Card';
import axios from 'axios';
import { Button } from 'antd';

const Membership = () => {

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

  return (<>
    <Navbar/>
    <PricingPlan checkoutHandler={checkoutHandler}/> 
    </>
  )
}

export default Membership 




