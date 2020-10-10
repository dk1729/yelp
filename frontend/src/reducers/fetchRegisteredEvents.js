export default (state={registeredEvents:{}}, action) => {
  switch(action.type){
    case 'FETCH_REGISTERED_EVENTS':
      return {...state, registeredEvents:action.payload}
    default:
      return state;
  }
};