<template>
  <div id="home-main-container">
    <div id="header">
      <AudioPlayer />
      <v-btn id="logout-button" @click="logout">
      <v-icon>{{'mdi-logout'}}</v-icon></v-btn>
    </div>
    <h1 id="main-header">Available Quizzes</h1>
    <QuizList :quizzes="quizzes" />
  </div>
</template>

<script>
import axios from 'axios';

import QuizList from '../components/QuizList.vue'
import AudioPlayer from "../components/AudioPlayer.vue";

export default {
  name: 'HomeView',
  components: {
    QuizList,
    AudioPlayer
  },
  data() {
    return {
      quizzes: [],
    }
  },
  mounted() {
    this.getQuizzes();
  },
  methods: {
    getQuizzes() {
      axios.get('https://late-glitter-4431.fly.dev/api/v54/quizzes', {
        headers: {
          'X-Access-Token': 'bd69dea91d6abd534a0775035bc5368a4abecdab39e55759d69a1bb448e8647b',
        }
      })
        .then(response => {
          this.quizzes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push('/signup');
    }
  },
}
</script>

<style>
#home-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#main-header {
  margin: 1% 0 0 0;
  color: #F5F5F5;
}

#logout-button {
  margin: 3% 2% 3% 2%;
  background-color: #b94256;
  color: #F5F5F5;
}

#header {
  width: 20%;
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
