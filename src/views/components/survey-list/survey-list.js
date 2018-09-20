import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import SurveyItem from '../survey-item';

import './survey-list.css';

const SurveyList = ({removeSurvey, surveys, updateSurvey}) => {
  if (!surveys) {
    return (
      <div>No data</div>
    )
  }
  let surveyItems = surveys.map((survey, index) => {
    return (
      <SurveyItem
        removeSurvey={removeSurvey}
        key={index}
        survey={survey}
        updateSurvey={updateSurvey}
      />
    );
  });

  return (
    <div className="survey-list">
      {surveyItems}
    </div>
  );
};

SurveyList.propTypes = {
  removeSurvey: PropTypes.func.isRequired,
  surveys: PropTypes.instanceOf(List),
  updateSurvey: PropTypes.func.isRequired
};


export default SurveyList;
