import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Button} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {removeRestID, restSignOut} from '../actions';
import {Link} from 'react-router-dom';

class InternalRestHeader extends Component {
  logout = (event)=>{
    event.preventDefault();    
    this.props.removeRestID();
    this.props.restSignOut();
    window.localStorage.clear();
  }

  render() {
    return (
      <div style={{borderBottom:"1px solid #eeeeef"}}>
        <Grid>
          <Grid.Column width={2}>
            <a href="#"><img style={{ width:90, height:45, marginTop:25, marginLeft:50}}src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-a536dc4612adf182807e56e390709483.png"/></a>  
          </Grid.Column>
          <Grid.Column width={8} >            
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <div style={{marginTop:30, marginLeft:-20}}><i class="bell outline icon"></i></div>
              </Grid.Column>
              <Grid.Column>          
              </Grid.Column>
              <Grid.Column>
                <div style={{marginTop:30, marginLeft:20}}><Link to="/restprofile"><i style={{color:"black"}} class="user icon"></i></Link></div>
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

export default (connect(mapStateToProps,{removeRestID, restSignOut})(InternalRestHeader));