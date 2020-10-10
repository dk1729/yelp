import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {fetchRestCoords} from '../actions';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Maps extends Component {

  componentDidMount(){
    this.props.fetchRestCoords()
  }

  render() {
    console.log("Rest coords = ")
    console.log(this.props)

    let markers = null;

    if(this.props.restCoords.restCoords.length!==undefined){
      markers = this.props.coords.map(coord => {
        return (
          <Marker
            title={coord.rest_name}
            name={'SOMA'}
            position={{lat: coord.latitude, lng: coord.longitude}}
            icon={{}} />
        );
      })
    }
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={
          {
              lat: 37.334450,
              lng: -121.907950
          }
          }
        >
        {/* {Object.keys(this.state.coords).map(i => 
                <Marker
                title={this.state.coords[i].restname}
                name={'SOMA'}
                position={{lat: this.state.coords[i].lat, lng: this.state.coords[i].lng}}
                icon={{}} />
        )} */}
        {markers}
        <Marker onClick={this.onMarkerClick}
            name={'Current location'} />
        </Map>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {restCoords:state.restCoords, isSignedIn:state.auth.isSignedIn}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss'
})(connect(mapStateToProps,{fetchRestCoords})(Maps));