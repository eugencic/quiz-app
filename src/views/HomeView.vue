<template>
  <div id="home-main-container">
    <div id="header">
      <v-btn id="logout-button" @click="logout">Log Out</v-btn>
      <h1>Available Quizzes</h1>
    </div>
    <QuizList :quizzes="quizzes" />
  </div>
</template>

<script>
import axios from 'axios';

import QuizList from '../components/QuizList.vue'

export default {
  name: 'HomeView',
  components: {
    QuizList
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
          'X-Access-Token': 'd637e24c46ee36022cfe35c3e29352b6a68494a456d19bd37ffb50ec1ef315b0',
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
#header {
  width: 100%;
}

#home-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-top: 3%;
  color: #F5F5F5;
}

#logout-button {
  position: absolute;
  right: 15%;
  margin-top: 3%;
  background-color: #b94256;
  color: #F5F5F5;
}

@media screen and (max-width: 820px) {
    #logout-button {
        display: none;
    }
}
</style>
