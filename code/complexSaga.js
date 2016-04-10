import fetch from 'node-fetch';
import { call, put, takeEvery } from 'redux-saga';
import { gotPeople } from './action-creators';

function* getPeopleSaga(action) {
  try {
    const { id } = action;
    const res = yield call(
      fetch, `http://swapi.co/api/people/${id}/`
    );

    yield put(gotPeople(id, res));
  } catch (e) {
    call([console, console.error], 'Error in review saga', e); // eslint-disable-line no-console
  }
}

export default function* mySaga() {
  yield* takeEvery('PERSON_CLICKED', getPeopleSaga);
}
