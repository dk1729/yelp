export default (state={cart:{}}, action) => {
  switch(action.type){
    case 'FETCH_CART':
      return {...state, cart:action.payload}
    default:
      return state;
  }
};