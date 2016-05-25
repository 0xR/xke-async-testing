import fetch from 'node-fetch';
import { call } from 'redux-saga/effects';

export function* fetchJson(url) {
  const res = yield call(fetch, url);

  return res.json();
}
