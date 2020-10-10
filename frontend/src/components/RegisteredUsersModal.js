import React, { Component } from 'react'
import {Row,Col, Modal} from 'react-bootstrap';
import { Segment } from 'semantic-ui-react'

export default class RegisteredUsersModal extends Component {
  render() {
    let segments = null;

    if(this.props.users.length!==undefined){
      segments = this.props.users.map(user => {
        return (
          <Segment color="red">{user.first_name} {user.last_name} from {user.city}, {user.state}</Segment>
        )
      })
    }    
    return (
      <div>
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Registered Users
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
