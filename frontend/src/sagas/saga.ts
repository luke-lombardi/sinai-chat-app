import { put, takeEvery } from 'redux-saga/effects';

// Async generator functions
function* SetEmailAsync(action: any): any {
  yield put({ type: 'EMAIL_CHANGED_ASYNC', value: action.value });
}

function* GotMessageAsync(): any {
  yield put({ type: 'GOT_MESSAGE_ASYNC', value: 1 });
}


// Watch functions
export function* watchEmail(): any {
  yield takeEvery('EMAIL_CHANGED', SetEmailAsync);
}

export function* watchMessage(): any {
  yield takeEvery('GOT_MESSAGE', GotMessageAsync);
}