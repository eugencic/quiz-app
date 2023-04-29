<template>
  <div id="quiz-list-container">
    <div class="quiz-preview" v-for="(quiz, index) in quizzes" :key="index" :class="{ 'quiz-completed': isQuizCompleted(quiz.id) }" @click="!isQuizCompleted(quiz.id) && navigateToQuiz(quiz.id)">
      <div class="quiz-title">
        <h2>{{ quiz.title }}</h2>
      </div>
      <div class="quiz-body">
        <p v-if="!isQuizCompleted(quiz.id)">Questions count: {{ quiz.questions_count }}</p>
        <p v-if="isQuizCompleted(quiz.id)">Score: {{ getQuizScore(quiz.id) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizList',
  props: {
    quizzes: Array,
  },
  methods: {
    navigateToQuiz(quizId) {
      this.$router.push({
        name: "quiz",
        params: {
          id: quizId,
        },
      });
    },
    isQuizCompleted(quizId) {
      return localStorage.getItem(`quizResult-${quizId}`) !== null;
    },
    getQuizScore(quizId) {
      const quizResult = JSON.parse(localStorage.getItem(`quizResult-${quizId}`));
      return `${quizResult.score} / ${quizResult.numQuestions}`;
    }
  }
}
</script>

<style>
#quiz-list-container {
  width: 80%;
  height: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #382a4b;
  border-radius: 25px;
}

.quiz-preview {
  width: 25%;
  min-width: 150px;
  height: auto;
  min-height: 125px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #382a4b;
  background-color: #42b983;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.quiz-preview:hover {
  background-color: #368a68;
}

.quiz-preview.quiz-completed {
  background-color: #b94256;
  cursor: default;
}

.quiz-preview.quiz-completed:hover {
  background-color: #8a363e;
}

.quiz-title {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quiz-title h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.quiz-body p {
  color:#F5F5F5;
  font-size: 18px;
  margin: 0;
}
</style>
