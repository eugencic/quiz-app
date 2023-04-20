<template>
  <div id="quiz-main-container">
    <h1>{{ quizzData.title }}</h1>
    <div id="quiz-container" v-for="(question, index) in quizzData.questions" :key="index">
      <h2>{{ question.question }}</h2>
      <div id="answer" v-for="(answer, answerIndex) in question.answers" :key="answerIndex"
        :class="{'selected': question.selectedAnswer === answer}"
        @click="selectAnswer(question, answer)">
        <h3>{{ answer }}</h3>
      </div>
    </div>
    <v-btn id="submit-answers-button" @click="submitQuiz">Submit</v-btn>
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
      selectAnswer(question, answer) {
        question.selectedAnswer = answer;
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
#quiz-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-top: 3%;
  color: #F5F5F5;
}

h2 {
  margin-bottom: 3%;
}

#quiz-container {
  width: 40%;
  min-width: 20%;
  height: auto;
  margin-top: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #382a4b;
  border-radius: 25px;
}

#answer {
  width: 50%;
  min-width: 150px;
  height: 30%;
  margin: 2%;
  padding: 1%;
  justify-content: center;
  align-items: center;
  background-color: #271c36;
  border-radius: 25px;
  cursor: pointer;
}

#answer.selected {
  background-color: #42b983;
  color: #F5F5F5;
}

#submit-answers-button {
  margin: 3%;
  background-color: #42b983;
  color: #F5F5F5;
}
</style>
