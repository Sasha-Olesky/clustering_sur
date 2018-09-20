import { createSelector } from 'reselect';


export function getSurveys(state) {
  return state.surveys;
}

export function getSurveyFilter(state) {
  return getSurveys(state).filter;
}

export function getSurveyList(state) {
  return getSurveys(state).list;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleSurveys = createSelector(
  getSurveyFilter,
  getSurveyList,
  (filter, surveyList) => {
    switch (filter) {
      case 'active':
        return surveyList.filter(survey => !survey.completed);

      case 'completed':
        return surveyList.filter(survey => survey.completed);

      default:
        return surveyList;
    }
  }
);
