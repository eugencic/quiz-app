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
    <v-alert v-if="alert" text="Please respond to all the questions before submitting" type="error" variant="tonal" class="submit-questions-alert"></v-alert>
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
      quizzData: [],
      questionData: {
        question_id: Number,
        answer: String,
        user_id: Number  
      },
      questionsNumber: 0,
      counter: 0,
      score: 0,
      alert: false,
      receivedResponses: 0
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
          'X-Access-Token': 'd637e24c46ee36022cfe35c3e29352b6a68494a456d19bd37ffb50ec1ef315b0',
        }
      })
        .then(response => {
          this.quizzData = response.data;
          this.quizzData.questions.forEach(question => {
            question.selectedAnswer = '';
            this.questionsNumber++;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectAnswer(question, answer) {
      question.selectedAnswer = answer;
    },
    submitQuiz() {
      let promises = [];
      this.quizzData.questions.forEach(question => {
        this.quizzData.questions.forEach(question => {
          if (question.selectedAnswer != '') {
            this.counter = this.counter + 1;
          }
        });
        if (this.counter != this.questionsNumber) {
          this.showAlert();
          this.counter = 0;
        }
        else {
          this.counter = 0;
          this.questionData.question_id = question.id;
          this.questionData.answer = question.selectedAnswer;
          const user = JSON.parse(localStorage.getItem("userData"));
          this.questionData.user_id = user.userId;
          promises.push(axios.post(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${this.quizzId}/submit`, {
            data: this.questionData
          }, {
            headers: {
              'X-Access-Token': 'd637e24c46ee36022cfe35c3e29352b6a68494a456d19bd37ffb50ec1ef315b0',
            }
          }
          ));
        }
      });

      Promise.all(promises)
        .then(responses => {
          responses.forEach(response => {
            this.receivedResponses = this.receivedResponses + 1;
            if (response.data.correct === true) {
              this.score = this.score + 1;
            }
          });
          if (this.receivedResponses === 10) {
            console.log("Your score: " + this.score);
            this.$store.dispatch("saveQuizResult", {
              quizId: this.quizzId,
              score: this.score,
              numQuestions: this.questionsNumber,
            });
            this.$router.push('/');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showAlert() {
      this.alert = true;
      this.alertTimeout = setTimeout(() => {
        this.alert = false;
      }, 5000);
    },
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
  margin: 3% 3% 0 3%;
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

.top-left-image {
  position: absolute;
  top: 0;
  right: 0;
}

.submit-questions-alert {
  width: 30%;
  margin-top: 2%;
}
</style>
