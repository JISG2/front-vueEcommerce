<template>
  <v-container>
     <v-layout row wrap>
        <v-flex xs12 mb4 sm4 pa-3 v-for='element in elements' :key='element.id' :element='element'>
          <v-card class="elevation-4">
            <v-img v-bind:src=element.imagen height="200px"></v-img>
            <v-btn color="primary" @click="addPizza(element.id,element.nombrePizza,element.imagen)" fab small dark>
              <v-icon>add</v-icon>
            </v-btn>
            <v-card-title primary-title>
              <div row>
                <div>
                  <div class="headline">{{element.nombrePizza}}</div>
                 <span class="green--text">Tamaños: Chica Mediana Grande </span>
                </div>
                <v-btn flat color="blue" :to="{name:'order',params: {id: element.id}}">Ordenar</v-btn>
              </div>
              
            </v-card-title>

            <v-card-actions>
            <v-expansion-panel focusable>
    <v-expansion-panel-content :key="element.id">
      <template v-slot:header>
        <span flat color="blue">Descripción</span>
      </template>
      <v-card>
        <v-card-text>{{element.descripcion}}</v-card-text>
        <br>
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
  import { mapGetters } from 'vuex';
  var    carrito=[];
  export default {

    data (){
      return {
      show: false,
      elements: [],
      //carrito:[],
      element: {
        id: null,
        nombrePizza: null,
        descripcion: null,
        imagen: null,
        precioBase: null
      },
      carro:{
        id: null,
        img: null,
        nombre: null
      }
      }

      
    },
    created () {
      this.getElements()
    },
    methods: {
      getElements () {
        this.$axios.get(`https://api-pizza-adonis.herokuapp.com/api/v1/pizzas`)
        .then(response => {
          console.log(response.data)
          this.elements = response.data
        })
        .catch( e => {
          console.log(e)
        })
      },
      addPizza(id,nombre,img){
        this.carro.id = id;
        this.carro.img = img;
        this.carro.nombre= nombre;
        carrito.push(this.carro);
        console.log("add: ",carrito)
        this.saveCarrito();

      },
      saveCarrito() {
      const parsed = JSON.stringify(carrito);
      localStorage.setItem('carro', parsed);
      let car = JSON.parse(localStorage.getItem('carro'));
      console.log("carro:",carrito.length)
      console.log("car",car.length);
    }

    }

  }
</script>

<style>
  .v-expansion-panel{
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }
 
</style>
