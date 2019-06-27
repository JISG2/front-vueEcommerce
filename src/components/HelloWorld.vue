<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 mb4 sm4 pa-3 v-for='element in elements' :key='element.id' :element='element'>
          <v-card class="elevation-4">
            <v-img v-bind:src=element.imagen height="200px"></v-img>
            <v-card-title primary-title>
              <div row>
                <div>
                  <div class="headline">{{element.nombrePizza}}</div>
                  <span class="green--text">${{element.precioBase}} </span>
                </div>
                
              </div>
              
            </v-card-title>

            <v-card-actions>
            <v-expansion-panel focusable>
    <v-expansion-panel-content
      :key="element.id">
      <template v-slot:header>
        <span flat color="blue">Descripcion</span>
        <!-- <div></div> -->
      </template>
      <v-card>
        <v-card-text>{{element.descripcion}}</v-card-text>
        <br>
        <v-btn flat color="blue" :to="{name:'order',params: {id: element.id}}">Ordenar</v-btn>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
            </v-card-actions>
         </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  
  export default {
    data (){
      return {
      show: false,
      elements: [],
      element: {
        id: null,
        nombrePizza: null,
        descripcion: null,
        imagen: null,
        precioBase: null
      }
      }

      
    },
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
      },

    }
  }
</script>

<style>
  .v-expansion-panel{
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }
 
</style>
