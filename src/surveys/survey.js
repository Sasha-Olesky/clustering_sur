import { Record } from 'immutable';

export const Survey = new Record({
  key: "",
  completed: false,
  surveyId1: new Record({
    answer: "",
    canceled: true,
    createdAt: Date.now()
  }),
  surveyId2: new Record({
    answer: "",
    canceled: true,
    createdAt: Date.now()
  }),
  surveyId3: new Record({
    answer: "",
    canceled: true,
    createdAt: Date.now()
  }),
  surveyId4: new Record({
    answer: "",
    canceled: true,
    createdAt: Date.now()
  }),
  surveyId5: new Record({
    answer: "",
    canceled: true,
    createdAt: Date.now()
  })
});
