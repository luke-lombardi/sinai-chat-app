import GlobalState  from './state';

const initialState: GlobalState = {
  email: '',
  session:  '',
  messageCount: 0
};

const reducer = (state = initialState, action: any) => {
  const newState = {...state};

  switch(action.type){
    case 'EMAIL_CHANGED_ASYNC':
      newState.email = action.value;
      break;
    case 'GOT_MESSAGE_ASYNC':
      newState.messageCount += 1;
      break;
  }
  return newState;
};

export default reducer;