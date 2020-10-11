import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {fetchEvents, fetchRegisteredEvents} from '../actions';
import {connect} from 'react-redux';
import {Form, Button, Card, Input } from 'semantic-ui-react';
import axios from 'axios';
import {Row,Col, Toast} from 'react-bootstrap';
import RegisteredEvents from './RegisteredEvents';

class ShowEvents extends Component {
  state = {searchTerm:"", cards:[], modalShow:false, message:"", show:false}

  handleModal = event => {
    event.preventDefault();
    this.setState({modalShow:true})
  }

  componentDidMount(){
    this.props.fetchRegisteredEvents(window.localStorage.getItem('id'));
    this.props.fetchEvents();
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({searchTerm:event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)

    if(this.state.searchTerm === ""){
      this.setState({cards:[]})
    }
    else{
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:3001/searchEvents/'+this.state.searchTerm)
          .then(response => {
              console.log("Status Code : ",response.status);            
              console.log(response.data)
              this.setState({cards:response.data})
          }).catch((err)=>{
            console.log("ERRR : ",err)
          });
    }    
  }

  register = (user_id, event_id) => {
    console.log("User id = "+user_id)
    console.log("Event id = "+event_id)

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/registerForEvent',{user_id, event_id})
        .then(response => {
            console.log("Status Code : ",response.status);            
            if(response.status === 200){
              this.setState({message:"Registered"})
              this.setState({show:true})
              setTimeout(()=>{
                this.setState({show:false})
              },1000)
              window.location.reload(false)
            }
            else{
              this.setState({message:"Already Registered"})
              this.setState({show:true})
              setTimeout(()=>{
                this.setState({show:false})
              },1000)
            }
        }).catch((err)=>{          
          this.setState({message:"Already Registered"})
          this.setState({show:true})
          setTimeout(()=>{
            this.setState({show:false})
          },1000)
        });
  }
  render() {
    let event_cards = null;
    console.log("registered events")
    console.log(this.state.re)
    if(this.state.cards.length>0){
      event_cards = this.state.cards.map(event => {
        return (
          <Card className="shadow-sm p-3 mb-5 rounded">
            <Card.Content>
              <Card.Header>{event.event_name}</Card.Header>
              <Card.Meta>{event.event_hash}</Card.Meta>
              <Card.Description>
                {event.event_description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              Event by: {event.rest_name}
            </Card.Content>
            <Card.Content>
              Event Date: {event.event_date.substring(0,10)}
            </Card.Content>
            <Card.Content>
              {event.event_location}
            </Card.Content>
            <Card.Content extra>
                <Button basic color='green' onClick={() => this.register(window.localStorage.getItem('id'), event.event_id)}>
                  Register
                </Button>
            </Card.Content>
          </Card>
        )        
      })
    }
    else if(this.props.events.events.length!==undefined){
      event_cards = this.props.events.events.map(event => {
        return (
          <Card className="shadow-sm p-3 mb-5 rounded">
            <Card.Content>
              <Card.Header>{event.event_name}</Card.Header>
              <Card.Meta>{event.event_hash}</Card.Meta>
              <Card.Description>
                {event.event_description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              Event by: {event.rest_name}
            </Card.Content>
            <Card.Content>
              Event Date: {event.event_date.substring(0,10)}
            </Card.Content>
            <Card.Content>
              {event.event_location}
            </Card.Content>
            <Card.Content extra>
                <Button basic color='green' onClick={() => this.register(window.localStorage.getItem('id'), event.event_id)}>
                  Register
                </Button>
            </Card.Content>
          </Card>
        )        
      })
    }
    return (      
      <div>
        <InternalHeader/>
        <Row style={{marginTop:20}}>
          <Toast onClose={() => this.setState({show:true})} show={this.state.show} style={{position: 'absolute',top: 120,right: 10}}autohide>
            <Toast.Header>{this.state.message}</Toast.Header>
          </Toast>
          <Col md={2}>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}  style={{marginLeft:20}}>
                  <Input icon='calendar' iconPosition='left' value={this.state.searchTerm} placeholder='Search events...' onChange={this.handleChange}/>
                </Form>
              </Col>  
            </Row>
            <Row>
              <Col>
                <Button color="red" style={{marginLeft:20, marginTop:10}} onClick = {this.handleModal}>View Registered Events</Button>
                <RegisteredEvents show={this.state.modalShow} onHide={()=>this.setState({modalShow:false})} events={this.props.registeredEvents.registeredEvents}/>
              </Col>
            </Row>                        
          </Col>
          <Col>
            <Card.Group>
              {event_cards}  
            </Card.Group>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {registeredEvents:state.registeredEvents, events:state.events, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{fetchEvents, fetchRegisteredEvents})(ShowEvents);