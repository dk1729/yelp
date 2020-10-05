import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class addphoto extends Component {
  addPic = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("profile_photo", event.target.files[0])
    const config = {
      headers:{
        'content-type':'multipart/form-data'
      },
      params:{
        id:window.localStorage.getItem('id')
      }
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/upload', formData, config)
    .then(response=>{
      console.log("File uploaded successfully");
    })
    .catch(err=>{
      console.log("ERRRRR: "+err);
    });
    console.log(event.target.files[0])
  }

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('id')){
        redirectVar = <Redirect to= "/login/"/>
    }
    return (      
      <div className="container">
        {redirectVar}
        <div className="row">
            <form>
                <h3>React File Upload</h3>
                <div className="form-group">
                  <input accept='.jpg, .png, .jpeg' type="file"  onChange={this.addPic}/>
                </div>
                <Link to="/profile">Profile</Link>
            </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps)(addphoto);