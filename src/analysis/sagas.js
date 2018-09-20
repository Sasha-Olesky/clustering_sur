import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'src/auth';
import { analysisActions } from './actions';
import { analysisList } from './analysis-list';


function subscribe() {
  return eventChannel(emit => analysisList.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  }
  catch (error) {
    yield put(onError(error));
  }
}

const updateAnalysis = write.bind(null, analysisList, analysisList.update, analysisActions.updateAnalysisFailed);


//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    yield take(authActions.SIGN_IN_FULFILLED);

    analysisList.path = `analysis`;
    const job = yield fork(read);

    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(job);
  }
}

function* watchUpdateAnalysis() {
  while (true) {
    let { payload } = yield take(analysisActions.UPDATE_ANALYSIS);
    yield fork(updateAnalysis, payload.analysis.key, payload.changes);
  }
}


//=====================================
//  ANALYSIS SAGAS
//-------------------------------------

export const analysisSagas = [
  fork(watchAuthentication),
  fork(watchUpdateAnalysis)
];
