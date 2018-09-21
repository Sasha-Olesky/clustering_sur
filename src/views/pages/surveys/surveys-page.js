import React from 'react';
import { List, Record } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { surveyActions, getVisibleSurveys } from 'src/surveys';
import SurveyList from 'src/views/components/survey-list';
import { clustersActions } from 'src/clusters';
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

    this.updateClusterCallback = this.updateClusterCallback.bind(this)

    this.updateInterval = 5000 // 5 seconds
    this.timerId = 0
  }

  updateClusterCallback() {
    this.props.surveys.map(survey => {
      if (!survey.completed) {
        if (!survey.surveyId1.canceled && !survey.surveyId3.canceled) {
          this.props.addCluster({ groupid: 'group1', user: { userid: survey.key } })
        } else if (!survey.surveyId2.canceled && !survey.surveyId4.canceled) {
          this.props.addCluster({ groupid: 'group2', user: { userid: survey.key } })
        } else if (!survey.surveyId3.canceled && !survey.surveyId5.canceled) {
          this.props.addCluster({ groupid: 'group3', user: { userid: survey.key } })
        } else if (!survey.surveyId4.canceled && !survey.surveyId1.canceled) {
          this.props.addCluster({ groupid: 'group4', user: { userid: survey.key } })
        } else {
          this.props.addCluster({ groupid: 'group5', user: { userid: survey.key } })
        }
        this.props.updateSurvey(survey, {completed: true})
      }
      return survey
    })
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
          this.timerId = setInterval(this.updateClusterCallback, this.updateInterval)
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
  clusters: PropTypes.instanceOf(Record),
  addCluster: PropTypes.func.isRequired,
  removeCluster: PropTypes.func.isRequired,
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  surveys: getVisibleSurveys(state),
  clusters: state.clusters
});

const mapDispatchToProps = {
  createSurvey: surveyActions.createSurvey,
  filterSurveys: surveyActions.filterSurveys,
  removeSurvey: surveyActions.removeSurvey,
  updateSurvey: surveyActions.updateSurvey,
  addCluster: clustersActions.addCluster,
  removeCluster: clustersActions.removeCluster,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveysPage)
);
