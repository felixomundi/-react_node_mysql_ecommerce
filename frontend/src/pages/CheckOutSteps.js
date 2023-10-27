import {Col, Row} from 'react-bootstrap'

export default function CheckOutSteps(props) {
  return (
      <Row  className='checkout-steps'>
    <Col className={props.step1 ? "active" : ""}>  Shipping</Col>      
      <Col className={props.step2 ? "active" : ""}>  Payment</Col>         
      <Col className={props.step3 ? "active" : ""}>  Placeorder</Col>   
      </Row>
 
  )
}
