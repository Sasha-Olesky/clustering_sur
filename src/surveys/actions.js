export const surveyActions = {
    CREATE_SURVEY: 'CREATE_SURVEY',
    CREATE_SURVEY_FAILED: 'CREATE_SURVEY_FAILED',
    CREATE_SURVEY_FULFILLED: 'CREATE_SURVEY_FULFILLED',
  
    REMOVE_SURVEY: 'REMOVE_SURVEY',
    REMOVE_SURVEY_FAILED: 'REMOVE_SURVEY_FAILED',
    REMOVE_SURVEY_FULFILLED: 'REMOVE_SURVEY_FULFILLED',
  
    UPDATE_SURVEY: 'UPDATE_SURVEY',
    UPDATE_SURVEY_FAILED: 'UPDATE_SURVEY_FAILED',
    UPDATE_SURVEY_FULFILLED: 'UPDATE_SURVEY_FULFILLED',
  
    FILTER_SURVEYS: 'FILTER_SURVEYS',
    LOAD_SURVEYS_FULFILLED: 'LOAD_SURVEYS_FULFILLED',
  
    createSurvey: survey => ({
        type: surveyActions.CREATE_SURVEY,
        payload: {survey: {...survey, completed: false}}
    }),
  
    createSurveyFailed: error => ({
        type: surveyActions.CREATE_SURVEY_FAILED,
        payload: {error}
    }),
  
    createSurveyFulfilled: survey => ({
        type: surveyActions.CREATE_SURVEY_FULFILLED,
        payload: {survey}
    }),
  
    removeSurvey: survey => ({
        type: surveyActions.REMOVE_SURVEY,
        payload: {survey}
    }),
  
    removeSurveyFailed: error => ({
        type: surveyActions.REMOVE_SURVEY_FAILED,
        payload: {error}
    }),
  
    removeSurveyFulfilled: survey => ({
        type: surveyActions.REMOVE_SURVEY_FULFILLED,
        payload: {survey}
    }),
  
    updateSurvey: (survey, changes) => ({
        type: surveyActions.UPDATE_SURVEY,
        payload: {survey, changes}
    }),
  
    updateSurveyFailed: error => ({
        type: surveyActions.UPDATE_SURVEY_FAILED,
        payload: {error}
    }),
  
    updateSurveyFulfilled: survey => ({
        type: surveyActions.UPDATE_SURVEY_FULFILLED,
        payload: {survey}
    }),
  
    filterSurveys: filterType => ({
        type: surveyActions.FILTER_SURVEYS,
        payload: {filterType}
    }),
  
    loadSurveysFulfilled: surveys => ({
        type: surveyActions.LOAD_SURVEYS_FULFILLED,
        payload: {surveys}
    })
};
  