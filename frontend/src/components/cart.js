import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {fetchCart} from '../actions';
import {Row,Col, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import {Form, Field, reduxForm} from 'redux-form';

class cart extends Component {

  renderInput({input, label, type}){
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type={type}/>
      </div>
    );
  }

  componentDidMount(){    
    this.props.fetchCart(window.localStorage.getItem('id'));
    console.log(this.props)
  }
  
  handleClick(cart_id){    
    console.log("I will delete "+cart_id)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/deleteCart', {cart_id})
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)            
            if(response.status === 200){
              console.log("Added to cart")
            } 
            console.log("I will force update")
            this.props.fetchCart(window.localStorage.getItem('id'));
        }).catch(()=>{
          console.log("ERRR")
        });
  }


  onSubmit = formValues => {  
    console.log("Submitted")
    console.log("Form values = "+JSON.stringify(formValues))
    let total = 0;
    this.props.cart.cart.map(dish => {
      total+=dish.dish_price*dish.quantity
    })
    console.log("Total = "+total)
    // console.log("Formvalues = "+JSON.stringify({...formValues, ...this.props.cart.cart}))
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/placeOrder',{...formValues, total, orders:this.props.cart.cart})
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)            
            if(response.status === 200){
              console.log("Order placed")
              this.forceUpdate();
            } 
        }).catch(()=>{
          console.log("ERRR")
        });
  }

  render() {    
    let dishInfo = null;        
    let takeout = null;
    let delivery = null;
    let dineout = null;
    let total = 0;    
    if(this.props.cart.cart.length !== undefined){      

      if(this.props.cart.cart[0].takeout === "true"){
        takeout = <Col><Field type="radio" value="takeout" label="takeout" name="mode" component={this.renderInput}/></Col>
      }      

      if(this.props.cart.cart[0].delivery === "true"){
        delivery = <Col><Field type="radio" value="delivery" name="mode" label="delivery" component={this.renderInput}/></Col>        
      }      

      if(this.props.cart.cart[0].dineout === "true"){
        dineout = <Col><Field type="radio" value="dineout" name="mode" label="dineout" component={this.renderInput}/></Col>
      }      

      dishInfo = this.props.cart.cart.map(dish => {
        total += dish.dish_price*dish.quantity
        return (
          <Card bg="light" key={dish.cart_id} style={{width:"800px",marginLeft:50, marginTop:20, height:"200px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"30%"}}>{dish.dish_name}</Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row><Col>Offered by: {dish.rest_name}</Col></Row>
                <Row><Col>$$: {dish.dish_price}</Col></Row>
                <Row><Col>Quantity: {dish.quantity}</Col></Row>
                <Row><Col><Button style={{marginTop:10}} onClick={()=>this.handleClick(dish.cart_id)}>Remove from Cart</Button></Col></Row>
              </Card.Text>
            </Card.Body>
          </Card>
        )        
      })
    }

    let redirectVar = null;
    if(!window.localStorage.getItem('isSignedIn')){
      redirectVar = <Redirect to= "/login/"/>
    }
    return (
      <div>
        {redirectVar}
        <InternalHeader/>
        <Row>
          <Col>
            {dishInfo}
          </Col>    
          <Col>      
            <Row><Col style={{marginTop:50, fontWeight:1000, fontSize:20}}>{dishInfo?`Total = ${total}`:""}</Col></Row>
            <Row style={{marginTop:10}}>
              <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>                
                {takeout}
                {delivery}
                {dineout}
                {dishInfo?<button style={{marginTop:10}} type="submit">Place order</button>:""}
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {cart:state.cart, isSignedIn:state.auth.isSignedIn}
}

export default reduxForm({form:'radio'})(connect(mapStateToProps,{fetchCart})(cart));