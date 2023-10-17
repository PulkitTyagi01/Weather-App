<template>
  <section class="login-container">
    <h1 class="login-heading">LOGIN</h1>
    <div class="login-box">
      <form id="form-con" @submit.prevent @submit="login">
        <div class="form-container">
          <label for="email" class="input-label">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="username"
            v-model="email"
            class="input-field"
            required
          />
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            v-model="password"
            class="input-field"
            required
          />
          <p style="color: rgb(225, 14, 14)" v-if="loginFailed || invalidForm">
            &#8903; Invalid credentials
          </p>
          <!-- <p style="color: red;" v-if="invalidForm">Field Cannot be Empty</p> -->
          <button
            type="submit"
            class="login-button"
            :disabled="email === '' || password === ''"
          >
            Login
          </button>
          <router-link to="/register" class="register-link"
            >Create an account</router-link
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      invalidForm: false,
    }
  },
  methods: {
    login() {
      if (
        this.email === '' ||
        this.password === '' ||
        !this.email.includes('@')
      ) {
        this.invalidForm = true
        return
      }
      this.$emit('log-in', { email: this.email, password: this.password })
    },
  },
  computed: {
    loginFailed() {
      return this.$store.getters.loginFailed
    },
  },
}
</script>

<style scoped>
p {
  font-size: 12px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  position: relative;
}

.login-box {
  border: 1px solid rgb(156, 151, 151);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  width: 300px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(40px);
  background-color: rgba(252, 248, 248, 0.649);
}

.login-heading {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-container {
  margin-top: 10px;
}

.input-label {
  display: block;
  margin-bottom: 6px;
  font-weight: normal;
}

.input-field {
  /* color: white; */
  width: 93%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: transparent;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
}

.input-field::placeholder {
  color: rgb(87, 86, 86);
}
.login-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.login-button:hover {
  background-color: #054979;
}

.login-button:disabled {
  opacity: 70%;
  background-color: rgb(177, 175, 175);
}
.register-link {
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 87%;
  display: block;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: #090909;
  text-decoration: none;
}

.register-link:hover {
  background-color: rgba(176, 197, 197, 0.137);
}
</style>
