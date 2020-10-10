import './common-styles.css';
import React from 'react';
import Header from './Header';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {signUpSuccess, signUpFail} from '../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
const options_months = [];

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
for(let i=0;i<months.length;i++){
  options_months.push(<option value={months[i]}>{months[i]}</option>)
}

const options_years = [];
for(let i=2020;i>=1901;i--){
  options_years.push(<option value={i}>{i}</option>)
}

const options_days = [];

for(let i=1;i<=31;i++){
  options_days.push(<option value={i}>{i}</option>)
}

class Signup extends React.Component{
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
    axios.post('http://localhost:3001/signup',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);
            this.props.signUpSuccess();
        }).catch(()=>{
          console.log("ERRR")
          this.props.signUpFail();
        });
  }    

  
  render(){
    let redirectVar = null;
    {console.log(window.localStorage.getItem('isSignedIn'))}
    if(window.localStorage.getItem('isSignedIn')){
        redirectVar = <Redirect to="/profile" />
    }
    return (      
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
                        {console.log(this.props.signedUp)}
                        {this.props.signedUp === false && <div className="alert alert-danger">
                          Signup failed
                        </div>}
                        {this.props.signedUp === true && <Redirect to="/profile" />}
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
                        <br/>
                      </div>
                      <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="form-elems">
                          <Field name="first_name" component={this.renderInput} label="First Name" type="text"/>
                          <Field name="last_name" component={this.renderInput} label="Last Name" type="text"/>
                          <Field name="email" component={this.renderInput} label="Email" type="email"/>
                          <Field name="password" component={this.renderInput} label="Password" type="password"/>
                          <Field name="zip" component={this.renderInput} label="ZIP Code" type="number"/>
                          <Field name="birthdate" component={this.renderInput} label="Birth Date" type="date"/>
                          <button style={{marginTop:10, marginRight:10, backgroundColor:"#d32323"}} className="ui button primary">Submit</button>
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
};

const mapStateToProps = (state) =>{
  return {signedUp:state.signUpAuth.signedUp}
}

export default reduxForm({form:'SIGNUP'})(connect(mapStateToProps,{signUpSuccess, signUpFail})(Signup));