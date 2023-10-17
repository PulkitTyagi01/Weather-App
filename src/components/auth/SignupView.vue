<template>
  <section>
    <sign-up @sign-up="signup"></sign-up>
  </section>
</template>

<script>
import SignUp from './SignUp.vue'
export default {
  components: {
    SignUp,
  },
  methods: {
    signup(payload) {
      this.$store.dispatch('signUpUsers', payload)
      setTimeout(() => {
        if (!this.registrationUnsuccess) {
          this.$router.replace('/weather')
        } else {
          this.$router.push('/register')
        }
      }, 1100)
    },
  },
  computed: {
    registrationUnsuccess() {
      return this.$store.getters.registrationError
    },
  },
}
</script>

<style></style>
