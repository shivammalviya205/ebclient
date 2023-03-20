import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from 'react-router-dom';
import gold from '../../images/gold.jfif';
import silver from '../../images/silver.png';
import plt from '../../images/Platinum-Membership.png';
function PlanCard({setplan}) {
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'));
    
   
     
  return (
    <div className='Homediv'>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  style={{width:287,height:180}} src={silver} />
      <Card.Body>
        <Card.Title>Silver plan  </Card.Title>
        <Card.Title>{10-user.silverslots} slots remaining</Card.Title>
        <Button variant="primary"onClick={()=>setplan('Silver')} disabled={user.silverslots>=10}>Book an Silver slot</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  style={{width:287,height:180,objectFit:'contain'}} src={gold} />
      <Card.Body>
        <Card.Title>GOLD plan </Card.Title>
        <Card.Title>{8-user.goldslots} slots remaining</Card.Title>
        <Button variant="primary" onClick={()=>setplan('Gold')} disabled={user.goldslots>=8}>Book an GOLD slot</Button>
      </Card.Body>
    </Card>
       
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  style={{width:287,height:180,objectFit:'contain'}} src={plt} />
      <Card.Body>
        <Card.Title>Platinum plan </Card.Title>
        <Card.Title>{5-user.platinumslots} slots remaining</Card.Title>
        <Button variant="primary" onClick={()=>setplan('Platinum')} disabled={user.platinumslots>=5}>Book an Platinum slot</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default PlanCard;