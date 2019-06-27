<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 md3 pa-3 v-for='(element,index) in elements' :key='element.id' :element='element'>
         
          <v-card>
            <v-img v-bind:src=element.imagen height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{element.nombre}}</div>
                <span class="green--text">${{element.precio}}  {{array[index]}} </span>
              </div>
              <v-btn flat color="blue" :to="{name:'order',params: {id: element.id}}">Ordenar</v-btn>
            </v-card-title>

            <v-card-actions>
            <v-expansion-panel>
    <v-expansion-panel-content
      :key="index">
      <template v-slot:header>
        <span flat color="blue">Descripcion</span>
        <div></div>
      </template>
      <v-card>
        <v-card-text>{{element.descripcion}}</v-card-text>
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
      array:[],
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
          for (let index = 0; index < this.elements.length; index++) {
            this.array.push(false)
          }
          console.log(this.array)
        })
        .catch( e => {
          console.log(e)
        })
      },

    mostrar(index){
     array[index]=!array[index];
      //console.log("dentro: ",this.array[index], " index:",index)
     // return this.array
      console.log(array)
    }
    }
  }
</script>

<style>

</style>
