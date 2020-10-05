const INITIAL_STATE = {
    restSignedUp:null
  };
  
  export default (state=INITIAL_STATE, action) => {
    switch(action.type){
      case 'REST_SIGN_UP_SUCCESSFUL':
        return {...state, restSignedUp:true}
      case 'REST_SIGN_UP_UNSUCCESSFUL':
        return {...state, restSignedUp:false}
      default:
        return state;
    }
  };