import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';

export default class ExternalUserProfile extends Component {
  render() {
    console.log(this.props.location.state.user_id)
    return (      
      <div>
        <InternalRestHeader/>
        User profile
      </div>
    )
  }
}
