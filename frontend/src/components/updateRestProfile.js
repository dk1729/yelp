import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {fetchRestData} from '../actions';
import axios from 'axios';
import {Redirect} from 'react-router';
import InternalRestHeader from './InternalRestHeader';
import {Row,Nav,Col} from 'react-bootstrap';

class updateRestProfile extends Component {
  componentDidMount(){
    this.props.fetchRestData(window.localStorage.getItem('rest_id'));
  }

  renderInput = ({input, label, type, placeholder}) => {
    return (
      <div className="field" style={{width:"500px"}}>
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues =>{
    console.log("Old formvalues = "+JSON.stringify(formValues))
    formValues = {...formValues, rest_id:window.localStorage.getItem('rest_id')}
    console.log("New formvalues = "+JSON.stringify(formValues))    

    if(formValues.address){
      axios.defaults.withCredentials = false;
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ formValues.address +"&key=AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss").then(response => {                    
        console.log(response.data.results[0].geometry.location)
        console.log({...formValues, latitude:response.data.results[0].geometry.location.lat, longitude:response.data.results[0].geometry.location.lng})
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/updateRest',{...formValues, latitude:response.data.results[0].geometry.location.lat, longitude:response.data.results[0].geometry.location.lng})
            .then(response => {
                console.log("Status Code : ",response.status);                              

            }).catch((err)=>{
              console.log("ERRR : ",err)
            });
      })
    }
    else{
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/updateRest',formValues)
          .then(response => {
              console.log("Status Code : ",response.status);                              

          }).catch((err)=>{
            console.log("ERRR : ",err)
          });
    }    

    
  }
  render() {
    console.log("Props of restDetails = "+JSON.stringify(this.props.restDetails))
    let redirectVar = null;
    console.log("Updationg restuarant profile")
    if(!window.localStorage.getItem('isRestSignedIn')){
        redirectVar = <Redirect to= "/restLogin/"/>
    }
    return (
      <div>
        {redirectVar}
        <InternalRestHeader/>
        <div className="container">
          <Row style={{marginTop:"7%"}}>          
              <Col md={3}>
                <Nav className="col-lg-12 d-none d-lg-block sidebar">
                  <div className="sidebar-sticky"></div>
                  <Nav.Item >
                    <Nav.Link eventKey="disabled" disabled>
                      <h4>{this.props.restDetails.rest_name}'s Account Settings</h4>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>Password</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Email
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Location
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Friends
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Privacy Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    External
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>                
              <Col md={9}>
              <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field placeholder={this.props.restDetails.rest_name} name="rest_name"  component={this.renderInput} label="Restaurant Name" type="text"/>
                <Field placeholder={this.props.restDetails.phone} name="phone" component={this.renderInput} label="Phone number" type="text"/>
                <Field placeholder={this.props.restDetails.zip} name="zip" component={this.renderInput} label="ZIP Code" type="number"/>
                <Field placeholder={this.props.restDetails.location} name="location" component={this.renderInput} label="Location" type="text"/>
                <Field placeholder={this.props.restDetails.hood} name="hood" component={this.renderInput} label="Neighborhood" type="text"/>
                <Field placeholder={this.props.restDetails.address} name="address" component={this.renderInput} label="Address" type="text"/>
                <Field placeholder={this.props.restDetails.timings} name="timings" component={this.renderInput} label="timings" type="text"/>
                <Field placeholder={this.props.restDetails.takeout} name="takeout" component={this.renderInput} label="takeout" type="text"/>
                <Field placeholder={this.props.restDetails.delivery} name="delivery" component={this.renderInput} label="delivery" type="text"/>
                <Field placeholder={this.props.restDetails.dineout} name="dineout" component={this.renderInput} label="dineout" type="text"/>                                
                <Field placeholder={this.props.restDetails.description} name="description" component={this.renderInput} label="Description" type="text"/>
                <button className="ui button primary">Submit</button>
              </form>
              </Col>          
          </Row>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {restDetails:state.restDetails.restDetails, rest_id:state.rest_id.rest_id, isRestSignedIn:state.rest_auth.isRestSignedIn}
}

export default reduxForm({form:'updateRestProfile'})(connect(mapStateToProps,{fetchRestData})(updateRestProfile));