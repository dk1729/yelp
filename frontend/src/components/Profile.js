import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import InternalHeader from './InternalHeader';
import {fetchUserData} from '../actions';
import { Row,Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTag, faCalendarWeek,  faStar, faUserFriends, faCamera, faIdCard } from '@fortawesome/free-solid-svg-icons'

class Profile extends Component {  
  componentDidMount(){        
    setTimeout(()=>{
      this.props.fetchUserData(window.localStorage.getItem('id'));
    },0)    
  }

  render() {    
    let redirectVar = null;
    if(!window.localStorage.getItem('isSignedIn')){
        redirectVar = <Redirect to= "/login/"/>
    }
    return (
      <div>
        {redirectVar} 
        <InternalHeader/>        
        <div style={{marginTop:10, border:"1px solid #f5f5f5", background:"#f5f5f5",width:"100%",height:"200px"}}>
          <Row>
            <Col>
              <div style={{marginLeft:100, marginTop:40, border:"1px solid black",width:"220px",height:"220px"}}>
                <img alt="Profile Photo" src={`http://localhost:3001/${this.props.formData.path}`} style={{width:"220px",height:"220px"}}></img>
              </div>
            </Col>
            <Col>
              <div style={{marginLeft:-50, marginTop:100,width:"300px",height:"50px"}}>
                <h1>{this.props.formData.first_name+" "+this.props.formData.last_name}</h1>
              </div>
              <div style={{marginLeft:-50, marginTop:1,width:"300px",height:"50px"}}>
                <h5>{this.props.formData.city}, {this.props.formData.state}</h5>
              </div>
            </Col>
            <Col>
              <div style={{marginLeft:-50, marginTop:100, borderLeft:"1px solid #e6e6e6",width:"300px",height:"70px"}}>
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="/addphoto">Add Profile Photo</Link>                     
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="/updateprofile">Update Your Profile</Link>
                  </Col>
                </Row>                
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="#">Find Friends</Link> 
                  </Col>
                </Row>                
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div style={{marginLeft:100, marginTop:40, width:"220px"}}>
              <Nav className="col-lg-12 d-none d-lg-block sidebar">
                  <div className="sidebar-sticky"></div>
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                    <Nav.Link eventKey="disabled" disabled>
                      <h4>{this.props.formData.first_name}'s Profile</h4>
                    </Nav.Link>
                  </Nav.Item>                                    
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                  <FontAwesomeIcon icon={faStar} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}}>
                    <Link to="/showPastReviews">Reviews</Link>
                    </Nav.Link>
                  </Nav.Item>                                                                                                            
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                  <FontAwesomeIcon icon={faCalendarWeek} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}}>
                    <Link to="/showEvents">Events</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                  <FontAwesomeIcon icon={faTag} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>                    
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}}>
                      <Link to="/orderHistory">
                        Order History
                      </Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            <Col>
              Useless Stuff
            </Col>
            <Col>
              <div style={{marginLeft:10, marginTop:10, borderLeft:"1px solid #e6e6e6",width:"300px",height:"10px"}}>
                <Row>
                    <Col style={{marginLeft:10}}>
                      <span>
                        <p><h5 style={{fontWeight:"bold"}}>Location</h5></p>                        
                        {this.props.formData.city?this.props.formData.city+", ":"Update Location in profile"} {this.props.formData.state}
                      </span>
                    </Col>
                  </Row>              
                  <Row style={{marginTop:10}}>
                    <Col style={{marginLeft:10}}>
                      <span>
                        <p><h5 style={{fontWeight:"bold"}}>Yelping Since</h5></p>
                        {this.props.formData.yelping_since}
                      </span>
                    </Col>
                  </Row>
                  <Row style={{marginTop:10}}>
                    <Col style={{marginLeft:10}}>
                      <span>
                        <p><h5 style={{fontWeight:"bold"}}>Things I Love</h5></p>
                        {this.props.formData.ilove?this.props.formData.ilove:"You haven't told us yet...Do tell"}
                      </span>
                    </Col>
                  </Row>
              </div>
            </Col>
          </Row>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {formData:state.formData.formValues, id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{fetchUserData})(Profile);