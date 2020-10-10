import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchOrderData} from '../actions';
import InternalRestHeader from './InternalRestHeader';
import {Row,Col, Card} from 'react-bootstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Field, reduxForm, Form} from 'redux-form';
import {Link} from 'react-router-dom';

class viewRestOrders extends Component {
  state={updatedData:[]}

  componentDidMount(){
    this.props.fetchOrderData(window.localStorage.getItem('rest_id'), "rest");
  }

  onSubmit = formValues => {    
    console.log("FormValues : "+JSON.stringify(formValues))
    let temp = []
    for (var key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        console.log(key + " -> " + formValues[key]);
        console.log("status -> " + key);
        if(key === "past" && formValues[key]){
          temp.push("delivered")
          temp.push("picked_up")
        }
        else if(key === "current" && formValues[key]){
          temp.push("ready_for_pickup")
          temp.push("out_for_delivery")
          temp.push("Placed")
        }
        else if(key === "cancelled" && formValues[key]){
          temp.push(key)
        }        
      }
    }
    console.log(temp)

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/filter_order_status',{id:window.localStorage.getItem('rest_id'), type:"rest", statuses:temp})
    .then(response => {
      console.log("Status Code : ",response.status);
      console.log(response.data)
      this.setState({updatedData:response.data})
    }).catch((err)=>{
      console.log("ERRR : ",err)
    });
  }

  renderInput = ({input, label, type}) => {
    return (
      <div className="field" style={{marginTop:10}}>        
        <input {...input} type={type} style={{marginLeft:10, marginTop:10}}/><label style={{marginLeft:10}}>{label}</label>
      </div>
    );
  }

  handleClick = event => {
    event.preventDefault();
    console.log(event.target.value)
    console.log(event.target.id)

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/updateOrderStatus',{order_id:event.target.id, status:event.target.value})
        .then(response => {
            console.log("Status Code : ",response.status);
        }).catch((err)=>{
          console.log("ERRR : ",err)
        });
  }

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('isRestSignedIn')){
      redirectVar = <Redirect to= "/restlogin/"/>
    }
    let order_cards = null;
    if(this.state.updatedData.length>0){
      order_cards = this.state.updatedData.map(order => {
        let item_details = null;
        item_details = order.dishes.map(dish => {
          return (
            <Row><Col>{dish}</Col></Row>
          )
        })

        let var3 = null;
        let var4 = null;

        if(order.mode==="takeout"){          
          var3 = <Col><button onClick={this.handleClick} value="ready_for_pickup" id={order.order_id}>Ready for Pickup</button></Col>
          var4 = <Col><button onClick={this.handleClick} value="picked_up" id={order.order_id}>Picked Up</button></Col>
        }

        if(order.mode==="delivery"){          
          var3 = <Col><button onClick={this.handleClick} value="out_for_delivery" id={order.order_id}>Out for Delivery</button></Col>
          var4 = <Col><button onClick={this.handleClick} value="delivered" id={order.order_id}>Delivered</button></Col>          
        }

        //Delivery: Received, Preparing, Out for delivery, deivered, cancelled
        //Takeout: Received, Preparing, Ready for pickup, picked up, cancelled
        return (
          <Card bg="light" style={{width:"1000px",marginLeft:50, marginTop:20, height:"250px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"30%"}}>{order.user_name}</Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row><Col>{order.mode}</Col></Row>
                <Row><Col>Total: {order.total}</Col></Row>
                {item_details}
                  <Row>
                    <Col><button value="preparing" onClick={this.handleClick} id={order.order_id}>Preparing</button></Col>
                    {var3}
                    {var4}
                    <Col><button value="cancelled" onClick={this.handleClick} id={order.order_id}>Cancelled</button></Col>
                  </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })
    }
    else if(this.props.orders.orders.length!==undefined){
      order_cards = this.props.orders.orders.map(order => {
        let item_details = null;
        item_details = order.dishes.map(dish => {
          return (
            <Row><Col>{dish}</Col></Row>
          )
        })

        let var3 = null;
        let var4 = null;

        if(order.mode==="takeout"){          
          var3 = <Col><button onClick={this.handleClick} value="ready_for_pickup" id={order.order_id}>Ready for Pickup</button></Col>
          var4 = <Col><button onClick={this.handleClick} value="picked_up" id={order.order_id}>Picked Up</button></Col>
        }

        if(order.mode==="delivery"){          
          var3 = <Col><button onClick={this.handleClick} value="out_for_delivery" id={order.order_id}>Out for Delivery</button></Col>
          var4 = <Col><button onClick={this.handleClick} value="delivered" id={order.order_id}>Delivered</button></Col>          
        }

        //Delivery: Received, Preparing, Out for delivery, deivered, cancelled
        //Takeout: Received, Preparing, Ready for pickup, picked up, cancelled
        return (
          <Card bg="light" style={{width:"1000px",marginLeft:50, marginTop:20, height:"250px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"30%"}}><Link to={{pathname:"/extUserProfile", state:{name:order.user_name, country:order.country, state:order.state, city:order.city, ilove:order.ilove}}} >{order.user_name}</Link></Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row><Col>{order.mode}</Col></Row>
                <Row><Col>Total: {order.total}</Col></Row>
                {item_details}
                  <Row>
                    <Col><button value="preparing" onClick={this.handleClick} id={order.order_id}>Preparing</button></Col>
                    {var3}
                    {var4}
                    <Col><button value="cancelled" onClick={this.handleClick} id={order.order_id}>Cancelled</button></Col>
                  </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })
    }
    return (
      <div>
        {redirectVar}
        <InternalRestHeader/>
        <Row>
          <Col md={2} style={{borderRight:"1px solid black", marginLeft:10}}>
            <Row><Col><h4>Filter</h4></Col></Row>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="current" label="Current Orders"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="past" label="Past Orders"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="cancelled" label="Cancelled Orders"></Field></Col></Row>
              <Row><Col><button className="ui button primary" style={{marginTop:10}}>Apply filters</button></Col></Row>
            </Form>
          </Col>
          <Col>
            <Row>
              {order_cards}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {orders:state.orders}
}

export default reduxForm({form:'order_filter'})(connect(mapStateToProps,{fetchOrderData})(viewRestOrders));