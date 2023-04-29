import { createStore } from "vuex";
import audio from "./modules/audio";

export default createStore({
  state: {
    quizResults: [],
  },
  getters: {},
  mutations: {
    addQuizResult(state, result) {
      state.quizResults.push(result);
    },
  },
  actions: {
    saveQuizResult({ commit }, { quizId, score, numQuestions }) {
      const quizResult = {
        quizId,
        score,
        numQuestions,
      };
      localStorage.setItem(`quizResult-${quizId}`, JSON.stringify(quizResult));
      commit("addQuizResult", quizResult);
    },
  },
  modules: {
    audio,
  },
});
