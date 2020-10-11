import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import updateprofile from './updateprofile';
import addphoto from './addphoto';
import addRestPhotos from './addRestPhotos';
import RestSignup from './RestSignup';
import RestLogin from './RestLogin';
import RestProfile from './RestProfile';
import updateRestProfile from './updateRestProfile';
import AddDish from './AddDish';
import updateDish from './updateDish';
import restaurants from './restaurants';
import biz from './biz';
import cart from './cart';
import viewRestOrders from './viewRestOrders';
import OrderHistory from './OrderHistory';
import ExternalUserProfile from './ExternalUserProfile';
import ShowReviews from './ShowReviews';
import ShowPastReviews from './ShowPastReviews';
import RestEvents from './RestEvents';
import ShowEvents from './ShowEvents';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>                  
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/updateprofile" component={updateprofile}/>
          <Route path="/addPhoto" component={addphoto}/>
          <Route path="/restSignup" component={RestSignup}/>
          <Route path="/restlogin" component={RestLogin}/>
          <Route path="/restprofile" component={RestProfile}/>
          <Route path="/updateRestProfile" component={updateRestProfile}/>
          <Route path="/addDish" component={AddDish}/>
          <Route path="/updateDish" component={updateDish}/>
          <Route path="/restaurants" component={restaurants}/>
          <Route path="/biz" component={biz}/>
          <Route path="/cart" component={cart}/>
          <Route path="/rest_orders" component={viewRestOrders}/>
          <Route path="/orderHistory" component={OrderHistory}/>
          <Route path="/extUserProfile" component={ExternalUserProfile}/>
          <Route path="/showReviews" component={ShowReviews}/>
          <Route path="/showPastReviews" component={ShowPastReviews}/>
          <Route path="/restEvents" component={RestEvents}/>
          <Route path="/showEvents" component={ShowEvents}/>
          <Route path="/addrestphotos" component={addRestPhotos}/>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;