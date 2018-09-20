import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { surveyActions, getVisibleSurveys } from 'src/surveys';
import SurveyList from 'src/views/components/survey-list';
import { analysisActions } from 'src/analysis';
import Button from '../../components/button'
import classNames from 'classnames';

import './surveys-page.css'

class SurveysPage extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      status: false,
      caption: 'Start'
    }

    this.updateInterval = 5000 // 5 seconds
    this.timerId = 0
  }

  updateGroupCallback(surveys, updateSurvey, analysis, updateAnalysis) {
    var g1 = 0
    var g2 = 0
    var g3 = 0
    var g4 = 0

    surveys.map(survey => {
      // if (!survey.completed) {
      //   if (!survey.surveyId1.canceled && !survey.surveyId3.canceled) {
      //     g1 += 1
      //   } else if (!survey.surveyId2.canceled && !survey.surveyId4.canceled) {
      //     g2 += 1
      //   } else if (!survey.surveyId3.canceled && !survey.surveyId5.canceled) {
      //     g3 += 1
      //   } else if (!survey.surveyId4.canceled && !survey.surveyId1.canceled) {
      //     g4 += 1
      //   }
      //   updateSurvey(survey, {completed: true});
      // }

      if (!survey.surveyId1.canceled && !survey.surveyId3.canceled) {
        g1 += 1
      } else if (!survey.surveyId2.canceled && !survey.surveyId4.canceled) {
        g2 += 1
      } else if (!survey.surveyId3.canceled && !survey.surveyId5.canceled) {
        g3 += 1
      } else if (!survey.surveyId4.canceled && !survey.surveyId1.canceled) {
        g4 += 1
      }

      return survey
    })

    // var analysis = this.props.analysis.list.get(0)
    if (analysis) {
      updateAnalysis(analysis, {
        group1: g1,
        group2: g2,
        group3: g3,
        group4: g4
      })
    }

  }
  
  toggleStart() {
    setTimeout(
      function() {
        this.setState({
          status: !this.state.status,
        })
        
        this.setState({
          caption: this.state.status ? 'Stop' : 'Start'
        })
    
        if (this.state.status) {
          var analysis = this.props.analysis.list.get(0)
          this.timerId = setInterval(this.updateGroupCallback(this.props.surveys, this.props.updateSurvey, analysis, this.props.updateAnalysis), this.updateInterval)
        } else {
          clearInterval(this.timerId);
        }

      }.bind(this),
      30
    )
  }

  render() {
    return (
      <div>
        <div className="g-row row-start">
          <div className="g-col">
            <Button
              className={classNames('btn--text', 'start__button', {'active': this.state.status})}
              onClick={() => this.toggleStart()}
            >
              {this.state.caption}
            </Button>
          </div>
        </div>
        <div className="g-row">
          <div className="g-col">
            <SurveyList
              // filter={filter}
              removeSurvey={this.props.removeSurvey}
              surveys={this.props.surveys}
              updateSurvey={this.props.updateSurvey}
            />
          </div>
        </div>
      </div>
    );
  }
};

SurveysPage.propTypes = {
  createSurvey: PropTypes.func.isRequired,
  filterSurveys: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  removeSurvey: PropTypes.func.isRequired,
  surveys: PropTypes.instanceOf(List),
  updateSurvey: PropTypes.func.isRequired,
  analysis: PropTypes.instanceOf(Object),
  updateAnalysis: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  surveys: getVisibleSurveys(state),
  analysis: state.analysis
});

const mapDispatchToProps = {
  createSurvey: surveyActions.createSurvey,
  filterSurveys: surveyActions.filterSurveys,
  removeSurvey: surveyActions.removeSurvey,
  updateSurvey: surveyActions.updateSurvey,
  updateAnalysis: analysisActions.updateAnalysis
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveysPage)
);
