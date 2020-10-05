import actions from "redux-form/lib/actions";

export default (state={rest_id:null}, action) => {
  switch(action.type){
    case 'SET_REST_ID':
      return {...state, rest_id:action.id}
    case 'REMOVE_REST_ID':
      return {...state, rest_id:null}    
    default:
      return state;
  }
};