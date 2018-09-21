import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from 'src/auth';
import { clustersActions } from './actions';
import { clusterList } from './cluster-list';


function subscribe() {
  return eventChannel(emit => clusterList.subscribe(emit));
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

const addCluster = write.bind(null, clusterList, clusterList.push, clustersActions.addClusterFailed);
const removeCluster = write.bind(null, clusterList, clusterList.remove, clustersActions.removeClusterFailed);
const updateCluster = write.bind(null, clusterList, clusterList.update, clustersActions.updateClusterFailed);


//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthentication() {
  while (true) {
    yield take(authActions.SIGN_IN_FULFILLED);

    clusterList.path = `clustering`;
    const job1 = yield fork(read);
    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(job1);
  }
}

function* watchAddCluster() {
  while (true) {
    let { payload } = yield take(clustersActions.ADD_CLUSTER);
    clusterList.path = `clustering/${payload.cluster.groupid}`
    yield fork(addCluster, payload.cluster.user);
  }
}

function* watchRemoveCluster() {
  while (true) {
    let { payload } = yield take(clustersActions.REMOVE_CLUSTER);
    clusterList.path = `clustering/${payload.cluster.groupid}`
    yield fork(removeCluster, payload.cluster.user);
  }
}

function* watchUpdateCluster() {
  while (true) {
    let { payload } = yield take(clustersActions.UPDATE_CLUSTER);
    clusterList.path = `clustering/${payload.cluster.groupid}`
    yield fork(updateCluster, payload.cluster.user);
  }
}

//=====================================
//  CLUSTER SAGAS
//-------------------------------------

export const clustersSagas = [
  fork(watchAuthentication),
  fork(watchAddCluster),
  fork(watchRemoveCluster),
  fork(watchUpdateCluster),
];
