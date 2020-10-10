import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Row, Col} from 'react-bootstrap';
import {fetchRestEvents} from '../actions';
import CreateEventModal from './CreateEventModal';
import {connect} from 'react-redux';
import {Form, Button, Card, Input } from 'semantic-ui-react';
import axios from 'axios';
import RegisteredUsersModal from './RegisteredUsersModal';

class RestEvents extends Component {
  state = {modalShow:false, modal2:false};

  componentDidMount(){
    this.props.fetchRestEvents(window.localStorage.getItem('rest_id'));
  }

  handleModal = event => {
    event.preventDefault();
    this.setState({modalShow:true})
  }

  handleModal2 = event => {
    event.preventDefault();
    this.setState({modal2:true})
  }

  render() {
    console.log("OK<<<<<<<<<<<")
    console.log(this.props)
    let event_cards = null;
    if(this.props.restEvents.restEvents.length!==undefined){
      event_cards = this.props.restEvents.restEvents.map(event => {
        return(
          <Card>
            <Card.Content>
              <Card.Header>{event.event_name}</Card.Header>
              <Card.Meta>{event.event_hash}</Card.Meta>
              <Card.Description>
                {event.event_description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              Event Date: {event.event_date.substring(0,10)}
            </Card.Content>
            <Card.Content>
              {event.event_location}
            </Card.Content>
            <Card.Content extra>
                <Button basic color='green' onClick = {this.handleModal2}>
                  Show Registered Users
                </Button>
                <RegisteredUsersModal users={event.registeredUsers} show={this.state.modal2} onHide={()=>this.setState({modal2:false})}/>
            </Card.Content>
          </Card>
        )
      })
    }
    return (
      <div>
        <InternalRestHeader/>
        <Row>
          <Col md={3} style={{borderRight:"1px solid black"}}>
            <Row>
              <Col>
                <Button style={{marginTop:10, marginLeft:50}} onClick = {this.handleModal}>Create Event</Button>
                <CreateEventModal show={this.state.modalShow} onHide={()=>this.setState({modalShow:false})}/>
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
  return {restEvents:state.restEvents, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{fetchRestEvents})(RestEvents);