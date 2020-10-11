import React from 'react';
import ImageUploader from 'react-images-upload';
import InternalRestHeader from './InternalRestHeader';
import axios from 'axios';


class addRestPhotos extends React.Component {
  state = {photos:''}

  addPhotos = event => {
    this.setState({photos:event.target.files})
  }

  uploadPhotos = event => {
    event.preventDefault();

    var formData = new FormData();
    for (const key of Object.keys(this.state.photos)) {
        formData.append('images', this.state.photos[key])
    }
    formData.append('rest_id', window.localStorage.getItem('rest_id'));        

    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3001/uploadRestImages", formData)
      .then(res => {
        console.log(res)
      })
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <InternalRestHeader/>
        <input type="file" onChange = {this.addPhotos} multiple/>
        <button onClick={this.uploadPhotos}>Add photos</button>
      </div>
    )    
  }
}

export default addRestPhotos;