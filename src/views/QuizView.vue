<template>
  <div>
    <h1>{{ quizzData.title }}</h1>
    <div v-for="(question, index) in quizzData.questions" :key="index">
      <h2>{{ question.question }}</h2>
      <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
        <label>
          <input type="radio" :value="answer" v-model="question.selectedAnswer">
          {{ answer }}
        </label>
      </div>
    </div>
    <button @click="submitQuiz">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuizView',
  props: {
    id: String,
  },
  data() {
    return {
        quizzId: '',
        quizzData: []
    }
  },
  created () {
    if (this.id) {
        this.quizzId = this.id;
    }
  },
  mounted() {
      this.getQuizData();
  },
  methods: {
    getQuizData() {
      axios.get(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${this.quizzId}`, {
        headers: {
          'X-Access-Token': '434b1fd497c7bbc24635dfd972ddd6e12bb9186e9ea189eb24abd082b63648fd',
        }
      })
        .then(response => {
            this.quizzData = response.data;
            this.quizzData.questions.forEach(question => {
            question.selectedAnswer = '';
            });
          console.log(this.quizzData);
        })
        .catch(error => {
          console.log(error);
        });
      },
      submitQuiz() {
        this.quizzData.questions.forEach(question => {
            console.log(question.selectedAnswer);
            console.log(question.id);
        });
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

h1 {
  margin-top: 3%;
  color: #F5F5F5;
}

input[type="radio"] {
  -webkit-appearance: radio !important;
  appearance: radio !important;
  -moz-appearance: radio !important;
  -ms-appearance: radio !important;
}

input[type="radio"]:checked {
  -webkit-appearance: radio !important;
  appearance: radio !important;
  -moz-appearance: radio !important;
  -ms-appearance: radio !important;
}

</style>
