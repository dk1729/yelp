import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {Row, Col, Card} from 'react-bootstrap';
import {Table, Button} from 'semantic-ui-react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchDishData} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import ReviewModal from './ReviewModal';

class biz extends Component {
  
  state = {modalShow:false};

  componentDidMount(){    
    this.props.fetchDishData(this.props.location.state.restaurant.rest_id);
  }

  handleModal = event => {
    event.preventDefault();
    this.setState({modalShow:true})
  }

  handleClick = (dish_id) => {
    console.log("Dish ID = "+dish_id)
    console.log("Rest ID = "+this.props.location.state.restaurant.rest_id)
    console.log("User ID = "+window.localStorage.getItem('id'));
    console.log("Count = "+document.getElementById(dish_id).value)
    let count = document.getElementById(dish_id).value
    if(!count){
      count=1
      console.log("Hola")
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/addToCart',{dish_id, rest_id:this.props.location.state.restaurant.rest_id, user_id:window.localStorage.getItem('id'), count})
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)            
            if(response.status === 202){
              console.log("Added to cart")
            }            
        }).catch(()=>{
          console.log("ERRR")
        });

  }

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('isSignedIn')){
      redirectVar = <Redirect to= "/login/"/>
    }
    let dishInfo = null;
    console.log("Dishes: "+JSON.stringify(this.props.dishes.dishes))
    if(this.props.dishes.dishes.length !== undefined){      
      dishInfo = this.props.dishes.dishes.map(dish => {
        return (          
          <Card bg="white" className="shadow p-3 mb-5 rounded" style={{width:"800px",marginLeft:50, height:"250px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"30%"}}>{dish.dish_name}</Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row style={{marginTop:10}}><Col>{dish.description}</Col></Row>
                <Row style={{marginTop:2}}><Col>$$: {dish.dish_price}</Col></Row>
                <Row style={{marginTop:2}}><Col>Ingredients: {dish.ingredients}</Col></Row>
                <Row style={{marginTop:2}}><Col>Eat it for: {dish.dish_type}</Col></Row>
                <Row style={{marginTop:2}}><Col>Quantity: <input type="number" id={dish.dish_id}/></Col></Row>
                <Row style={{marginTop:2}}><Col><Button style={{marginTop:20, color:"white", backgroundColor:"#d32323"}} onClick={()=>this.handleClick(dish.dish_id)}>Add To Cart</Button></Col></Row>
              </Card.Text>
            </Card.Body>
          </Card>
        )        
      })
    }
    let outdoorIcon = null;
    if(this.props.location.state.restaurant.dineout==="true"){
      outdoorIcon = <FontAwesomeIcon icon={faCheck} style={{color:"green", marginRight:5}}></FontAwesomeIcon>;
    }
    else{
      outdoorIcon = <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:5}}></FontAwesomeIcon>;
    }

    let deliveryIcon = null;
    if(this.props.location.state.restaurant.delivery==="true"){
      deliveryIcon = <FontAwesomeIcon icon={faCheck} style={{color:"green", marginRight:5}}></FontAwesomeIcon>;
    }
    else{
      deliveryIcon = <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:5}}></FontAwesomeIcon>;
    }

    let takeoutIcon = null;
    if(this.props.location.state.restaurant.takeout==="true"){
      takeoutIcon = <FontAwesomeIcon icon={faCheck} style={{color:"green", marginRight:5}}></FontAwesomeIcon>;
    }
    else{
      takeoutIcon = <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:5}}></FontAwesomeIcon>;
    }

    const days = ['Mon','Tue','Wed','Thu','Fri','Sat'].map(day=>{
      return (
        <Table.Row>
          <Table.Cell>
            {day}: {this.props.location.state.restaurant.timings}
          </Table.Cell>
        </Table.Row>
      )
    })

    return (
      <div>
        {redirectVar}
        <InternalHeader/>
        <div style={{border:"1px solid black", marginTop:20, height:"200px"}}>
          Images go here
        </div>
        <div style={{marginTop:10, height:"200px", borderBottom:"1px solid #eeeeef"}}>
          <Row>
            <Col style={{borderRight:"1px solid black"}}>
              <Row><Col><h1 style={{fontWeight:900, fontFamily:"Poppins,Helvetica Neue,Helvetica,Arial,sans-serif", marginLeft:50, color:"#2b273c", fontSize:"48px"}}>{this.props.location.state.restaurant.rest_name}</h1></Col></Row>
              <Row><Col><h4 style={{marginTop:10, marginLeft:50, color:"#2b273c"}}>{this.props.location.state.restaurant.description}</h4></Col></Row>              
              <Row>
                <Col style={{marginTop:10, marginLeft:50}}>
                  {outdoorIcon}
                  Outdoor-Dining
                </Col>
                <Col style={{marginTop:10, marginLeft:50}}>
                {deliveryIcon}
                  Delivery
                </Col>
                <Col style={{marginTop:10, marginLeft:50}}>
                {takeoutIcon}
                  Take-Out
                </Col>
              </Row>              
              <Row><Col><Button style={{marginTop:10, marginLeft:50, color:"white", backgroundColor:"#d32323"}} onClick = {this.handleModal}>Add A Review</Button></Col></Row>
              <ReviewModal show={this.state.modalShow} onHide={()=>this.setState({modalShow:false})} rest_id={this.props.location.state.restaurant.rest_id}/>
            </Col>
            <Col>
              <h4>Call: {this.props.location.state.restaurant.phone}</h4>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md={8} style={{marginTop:"20px"}}>
              {dishInfo}
            </Col>
            <Col md={4} style={{marginTop:"20px"}}>              
              <Row>
                <Col>
                  <Table striped style={{marginLeft:-10}} className="shadow p-3 mb-5 rounded">
                    <Table.Body>
                      {days}
                    </Table.Body>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {restaurants:state.restaurants, dishes:state.dishes, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{fetchDishData})(biz);