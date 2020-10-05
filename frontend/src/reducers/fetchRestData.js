export default (state={restDetails:{}}, action) => {
  switch(action.type){
    case 'FETCH_REST_DATA':
      return {...state, restDetails:action.payload}
    default:
      return state;
  }
};