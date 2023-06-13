import * as actions from './actions';

function defaultState() {
  return {
    learnerGroups: [],
    lessons: [],
    lessonsSizes: [],
  };
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    SET_STATE(state, payload) {
      Object.assign(state, payload);
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState());
    },
    SET_LEARNER_GROUPS(state, learnerGroups) {
      state.learnerGroups = [...learnerGroups];
    },
    SET_CLASS_LESSONS(state, lessons) {
      state.lessons = lessons;
    },
    SET_CLASS_LESSONS_SIZES(state, sizes) {
      state.lessonsSizes = sizes;
    },
  },
  actions,
};
