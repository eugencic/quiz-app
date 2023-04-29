const state = {
  audio: null,
  isMuted: false,
};

const mutations = {
  SET_AUDIO(state, audio) {
    state.audio = audio;
  },
  SET_MUTED(state, value) {
    state.isMuted = value;
    state.audio.muted = value;
  },
};

const actions = {
  createAudio({ commit }, { src, loop = false, autoplay = false, volume = 1 }) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.autoplay = autoplay;
    audio.volume = volume;
    commit("SET_AUDIO", audio);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
