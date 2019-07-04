<template>
  <v-app>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <v-toolbar app>
      <v-toolbar-title class="headline">
       <v-btn flat to="/" color="info"><span class="mr-2">UPizza</span></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat  :to="{name:'historial'}" color="success">
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
  data () {
    return {
      //
    }
  }
}
</script>
