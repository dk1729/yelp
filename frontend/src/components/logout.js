import React, { Component } from 'react'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

export default class logout extends Component {
  render() {
    cookie.remove('cookie', { path: '/' })
    window.localStorage.removeItem('isSignedIn');
    console.log(window.localStorage.removeItem('isSignedIn'));
    return (
      <div>
        <Redirect to="/login"/>        
      </div>
    )
  }
}
