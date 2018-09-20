import { all } from 'redux-saga/effects'
import { authSagas } from './auth';
import { surveySagas } from './surveys';
import { analysisSagas } from './analysis';


export default function* sagas() {
  yield all([
    ...authSagas,
    ...surveySagas,
    ...analysisSagas
  ]);
}
