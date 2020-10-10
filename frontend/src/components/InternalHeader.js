import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux';
import {removeRestID, restSignOut, signOut, removeID} from '../actions';
import {Link} from 'react-router-dom';
import { Grid, Button, Menu } from 'semantic-ui-react'
import {Field, Form, reduxForm} from 'redux-form';
import {setSearchTerms, applyFilters} from '../actions';

class InternalHeader extends Component {
  logout = (event) => {
    event.preventDefault();    
    console.log("Clicked logout")
    this.props.removeID();
    this.props.signOut();
    window.localStorage.clear();
  }

  renderInput = ({input, type, placeholder}) => {
    return (
      <div className="field" style={{width:"500px"}}>
        <input {...input} type={type} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.setSearchTerms(formValues.searchTerm, formValues.searchLoc);
    this.props.applyFilters(formValues);
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={2}>
            <a href="#"><img style={{ width:90, height:45, marginTop:25, marginLeft:50}}src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-a536dc4612adf182807e56e390709483.png"/></a>  
          </Grid.Column>
          <Grid.Column width={8} >
            <Form className="ui form" style={{marginTop:20}} onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="two fields">
                <Field component={this.renderInput} name="searchTerm" placeholder="Search Restaurants"/>
                <Field component={this.renderInput} name="searchLoc" placeholder="Search Location"/>
                <Button icon="search"></Button>
              </div>              
            </Form>            
          </Grid.Column>
          <Grid.Column width={2}>
            <div style={{marginTop:30}}><Link to="/cart">Cart</Link></div>
          </Grid.Column>
          <Grid.Column width={2}>
          <div style={{marginTop:30}}><Link to="/profile">Profile</Link></div>
          </Grid.Column>
          <Grid.Column width={2}>
            <div style={{marginTop:20}}><Button onClick={this.logout}>Logout</Button></div>
          </Grid.Column>
        </Grid>        
      </div>      
    )
  }
}

const mapStateToProps = (state) =>{
  return {id:state.id.id, isSignedIn:state.auth.isSignedIn}
}

export default reduxForm({form:'search'})(connect(mapStateToProps,{setSearchTerms, applyFilters,removeRestID, restSignOut, signOut, removeID})(InternalHeader));