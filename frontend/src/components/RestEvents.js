import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Row, Col} from 'react-bootstrap';
import {fetchRestEvents} from '../actions';
import CreateEventModal from './CreateEventModal';
import {connect} from 'react-redux';
import {Button, Card } from 'semantic-ui-react';
import RegisteredUsersModal from './RegisteredUsersModal';

class RestEvents extends Component {
  state = {modalShow:false, modal2:false, RU:[]};

  componentDidMount(){
    this.props.fetchRestEvents(window.localStorage.getItem('rest_id'));
  }

  handleModal = event => {
    event.preventDefault();
    this.setState({modalShow:true})
  }

  handleHide = () => {
    this.props.fetchRestEvents(window.localStorage.getItem('rest_id'));
    this.setState({modalShow:false})
  }

  handleModal2 = (id, RU) => {
    console.log("ID........."+id)    
    console.log("Modal 2 clicked")
    this.setState({RU:RU, modal2:true})
  }

  render() {
    console.log("OK<<<<<<<<<<<")
    console.log(this.props)
    let event_cards = null;
    if(this.props.restEvents.restEvents.length!==undefined){
      event_cards = this.props.restEvents.restEvents.map(event => {
        console.log(event.event_id)
        console.log(event.registeredUsers)
        return(
          <div key={event.event_id}>
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
                  <Button basic color='green' onClick = {() => this.handleModal2(event.event_id, event.registeredUsers)}>
                    Show Registered Users
                  </Button>                  
              </Card.Content>
            </Card>
          </div>
        )
      })
    }
    return (
      <div>
        <InternalRestHeader/>
        <RegisteredUsersModal users={this.state.RU} show={this.state.modal2} onHide={()=>this.setState({modal2:false})}/>
        <Row>
          <Col md={2} >
            <Row>
              <Col >
                <Button className="shadow p-3 mb-5 rounded" style={{marginTop:10}} style={{marginTop:10, marginLeft:50, backgroundColor:"#d32323", color:"white"}} onClick = {this.handleModal}>Create Event</Button>
                <CreateEventModal show={this.state.modalShow} onHide={this.handleHide}/>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card.Group style={{marginLeft:10, marginTop:10}}>
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