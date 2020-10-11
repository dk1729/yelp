import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default class RegisteredUsersModal extends Component {

  render() {
    let segments = null;    
    console.log(this.props)
    if(this.props.users.length!==undefined){
      segments = this.props.users.map(user => {
        return (          
          <Segment color="red"><Link to={{pathname:"/extUserProfile", state:{user_details:user}}}>{user.first_name} {user.last_name}</Link></Segment>
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
