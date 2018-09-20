import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './survey-item.css';


export class SurveyItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false};

    this.remove = this.remove.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  remove() {
    this.props.removeSurvey(this.props.survey);
  }

  toggleStatus() {
    const { survey } = this.props;
    this.props.updateSurvey(survey, {completed: !survey.completed});
  }

  renderTitle(survey) {
    return (
      <div className="survey-item__title" tabIndex="0">
        {survey.key}
      </div>
    );
  }

  render() {
    const { editing } = this.state;
    const { survey } = this.props;

    let containerClasses = classNames('survey-item', {
      'survey-item--completed': survey.completed,
    });

    return (
      <div className={containerClasses} tabIndex="0">
        <div className="cell">
          <Button
            className={classNames('btn--icon', 'survey-item__button', {'active': survey.completed, 'hide': editing})}
            onClick={this.toggleStatus}>
            <Icon name="done" />
          </Button>
        </div>

        <div className="cell">
          {this.renderTitle(survey)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'survey-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

SurveyItem.propTypes = {
  removeSurvey: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired,
  updateSurvey: PropTypes.func.isRequired
};


export default SurveyItem;
