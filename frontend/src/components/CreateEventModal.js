import React, { Component } from 'react'
import {Row,Col, Modal} from 'react-bootstrap';
import axios from 'axios';
import {Form, Field, reduxForm} from 'redux-form';
import {Redirect} from 'react-router';

class CreateEventModal extends Component {

  renderInput = ({input, label, type, placeholder}) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues =>{
    console.log("Old formvalues = "+JSON.stringify(formValues))    
    formValues = {...formValues, rest_id:window.localStorage.getItem('rest_id')}
    console.log("New formvalues = "+JSON.stringify(formValues))
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/addEvent',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);                              
            if(response.status == 200){
              this.props.onHide();
            }
        }).catch((err)=>{
          console.log("ERRR : ",err)
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
          Create An Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Row style={{marginBottom:10}}>
            <Col>
              <Field name="event_name" component={this.renderInput} label="Event Name" type="text"/>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col>
              <Field name="event_hash" component={this.renderInput} label="Event Hash" type="text"/>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col>
              <Field name="event_description" component={this.renderInput} label="Event Description" type="text"/>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col>
              <Field name="event_location" component={this.renderInput} label="Event Location" type="text"/>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col>
              <Field name="event_date" component={this.renderInput} label="Event Date" type="date"/>
            </Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col>
              <button className="ui button primary">Create An Event</button>              
            </Col>
          </Row>          
        </Form>        
      </Modal.Body>
    </Modal>
    )
  }
}

export default reduxForm({form:'createEvent'})(CreateEventModal);