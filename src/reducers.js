import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { surveysReducer } from './surveys';
import { analysisReducer } from './analysis';


export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  surveys: surveysReducer,
  analysis: analysisReducer
});
