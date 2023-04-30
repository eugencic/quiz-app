const state = {
  audio: null,
  isMuted: true
}

const mutations = {
  SET_AUDIO(state, audio) {
    state.audio = audio
  },
  SET_MUTED(state, isMuted) {
    state.isMuted = isMuted
    state.audio.muted = isMuted
  }
}

const actions = {
  createAudio({ commit }, { src, loop, autoplay, volume }) {
    const audio = new Audio(src)
    audio.loop = loop
    audio.autoplay = autoplay
    audio.volume = volume
    commit('SET_AUDIO', audio)
  },
  playAudio({ state }) {
    if (state.audio.paused) {
      state.audio.play()
    }
  },
  pauseAudio({ state }) {
    if (!state.audio.paused) {
      state.audio.pause()
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
