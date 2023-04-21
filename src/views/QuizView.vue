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
  <v-alert v-if="alert" text="Please respond to all the questions before submitting" type="error" variant="tonal" class="submit-questions-alert"></v-alert>
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
      counter: 0,
      alert: false
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
        this.quizzData.questions.forEach(question => {
          if (question.selectedAnswer != '') {
            this.counter = this.counter + 1;
          }
        });
        if (this.counter != 10) {
          this.showAlert();
          this.counter = 0;
        }
        else {
          this.counter = 0;   
          this.questionData.question_id = question.id;
          this.questionData.answer = question.selectedAnswer;
        const user = JSON.parse(localStorage.getItem("userData"));
        this.questionData.user_id = user.userId;
        console.log(this.questionData);
        axios.post(`https://late-glitter-4431.fly.dev/api/v54/quizzes/${this.quizzId}/submit`, {
          data: this.questionData
        },  {
              headers: {
                'X-Access-Token': '434b1fd497c7bbc24635dfd972ddd6e12bb9186e9ea189eb24abd082b63648fd',
              }
            })
              .then(response => {
                // this.quizzData = response.data;
                // this.quizzData.questions.forEach(question => {
                // question.selectedAnswer = '';
                // });
                console.log(response);
              })
              .catch(error => {
              console.log(error);
              });
        }

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
  position: fixed;
  bottom: 0;
  left: 0;
  /* width: 30%;
  margin-top: 2%; */
  /* margin-bottom: 3%; */
}
</style>
