import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import axios from 'axios';
import firebase from 'firebase'

let tokenUser = ''
const firebaseConfig = {
  apiKey: "AIzaSyDng0cPk1buFKSMvWmV3SlUe2MYaBfnQ0I",
  authDomain: "pizzasnotificacioneshosting.firebaseapp.com",
  databaseURL: "https://pizzasnotificacioneshosting.firebaseio.com",
  projectId: "pizzasnotificacioneshosting",
  storageBucket: "",
  messagingSenderId: "9141470595",
  appId: "1:9141470595:web:d988efca2079eba3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.usePublicVapidKey("BJjf-7J4WK-_99dq29_vF7sprRw7SBuezUSlKbjGeXk7cAopAtJlOXK0N5mNjdRtbag4djjpgxy-EURRewWrhTc");

messaging.requestPermission().then(()  => {
  console.log('Notification permission granted.');

  messaging.getToken().then((token) => {
    tokenUser = token+'';
    console.log("token: "+token);
    localStorage.setItem('token',tokenUser);
  });
}).catch((err) => {
  console.log('Unable to get ',err)
})

Vue.config.productionTip = false;
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
