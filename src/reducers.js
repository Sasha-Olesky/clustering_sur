import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { surveysReducer } from './surveys';
import { clustersReducer } from './clusters';


export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  surveys: surveysReducer,
  clusters: clustersReducer
});
