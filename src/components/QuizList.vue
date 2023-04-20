<template>
  <div id="quiz-container">
    <div class="quiz-preview" v-for="(quizz, index) in quizzes" :key="index" >
      <div class="quizz-title">
        <h2>{{ quizz.title }}</h2>
      </div>
      <div class="quizz-body">
        <p>Questions count: {{ quizz.questions_count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizList',
  props: {
    quizzes: [],
  }
}
</script>

<style>
#quiz-container {
  width: 80%;
  height: auto;
  margin-top: 3%;
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
