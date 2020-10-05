import React, { Component } from 'react'
import InternalRestHeader from './InternalRestHeader';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';

class AddDish extends Component {
  renderInput = ({input, label, type}) => {
    return (
      <div className="field" style={{width:"500px"}}>
        <label>{label}</label>
        <input {...input} type={type}/>
      </div>
    );
  }

  onSubmit = (formValues) => {
    console.log("Old formvalues = "+formValues)
    formValues = {...formValues, rest_id:window.localStorage.getItem('rest_id')}
    console.log("New formvalues = "+formValues)
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/addDish',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);                              

        }).catch((err)=>{
          console.log("ERRR : ",err)
        });
  }
  
  render() {
    return (
      <div>
        <InternalRestHeader/>
        <div style={{marginLeft:"25%", marginTop:"5%", width:"50%", height:"500px"}}>
          <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field label = "Dish Name" name="dish_name" component={this.renderInput} type="text" ></Field>
            <Field label = "Main Ingredients" name="ingredients" component={this.renderInput} type="text" ></Field>
            <Field label = "Dish Price" name="dish_price" component={this.renderInput} type="text" ></Field>
            <Field label = "Description" name="description" component={this.renderInput} type="text" ></Field>
            <Field label = "Dish Type" name="dish_type" component={this.renderInput} type="text" ></Field>
            {/* <Field label = "Dish Images" component={this.renderInput} type="file" ></Field> */}
            <button className="ui button primary">Submit</button>
          </form>
        </div>        
      </div>
    )
  }
}


export default reduxForm({form:'ADDDISH'})(AddDish);