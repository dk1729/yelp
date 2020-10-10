import {combineReducers} from 'redux';
import {reducer} from 'redux-form';
import authReducer from './authReducer';
import set_id from './set_id';
import fetchData from './fetchData';
import signUpAuth from './signUpAuth';
import restSignUpAuth from './restSignUpAuth';
import setRestId from './setRestId';
import fetchRestData from './fetchRestData';
import restAuth from './restAuthReducer';
import fetchDishData from './fetchDishData';
import fetchRestaurants from './fetchRestaurants';
import fetchCart from './fetchCart';
import fetchOrderData from './fetchOrderData';
import fetchReviews from './fetchReviews';
import fetchEvents from './fetchEvents';
import fetchRegisteredEvents from './fetchRegisteredEvents';
import fetchRestEvents from './fetchRestEvents';
import fetchRestCoords from './fetchRestCoords';
import setSearchTerms from './setSearchTerms';
import filtered_restaurants from './applyFilters';

const rootReducer = combineReducers({
  form:reducer,
  auth:authReducer,
  id:set_id,
  formData:fetchData,
  signUpAuth,
  restSignUpAuth,
  rest_auth:restAuth,
  rest_id:setRestId,
  restDetails:fetchRestData,
  dishes:fetchDishData,
  restaurants:fetchRestaurants,
  cart:fetchCart,
  orders:fetchOrderData,
  reviews:fetchReviews,
  events:fetchEvents,
  registeredEvents:fetchRegisteredEvents,
  restEvents:fetchRestEvents,
  restCoords:fetchRestCoords,
  searchTerms:setSearchTerms,
  filtered_restaurants
})

export default rootReducer;
