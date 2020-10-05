export default (state={formValues:{}}, action) => {
  switch(action.type){
    case 'FETCH_DATA':
      console.log("In reducer, values = "+action.payload)
      return {...state, formValues:action.payload}
    default:
      return state;
  }
};