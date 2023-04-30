<template>
  <div>
    <button @click="toggleAudio">{{ isMuted ? 'Play' : 'Mute' }}</button>
  </div>
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
      src: require("../music/2.mp3"),
      loop: true,
      autoplay: false, // set autoplay to false
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
};
</script>






