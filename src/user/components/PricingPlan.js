import React from 'react';
import { Container, Grid, Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import './PricingPlan.css';

const pricingData = [
  {
    title: 'Monthly Plan',
    price: 400,
    features: [
      '5 slots will be allocated ',
    ],
  },
  {
    title: '3 Month Plan',
    price: 1000,
    features: [
      '15 slots will be allocated'
     
    ],
  },
  {
    title: '6 Month Plan',
    price: 2000,
    features: [
      '30 slots will be allocated'
      
    ],
  },
  {
    title: 'Yearly Plan',
    price: 4000,
    features: [
      '60 slots will be allocated'
     
    ],
  },
];

function PricingPlan({checkoutHandler}) {
  return (
    <Container maxWidth="md" className="container" sx={{marginTop:'100px'}}>
      <Grid container spacing={4}>
        {pricingData.map((plan) => (
          <Grid item key={plan.title} xs={12} md={3}>
            <Card className="card">
              <CardHeader
                title={plan.title}
                className="card-header"
              />
              <CardContent className="card-content">
                <Typography variant="h4" component="div" className="price">
                  Rs {plan.price}/-
                </Typography>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <Button variant="contained" className="button" onClick={()=>checkoutHandler(plan.price)} >
                Buy Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PricingPlan;
