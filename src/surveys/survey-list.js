import { FirebaseList } from 'src/firebase';
import { surveyActions } from './actions';
import { Survey } from './survey';


export const surveyList = new FirebaseList({
  onAdd: surveyActions.createSurveyFulfilled,
  onChange: surveyActions.updateSurveyFulfilled,
  onLoad: surveyActions.loadSurveysFulfilled,
  onRemove: surveyActions.removeSurveyFulfilled
}, Survey);
