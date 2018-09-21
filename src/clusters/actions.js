export const clustersActions = {
    ADD_CLUSTER: 'ADD_CLUSTER',
    ADD_CLUSTER_FAILED: 'ADD_CLUSTER_FAILED',
    ADD_CLUSTER_FULFILLED: 'ADD_CLUSTER_FULFILLED',

    REMOVE_CLUSTER: 'REMOVE_CLUSTER',
    REMOVE_CLUSTER_FAILED: 'REMOVE_CLUSTER_FAILED',
    REMOVE_CLUSTER_FULFILLED: 'REMOVE_CLUSTER_FULFILLED',

    UPDATE_CLUSTER: 'UPDATE_CLUSTER',
    UPDATE_CLUSTER_FAILED: 'UPDATE_CLUSTER_FAILED',
    UPDATE_CLUSTER_FULFILLED: 'UPDATE_CLUSTER_FULFILLED',

    LOAD_CLUSTERS_FULFILLED: 'LOAD_CLUSTERS_FULFILLED',

    addCluster: cluster => ({
        type: clustersActions.ADD_CLUSTER,
        payload: { cluster }
    }),
    
    addClusterFailed: error => ({
        type: clustersActions.ADD_CLUSTER_FAILED,
        payload: {error}
    }),
    
    addClusterFulfilled: (cluster, path) => ({
        type: clustersActions.ADD_CLUSTER_FULFILLED,
        payload: {cluster, path}
    }),

    removeCluster: cluster => ({
        type: clustersActions.REMOVE_CLUSTER,
        payload: {cluster}
    }),
    
    removeClusterFailed: error => ({
        type: clustersActions.REMOVE_CLUSTER_FAILED,
        payload: {error}
    }),
    
    removeClusterFulfilled: (cluster, path) => ({
        type: clustersActions.REMOVE_CLUSTER_FULFILLED,
        payload: {cluster, path}
    }),

    updateCluster: (cluster, changes) => ({
        type: clustersActions.UPDATE_CLUSTER,
        payload: {cluster, changes}
    }),
  
    updateClusterFailed: error => ({
        type: clustersActions.UPDATE_CLUSTER_FAILED,
        payload: {error}
    }),
  
    updateClusterFulfilled: (cluster, path) => ({
        type: clustersActions.UPDATE_CLUSTER_FULFILLED,
        payload: {cluster, path}
    }),
  
    loadClusterFulfilled: (clusters, path) => ({
        type: clustersActions.LOAD_CLUSTERS_FULFILLED,
        payload: {clusters, path}
    })
}