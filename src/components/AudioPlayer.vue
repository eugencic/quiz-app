<template>
    <v-btn id="audio-button" :color="isMuted ? '#b94256' : '#42b983'" @click="toggleAudio">
      <v-icon>{{ isMuted ? 'mdi-volume-off' : 'mdi-volume-high' }}</v-icon>
    </v-btn>
</template>

<script>
export default {
  computed: {
    audio() {
      return this.$store.state.audio.audio;
    },
    isMuted() {
      return this.$store.state.audio.isMuted;
    },
  },
  mounted() {
    this.$store.dispatch("audio/createAudio", {
      src: require("../music/audio.mp3"),
      loop: true,
      autoplay: false,
      volume: 0.5,
    });
  },
  methods: {
    toggleAudio() {
      if (this.isMuted) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.$store.commit("audio/SET_MUTED", !this.isMuted);
    },
  },
  watch: {
    isMuted(newValue) {
      const button = document.getElementById("audio-button");
      button.style.backgroundColor = newValue ? "#42b983" : "#b94256";
    },
  },
};
</script>

<style>
  #audio-button {
    margin: 3% 2% 3% 2%;
  }
</style>
