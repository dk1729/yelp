import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Row, Button, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {removeRestID, restSignOut} from '../actions';
import {Link} from 'react-router-dom';

class InternalRestHeader extends Component {
  logout = (event)=>{
    event.preventDefault();    
    this.props.removeRestID();
    this.props.restSignOut();
    window.localStorage.clear();
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col><a href="#"><img style={{marginLeft:-100, marginTop:15, width:120, height:60}}src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-a536dc4612adf182807e56e390709483.png"/></a></Col>
          <Col><div style={{marginTop:30, marginLeft:-50}}><Link to="/restprofile">Profile</Link></div></Col>
          <Col><div style={{marginTop:25, marginLeft:-80}}><Button onClick={this.logout}>Logout</Button></div></Col>
        </Row>                  
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default (connect(mapStateToProps,{removeRestID, restSignOut})(InternalRestHeader));