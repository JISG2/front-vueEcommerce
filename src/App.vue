<template>
  <v-app>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <v-toolbar app>
      <v-toolbar-title class="headline">
       <v-btn flat to="/" color="info"><span class="mr-2">UPizza</span></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-badge left>
      <template v-slot:badge>
        <span>{{items}}</span>
      </template>
      <v-btn style="color: transparent" :to="{name:'carro'}">
      <v-icon
        large
        color="grey lighten-1"
      >
        shopping_cart
      </v-icon>
      </v-btn>
    </v-badge>
      <v-btn flat  :to="{name:'historial'}">
        <span class="mr-2">Historial</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  
  name: 'App',
  components: {
    HelloWorld
  },
   computed: {
    itemsInCart(){
      let cart = this.$store.getters.cartProducts;
      return cart;
    }
  },
  data () {

    return {
      //
      cont: 0,
      get items() {
      	return localStorage.getItem('carro').length || 0;
      }
    }
  },methods:{
  },
}
</script>
