import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Row,Col, Card} from 'react-bootstrap';

export default class ExternalUserProfile extends Component {
  render() {
    console.log(this.props.location.state)
    return (      
      <div>
        <InternalRestHeader/>
        <Row>
          <Col>
            Image
          </Col>
          <Col>
            <h1>{this.props.location.state.name}</h1>
            <h4>{this.props.location.state.city}, {this.props.location.state.state}</h4>
            <h4>{this.props.location.state.country}</h4>
            <h4>{this.props.location.state.ilove}</h4>
          </Col>
        </Row>
      </div>
    )
  }
}
