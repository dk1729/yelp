import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Field, reduxForm} from 'redux-form';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';

class AddDish extends Component {
  state = {photo:null}
  renderInput = ({input, label, type}) => {
    return (
      <div className="field" style={{width:"500px"}}>
        <label>{label}</label>
        <input {...input} type={type}/>
      </div>
    );
  }

  onDrop = (picture) => {
    console.log(picture.target.files[0])    
    this.setState({photo:picture.target.files[0]})
    // var formData = new FormData();
    // formData.append('image', picture.target.files[0]);
    // formData.append('id', window.localStorage.getItem('id'));
    // for (var key of formData.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
    // }
  }  

  onSubmit = (formValues) => {
    console.log("Old formvalues = "+formValues)
    formValues = {...formValues, rest_id:window.localStorage.getItem('rest_id')}
    console.log("New formvalues = "+formValues)

    var formData = new FormData();
    formData.append('dish_image', this.state.photo);
    // formData.append('formValues', JSON.stringify(formValues))

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/addDish',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)
            if(response.status === 202){
              formData.append('dish_id', response.data);
              axios.defaults.withCredentials = true;
              axios.post("http://localhost:3001/uploadDishImage", formData)
                .then(res => {
                  console.log(res)
                })
            }
        }).catch((err)=>{
          console.log("ERRR : ",err)
        });
  }
  
  render() {
    return (
      <div>
        <InternalRestHeader/>
        <Row>
          <Col>
            <div style={{marginLeft:"25%", marginTop:"5%", width:"50%", height:"500px"}}>
              <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field label = "Dish Name" name="dish_name" component={this.renderInput} type="text" ></Field>
                <Field label = "Main Ingredients" name="ingredients" component={this.renderInput} type="text" ></Field>
                <Field label = "Dish Price" name="dish_price" component={this.renderInput} type="text" ></Field>
                <Field label = "Description" name="description" component={this.renderInput} type="text" ></Field>
                <Field label = "Dish Type" name="dish_type" component={this.renderInput} type="text" ></Field>
                <button className="ui button primary">Submit</button>
              </form>
            </div>
          </Col>
          <Col>
            <div style={{marginLeft:"20%", marginTop:"30%", width:"50%", height:"500px"}}>
              <input type="file" onChange = {this.onDrop}/>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


export default reduxForm({form:'ADDDISH'})(AddDish);