<template>
  <div id="home-main-container">
    <h1>Courses</h1>
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

h1 {
  margin-top: 3%;
  color: #F5F5F5;
}
</style>
