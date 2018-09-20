import { List, Record } from 'immutable';
import { analysisActions } from './actions';

export const AnalysisState = new Record({
    list: new List()
});

export function analysisReducer(state = new AnalysisState(), {payload, type}) {
    switch (type) {
        case analysisActions.LOAD_ANALYSIS_FULFILLED:
            console.log('list', payload.analysis)
            return state.set('list', new List(payload.analysis))

        case analysisActions.UPDATE_ANALYSIS_FULFILLED:
            return state.set('list', state.list.map(analysis => {
                console.log(payload.analysis)
                return analysis.key === payload.analysis.key ? payload.analysis : analysis;
            }));

        default:
            return state;
    }
}
