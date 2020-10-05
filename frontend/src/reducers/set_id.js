import actions from "redux-form/lib/actions";

export default (state={id:null}, action) => {
  switch(action.type){
    case 'SET_ID':
      return {...state, id:action.id}
    case 'REMOVE_ID':
      return {...state, id:null}    
    default:
      return state;
  }
};