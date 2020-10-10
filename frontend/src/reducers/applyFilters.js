export default (state={filtered_restaurants:{}}, action) => {
  switch(action.type){
    case 'APPLY_FILTERS':
      return {...state, filtered_restaurants:action.payload}
    default:
      return state;
  }
};