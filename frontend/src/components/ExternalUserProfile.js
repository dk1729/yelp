import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Row,Col, Card} from 'react-bootstrap';

export default class ExternalUserProfile extends Component {  
  render() {
    let redirectVar = null;
    console.log(this.props.location.state.user_details)    
    
    return (      
      // <div>
      //   <InternalRestHeader/>
      //   <Row>
      //     <Col style={{border:"1px solid black"}}>
      //       Image
      //     </Col>
      //     <Col style={{border:"1px solid black"}}>
      //       <h1>{this.props.location.state.user_details.user_details.first_name}</h1>
      //       <h4>{this.props.location.state.user_details.user_details.city}, {this.props.location.state.user_details.user_details.state}</h4>
      //       <h4>{this.props.location.state.user_details.user_details.country}</h4>
      //       <h4>{this.props.location.state.user_details.user_details.ilove}</h4>
      //     </Col>
      //   </Row>
      // </div>
      <div>
      {redirectVar}
      <InternalRestHeader/>        
      <div style={{marginTop:10, border:"1px solid #f5f5f5", background:"#f5f5f5",width:"100%",height:"200px"}}>
        <Row>
          <Col>
            <div style={{marginLeft:100, marginTop:40, border:"1px solid black",width:"220px",height:"220px"}}>
              {/* <img alt="Profile Photo" src={`http://localhost:3001/${this.props.formData.path}`} style={{width:"220px",height:"220px"}}></img> */}
              image goes here
            </div>
          </Col>
          <Col>
            <div style={{marginLeft:-50, marginTop:100,width:"300px",height:"50px"}}>
              <h1>{this.props.location.state.user_details.first_name} {this.props.location.state.user_details.last_name}</h1>
            </div>
            <div style={{marginLeft:-50, marginTop:1,width:"300px",height:"50px"}}>
              <h5>{this.props.location.state.user_details.city?this.props.location.state.user_details.city:"Don't know"}</h5>
            </div>
          </Col>
          <Col>            
          </Col>
        </Row>
        <Row>
          <Col md={3}>            
          </Col>
          <Col>              
            <Card bg="white" className="shadow p-3 mb-5 rounded" style={{color:"black", width:"400px",marginLeft:20, marginTop:15}}>
              <Card.Body>
                <Card.Text>
                  <Row><Col><h5>Email: {this.props.location.state.user_details.email}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Phone: {this.props.location.state.user_details.phone?this.props.location.state.user_details.phone:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Nickname: {this.props.location.state.user_details.nickname?this.props.location.state.user_details.nickname:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Sex: {this.props.location.state.user_details.sex?this.props.location.state.user_details.sex:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Headline: {this.props.location.state.user_details.headline?this.props.location.state.user_details.headline:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Hometown: {this.props.location.state.user_details.hometown?this.props.location.state.user_details.hometown:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Blog: {this.props.location.state.user_details.blog?this.props.location.state.user_details.blog:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Favorite Book: {this.props.location.state.user_details.book?this.props.location.state.user_details.book:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>First Concert: {this.props.location.state.user_details.concert?this.props.location.state.user_details.concert:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Last Meal: {this.props.location.state.user_details.lastmeal?this.props.location.state.user_details.lastmeal:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Recent Discovery: {this.props.location.state.user_details.discovery?this.props.location.state.user_details.discovery:"---"}</h5></Col></Row>
                  <Row style={{marginTop:5}}><Col><h5>Current Crush: {this.props.location.state.user_details.crush?this.props.location.state.user_details.crush:"---"}</h5></Col></Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div style={{marginLeft:10, marginTop:10, borderLeft:"1px solid #e6e6e6",width:"300px",height:"150px"}}>
              <Row>
                  <Col style={{marginLeft:10}}>
                    <span>
                      <p><h5 style={{fontWeight:"bold"}}>Location</h5></p>                        
                      {this.props.location.state.user_details.city?this.props.location.state.user_details.city:"Don't know"}
                    </span>
                  </Col>
                </Row>              
                <Row style={{marginTop:10}}>
                  <Col style={{marginLeft:10}}>
                    <span>
                      <p><h5 style={{fontWeight:"bold"}}>Things I Love</h5></p>
                      {this.props.location.state.user_details.ilove?this.props.location.state.user_details.ilove:"Nothing Right Now"}
                    </span>
                  </Col>
                </Row>
                <Row style={{marginTop:10}}>
                  <Col style={{marginLeft:10}}>
                    <span>
                      <p><h5 style={{fontWeight:"bold"}}>Yelping Since</h5></p>
                      {this.props.location.state.user_details.yelping_since?this.props.location.state.user_details.yelping_since:"---"}
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