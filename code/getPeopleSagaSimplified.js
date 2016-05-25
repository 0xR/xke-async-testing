import { fetchJson } from './fetch-utils.js';
import { call, put } from 'redux-saga/effects';

export default function* getPeopleSaga(id) {
  const json = yield call(
    fetchJson, `http://swapi.co/api/people/${id}/`
  );

  yield put({
    type: 'GOT_PERSON',
    person: json,
  });
}
