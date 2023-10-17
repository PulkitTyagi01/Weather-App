<template>
  <section>
    <div class="background"></div>
    <div class="weather" v-if="weatherData">
      <img src="../../assets/images/rain.png" class="weather-icon" />
      <h1 class="city">{{ cityName }}</h1>
      <h2 class="temp">
        {{ (weatherData['main']['temp'] - 273.15).toFixed(2) }}°C
      </h2>
      <div class="details">
        <div class="col">
          <img src="../../assets/images/humidity.png" />
          <div>
            <p class="humidity">{{ weatherData['main']['humidity'] }}%</p>
            <p>Humidity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </div>
        <div class="col">
          <img src="../../assets/images/wind.png" />
          <div>
            <p class="wind">{{ weatherData['wind']['speed'] }}m/s</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
    <button class="custom-button" @click="goBack">Go Back To Search</button>
    <button class="custom-button" @click="logout">Logout</button>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    goBack() {
      setTimeout(() => {
        this.$router.push({ path: '/weather', query: { id: this.userId } })
      }, 300)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
  },
  computed: {
    weatherData() {
      return this.$store.getters.weatherData
    },
    cityName() {
      return this.$store.getters.getCityName.toUpperCase()
    },
    userId() {
      return this.$store.getters.userId
    },
  },
  created() {
    console.log('jo')
    const cityName = this.$route.params.cityName
    if (cityName) {
      this.$store.dispatch('setCityName', this.$route.params.cityName)
      this.$store.dispatch('showWeather', this.$route.params.cityName)
    }
  },
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/gone.avif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  z-index: -1;
}

.weather {
  backdrop-filter: blur(30px);

  background-color: transparent;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgb(156, 151, 151);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  color: white;
}

.weather-icon {
  width: 170px;
  margin-top: 30px;
}

.weather h1 {
  font-size: 80px;
  font-weight: 500;
  margin: 0;
}

.weather h2 {
  font-size: 45px;
  font-weight: 400;
  margin: 0;
  margin-top: -10px;
}

.details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 50px;
}

.col {
  display: flex;
  align-items: center;
  text-align: left;
}

.col img {
  width: 40px;
  height: 50px;
  margin-right: 10px;
}

.custom-button {
  margin-top: 25px;
  background-color: #d2c7c7a3;
  border: 1px solid #333;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #333;
  color: white;
}
</style>

<!-- ------------------------------------------------------------------ -->
<!-- /* section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-image: url('../../assets/images/gone.avif');
    background-size: cover; 
    background-repeat: no-repeat;
    background-position: center center;
    align-items: center;
    padding: 20px;
    background-color: #9eebf0;
    height: 100vh;
    color: white;
 } */
 
 /* .humidity, .wind{
     font-size: 28px;
     margin-top: -6px;
 } */
     
 /*
     div {
         min-height: 350px;
         padding: 20px;
         background-color:transparent;
         border-radius: 10px;
         box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
         text-align: center;
         flex: 1;
         margin: 10px;
     } 
 
     /* h2 {
         font-size: 1rem;
         margin-bottom: 10px;
         color: azure;
     }
 
     h4 {
         font-size: 1rem;
         margin-bottom: 5px;
     } */ -->
