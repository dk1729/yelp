import React, { Component } from 'react'
import {Row,Col, Card, Modal} from 'react-bootstrap';
import { Rating } from 'semantic-ui-react';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
import axios from 'axios';

export default class ReviewModal extends Component {
  state = {rating:0, review:""}

  handleRate = (event,{rating}) => {
    event.preventDefault();
    console.log("Rating : "+rating)
    this.setState({rating:rating})
  }

  handleText = event => {
    event.preventDefault();
    console.log("Review : "+event.target.value)
    this.setState({review:event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("State : "+JSON.stringify(this.state))

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/submitReview',{rating:this.state.rating, review:this.state.review, user_id:window.localStorage.getItem('id'), rest_id:this.props.rest_id})
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)            
            if(response.status === 202){
              console.log("Added Review")
            }            
        }).catch(()=>{
          console.log("ERRR")
        });
  }

  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Give a Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Row style={{marginBottom:10}}>
            <Col>
              <Rating maxRating={5} defaultRating={this.state.rating} onRate={this.handleRate} icon='star' size='massive' />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Field id='review' onChange={this.handleText} value={this.state.review} control={TextArea} label='Review' placeholder='Review' />
            </Col>
          </Row>
          <Row style={{marginTop:10}}>
            <Col>
              <Form.Field id='btn' style={{backgroundColor:"#d32323", color:"white"}} control={Button} content='Submit Review' onClick={this.handleSubmit}/>
            </Col>
          </Row>          
        </Form>        
      </Modal.Body>
    </Modal>
    )
  }
}
