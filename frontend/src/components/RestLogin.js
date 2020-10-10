import React from 'react';
import Header from './Header';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import {connect} from 'react-redux';
import {restSignIn, setRestID} from '../actions';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class RestLogin extends React.Component{
  renderInput({input, label, type, meta:{touched, error}}){
    return (
      <div className="field">
        <input {...input} placeholder={label} type={type}/>
        {touched && error && <span>error</span>}
      </div>
    );
  }

  onSubmit = formValues =>{
    console.log(formValues)

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/restlogin',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log(response)            
            window.localStorage.setItem('isRestSignedIn',true);
            window.localStorage.setItem('rest_id',response.data.rest_id);
            console.log("This is the mf id : "+response.data.rest_id);
            console.log("Have I set it?"+window.localStorage.getItem('rest_id'));
            this.props.restSignIn();
            this.props.setRestID(response.data.rest_id);      
        }).catch(()=>{
          console.log("ERRR")
          window.localStorage.setItem('isRestSignedIn',this.props.isRestSignedIn);
        });
  }

  render(){
    let redirectVar = null;
    {console.log(window.localStorage.getItem('isRestSignedIn'))}
    if(window.localStorage.getItem('isRestSignedIn')){
      redirectVar = <Redirect to="/restprofile" />
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
                        {this.props.isRestSignedIn === false && <div className="alert alert-danger">
                          Login failed
                        </div>}
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
                          <Field name="email" component={this.renderInput} label="Email" type="email"/>
                          <Field name="password" component={this.renderInput} label="Password" type="password"/>  
                          <button className="ui button primary">Submit</button>
                          <Link to="/restSignup/">Signup for Restaurant</Link>
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
    )};
};

const mapStateToProps = (state) =>{
  return {rest_id:state.rest_id.rest_id, isRestSignedIn:state.rest_auth.isRestSignedIn}
}

export default reduxForm({form:'REST_LOGIN'})(connect(mapStateToProps,{restSignIn, setRestID})(RestLogin));