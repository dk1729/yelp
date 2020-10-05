const INITIAL_STATE = {
  signedUp:null
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type){
    case 'SIGN_UP_SUCCESSFUL':
      return {...state, signedUp:true}
    case 'SIGN_UP_UNSUCCESSFUL':
      return {...state, signedUp:false}
    default:
      return state;
  }
};