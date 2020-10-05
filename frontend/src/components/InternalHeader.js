import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Navbar, Nav, FormControl, Form, Button,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {removeRestID, restSignOut, signOut, removeID} from '../actions';
import {Link} from 'react-router-dom';

class InternalHeader extends Component {
  logout = (event) => {
    event.preventDefault();    
    console.log("Clicked logout")
    this.props.removeID();
    this.props.signOut();
    window.localStorage.clear();
  }
  render() {
    return (
      <div className="container">
        <Row>
          <Col><a href="#"><img style={{marginLeft:-100, marginTop:15, width:120, height:60}}src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-a536dc4612adf182807e56e390709483.png"/></a></Col>
          <Col xs={6}><FormControl column="lg" lg="2" type="text" placeholder="Search" className="mr-sm-2" style={{marginTop:30, marginLeft:-60, marginBottom:5}}/>
            <span style={{marginLeft:-60, marginTop:50, width:"100%", height:"25px"}}><Link to="/restaurants">Restaurants</Link></span>
          </Col>
          <Col><Button variant="outline-primary" style={{marginTop:30, marginLeft:-80}}>Search</Button></Col>
          <Col><label style={{marginTop:30, marginLeft:-60}}>Businesses</label></Col>
          <Col><label style={{marginTop:30, marginLeft:-50}}>Write a Review</label></Col>
          <Col><div style={{marginTop:30}}><Link to="/profile">Profile</Link></div></Col>
          <Col><div style={{marginTop:30}}><Link to="/cart">Cart</Link></div></Col>
          <Col><div style={{marginTop:25}}><Button onClick={this.logout}>Logout</Button></div></Col>
        </Row>                          
      </div>      
    )
  }
}

const mapStateToProps = (state) =>{
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default (connect(mapStateToProps,{removeRestID, restSignOut,signOut, removeID})(InternalHeader));