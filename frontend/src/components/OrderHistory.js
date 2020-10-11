import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {Field, reduxForm, Form} from 'redux-form';
import {Row,Col, Card} from 'react-bootstrap';
import {fetchOrderData} from '../actions';
import {connect} from 'react-redux';
import axios from 'axios';

class OrderHistory extends Component {

  state={updatedData:[]}

  componentDidMount(){
    this.props.fetchOrderData(window.localStorage.getItem('id'), "user");
  }

  renderInput = ({input, label, type}) => {
    return (
      <div className="field" style={{marginTop:10}}>        
        <input {...input} type={type} style={{marginLeft:10, marginTop:10}}/><label style={{marginLeft:10}}>{label}</label>
      </div>
    );
  }

  onSubmit = formValues => {
    console.log("Ok")
    console.log(formValues)
    let temp = []
    for (var key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        console.log(key + " -> " + formValues[key]);
        if(formValues[key]){
          temp.push(key)
        }        
      }
    }
    console.log(temp)

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/filter_order_status',{id:window.localStorage.getItem('id'), type:"user", statuses:temp})
    .then(response => {
      console.log("Status Code : ",response.status);
      console.log(response.data)
      this.setState({updatedData:response.data})
    }).catch((err)=>{
      console.log("ERRR : ",err)
    });
  }

  render() {
    let filter_options = null;
    let order_cards = null;
    if(this.state.updatedData.length>0){
      order_cards = this.state.updatedData.map(order => {
        let item_details = null;
        item_details = order.dishes.map(dish => {
          return (
            <Row><Col>{dish}</Col></Row>
          )
        })
        
        //Delivery: Received, Preparing, Out for delivery, deivered, cancelled
        //Takeout: Received, Preparing, Ready for pickup, picked up, cancelled
        return (
          <Card bg="white" className="shadow p-3 mb-5 rounded" style={{width:"700px",marginLeft:50, marginTop:20, height:"200px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"10%"}}>{order.rest_name}</Card.Title>
              <Card.Text style={{marginLeft:"10%"}}>
                <Row><Col>{order.mode}</Col></Row>
                <Row><Col>Total: {order.total}</Col></Row>
                <Row><Col>Status: {order.status}</Col></Row>
                {item_details}                  
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

        //Delivery: Received, Preparing, Out for delivery, deivered, cancelled
        //Takeout: Received, Preparing, Ready for pickup, picked up, cancelled
        return (
          <Card bg="white" className="shadow p-3 mb-5 rounded" style={{width:"700px",marginLeft:50, marginTop:20, height:"200px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"10%"}}>{order.rest_name}</Card.Title>
              <Card.Text style={{marginLeft:"10%"}}>
                <Row><Col>{order.mode}</Col></Row>
                <Row><Col>Total: {order.total}</Col></Row>
                <Row><Col>Status: {order.status}</Col></Row>
                {item_details}                  
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })
    }

    return (
      <div>
        <InternalHeader/>
        <Row>
          <Col md={2} className="shadow p-3 mb-5 rounded">
            <Row><Col><div style={{marginTop:10, marginLeft:10}}><h4>Filter</h4></div></Col></Row>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="Placed" label="Order Received"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="preparing" label="Preparing"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="out_for_delivery" label="Out For Delivery"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="delivered" label="Delivered"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="ready_for_pickup" label="Ready For Pickup"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="picked_up" label="Picked Up"></Field></Col></Row>
              <Row><Col><Field component={this.renderInput} type="checkbox" name="cancelled" label="Cancelled"></Field></Col></Row>
              <Row><Col><button className="ui button primary" style={{marginTop:10, marginLeft:10, backgroundColor:"#d32323"}}>Apply filters</button></Col></Row>
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

export default reduxForm({form:'user_order_filter'})(connect(mapStateToProps,{fetchOrderData})(OrderHistory));