import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InternalHeader from './InternalHeader';
import ImageUploader from 'react-images-upload';
import {Button} from 'semantic-ui-react';

class addphoto extends Component {

  onDrop = (picture) => {
    console.log(picture.target.files[0])
    var formData = new FormData();
    formData.append('image', picture.target.files[0]);
    formData.append('id', window.localStorage.getItem('id'));
    for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
    }

    const config = {
      headers:{
        'enctype':'multipart/form-data'
      }
    }
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3001/upload", formData, config)
      .then(res => {
        console.log(res)
      })
  }  

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('id')){
        redirectVar = <Redirect to= "/login/"/>
    }
    return (      
      <div>
        {redirectVar}
        <InternalHeader/>
        <div>
          <input type = 'file' onChange = {this.onDrop} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps)(addphoto);