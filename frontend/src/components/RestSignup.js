import React, { Component } from 'react'
import Header from './Header';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {restSignUpSuccess, restSignUpFail} from '../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class RestSignup extends Component {    
    renderInput({input, label, type}){
        return (
          <div className="field">
            <input {...input} placeholder={label} type={type}/>
          </div>
        );
      }
    
    
      onSubmit = formValues => {
        console.log(formValues)    
    
        axios.defaults.withCredentials = true;
            //make a post request with the user data
        axios.post('http://localhost:3001/restsignup',formValues)
            .then(response => {
                console.log("Status Code : ",response.status);
                this.props.restSignUpSuccess();
            }).catch(()=>{
              console.log("ERRR")
              this.props.restSignUpFail();
            });
      }    
    render() {
        var redirectVar = null;
        return(
            <div className="wrap">
                {redirectVar}
                <Header/>
                <div className="main-content-wrap">
                <div className="super-container">
                    <div className="signup-frame">
                    <div className="col0">
                        <div className="col1">
                        <div className="sl2">
                            <div className="sl3">
                            <div className="sl4">
                                <div className="signup-header">
                                <h2>Sign Up for Yelp</h2>
                                <p className="subheading">Connect with great local businesses</p>
                                </div>
                                {console.log(this.props.restSignedUp)}
                                {this.props.restSignedUp === false && <div className="alert alert-danger">
                                Signup failed
                                </div>}
                                {this.props.restSignedUp === true && <Redirect to="/restProfile" />}
                                <div>
                                <p>
                                    <button className="social_button fb">
                                    <div className="button_centered_text">
                                        Continue With Facebook
                                    </div>
                                    </button>
                                </p>
                                <p>
                                    <button className="social_button goog">
                                    <div className="button_centered_text">
                                        Continue With Google
                                    </div>
                                    </button>
                                </p>
                                <p>
                                    <button className="social_button apple">
                                    <div className="button_centered_text">
                                        Continue With Apple
                                    </div>
                                    </button>
                                </p>
                                </div>
                                <br/>
                                <legend align="center" className="legend_style">OR</legend>
                            </div>
                            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <div className="form-elems">
                                <Field name="rest_name" component={this.renderInput} label="Restaurant Name" type="text"/>
                                <Field name="location" component={this.renderInput} label="Location" type="text"/>
                                <Field name="email" component={this.renderInput} label="Email" type="email"/>
                                <Field name="password" component={this.renderInput} label="Password" type="password"/>
                                <Field name="zip" component={this.renderInput} label="ZIP Code" type="number"/>                                
                                <button className="ui button primary">Submit</button>
                                <Link to="/login/">Log in</Link>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col2">
                        <div className="pic-container">
                        <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {restSignedUp:state.restSignUpAuth.restSignedUp}
}

export default reduxForm({form:'REST_SIGNUP'})(connect(mapStateToProps,{restSignUpSuccess, restSignUpFail})(RestSignup));