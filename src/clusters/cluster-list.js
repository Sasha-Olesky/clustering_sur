import { FirebaseList } from 'src/firebase';
import { clustersActions } from './actions';
import { Cluster } from './cluster';


export const clusterList = new FirebaseList({
  onAdd: clustersActions.addClusterFulfilled,
  onChange: clustersActions.updateClusterFulfilled,
  onLoad: clustersActions.loadClusterFulfilled,
}, Cluster);
