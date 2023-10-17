<template>
  <section>
    <sign-in @log-in="logIn"></sign-in>
  </section>
</template>

<script>
import SignIn from './SignIn.vue'

export default {
  components: {
    SignIn,
  },
  methods: {
    logIn(payload) {
      this.$store.dispatch('loginUsers', payload)
      setTimeout(() => {
        this.$router.replace('/weather')
      }, 500)
    },
  },
}
</script>

<style></style>
