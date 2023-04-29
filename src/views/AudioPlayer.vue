<template>
  <div>
    <button @click="toggleMute">Mute/Unmute</button>
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
      autoplay: true,
      volume: 0.5,
    });
  },
  methods: {
    toggleMute() {
      this.$store.commit("audio/SET_MUTED", !this.isMuted);
    },
  },
};
</script>
