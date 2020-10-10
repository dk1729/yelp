export default (state={reviews:{}}, action) => {
  switch(action.type){
    case 'FETCH_REVIEWS':
      return {...state, reviews:action.payload}
    default:
      return state;
  }
};