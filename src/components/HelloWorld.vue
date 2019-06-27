<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 mb3 sm3 pa-3 v-for='element in elements' :key='element.id' :element='element'>
          <v-card>
            <v-img v-bind:src=element.imagen height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{element.nombrePizza}}</div>
                <span class="green--text">{{element.precioBase}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="blue" :to="{name:'order',params: {id: element.id}}">Ordenar</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show">
                {{element.descripcion}}
              </v-card-text>
            </v-slide-y-transition>
         </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      show: false,
      elements: [],
      element: {
        id: null,
        nombrePizza: null,
        descripcion: null,
        imagen: null,
        precioBase: null
      }
    }),
    created () {
      this.getElements()
    },
    methods: {
      getElements () {
        this.$axios.get(`http://127.0.0.1:3333/api/v1/pizzas`)
        .then(response => {
          console.log(response.data)
          this.elements = response.data
        })
        .catch( e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style>

</style>
