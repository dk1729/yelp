import actions from "redux-form/lib/actions";

const INITIAL_STATE = {
  isRestSignedIn:null
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type){
    case 'REST_SIGN_IN':
      return {...state, isRestSignedIn:true}
    case 'REST_SIGN_OUT':
      return {...state, isRestSignedIn:false}    
    default:
      return state;
  }
};