export default (state={restCoords:{}}, action) => {
  switch(action.type){
    case 'FETCH_REST_COORDS':
      return {...state, restCoords:action.payload}
    default:
      return state;
  }
};