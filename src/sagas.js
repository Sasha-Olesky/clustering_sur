import { all } from 'redux-saga/effects'
import { authSagas } from './auth';
import { surveySagas } from './surveys';
import { clustersSagas } from './clusters';


export default function* sagas() {
  yield all([
    ...authSagas,
    ...surveySagas,
    ...clustersSagas
  ]);
}
