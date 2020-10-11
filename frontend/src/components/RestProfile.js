import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import InternalRestHeader from './InternalRestHeader';
import {fetchRestData, fetchDishData} from '../actions';
import {Row,Col, Nav, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarWeek, faStar, faUser, faUserFriends, faCamera, faIdCard } from '@fortawesome/free-solid-svg-icons'

class RestProfile extends Component {
  
  componentDidMount(){        
    setTimeout(()=>{
      this.props.fetchRestData(window.localStorage.getItem('rest_id'));
      this.props.fetchDishData(window.localStorage.getItem('rest_id'));
    },0)    
  }

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('isRestSignedIn')){
      redirectVar = <Redirect to= "/restlogin/"/>
    }
    let dishesInfo = null;
    if(this.props.dishes.dishes.length !== undefined){
      dishesInfo = this.props.dishes.dishes.map(dish => {
        return (
          <Card bg="white" className="shadow p-3 mb-5 rounded" style={{color:"black", width:"600px",marginLeft:20, marginTop:15, height:"200px"}}>
              <Card.Body>
                {/* <Card.Img style={{width:100, height:100}} src={`http://localhost:3001/${this.props.restDetails.path1}`}></Card.Img> */}
                <div style={{width:"100px",height:"100px", float:"left"}}><img alt="Profile Photo" src={`http://localhost:3001/${dish.dish_path}`} style={{width:"100px",height:"100px"}}></img></div>
                <div>
                  <Card.Title style={{marginLeft:"30%"}}>Name: {dish.dish_name}</Card.Title>
                  <Card.Text style={{marginLeft:"30%"}}>
                    <Row><Col>Description: {dish.description}</Col></Row>
                    <Row><Col>$$: {dish.dish_price}</Col></Row>
                    <Row><Col>Ingredients: {dish.ingredients}</Col></Row>
                    <Row><Col>Eat it for: {dish.dish_type}</Col></Row>
                    <Link to={{pathname:'/updateDish', state:{ingredients:dish.ingredients, dish_type:dish.dish_type, dish_id:dish.dish_id,dish_name:dish.dish_name, description:dish.description, dish_price:dish.dish_price} }}>Edit</Link>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
        )        
      })
    }
    return (
      <div>
        {redirectVar}
        <InternalRestHeader/>        
        <div style={{marginTop:10, border:"1px solid #f5f5f5", background:"#f5f5f5",width:"100%",height:"200px"}}>
          <Row>
            <Col>
              <div style={{marginLeft:100, marginTop:40, border:"1px solid black",width:"220px",height:"220px"}}>
                <img alt="Profile Photo" src={`http://localhost:3001/${this.props.restDetails.path1}`} style={{width:"220px",height:"220px"}}></img>
              </div>
            </Col>
            <Col>
              <div style={{marginLeft:-50, marginTop:100,width:"300px",height:"50px"}}>
                <h1>{this.props.restDetails.rest_name}</h1>
              </div>
              <div style={{marginLeft:-50, marginTop:1,width:"300px",height:"50px"}}>
                <h5>{this.props.restDetails.location}</h5>
              </div>
            </Col>
            <Col>
              <div style={{marginLeft:-50, marginTop:100, borderLeft:"1px solid #e6e6e6",width:"300px",height:"70px"}}>
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="/addrestphotos">Add Photos</Link>                     
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="/updateRestProfile">Update Restaurant Profile</Link>
                  </Col>
                </Row>                
                <Row>
                  <Col>
                    <span style={{marginLeft:10, marginTop:10, color:"#007BFF"}}>
                      <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon>
                    </span>
                    <Link style={{marginLeft:10, marginTop:10}} to="/addDish">Add Dishes</Link> 
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
                      <h4>{this.props.restDetails.rest_name}'s Profile</h4>
                    </Nav.Link>
                  </Nav.Item>                  
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>                                        
                    <FontAwesomeIcon icon={faUser} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}}><Link to="/rest_orders">Orders</Link></Nav.Link>
                  </Nav.Item>
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                  <FontAwesomeIcon icon={faStar} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}}>
                    <Link to="/showReviews">Reviews</Link>
                    </Nav.Link>
                  </Nav.Item>                                    
                  <Nav.Item style={{borderBottom:"1px solid #e6e6e6"}}>
                  <FontAwesomeIcon icon={faCalendarWeek} style={{marginTop:10, marginLeft:10, float:"left"}}></FontAwesomeIcon>
                    <Nav.Link eventKey="disabled" style={{marginLeft:15}} >
                    <Link to="/restEvents">Events</Link>
                    </Nav.Link>
                  </Nav.Item>                  
                </Nav>
              </div>
            </Col>
            <Col>              
              {dishesInfo}
            </Col>
            <Col>
              <div style={{marginLeft:10, marginTop:10, borderLeft:"1px solid #e6e6e6",width:"300px",height:"100px"}}>
                <Row>
                    <Col style={{marginLeft:10}}>
                      <span>
                        <p><h5 style={{fontWeight:"bold"}}>Location</h5></p>                        
                        {this.props.restDetails.location}
                      </span>
                    </Col>
                  </Row>              
                  <Row style={{marginTop:10}}>
                    <Col style={{marginLeft:10}}>
                      <span>
                        <p><h5 style={{fontWeight:"bold"}}>Things I Love</h5></p>
                        Nothing much for now
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

const mapStateToProps = (state) => {
  return {restDetails:state.restDetails.restDetails, dishes:state.dishes, rest_id:state.rest_id.rest_id, isRestSignedIn:state.rest_auth.isRestSignedIn}
}

export default connect(mapStateToProps,{fetchRestData, fetchDishData})(RestProfile);