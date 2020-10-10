export default (state={}, action) => {
  switch(action.type){
    case 'SET_SEARCH_TERM':
      return {...state, term:action.term, location:action.location}
    default:
      return state;
  }
};