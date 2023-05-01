<template>
  <div id="signup-main-container">
    <h1>Sign Up</h1>
    <div id="signup-form-container">
      <v-form ref="form" @submit.prevent="submitForm" class="my-10" style="width: 90%">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          class="custom-text-field"
        ></v-text-field>
        <v-text-field
          v-model="surname"
          :rules="surnameRules"
          label="Surname"
          class="custom-text-field"
        ></v-text-field>
        <v-btn type="submit" id="submit-button">Submit</v-btn>
      </v-form>
    </div>
    <v-alert v-if="alert" text="Please fill out all the fields" type="warning" variant="tonal" class="alert"></v-alert>
    <v-alert v-if="error" text="Error occured. The user already exists or there is no access to the internet" type="error" variant="tonal" class="alert"></v-alert>
  </div>
  <AudioPlayer />
</template>

<script>
import axios from 'axios';

import AudioPlayer from "../components/AudioPlayer.vue";

export default {
  name: 'SignupView',
  components: {
    AudioPlayer,
  },
  data() {
    return {
      name: '',
      nameRules: [
        value => !!value || 'Name is required',
      ],
      surname: '',
      surnameRules: [
        value => !!value || 'Surname is required',
      ],
      formData: {
        name: '',
        surname: '',
      },
      alert: false,
      error: false,
      now: null,
      userData: {
        userId: null,
        date: null,
        time: null,
      },
    }
  },
  created() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.userId && user.userId !== "undefined" && user.date && user.time) { 
        this.$router.push('/');
      }
    }
  },
  methods: {
    submitForm() {
      if (this.name && this.surname) {
        this.formData.name = this.name;
        this.formData.surname = this.surname;
        this.login();
      } else {
        this.showAlert();
      }
    },
    login() {
      axios.post('https://late-glitter-4431.fly.dev/api/v54/users', {
        data: this.formData
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': process.env.VUE_APP_ACCESS_TOKEN,
        }
      })
        .then(response => {
          this.now = new Date();
          this.userData.userId = response.data.id;
          this.userData.date = this.now.toLocaleDateString();
          this.userData.time = this.now.toLocaleTimeString();
          localStorage.setItem("userData", JSON.stringify(this.userData));
          this.$router.push('/');
        })
        .catch(error => {
          console.log(error);
          this.showError();
        });
    },
    showAlert() {
      this.alert = true;
      this.alertTimeout = setTimeout(() => {
        this.alert = false;
      }, 5000);
    },
    showError() {
      this.error = true;
      this.alertTimeout = setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
}
</script>

<style>
#signup-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-top: 3%;
  color: #F5F5F5;
}

#signup-form-container {
  width: 50%;
  height: auto;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #382a4b;
  border-radius: 25px;
}

.custom-text-field .v-messages__message {
  color: red;
}

#submit-button {
  margin-top: 1%;
  background-color: #42b983;
  color: #F5F5F5;
}

.alert {
  width: 20%;
  margin-top: 3%;
}
</style>
