export default (state={restaurants:{}}, action) => {
  switch(action.type){
    case 'FETCH_RESTAURANTS':
      return {...state, restaurants:action.payload}
    default:
      return state;
  }
};