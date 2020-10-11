import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {fetchCart} from '../actions';
import {Row, Col, Card, Toast} from 'react-bootstrap';
import {Button} from 'semantic-ui-react';
import axios from 'axios';
import {Form, Field, reduxForm} from 'redux-form';

class cart extends Component {
  state = {message:"", show:false}
  renderInput({input, label, type}){
    return (
      <div className="two fields">        
        <label>{label}</label> <input {...input} type={type}/>
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
              this.props.fetchCart(window.localStorage.getItem('id'));
              console.log("Order placed")
              this.setState({show:true, message:"Order Placed"})
              setTimeout(()=>{
                this.setState({show:false})
              },1000)
              console.log("Timeout set")
            } 
        }).catch(()=>{
          console.log("ERRR")
          this.setState({message:"Some error occured"})
          setTimeout(()=>{
            this.setState({show:false})
          },1000)
        });
  }

  render() {    
    let dishInfo = null;        
    let takeout = null;
    let delivery = null;
    let total = 0;    
    if(this.props.cart.cart.length !== undefined){      

      if(this.props.cart.cart[0].takeout === "true"){
        takeout = <Col><Field type="radio" value="takeout" label="Takeout" name="mode" component={this.renderInput}/></Col>
      }      

      if(this.props.cart.cart[0].delivery === "true"){
        delivery = <Col><Field type="radio" value="delivery" name="mode" label="Delivery" component={this.renderInput}/></Col>        
      }      

      dishInfo = this.props.cart.cart.map(dish => {
        total += dish.dish_price*dish.quantity
        console.log(dish)
        return (
          <Card bg="white" className="shadow p-3 mb-5 rounded" key={dish.cart_id} style={{width:"800px",marginLeft:50, marginTop:20, height:"200px"}}>
            <Card.Body>
            <div style={{width:"150px",height:"150px", float:"left"}}><img alt="Profile Photo" src={`http://localhost:3001/${dish.dish_path}`} style={{width:"150px",height:"150px"}}></img></div>
            <div>
              <Card.Title style={{marginLeft:"30%"}}>{dish.dish_name}</Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row><Col>Offered by: {dish.rest_name}</Col></Row>
                <Row><Col>$$: {dish.dish_price}</Col></Row>
                <Row><Col>Quantity: {dish.quantity}</Col></Row>
                <Row><Col><Button style={{marginTop:10}} onClick={()=>this.handleClick(dish.cart_id)}>Remove from Cart</Button></Col></Row>
              </Card.Text>
            </div>
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
          <Toast onClose={() => this.setState({show:false})} show={this.state.show} style={{position: 'absolute',top: 120,right: 10}} autohide>
            <Toast.Header>{this.state.message}</Toast.Header>
          </Toast>
          <Col>
            {dishInfo?dishInfo:"Cart is empty"}
          </Col>    
          <Col>      
            <Row><Col style={{marginTop:50, fontWeight:1000, fontSize:20}}>{dishInfo?`Total = ${total}`:""}</Col></Row>
            <Row style={{marginTop:10}}>
              <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>                
                {takeout}
                {delivery}
                {dishInfo?<Button style={{marginTop:10, marginLeft:13, backgroundColor:"#d32323", color:"white"}} type="submit">Place order</Button>:""}
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