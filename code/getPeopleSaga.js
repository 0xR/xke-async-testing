import fetch from 'node-fetch';
import { call } from 'redux-saga/effects';

export default function* getPeopleSaga(id) {
  const res = yield call(
    fetch, `http://swapi.co/api/people/${id}/`
  );
  return res.json();
}
