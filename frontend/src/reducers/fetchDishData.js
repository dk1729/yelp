export default (state={dishes:{}}, action) => {
  switch(action.type){
    case 'FETCH_DISH_DATA':
      return {...state, dishes:action.payload}
    default:
      return state;
  }
};