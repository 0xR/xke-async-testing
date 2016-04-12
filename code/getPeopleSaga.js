import fetch from 'node-fetch';
import { call, put } from 'redux-saga/effects';

export default function* getPeopleSaga(id) {
  const res = yield call(
    fetch, `http://swapi.co/api/people/${id}/`
  );

  const json = yield res.json();

  yield put({
    type: 'GOT_PERSON',
    person: json,
  });
}
