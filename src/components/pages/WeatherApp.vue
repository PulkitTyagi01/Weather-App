<template>
  <section>
    <div class="weather-app">
      <h1>Weather App</h1>
      <p>
        This is a Live Weather App. We Keep you Updated about weather of every
        city
      </p>
      <input type="text" placeholder="Enter City Name" v-model="cityName" />
      <p class="error" v-if="invalidForm">
        &#8903; Please enter a valid location
      </p>
      <br />
      <button @click="showWeather" :disabled="cityName === ''">Show</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cityName: '',
      invalidForm: false,
    }
  },
  methods: {
    showWeather() {
      if (this.cityName === '') {
        this.invalidForm = true
        return
      }
      this.$store.dispatch('setCityName', this.cityName)
      this.$store.dispatch('showWeather', this.cityName)
      setTimeout(() => {
        if (this.cityData) {
          this.$router.push(`/weather/` + this.cityName)
        } else {
          this.invalidForm = true
          this.$store.dispatch('setCityData', true)
          return
        }
      }, 1000)
    },
  },
  computed: {
    cityData() {
      return this.$store.getters.cityData
    },
  },
}
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/night.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
}

.weather-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error {
  font-size: 12px;
  color: rgb(225, 14, 14);
}
.content {
  text-align: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #0b0b0b;
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

input[type='text'] {
  text-align: center;
  width: 30%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

button:disabled {
  opacity: 70%;
  background-color: gray;
}
</style>
