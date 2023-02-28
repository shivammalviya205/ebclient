import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from 'react-router-dom';

function SingleCard({info}) {
    const navigate=useNavigate();
    const {userName,picturePath,fees,domain,_id}=info;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  style={{width:287,height:180}} src={`http://localhost:3002/assets/${picturePath}`}/>
      <Card.Body>
        <Card.Title>Expert in {domain} </Card.Title>
        <Card.Text>
          Hello myself {userName} . I am expert in {domain}. My consultancy fees is Rs. {fees} . Limited slots avialable.
        </Card.Text>
        <Button variant="primary" onClick={()=>navigate(`/expert/${_id}`)}>Book an slot</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleCard;