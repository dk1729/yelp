import React, { Component } from 'react'
import InternalHeader from './InternalHeader';
import {Row,Col, Card} from 'react-bootstrap';
import {fetchRestaurants} from '../actions';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import Maps from './Maps';

class restaurants extends Component {
  state = {updatedData:[], nosuch:false}

  componentDidMount(){
    setTimeout(()=>{
      this.props.fetchRestaurants()
    },0)    
  }

  componentWillReceiveProps(){
    console.log("Ok, filtered rests : ")
    setTimeout(()=>{
      console.log(this.props.filtered_restaurants)
      this.setState({updatedData:this.props.filtered_restaurants.filtered_restaurants})
    },0)    
  }

  renderInput = ({input, label, type, placeholder}) => {
    return (
      <div className="field" style={{marginTop:10}}>        
        <input {...input} type={type} placeholder={placeholder} style={{marginLeft:20, marginTop:10}}/><label style={{marginLeft:10}}>{label}</label>
      </div>
    );
  }

  onSubmit = formValues => {
    console.log("Old formvalues = "+JSON.stringify(formValues))
    let temp = [];
    let newVal = {}
    console.log("OK, so search terms are ")
    console.log(this.props.searchTerms)
    for (var key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        console.log(key + " -> " + formValues[key]);
        if(formValues[key]){
          if((key !== "takeout" && key !== "delivery" && key !== "dineout")){
            // temp = temp+", "+key;
            temp.push(key)
          }
          else if(key === "takeout"){
            newVal = {...newVal, takeout:formValues[key]}
          }
          else if(key === "delivery"){
            newVal = {...newVal, delivery:formValues[key]}
          }
          else if(key === "dineout"){
            newVal = {...newVal, dineout:formValues[key]}
          }
        }        
      }
    }
    if(temp.length>0){
      formValues = {...newVal, hood:temp}      
    }      
    else{
      formValues = {...newVal}
      // formValues = {...newVal, rest_id:window.localStorage.getItem('rest_id')}
    }      
    if(this.props.searchTerms){
      formValues = {...formValues, searchTerm:this.props.searchTerms.term, searchLoc:this.props.searchTerms.location}
    }
    console.log("New formvalues = "+JSON.stringify(formValues))
    
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/filter',formValues)
        .then(response => {
            console.log("Status Code : ",response.status);            
            if(response.status === 200){
              this.setState({updatedData:response.data, nosuch:false})
            }            
        }).catch((err)=>{
          console.log("ERRR : ",err)
          this.setState({nosuch:true})          
        });        
  }

  render() {
    let redirectVar = null;
    if(!window.localStorage.getItem('isSignedIn')){
      redirectVar = <Redirect to= "/login/"/>
    }
    let restInfo = null;
    let hoodInfo = [];
    let markerInfo = [];

    if(this.state.nosuch){
     restInfo = <div>No such restaurants</div> 
    }
    else if(this.state.updatedData.length>0){
      restInfo = this.state.updatedData.map(restaurant => {
        if(!hoodInfo.includes(restaurant.hood)){
          hoodInfo.push(restaurant.hood)
        }
        markerInfo.push({rest_name:restaurant.rest_name, latitude:restaurant.latitude, longitude:restaurant.longitude})
        return(
          <Link to={{pathname:"/biz", state:{restaurant}}} style={{textDecoration:"none"}}>
            <Card bg="white" className="shadow p-3 mb-5 rounded" style={{color:"black", width:"600px",marginLeft:20, marginTop:15, height:"200px"}}>
              <Card.Body>
              <div style={{width:"100px",height:"100px", float:"left"}}><img alt="Profile Photo" src={`http://localhost:3001/${restaurant.path1}`} style={{width:"100px",height:"100px"}}></img></div>
              <div>
                <Card.Title style={{marginLeft:"30%", marginTop:-10}}>{restaurant.rest_name}</Card.Title>
                <Card.Text style={{marginLeft:"30%", marginTop:-10}}>
                  <Row><Col>{restaurant.description}</Col></Row>
                  <Row><Col>Located at: {restaurant.location}</Col></Row>
                  <Row><Col>We're open: {restaurant.timings}</Col></Row>                              
                </Card.Text>
              </div>
              </Card.Body>
            </Card>
          </Link>
        )
      });
    }
    else if(this.props.restaurants.restaurants.length!==undefined){
      restInfo = this.props.restaurants.restaurants.map(restaurant => {
        if(!hoodInfo.includes(restaurant.hood)){
          hoodInfo.push(restaurant.hood)
        }
        markerInfo.push({rest_name:restaurant.rest_name, latitude:restaurant.latitude, longitude:restaurant.longitude})
        return (
          <Link to={{pathname:"/biz", state:{restaurant}}} style={{textDecoration:"none"}}>
            <Card bg="white" className="shadow p-3 mb-5 rounded" style={{color:"black", width:"600px",marginLeft:20, marginTop:15, height:"200px"}}>
              <Card.Body>
              <div style={{width:"100px",height:"100px", float:"left"}}><img alt="Profile Photo" src={`http://localhost:3001/${restaurant.path1}`} style={{width:"100px",height:"100px"}}></img></div>
              <div>
                <Card.Title style={{marginLeft:"30%"}}>{restaurant.rest_name}</Card.Title>
                <Card.Text style={{marginLeft:"30%"}}>
                  <Row><Col>{restaurant.description}</Col></Row>
                  <Row><Col>Located at: {restaurant.location}</Col></Row>
                  <Row><Col>We're open: {restaurant.timings}</Col></Row>                              
                </Card.Text>
              </div>
              </Card.Body>
            </Card>
          </Link>
        )        
      })      
    }
    let hoodFilter = null;
    if(hoodInfo.length>0){
      hoodFilter = hoodInfo.map(hood=>{
        return(
          <Field component={this.renderInput} type="checkbox" name={hood} label={hood}></Field>
        )
      })
    }
    return (
      <div>
        {redirectVar}
        <InternalHeader/>
        <Row>
          <Col md={2} style={{height:"100%"}} className="shadow p-3 mb-5 rounded">
            <Row><Col><div style={{marginTop:10, marginLeft:20}}><h4>Filter</h4></div></Col></Row>
            <Row>
              <Col>
              <div style={{marginTop:10, marginLeft:20, position:"sticky"}}><h5>Delivery Methods</h5></div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="takeout" component={this.renderInput} type="checkbox" label="Takeout"></Field>
                  <Field name="delivery" component={this.renderInput} type="checkbox" label="Delivery"></Field>
                  <Field name="dineout" component={this.renderInput} type="checkbox" label="Dine-out"></Field>                                   
                  <div style={{marginTop:10, marginLeft:20}}><h5>Neighbourhoods</h5></div>       
                    {hoodFilter}
                  <button className="ui button primary shadow p-3 mb-5 rounded" style={{marginTop:20, marginLeft:20, backgroundColor:"#d32323"}}>Apply filters</button>
                </form>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            {restInfo}
          </Col>
          <Col md={4} style={{height:1000, marginLeft:-14, position:"sticky"}}>            
            <Maps coords={markerInfo}></Maps>            
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {restaurants:state.restaurants,  isSignedIn:state.auth.isSignedIn, searchTerms:state.searchTerms, filtered_restaurants:state.filtered_restaurants}
}

export default reduxForm({form:'filterRest'})(connect(mapStateToProps,{fetchRestaurants})(restaurants));