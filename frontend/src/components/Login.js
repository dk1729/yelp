import React from 'react';
import Header from './Header';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn, setID} from '../actions';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Login extends React.Component{
  state = {loginFailed:false}
  renderInput({input, label, type}){
    return (
      <div className="field">
        <input {...input} placeholder={label} type={type}/>
      </div>
    );
  }

  onSubmit = formValues =>{
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/login',formValues)
        .then(response => {
            if(response.status === 200){
              window.localStorage.setItem('isSignedIn',true);
              window.localStorage.setItem('id',response.data.id);
              this.props.signIn();
              this.props.setID(response.data.id);
              this.setState({loginFailed:false})
            }
            else{
              this.setState({loginFailed:true})
            }
        }).catch(()=>{
          window.localStorage.setItem('isSignedIn',this.props.isSignedIn);
        });
  }

  render(){
    let redirectVar = null;
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
                        {this.state.loginFailed && <div className="alert alert-danger">
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
                          <Link to="/signup/">Signup</Link>
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
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default reduxForm({form:'LOGIN'})(connect(mapStateToProps,{signIn, setID})(Login));