import React from 'react';
import { Container, Grid, Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import './PricingPlan.css';

const pricingData = [
  {
    title: 'Monthly Plan',
    price: 400,
    features: [
      '5 silver slots',
      '3 silver slots',
      '2 platinum slots',
    ],
  },
  {
    title: '3 Month Plan',
    price: 1000,
    features: [
        '15 silver slots',
        '9 silver slots',
        '6 platinum slots',
     
    ],
  },
  {
    title: '6 Month Plan',
    price: 2400,
    features: [
        '30 silver slots',
        '18 silver slots',
        '12 platinum slots',
      
    ],
  },
  {
    title: 'Yearly Plan',
    price: 4000,
    features: [
        '60 silver slots',
        '36 silver slots',
        '24 platinum slots',
     
    ],
  },
];

function PricingPlan({checkoutHandler}) {
  return (
    <Container maxWidth="md" className="container">
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
