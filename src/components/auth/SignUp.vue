<template>
  <section class="register-container">
    <div class="background"></div>
    <h1 class="register-heading">REGISTER USER</h1>
    <div class="blur-container">
      <div class="form-container">
        <form @submit.prevent>
          <!-- <div class="form-group">
          <label for="username" class="input-label">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" v-model="username" class="input-field" required>
        </div> -->
          <div class="form-group">
            <label for="email" class="input-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              v-model="email"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="password" class="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              v-model="password"
              class="input-field"
              required
            />
          </div>
          <p style="color: rgb(225, 14, 14)" v-if="!formIsValid">
            &#8903; Add Proper credentials(minimum password length is 6).
          </p>
          <p style="color: rgb(225, 14, 14)" v-if="registrationUnsuccess">
            &#8903; User already exists
          </p>
          <div class="form-group">
            <button
              type="submit"
              @click="signup"
              class="signup-button"
              :disabled="email === '' || password === ''"
            >
              Sign Up
            </button>
            <router-link to="/login" class="login-link"
              >Already a User</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // username : '',
      email: '',
      password: '',
      formIsValid: true,
    }
  },
  methods: {
    signup() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.$store.dispatch('setRegistrationError', false)
        this.formIsValid = false
        return
      }
      this.formIsValid = true
      this.$emit('sign-up', { email: this.email, password: this.password })
    },
  },
  computed: {
    registrationUnsuccess() {
      return this.$store.getters.registrationError
    },
  },
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  p {
    font-size: 12px;
  }
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  background-color: #8bd8e7;
  position: relative;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
}

.form-container {
  /* opacity: 90%; */
  backdrop-filter: blur(30px);
  background-color: rgba(252, 248, 248, 0.649);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgb(156, 151, 151);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.register-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 6px;
}

.input-field {
  width: 90%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.input-field::placeholder {
  color: rgb(87, 86, 86);
}

.signup-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 96%;
}

.signup-button:hover {
  background-color: #054979;
}

.signup-button:disabled {
  opacity: 70%;
  background-color: rgb(177, 175, 175);
}

.login-link {
  font-size: 12px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 86%;
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #0c0c0c;
  text-decoration: none;
}

.login-link:hover {
  background-color: rgba(176, 197, 197, 0.137);
}

.form-group {
  width: 400px;
}
</style>
