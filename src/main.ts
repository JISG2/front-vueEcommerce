import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import axios from 'axios';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCvEU6Y7smBSEbpQDBSIDIAPjuKKmdWMHc",
  authDomain: "pwa-hosting-4d5ef.firebaseapp.com",
  databaseURL: "https://pwa-hosting-4d5ef.firebaseio.com",
  projectId: "pwa-hosting-4d5ef",
  storageBucket: "",
  messagingSenderId: "574133389523",
  appId: "1:574133389523:web:e703a4eb61627b72"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.usePublicVapidKey("BJ5KxBz6I9U4LUrX-5JUZMRvm9xk42eGS3zEZ_742rqUqs1KVVDIQ2MJXACVAIOMPx6P32mUHi04X5Mm66MD_xI");

messaging.requestPermission().then(()  => {
  console.log('Notification permission granted.');

  messaging.getToken().then((token) => {
    let tokenUser = token+'';
    console.log("noti: ",tokenUser)
    localStorage.setItem('token',tokenUser);
  });
}).catch((err) => {
  console.log('Unable to get ',err)
})
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
