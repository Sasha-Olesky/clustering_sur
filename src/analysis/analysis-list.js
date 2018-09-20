import { FirebaseList } from 'src/firebase';
import { analysisActions } from './actions';
import { Analysis } from './analysis';


export const analysisList = new FirebaseList({
  onChange: analysisActions.updateAnalysisFulfilled,
  onLoad: analysisActions.loadAnalysisFulfilled,
}, Analysis);
