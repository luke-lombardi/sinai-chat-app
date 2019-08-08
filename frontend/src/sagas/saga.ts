import { put, takeEvery } from 'redux-saga/effects';

// Async generator functions
function* SetEmailAsync(action: any): any {
  // TODO: send email to go server to establish new session
  // try {
  //   let request = yield fetch('https://google.com');
  //   let text = yield request.text();
  //   return JSON.parse(text);
  // } catch (error) {
  //       console.log(`ERROR: ${error.stack}`);
  // }
  yield put({ type: 'EMAIL_CHANGED_ASYNC', value: action.value });
}

function* SendMessageAsync(): any {
  // TODO: post message to the fucking GO server
  yield put({ type: 'MESSAGE_SENT_ASYNC', value: 1 });
}


// Watch functions
export function* watchEmail(): any {
  yield takeEvery('EMAIL_CHANGED', SetEmailAsync);
}

export function* watchMessage(): any {
  yield takeEvery('MESSAGE_SENT', SendMessageAsync);
}