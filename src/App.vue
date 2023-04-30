<template>
  <router-view />
  <AudioPlayer />
</template>

<script>
import AudioPlayer from "./views/AudioPlayer.vue";

export default {
  components: {
    AudioPlayer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #42b983;
}

html, body {
  background-color: #271c36;
  height: 100hv;
}
</style>

<!-- <template>
  <router-view />
  <button @click="playAudio">Play</button>
</template>

<script>
export default {
  computed: {
    audio() {
      return this.$store.state.audio.audio;
    },
  },
  mounted() {
    this.$store.dispatch("audio/createAudio", {
      src: require("./music/2.mp3"),
      loop: true,
      autoplay: false,
      volume: 0
    });
  },
  methods: {
    playAudio() {
      this.$store.dispatch("audio/playAudio");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #42b983;
}

html, body {
  background-color: #271c36;
  height: 100hv;
}
</style> -->