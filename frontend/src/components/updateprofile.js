import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {fetchUserData} from '../actions';
import axios from 'axios';
import {Redirect} from 'react-router';
import InternalHeader from './InternalHeader';
import {Row,Nav,Col} from 'react-bootstrap';

var redirectVar = null;;
class updateprofile extends Component {
  state = {updateSuccess:false}
  componentDidMount(){    
    this.props.fetchUserData(window.localStorage.getItem('id'));
    
  }

  renderInput({input, label, type, placeholder, meta:{touched, error}}){
    return (
      <div className="field" style={{width:"500px"}}>
        <label>{label}</label>
        <input {...input} type={type} placeholder={placeholder}/>
        {touched && error && <span>error</span>}
      </div>
    );
  }

  onSubmit = formValues =>{    
    console.log("Old formvalues = "+formValues)
    formValues = {...formValues, id:window.localStorage.getItem('id')}
    console.log("New formvalues = "+formValues)
    
    if(formValues.address){
      axios.defaults.withCredentials = false;
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ formValues.address +"&key=AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss").then(response => {                    
        console.log(response.data.results[0].geometry.location)
        console.log({...formValues, latitude:response.data.results[0].geometry.location.lat, longitude:response.data.results[0].geometry.location.lng})
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/update',{...formValues, latitude:response.data.results[0].geometry.location.lat, longitude:response.data.results[0].geometry.location.lng})
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                  this.setState({updateSuccess:true})
                }
            }).catch((err)=>{
              console.log("ERRR : ",err)
            });
      })
    }
    else{
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/update',formValues)
          .then(response => {
            console.log("Status Code : ",response.status);
            this.setState({updateSuccess:true})
          }).catch((err)=>{
            console.log("ERRR : ",err)
          });
    }    
  }    
  render() {
    redirectVar = null;
    console.log("Updationg profile")
    console.log("Val = "+window.localStorage.getItem('isSignedIn'))
    if(!window.localStorage.getItem('isSignedIn')){
        redirectVar = <Redirect to= "/login/"/>
    }    
    console.log(this.props.formData);
    return (      
      <div>
        {redirectVar}
        <InternalHeader/>
        <div className="container">
          <Row style={{marginTop:"7%"}}>          
              <Col md={3}>
                <Nav className="col-lg-12 d-none d-lg-block sidebar">
                  <div className="sidebar-sticky"></div>
                  <Nav.Item >
                    <Nav.Link eventKey="disabled" disabled>
                      <h4>{this.props.formData.first_name}'s Account Settings</h4>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>Password</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Email
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Location
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Friends
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    Privacy Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                    External
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>                
              <Col md={9}>
              {this.state.updateSuccess && <div className="alert alert-success" style={{width:"500px"}}>
                          Profile Updated
                        </div>}
              <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field placeholder={this.props.formData.first_name} name="first_name"  component={this.renderInput} label="First Name" type="text"/>
                <Field placeholder={this.props.formData.last_name} name="last_name" component={this.renderInput} label="Last Name" type="text"/>
                <Field placeholder={this.props.formData.phone} name="phone" component={this.renderInput} label="Phone number" type="text"/>
                <Field placeholder={this.props.formData.zip} name="zip" component={this.renderInput} label="ZIP Code" type="number"/>
                <Field placeholder={this.props.formData.city} name="city" component={this.renderInput} label="City" type="text"/>
                <Field placeholder={this.props.formData.state} name="state" component={this.renderInput} label="State" type="text"/>
                <Field placeholder={this.props.formData.country} name="country" component={this.renderInput} label="Country" type="text"/>
                <Field placeholder={this.props.formData.nickname} name="nickname" component={this.renderInput} label="Nick Name" type="text"/>
                <div>
                  <label>Gender</label>
                  <div>
                    <div className="ui field">
                      <label>
                        <Field name="sex" component="input" type="radio" value="male" />{' '}
                        Male
                      </label>
                    </div>
                    <div className="ui field">
                      <label>
                        <Field name="sex" component="input" type="radio" value="female" />{' '}
                        Female
                      </label>
                    </div>
                    <div className="ui field">
                      <label>
                        <Field name="sex" component="input" type="radio" value="other" />{' '}
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <Field placeholder={this.props.formData.headline} name="headline" component={this.renderInput} label="Your Headline" type="text"/>
                <Field placeholder={this.props.formData.ilove} name="ilove" component={this.renderInput} label="I Love" type="text"/>
                <Field placeholder={this.props.formData.findmein} name="findmein" component={this.renderInput} label="Find Me In" type="text"/>
                <Field placeholder={this.props.formData.hometown} name="hometown" component={this.renderInput} label="My Hometown" type="text"/>
                <Field placeholder={this.props.formData.address} name="address" component={this.renderInput} label="Address" type="text"/>
                <Field placeholder={this.props.formData.blog} name="blog" component={this.renderInput} label="My Blog" type="text"/>
                <Field placeholder={this.props.formData.whennotyelping} name="whennotyelping" component={this.renderInput} label="When I'm not Yelping" type="text"/>
                <Field placeholder={this.props.formData.whyreadreviews} name="whyreadreviews" component={this.renderInput} label="Why You Should Read My Reviews" type="text"/>
                <Field placeholder={this.props.formData.favwebsite} name="favwebstie" component={this.renderInput} label="My Second Favorite Website" type="text"/>
                <Field placeholder={this.props.formData.book} name="book" component={this.renderInput} label="The Last Great Book I Read" type="text"/>
                <Field placeholder={this.props.formData.concert} name="concert" component={this.renderInput} label="My First Concert" type="text"/>
                <Field placeholder={this.props.formData.movie} name="movie" component={this.renderInput} label="My Favorite Movie" type="text"/>
                <Field placeholder={this.props.formData.lastmeal} name="lastmeal" component={this.renderInput} label="My Last Meal On Earth" type="text"/>
                <Field placeholder={this.props.formData.dontell} name="dontell" component={this.renderInput} label="Don't Tell Anyone Else But..." type="text"/>
                <Field placeholder={this.props.formData.discovery} name="discovery" component={this.renderInput} label="Most Recent Discovery" type="text"/>
                <Field placeholder={this.props.formData.crush} name="crush" component={this.renderInput} label="Current Crush" type="text"/>
                <button className="ui button primary" style={{backgroundColor:"#d32323"}}>Submit</button>
              </form>
              </Col>          
          </Row>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {formData:state.formData.formValues,id:state.id.id, isSignedIn:state.auth.isSignedIn}
}
export default reduxForm({form:'updateProfile'})(connect(mapStateToProps,{fetchUserData})(updateprofile));