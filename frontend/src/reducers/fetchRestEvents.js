export default (state={restEvents:{}}, action) => {
  switch(action.type){
    case 'FETCH_REST_EVENTS':
      console.log("SO, payload is "+action.payload)
      return {...state, restEvents:action.payload}
    default:
      return state;
  }
};