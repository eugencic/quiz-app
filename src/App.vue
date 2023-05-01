<template>
  <router-view />
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";

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
