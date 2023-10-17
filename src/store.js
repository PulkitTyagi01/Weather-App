import { createStore } from 'vuex'
import axios from 'axios'

const apiKey = process.env.VUE_APP_API_KEY

const store = createStore({
  state() {
    return {
      user: false,
      cityWeatherData: [],
      cityName: '',
      userId: null,
      token: null,
      tokenExpiration: null,
      loginFailed: false,
      cityData: true,
      registrationError: false,
    }
  },
  mutations: {
    async cityWeather(state, payload) {
      state.cityWeatherData = payload
    },

    setUser(state, payload) {
      state.loginFailed = false
      ;(state.token = payload.token), console.log('token :', state.token)
      ;(state.userId = payload.userId),
        (state.tokenExpiration = payload.tokenExpiration)
    },
    setCityName(state, payload) {
      state.cityName = payload
    },
    setLoginFailed(state, payload) {
      state.loginFailed = payload
    },
    setCityData(state, payload) {
      state.cityData = payload
    },
    registrationError(state, payload) {
      state.registrationError = payload
    },
  },
  actions: {
    async showWeather(context, payload) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=1051b531fb0fcc2b2b57875a42030a47`,
        )

        if (response.status === 200) {
          const data = response.data
          context.commit('cityWeather', data)
          console.log(data, 'hyyy')
        }
      } catch (error) {
        context.commit('setCityData', false)
      }
    },

    setCityName(context, payload) {
      context.commit('setCityName', payload)
    },
    async loginUsers(context, payload) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=` +
            apiKey,
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          },
        )
        const responseData = response.data

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)

        console.log('signup usersh')
        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        })
      } catch (error) {
        context.commit('setLoginFailed', true)
      }
    },
    async signUpUsers(context, payload) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` +
            apiKey,
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          },
        )
        const responseData = response.data
        console.log('response', responseData)
        console.log('token is :', responseData.idToken)

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)

        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        })
      } catch (error) {
        context.commit('registrationError', true)
      }
    },
    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      console.log('userid')
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null,
      })
    },
    setCityData(context, payload) {
      context.commit('setCityData', payload)
    },
    setRegistrationError(context, payload) {
      context.commit('registrationError', payload)
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    weatherData(state) {
      return state.cityWeatherData
    },
    getCityName(state) {
      return state.cityName
    },
    userId(state) {
      return state.userId
    },
    loginFailed(state) {
      return state.loginFailed
    },
    cityData(state) {
      return state.cityData
    },
    registrationError(state) {
      return state.registrationError
    },
  },
})

export default store

//-------------------------------------------------------------------------------------------------------

// try {
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=1051b531fb0fcc2b2b57875a42030a47`);

//   if (response.status === 200) {
//     const data = response.data;
//     console.log(data, 'hyyy');
//   }
// }
// catch (error) {
// //   state.cityName = null
//   console.error('Error fetching data:', error);
// }

// loginUser(state, payload){
//     fetch("https://latest-eb80e-default-rtdb.firebaseio.com/weather.json")
//     .then(function(response){
//         if (response.ok){
//             return response.json();
//         }
//     }).then(function(data){
//         console.log(data)
//         for(const i in data){
//             console.log(data[i])
//             if (data[i].email===payload.email && data[i].password===payload.password){
//                 state.user = true
//             }
//             else{
//                 state.loginFailed = true
//             }
//         }
//     })
// },
// registerUser(state, payload){
//     fetch("https://latest-eb80e-default-rtdb.firebaseio.com/weather.json", {
//         method : 'POST',
//         headers : {
//             'Content-Type' : 'application/json'
//         },
//         body : JSON.stringify({
//             username : payload.username,
//             email : payload.email,
//             password : payload.password
//         })
//     })
// },

// login(context, payload){
//     context.commit('loginUser', payload)
// },
// signupUser(context, payload){
//     context.commit('registerUser', payload)
// },

//    fetch("https://latest-eb80e-default-rtdb.firebaseio.com/weatherData.json", {
//     method : 'POST',
//     headers : {
//         'Content-Type' : 'application/json'
//     },
//     body : JSON.stringify({
//         jsonData : state.cityWeatherData
//     })
// })
