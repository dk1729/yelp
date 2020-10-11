import React, { Component } from 'react'
import {Modal} from 'react-bootstrap';
import { Segment } from 'semantic-ui-react'

class RegisteredEvents extends Component {
  render() {
    console.log("Rendered")

    let segments = null;

    if(this.props.events.length!==undefined){
      segments = this.props.events.map(event => {
        return (
          <Segment color="red">{event.event_name}, on {event.event_date.substring(0,10)}</Segment>
        )
      })
    }    

    return (
      <div>
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Registered Events
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Segment.Group raised>
              {segments}
            </Segment.Group>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default RegisteredEvents;