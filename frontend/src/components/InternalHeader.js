import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from 'react-redux';
import {removeRestID, restSignOut, signOut, removeID} from '../actions';
import {Link} from 'react-router-dom';
import { Grid, Button} from 'semantic-ui-react'
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
        <input className="shadow p-3 mb-5 rounded" {...input} type={type} style={{marginTop:25}} placeholder={placeholder}/>
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.setSearchTerms(formValues.searchTerm, formValues.searchLoc);
    this.props.applyFilters(formValues);
    
  }

  render() {
    return (
      <div style={{borderBottom:"1px solid #eeeeef"}}>
        <Grid>
          <Grid.Column width={2}>
            <a href="#"><img style={{ width:90, height:45, marginTop:25, marginLeft:50}}src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-a536dc4612adf182807e56e390709483.png"/></a>  
          </Grid.Column>
          <Grid.Column width={8} >
            <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="two fields" style={{height:"85px"}}>
                <Field component={this.renderInput} name="searchTerm" placeholder="Search Restaurants"/>
                <Field component={this.renderInput} name="searchLoc" placeholder="Search Location"/>
                <Button style={{height:"45px", marginTop:25, backgroundColor:"#d32323", color:"white"}} className="shadow p-3 mb-5 rounded" icon="search"></Button>
              </div>              
            </Form>
            <div>
              <Grid.Row>
                <Grid.Column style={{marginTop:-15,marginLeft:15}}><Link to="/restaurants" style={{color:"black"}}>Restaurants</Link></Grid.Column>
              <Grid.Column style={{marginTop:-15, marginLeft:20}}><Link to="/showEvents" style={{color:"black"}}>Events</Link></Grid.Column>
              </Grid.Row>
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <div style={{marginTop:30}}>Businesses</div>            
          </Grid.Column>
          <Grid.Column width={2}>
            <div style={{marginTop:30}}>Write a Review</div>            
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <div style={{marginTop:30, marginLeft:-20}}><i class="bell outline icon"></i></div>
              </Grid.Column>
              <Grid.Column>
                <div style={{marginTop:30, marginLeft:10}}><Link to="/cart"><i style={{color:"black"}} class="shopping cart icon"></i></Link></div>
              </Grid.Column>
              <Grid.Column>
                <div style={{marginTop:30, marginLeft:20}}><Link to="/profile"><i style={{color:"black"}} class="user icon"></i></Link></div>
              </Grid.Column>
            </Grid.Row>                                            
          </Grid.Column>
          <Grid.Column>          
          </Grid.Column>
          <Grid.Column>
            <div  style={{marginTop:25, marginLeft:-100}}><Button className="shadow p-3 mb-5 rounded" style={{backgroundColor:"#d32323", color:"white"}} onClick={this.logout}>Logout</Button></div>
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