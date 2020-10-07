export default (state={orders:{}}, action) => {
  switch(action.type){
    case 'FETCH_ORDER_DATA':
      return {...state, orders:action.payload}
    default:
      return state;
  }
};