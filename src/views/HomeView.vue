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
          'X-Access-Token': '434b1fd497c7bbc24635dfd972ddd6e12bb9186e9ea189eb24abd082b63648fd',
        }
      })
        .then(response => {
          this.quizzes = response.data;
          console.log(this.quizzes[0]);
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
