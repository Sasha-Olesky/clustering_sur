import { List, Record } from 'immutable';
import { clustersActions } from './actions';

export const ClustersState = new Record({
    group1: new List(),
    group2: new List(),
    group3: new List(),
    group4: new List(),
});

export function clustersReducer(state = new ClustersState(), {payload, type}) {
    switch (type) {
        case clustersActions.ADD_CLUSTER_FULFILLED:
            var a1 = payload.path.split("/")
            if (a1.length !== 2) {
                return state
            }
            return state.set(a1[1], state[a1[1]].unshift(payload.cluster));

        case clustersActions.LOAD_CLUSTERS_FULFILLED:
            var a2 = payload.path.split("/")
            if (a2.length !== 2) {
                return state
            }
            return state.set(a2[1], new List(payload.clusters))

        case clustersActions.REMOVE_CLUSTER_FULFILLED:
            var a3 = payload.path.split("/")
            if (a3.length !== 2) {
                return state
            }
            return state.set(a3[1], state[a3[1]].filter(cluster => {
              return cluster.key !== payload.cluster.key;
        }));

        case clustersActions.UPDATE_CLUSTER_FULFILLED:
            var a4 = payload.path.split("/")
            if (a4.length !== 2) {
                return state
            }
            return state.set(a4[1], state[a4[1]].map(cluster => {
                return cluster.key === payload.cluster.key ? payload.cluster : cluster;
            }));

        default:
            return state;
    }
}
