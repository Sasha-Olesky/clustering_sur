export const analysisActions = {
    UPDATE_ANALYSIS: 'UPDATE_ANALYSIS',
    UPDATE_ANALYSIS_FAILED: 'UPDATE_ANALYSIS_FAILED',
    UPDATE_ANALYSIS_FULFILLED: 'UPDATE_ANALYSIS_FULFILLED',

    LOAD_ANALYSIS_FULFILLED: 'LOAD_ANALYSIS_FULFILLED',

    updateAnalysis: (analysis, changes) => ({
        type: analysisActions.UPDATE_ANALYSIS,
        payload: {analysis, changes}
    }),
  
    updateAnalysisFailed: error => ({
        type: analysisActions.UPDATE_ANALYSIS_FAILED,
        payload: {error}
    }),
  
    updateAnalysisFulfilled: analysis => ({
        type: analysisActions.UPDATE_ANALYSIS_FULFILLED,
        payload: {analysis}
    }),
  
    loadAnalysisFulfilled: analysis => ({
        type: analysisActions.LOAD_ANALYSIS_FULFILLED,
        payload: {analysis}
    })
}